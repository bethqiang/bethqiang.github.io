---
layout: post
comments: true
title: "Week 3, Day 1: Building a Wikipedia Clone"
date: 2016-11-14 23:30:00 -0500
description: 'Or, our introduction to what Fullstack affectionately calls "Sequelize magic"'
tags: [fullstack academy, junior phase, node.js, express.js, sequelize]
---

The past day has been a complete whirlwind of learning and figuring out why things are going wrong. We built a Wikipedia clone with the following features:

* A homepage that lists all the pages in the Wiki
* The ability to create new pages
* Page searching
* Tagging

We started from the very beginning – a blank text editor, in which we required a bunch of modules, set up our middleware, enabled our Nunjucks rendering engine and created simple templates, and created and connected to our Postgres database.

After all of the initial set up was done, we started creating our model schemas and synched them to our database. We used  [Sequelize](http://docs.sequelizejs.com/en/v3){:target="_blank"} for all of our database communication. In our schemas, we had two relations: `Page`, which contained fields like title, the URL, content, etc., and `User`, which just contained name and email. We created validation rules – the primary ones were that most fields weren't allowed to be null, the user email went through Sequelize's email validation, and the status had to be open or closed and not anything else.

We initially started by creating `get` routes to `/wiki` and `/wiki/add`, and a `post` route to `/wiki` in a `wiki.js` module in our `routes` directory. The first, `get('/wiki')`, would just be a list of all of the articles – a simple query to our database for all of the posts it contains. The second, `/wiki/add`, would present the user with an HTML form to create a new article. Once a post was added, we wanted to redirect the user to the newly created page, which meant that we needed a route for our newly created page! (More on this in a second.)

The last one, `post('/wiki')`, required us to set our form with `action='/wiki/'` and `method='POST'`. When we set this up, one of the challenges that we faced was that a URL for each page couldn't be null, but we didn't want to create a field in the form where the user would have to manually create a URL-compatible string for it. (And you know there's a subset of users who would do it wrong too...) To address this, we set up a hook, `beforeValidate`, in our model to transform the page's title into a usable URL string programmatically.

We used dynamic routing (`/wiki/:urlTitle`) for each page to have its own route. One of the things we had to remember here was to keep this route above our `/wiki/add` route, or else every time we went to the `/add` route, our server will think that add is the `urlTitle` and will try to send back an article called "add." This also meant that we can't actually have a page called "add," but that's a small price to pay. :)

To make our lives easier and much less repetitive, we set up a virtual field called `route`, which would add `'/wiki/'` to each urlTitle to create the route that it would eventually be associated with. We created a virtual field for this because it's always derived, so we don't really need to store it anywhere, and we don't want to keep having to create `res.redirect`s in our routes, either.

Now, having the ability to author a page is great. But authors probably want some credit for their contributions, right? And, we'd want to see each author's page and the pages that they've written. This is where our `User` model came in. We created a Sequelize association between our `Page` model and our `User` model – `Page.belongsTo(User, { as: 'author' })`. We later learned that this does a number of things under the hood, including changing the schema (so we had to force the schema to re-make itself) and placing instance methods on our page objects to manage the association between these two.

We updated our `post` method route with `findOrCreate` so that if that user already existed, we'd use that user, but if it didn't, we'd add him/her. Then, we would associate that user with the new page. This required the following code:

{% highlight javascript %}
...
  User.findOrCreate({
    where: {
      name: req.body.name,
      email: req.body.email
    }
  })
  .then(function(values) {
    const user = values[0];
    const page = Page.build({
      title: req.body.title,
      content: req.body.content
    });
    return page.save().then(function(page) {
      return page.setAuthor(user);
    };
  })
  .then(function(page) {
    res.redirect(page.route);
  })
  .catch(next);
})
{% endhighlight %}

My partner and I were *really* confused about this for a *really* long time. First off, we didn't realize that Sequelize's `belongsTo` does a lot of things behind-the-scenes, and had no concept of the `setAuthor` method. Second, we no idea what was going on with the nested `then`s – why were they nested? In what order were things happening? What was being passed where? Why was everything being returned?

