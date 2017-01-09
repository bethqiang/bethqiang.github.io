+++
title = "Week 3, Days 2 and 3: On Feeling Completely Overwhelmed"
tags = ["fullstack academy", "junior phase", "fullstack reflections", "sequelize", "testing", "promises", "minecraft"]
date = "2016-11-16"
description = "Also: testing, promises, and Game Night round 2"
+++

Let’s talk about feelings for a second. I’m generally a very optimistic person with a decent amount of confidence in myself, my critical-thinking and problem-solving abilities, and my ability to stick with something when it’s challenging. I don’t like to dwell on the negatives, and I generally try not to let myself get too down.

But today was kind of a sucky day. It didn’t start off that way. I woke up after six hours of sleep feeling a little sleepy, but feeling pretty good about most of the material we had covered in the past couple of days. I knew that my blog post from yesterday needed editing, and set out to do that before class.

As I was editing, I realized that maybe I didn’t understand some of the things we did as much as I thought I did. My post didn’t really make sense in a lot of places, and I couldn’t figure out how to *make* it make sense. Then, we reviewed the solution to the workshop we did yesterday, and I quickly started getting overwhelmed – I knew generally how to write decent tests, and I thought I had a pretty good grasp of promises, but I was having a really hard time seeing how everything was connecting.

Then, we talked more in-depth about promises, and my brain was still a little boggled and twisted from the session before, and I wasn’t able to follow as much as I maybe could have otherwise. By the end of the morning, I was completely overwhelmed, stressed, and my confidence was at the lowest point it’s been since Fullstack began. My brain was running in circles around itself, and even things I knew that I knew started to not make any sense.

During lunch, when I usually take some time to read programming blogs or review what we covered during the morning or a variety of related things, my sole goal was to get out of the house and do something unrelated to coding for the entire hour and a half. I took a 45 minute walk while listening to a new podcast by Stephen Dubner, of Freaknomics fame, called [Tell Me Something I Don’t Know](http://freakonomics.com/tmsidk/). (It was literally a podcast about random facts. It was pretty interesting, though I don’t know if I’ll be a regular listener.) I then ate lunch, watched some cute puppy videos, and read about politics.

Once I had an opportunity to calm down and reassure myself that I did in fact, know how to code and solve problems with some degree of competency, and that yes, I could do this, I knew I needed to change something. I needed more time. Time for me to do thorough concept reviews in the evenings, and do fun Code Wars problems, and go to meetups, and work on personal projects, and do more functional programming because for some reason that really excites me. I needed time do things that I find fun that aren't directly related to class. And also, you know, sleep. But more importantly, I *also* needed some time every day to do things like go for 45 minute walks or watch cute puppy videos or get dinner with a friend once in a blue moon. And run. Running helps. (That's a long list, I know.)

This isn't an uncommon theme; I mentioned that I needed to improve upon my time management and prioritization in [last week's reflection post]({{< ref "post/fullstack-academy-week-2.md" >}}). I knew, at the time of writing that, that I needed to change *something*. But I didn't realize that I couldn't keep doing what I was doing, and still stay sane.

Outside of class and evening reviewing (which, in and of itself, I need to find a way to optimze), writing these posts have by far taken the largest chunk of my time. Daily 1,500-word blog posts are great, and I’m sure I’ll thank myself for them later. But, I’m starting to realize with the schedule that we have and the time I need outside of class, they’re unsustainable. Frankly, they take too much time to write, and even just saving an hour a day will give me an hour to start doing other things. That definitely doesn't mean I'm going to abandon writing about each day. I just have to choose more wisely what I want to write, and cap the length of and detail in each post, thereby lessening the time that they take.

In the interest of keeping some kind of record of what we’ve been doing and learning the past two days, here’s a (sort of) quick-and-dirty summary.

## Back-End Testing and Sequelize Magic

We learned all about testing on the back-end. Some of the key takeaways:

* It’s generally preferable to use a different database to test your code than when you’re developing or when your app is in production, so that you can stick stuff in and take stuff out and completely reset your database freely. This can be done pretty easily by creating a process environment variable, and then setting a conditional for that variable when you’re setting your database.
* Constantly talking about Mocha and Chai made me constantly want a hot, creamy, caffeine- and sugar-laden beverages.
* When we’re using promises in our tests, which is often because much of what we’re testing is asynchronous, we need to include either `return` or `done`. If neither are included, Mocha reads our tests, and passes them, *before our async functions finish doing what they’re supposed to do*. And once our async functions are done, we'll get an error – but the tests have already passed and Mocha's over it. So that’s not good.
* `Done` is passed into our test function, and then we can invoke it at the end (and in our `catch`) to signal to Mocha that it’s good to go and can move on to the next test. If we don’t want to use `done`, we can use `return` instead, and to Mocha, it’ll almost be like an implied `then` after.

If we're creating 3 pages to test if our `findByTag` function works, with `done`, this would look like:

