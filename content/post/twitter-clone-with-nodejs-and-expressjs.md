+++
title = "Week 2, Day 2: Building a Twitter Clone with Node.js and Express.js"
tags = ["fullstack academy", "junior phase", "node.js", "express.js"]
date = "2016-11-09"
+++

We built a Twitter clone app with Node and Express, and wanted it to have the following:

* A place to store data (nothing fancy yet – just an object will do)
* A homepage that lists all tweets from all users
* A profile page that displays a specific user’s tweets
* A form to post new tweets (and as an extra bonus, enable it to update in real-time for all clients connected to the server at the time)

## Initializing the Project

First, we set up a `twitter-js` directory, and ran `git init` and `npm init`.

We also created a directory tree, which looked like this:

```
├── app.js
├── package.json
├── public
│   └── stylesheets
│       └── style.css
├── routes
│   └── index.js
└── views
    ├── index.html
    └── layout.html
```

`app.js` will be our main application. The `public` folder will store our static files, to be automatically served when requested. The files in our routes and views directories will allow us to define dynamic content.

We used `npm install express --save` to download Express to our `node_modules` directory and ensure Express is also saved as a dependency in our `package.json` file. Lastly, we set up a `.gitignore` file to exclude `node_modules` and `.DS_Store` (an annoying Mac-specific thing).

## Workflow