So to tackle the first – if they weren't nested, and more clearly defined, they would look like this:

{% highlight javascript %}
...
  .then(function(values) {
    const user = values[0];
    const page = Page.build({
      title: req.body.title,
      content: req.body.content
    });
    return page.save() // resolves to a page object
  })
  .then(function(page) { // receives that page object
    return page.setAuthor(user); // <== ERROR: user is not defined
  };
...
{% endhighlight %}

To help us understand what was going on, our instructor broke it down a little further:

{% highlight javascript %}
...
  .then(function(values) {
    const user = values[0];
    const page = Page.build({
      title: req.body.title,
      content: req.body.content
    });
    var pageSavePromise = page.save();
    var pageSaveAndOtherStuff = pageSavePromise.then(function(page) {
      var settingAuthorPromise = page.setAuthor(user); // start setting author
      return settingAuthorPromise; // make paveSaveAndOtherStuff promise wait for this to resolve before IT resolves
    });
    return pageSaveAndOtherStuff; // this now resolves BEFORE the author setting is completed
  })
  .then(function(page) {
    return page.setAuthor(user);
  };
...
{% endhighlight %}

In `settingAuthorPromise`, we *start* setting the author. Then, we make the `pageSaveAndOtherStuff` promise wait for `settingAuthorPromise` to resolve before it resolves. But, `return pageSaveAndOtherStuff` resolves __*before*__ the author setting is completed.

Having understood this now, instead of going with our solution-provided code, we refactored it to make it slightly more intuitive to us:

{% highlight javascript %}
...
  User.findOrCreate({
    where: {
      name: name,
      email: email
    }
  })
  .then(function(values) {
    const user = values[0];
    return Page.create({
      title: title,
      content: content,
      status: status,
      tags: tags
    })
    .then(function(addedPage) {
      return addedPage.setAuthor(user);
    })
  })
  .then(function(addedPage) {
    res.redirect(addedPage.route);
  })
  .catch(next);
})
{% endhighlight %}

We eliminated `page.save` entirely by using `Page.create` instead of `Page.build`, and made the layout a little more linear. `Page.create` resolves to a page object and passes it to the `page.setAuthor` method. This takes the ID of the user and sets it as the authorId of the page. Once all of that is done, the redirect happens, and our catch clause is last.

We then set up routes to `/users` and `/users/:id` for an individual's page. For the later, we used a `Promise.all` statement because we needed to do two lookups, one to the user table to get the user ID, and the second to the page table to match the `authorId` – something that Sequelize created for us as the foreign key.

Back in our wiki page route, we added in the author of each page via eager loading:

{% highlight javascript %}
router.get('/:urlTitle', function(req, res, next) {
  Page.findOne({
    where: {
      urlTitle: req.params.urlTitle
    },
    include: [
      {model: User, as: 'author'}
    ]
  })
  .then(function(page) {
    if (page === null) {
      return next(new Error('That page was not found!'));
    }
    res.render('wikipage', {
      page: page
    });
  })
  .catch(next);
})
{% endhighlight %}

Which, in another feat of magic, is Sequelize's way of basically doing a join between those two tables, and then making everything on `User` available on `Page` under the property `author`.

The last thing I ended up doing after class was setting up tags, which involved first setting a new tags field on our model (using `Sequelize.ARRAY(Sequelize.TEXT)`), and then using `set` and `this.setDataValue` to re-set the incoming tag string as an array. Then, we modified the locals object to render in our controller, and rendered the view to include our tags on each page.

We also enabled the ability for the user to search for a specific tag in an HTML form with a `/search` route. One of the mistakes I made here, was one that I mentioned above for the `/add` route: I tried putting the `/search` route below `/:urlTitle`, so I was given a few error messages before I realized what was happening.

We specified the search form's method as `get`, which meant that we had to pull data in through `req.query` instead of `req.body`. We created a class method on our model to `findByTag` using the `$overlap` operator, and used it to find all of the pages with a single tag. We also created a `findSimilar` instance method, and added a link on each page to a list of "similar" pages (or, pages with the same tag[s] as the page that you were on).