```
describe('findByTag', function () {
  beforeEach(function(done) { // done is passed in
    Promise.all([
      Page.create({ new page info }),
      Page.create({ new page info }),
      Page.create({ new page info })
    ])
    .then(function() { // our success/error functions
      done();
    }, done)
  })
  it('gets pages with the search tag', function(done) { // done is passed in here as well
    Page.findByTag('tag')
    .then(function(pages) {
      expect(pages).to.equal(something)
      expect(pages).to.equal(somethingelse)
      done(); // this indicates the end of the async
    })
    .catch(done); // error-handling
  });
});
```

With `return`, the same code would look like this:

```
describe('findByTag', function () { // no done being passed
  beforeEach(function() {
    return Promise.all([ // return this
      Page.create({ info }),
      Page.create({ info }),
      Page.create({ info })
    ]) // no need for success/error functions using done
  })
  it('gets pages with the search tag', function() { // no done being passed
    return Page.findByTag('tag') // return this
    .then(function(pages) {
      expect(pages).to.equal(something)
      expect(pages).to.equal(somethingelse) // no done after this
    })
  }); // and no need for a catch(done) statement here
});
```

On Tuesday, my pair and I were working on tests for our [Wikipedia clone]({{< ref "post/building-a-wikipedia-clone.md" >}}), and for one of them, we were creating an instance that pulled from two models, `User` and `Page`. After wrestling with it for an hour and a half and finally getting it to work the non-magical, slightly harder, and not as pretty way, our fellow then asked us if we wanted to try a little Sequelize magic to make this happen – a little something called eager creation. Here’s what we worked through to come up with:

```
// in models > index.js, set associations:
Page.belongsTo(User);
User.hasMany(Page);

// in our test specs, creating a new instance:
beforeEach(function(done) {
User.create({
  name: 'Spock',
  email: 'spock@starfleet.gov',
  pages: [{
    title: 'Science Officer\'s Log #7',
    content: 'Humans are emotional.',
    status: 'open',
    tags: ['Sci-fi', 'TV']
    }]
    },
    {
      include: [ Page ]
    })
    .then(newInfo => {
      newPageInfo = newInfo.pages; // our pages data can now be accessed via the pages property
      done();
    })
    .catch(done);
  });
```

We also learned that Sequelize is way too smart and picky for its own good. For an entire hour, we tried an incredible number of ways and syntaxes to create a `page` property, but every time, we’d get an empty array back. The fact that we got an array back showed us that Sequelize was trying to give us something, just not what we wanted. Our fellow had a sudden realization – Sequelize was looking for a `pages` property, and we were trying to give it a `page` property. He also told us a funny (or not, if you were him) story about how he was once trying to do something similar with a property that ended in a “y” – which, in the English language, the plural becomes “ies.” For an entire day or two, he was trying to figure out why Sequelize was putting up a fit, before realizing he had specified the plural as “ys.”

## Promise Mechanics and Building a Promise Library

Today, we spent a good deal of time talking about the mechanics of promises, and we spent the afternoon building a deferral-style promise library similar to [AngularJS’s $q service](https://docs.angularjs.org/api/ng/service/$q). We created `$Promise` and `Deferral` classes, with the `then` method on the `$Promise` prototype that took two callback functions and the `resolve` and `reject` methods on the `Deferral` prototype.

The first roadblock we faced was figuring out how to trigger the `then` and the callback functions, which was stored in the `$promise` instance, when the promise was resolved. Our first idea was to include it in the `resolve` and `reject` methods, but then they’d be triggered right after a promise was fulfilled – not when the `then` was called. We ended up creating an intermediate function, whose job was solely to take the callback function off of the array it was stored in and run it.

```
$Promise.prototype.callHandlers = function(data) {
  if (this._state !== 'pending') {
    let fn = this._handlerGroups.shift();
    // handlerGroups was an array of objects containing success and failure functions
    fn.successCb(data);
  }
}
```

The second challenge we faced was to ensure that, even if events occurred in the opposite order – if the promise is resolved after the `then` – that the `then` would still run. We contemplated a myriad of options, including recursion, a while loop, a `setInterval` to check the state of the promise, and ended up going down a rabbit hole trying to research `setImmediate`.

We later learned that the answer was *incredibly* easy – we could just call our `callHandlers` function in the same function that fulfilled the promise. When the `then` is run initially (before the promise is fulfilled), it’ll add its callback functions to the storage array, and even though it calls the `callHandlers` method, the `callHandlers` method won’t invoke the callback because the state is still pending. When the promise is resolved, then we just need to call the `callHandlers` method to run the callback functions that were already stored.

## Game Night, Round 2

We also had another Game Night, where I finally got to see some of the things my fellow classmates have been building. Someone created a pool surrounded by lava. Someone else claimed an enormous plot of land – our theory is that he's trying to build a subdivision and drive up rent. One of our instructors decided to cover his entire plot in glass blocks (because, why not, I guess?), and the other instructor built a cute little cabin. Apparently, someone built an absolutely frightening house – I can’t tell you what that means or what it looks like, because I was too absorbed in building my treehouse to venture over there. We’re having a Minecraft hackathon on Monday afternoon, and I have very little idea of what that involves, but I’m really excited!

And on another note, it's both hilarious and not how half of this post built up into “I need to write shorter posts”...and this is over 1600 words, not including the code blocks. C’mon, Beth.