We installed Nodemon and saved it as a dev dependency instead of an app dependency. [Nodemon](http://nodemon.io/) essentially watches our files and restarts the app when we save changes, preventing us from having to constantly stop (`CTRL + C`) and restart (`node app.js`) the server whenever we make a change.

We also defined a start script in our `package.json`, which allows us to plug in a pre-determined command (in our case, `nodemon app.js`) when we run `npm start`.

## Configure Express

In our `app.js` file, we installed Express, required it, and created a new app.

```
var express = require('express');
var app = express();
```

We started a small server on the port `3000` with a `get` handler that sends a welcome message when the browser requests the root URI.

```
app.get('/', function (req, res) {
  res.send('Hello, friend!')
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
```

## Logging Middleware

We also created our own logging middleware, although the same (well, let’s be honest, better) functionality is also offered by already-created tools such as [volleyball](https://github.com/glebec/volleyball) and [morgan](https://github.com/expressjs/morgan). Middleware is a pretty broad term, but in the context of logging middleware, we wanted ours to fire for every incoming request and log every verb and route that is requested from the server, as well as the response's status code.

```
app.use('/', function(req, res, next) {
  console.log(req.method, req.path, res.statusCode);
  next();
});
```

Not only does this help in debugging, it also helped me in visualizing a little bit of what’s going on in what can sometimes be a nebulous world. Unlike front-end work, where you can see things changing as you work (or not, depending on if you’re doing things right!), it can be hard to really understand what’s happening when you're working on the back-end.

Our logging middleware also is passed a `next` parameter, which allows the request to match to a later route and send a response back to the client – without it, a response would never be sent. These represent two of the core principles we learned [during the Express lecture]({{< ref "post/node-shell-expressjs-and-senior-panel.md" >}}): every request gets exactly one response, and that the order of your routes is important.

## Templating Engine

Templates are essentially outlines for a document, which can be combined with data to complete it. Templating engines allow us to include JavaScript and programming logic directly in HTML and render it as documents that can be sent to the client.

`template file + locals object -> rendering function -> complete html`

We used [Nunjucks](https://mozilla.github.io/nunjucks/) for our templating engine. After installing and requiring the module, we created a dummy HTML file to play with the templating syntax.

```
<h1>// title //</h1>
<p>This is a bare-bones template.</p>
<ul>
/% for person in people %/
  <li>// person.name //</li>
/% endfor %/
</ul>
```

(In this code above, pretend like all of the slashes are actually opening and closing brackets – Jekyll tries to render this as HTML rather than as straight code.)

Our template file is looking for a title and people to put into the HTML. Initially, I didn't notice there was a title at all (how important are titles, anyway?), just saw that it wanted people, and tried to pass in an array with people, like this:

```
const people = [
  name: 'Gandalf',
  name: 'Frodo',
  name: 'Hermione',
];
```

And when that didn’t work, we tried an array of objects:

```
const people = [
  {name: 'Gandalf'},
  {name: 'Frodo'},
  {name: 'Hermione'},
];
```

And when that didn’t work, we caved to our workshop’s hints and put objects inside of an array inside of an object:

```
const locals = {
  people: [
  {name: 'Gandalf'},
  {name: 'Frodo'},
  {name: 'Hermione'}
]};
```

Our first couple of attempts didn’t work because if we’re passing the people array into the `render` function, then what the template *actually* gets is just that, an array – without the “people” name. It can’t locate “people,” and therefore just won’t put anything into the HTML. And that’s not what we want.

Our template file is looking for the people *key* on the object that we pass into our render function. So, we needed to construct our locals object so that our `index.js` file has access to this key. (Also, if we had remembered that our template also wanted a title, that might have been a good hint in and of itself that we needed something that could hold multiple keys with corresponding values.)

We used `nunjucks.configure` to tell our engine to look in the `views` folder for our file. Then, we used `nunjucks.render` to take our `index.html` template file and our `locals` object, and then execute a callback function to log our `html` to the console when the rendering was done.

```
nunjucks.configure('views');
nunjucks.render('index.html', locals, function(err, output) {
  if (err) throw err;
  console.log(output);
});
```

Our console then had an HTML string with Gandalf, Frodo, and Hermione in the list – just as we wanted.

```
<h1></h1>
<p>This is a bare-bones template.</p>
<ul>
  <li>Gandalf</li>
  <li>Frodo</li>
  <li>Hermione</li>
</ul>
```

## Integration of Nunjucks and Express & Rendering

So we were able to get a single `html` file rendered via the Nunjucks templating engine – great! But, now we wanted to use the engine for *every* `html` file.

Integrating Nunjucks into Express is a fairly simple and boilerplate process. Back in our `app.js` file, we first used `app.set` to prevent HTML from rendering on the browser and do it on the server instead. Then, we used `app.engine` so that when we give `html` files to `res.render`, it’ll use Nunjucks. Lastly, we needed to include our `nunjucks.configure` from above to continue telling Nunjucks to look in the `views` directory for its templates.

```
app.set('view engine', 'html');
app.engine('html', nunjucks.render);
nunjucks.configure('views');
```

To actually render our HTML, now that we’ve set up our app to use Nunjucks, we just used a relatively simple `res.render` and set a route for it with the `get` handler:

```
app.get('/people/', function(req, res){
  res.render( 'index', {people: locals.people}, function(err, html) {
    res.send(html);
  });
});
```

Now, when we visit `localhost:3000/people/`, we see:

```
This is a bare-bones template.
* Gandalf
* Frodo
* Hermione
```

## The tweetBank.js Module

Next, we set up a `tweetBank.js` module, which holds all of our tweets as well as our methods to interact with them. Our data was stored in a simple array – nothing too fancy yet.

We used the [Lodash](https://lodash.com/docs/4.16.6) library to create three methods:

* add, which would add a name and text into our data array
* list, which just returned a deep clone of our data array
* and find, which used `_.cloneDeep` and `_.filter` to find tweets in our data array with a specified property

`_.cloneDeep` allowed us to make deep copies of our data array so that we could perform operations on them without mutating our original “database.” Though this wasn’t as important for this workshop because we weren’t doing anything major, it’ll be important for the future when we’re altering data but want to preserve our original store.

### Small Side Tangent: Shallow vs. Deep Copies

Lodash provides a `_.clone` functionality, which creates a shallow copy of the value you pass into it, and a `_.deepClone` functionality, which recursively clones the value and produces a deep copy.

I struggled with this concept, because I had initially thought that a shallow copy meant that the value it contained was just pointing to the original value, and that a deep copy was an entirely new value in a new place in memory that just happened to look like the old object. One of our instructors spent a little bit of time walking me through this, explaining that with a shallow copy, the "shallowest" level of the object itself would be passed by value and be a "new" copy, but if the value *contained* objects, *those* objects would be referenced, not newly created. However, because a deep copy clones the value recursively, those objects inside of our value will be entirely *new* objects, and not references to the original object in memory.

```
let objects = {obj: {key: 'val'}, obj2: {key2: 'val2'}};
let shallow = _.clone(objects);
objects.obj.key = 'newVal';
console.log(shallow);
// => {obj: {key: 'newVal'}, obj2: {key2: 'val2'}}
```

We can see in the example above that when we change the value of `key` in `obj`, the shallow copy’s value of `key` changes as well. However, in a deep copy, we’d see this instead:

```
let objects = {obj: {key: 'val'}, obj2: {key2: 'val2'}};
let deep = _.deepClone(objects);
objects.obj.key = 'newVal';
console.log(deep);
// => {obj: {key: 'val'}, obj2: {key2: 'val2'}}
```

Because entirely new objects in memory are created for the inner objects, the value of `key` doesn’t change if we change the original array. I then started playing around with this on my own, and came across a somewhat confusing phenomenon:

```
let objects = [1, { 'a': 1 }, { 'b': 2 }];
let shallow = _.clone(objects);
objects = [1, { 'a': 2 }, { 'b': 3 }];
console.log(shallow);
// => [1, { 'a': 1 }, { 'b': 2 }];
```

At this point in my understanding, I would have expected the console log to produce `[1, { 'a': 2 }, { 'b': 3 }]`. After seeking more help, I learned that in line 3, we’re actually assigning objects to an entirely new object instead of mutating the current object.

If we did this instead:

```
var objects = [1, { 'a': 1 }, { 'b': 2 }];
var shallow = _.clone(objects);
objects[1].a = 2;
console.log(shallow);
// => [1, { 'a': 2 }, { 'b': 2 }];
```

We'd only be mutating the object and not *completely* reassigning it, so that results in what we’d expect.

### Okay, Back to tweetBank.js

At the end of our module, we exported our `add`, `list`, and `find` functions. We didn’t want our “database” to be accessible from other parts of the application, and therefore excluded it from our export. Our app would be incredibly boring (and hard to work with) if we didn’t have any data, so we created a bunch of random seed data composed of names and tweets. Values for each were stored in arrays and put together via random number generators.

## Routing and Views

In attempt to keep our code modular and clean, we removed our dummy routes from `app.js`, but kept all of our middleware and configuration calls. Rather than including all of our routing and business logic in `app.js`, we placed our routes in a module that we simply called `routes`. In order to do this, we needed to `require` and then `use` our `routes` directory:

```
const routes = require('./routes/');
app.use('/', routes);
```

In `index.js` (inside of the `routes` folder), we needed to `require` a few modules:

```
const express = require('express');
const router = express.Router();
const tweetBank = require('../tweetBank');
```

Then, we set up a route for the root URI that just showed a list of all of the tweets in our tweetBank.

```
router.get('/', function (req, res) {
  let tweets = tweetBank.list();
  res.render( 'index', { tweets: tweets } );
});
```

Instead of using `app.get` this time, we’re using `router.get`. Essentially, the Express module creates a `router` entity that is configurable outside of any application instance – it’s like a box of routes; a “mini-application” capable of performing middleware and routing functions. At the end of our `index.js` file, we export `router`, which "hands" `app.js` this box to use.

For our views, we included some super simple HTML and CSS – we figured we could save the fancy styling for later.

### Static Routing

Now, we wanted to set up static routing. We could have set this up manually, by creating a `get` handler for each file, such as our `stylesheet`, to a URI that corresponded to its file path. But, what if we had a folder of a bunch of images that we wanted to serve? Or a folder of JavaScript files, so that code could be downloaded and run on the client side?

For this, we used static routing instead. This was as simple as adding one line to our `app.js` code:

```
app.use(express.static('public'));
```

So, instead of doing it manually now, if we drop a file into `public`, Express will automatically route requests to URIs that match the file’s path.

### Dynamic Routing

To set up routes that lets users see the tweets of a specific user or make new tweets, we needed to have dynamic routes – routes that changed depending on a few factors.

Instead of specificying a certain name, we used `:name`, which Express uses to define certain portions of the URI string as variables. These parameters are then stored as properties of the `req.params` object, so we needed to access that, find the tweets in the list of tweets with that name as its name, and then render our HTML to show only tweets from that user.

```
router.get('/users/:name', function(req, res) {
  let name = req.params.name;
  let tweetsForUser = tweetBank.find( {name: name} );
  res.render( 'index', { tweets: tweetsForUser } );
});
```

We also changed our `tweetBank.js` code so that in the `add` function, a unique ID would also be generated and stored with the user’s name and the text of the tweet. Using this, we could then set up a dynamic route to view just a single tweet in much the same manner:

```
router.get('/tweets/:id', function(req, res) {
  let id = Number(req.params.id);
  let tweetByID = tweetBank.find( {id: id} );
  res.render( 'index', { tweets: tweetByID } );
});
```

In our HTML, we linked the user’s name and the tweet’s text in each tweet to the page that corresponded with the user’s page, and the single-tweet view, as follows:

```
/% for tweet in tweets %/
  <li><a href="/users/{{tweet.name}}" class="tweet-name">{{tweet.name}}</a></li>
  <li><a href="/tweets/{{tweet.id}}">{{tweet.text}}</a></li>
/% endfor %/
```

(Again, pretend the slashes are curly brackets.)

## Posting a Tweet

To post a tweet, we created a basic HTML form. However, we were then presented with a problem: Express doesn’t have any way to digest an HTTP body. So, we used the body-parser module to add URL-encoded and JSON body-parsing middleware to our `app.js` file. By including these, every request body will be transformed into a body object and attached to the `request` object, so we can access properties with variables like `request.body.name` and `request.body.text`.

We created our HTML form specifically with `method=“POST”` and attribute `action=“/tweets”` so that when we set up our route, we can use the method and the URI specified for our POST request.

```
router.post('/tweets', function(req, res) {
  let name = req.body.name;
  let text = req.body.text;
  let newTweet = tweetBank.add(name, text);
res.redirect('/');
});
```

We pulled data out of the `request.body` properties and into our data store. Once the new tweet is added, we redirect the client to make a request for the index page so they can immediately see the new tweet they submitted.

## Real-Time Updating with WebSockets

Because we wanted to generate and show posted tweets in real-time, bi-directionally, and simultaneously, we used the WebSockets protocol via the [Socket.io](http://socket.io/) library. We added the client library and script to the bottom of `layout.html`:

```
<script src="/socket.io/socket.io.js"></script>
<script>
const socket = io.connect();
  socket.on('connect', function(){
    console.log('connected to server via WebSockets!');
  });
</script>
```

After requiring Socket.io in our `app.js` file and then giving it a server instance (stored in a variable `io`), the challenge we faced here was that we wanted `io` to emit an event in our routes, but those are in a separate module from `app.js`. But, we couldn’t require `app.js` in our router module, because we already required the router module in `app.js`! (Not only are circular dependencies confusing, but they're also hard to maintain and keep track of.)

We used a functional programming technique to resolve this. We refactored our `routes` module so that instead of exporting `router`, it exports a function that takes `io` and returns `router`:

```
module.exports = function (io) {
  // all of our routes here
  return router;
};
```

We also need to reconfigure our `app.js` module now since it no longer exports a router. We need to call `routes`, passing in `io`, to get the router:

```
app.use( '/', routes(io));
```

To complete the functionality of our app, we incorporated the ability for new tweets to load dynamically – that is, whenever someone posted a tweet, that tweet will automatically show up in every client connected to the server. Though this sounds relatively difficult, it was mostly a matter of emitting a `new_tweet` event server-side, and then adding some new HTML and attaching it to the DOM client-side when the client detects a `new_tweet` event.

As for future steps, I want to make the interface look a little prettier (it's pretty bare-bones right now), maybe come up with a better name than “Twitter clone,” and maybe also populate the database with other tweets — inspiring quotes or funny pictures, perhaps? I also want to figure out how to have new tweets dynamically show up at the beginning of the list, rather than the end – which is easy for all of the other clients (`prepend` vs `append` in the DOM) but I haven’t quite figured out how to do for the client that actually posts the tweet, since the order seems to be dependent upon IDs. Lastly, I want to eventually upload the project to Heroku so that there’s an actual live demo, but the whole there’s-only-24-hours-in-a-day-thing isn't necessarily agree with me right now. (#bootcamplife) All of these have been added to my ever-growing to-do list.

In the meantime, you can check out the current state of the project [here](https://github.com/bethqiang/twitter-js).
