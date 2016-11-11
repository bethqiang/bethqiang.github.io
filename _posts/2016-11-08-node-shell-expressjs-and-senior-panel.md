---
layout: post
comments: true
title: "Week 6, Day 1: Node-Shell Workshop, Express.js, and Advice from People Who Sort of Know What They’re Doing"
date: 2016-11-08 00:30:00 -0500
description: 
tags: [fullstack academy, junior phase, node.js, express.js]
---

I started off my day with watching [a fantastic talk about event loops](https://youtu.be/8aGhZQkoFbQ){:target="_blank"}, and then briefly looking at a [Code Wars](https://www.codewars.com){:target="_blank"} problem. I’ve done a few Code Wars problems in the past, but we’ve now been incentivized — if we reach 4 kyu (for those who aren’t familiar, that just refers to a certain level) by the end of Junior Phase, we get a cool shirt. And a lot of knowledge and practice. But I’m obviously only doing it for the shirt. ;)

We officially kicked off our day with three hours of Node.js. Our task in our workshop was to implement the following common `bash` commands with Node.js:

* `pwd` to print the working directory, using the process global
* `date` to print the current date-timestamp
* `ls` to print the names of all of the files in a directory, using the `fs` module
* `echo` to print whatever you specify after it, including environment variables (such as `$PATH`)
* `cat` to print the entire contents of a file
* `head` to print the first x lines of a file (we somewhat arbitrarily did 5)
* `tail` to print the last x lines of a file (again, 5)
* `sort` to sort the lines of a file lexicographically
* `wc` to count the number of lines in a file (although the original `bash` command counts more than just lines)
* `uniq` to remove lines if they’re the same as the one above it
* `curl` to print out the HTTP response body, using the `request` module
* `grep` to search and return all of the lines of the input that have a specified word or phrase. The real version uses regular expressions, which we briefly tried to do, and instead ended up using the `includes` method on the string prototype for simplicity and the interest of time.
* piping to combine these to accomplish slightly more complicated tasks

One of the biggest things I took away from this was a thorough understanding of the [Unix Philosophy](https://en.wikipedia.org/wiki/Unix_philosophy){:target="_blank"}: every command is a really small, single-purpose program. The `stdout` stream of one program can be `piped` (via `|`) to the `stdin` of another program, allowing you to combine each of these programs in powerful ways.

For example, if you wanted to show only the unique lines on a file called `something.js` (it’s 1am as I’m writing this — don’t judge me for my filenames!), you could call `sort something.js | uniq | wc`. If instead you wanted to find the number of times that the word `function` showed up in our `something.js` file, we can call `cat something.js | grep function | wc`.

One of the biggest challenges we faced, and I’m now starting to realize is a weakness of mine in general, was creating our modules in such a way that they were, well, modular and non-repetitive (a la the [DRY principle](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself){:target="_blank"}). Once all code is written out, it’s relatively easy to go back and refactor, but it’s a lot harder for me personally to start from the very beginning and design it with the intention of having both characteristics. Sometimes, having a less-than-ideal initial design also makes refactoring harder — we had to change a significant portion of our code and its structure so that we had reusable components that had the same functionality as our original code. Researching whether someone is capable of deliberately practicing this (vs. whether it’s something that just comes from experience) has made it onto my ever-expanding to-do list.

<br/>

### Express.js

We then spent a very, very long time talking about Express.js. Turns out, there’s a lot to talk about. I did a very little bit of Express on my own right before the immersive started after [my initial interest in learning back-end development]({{ base.url }}/2016/10/24/react-git-and-working-with-developers/){:target="_blank"}, so I was somewhat familiar with the basic concepts of starting a server and setting routes.

A few main points from the lecture that I found useful and/or funny:

* “Every request gets exactly one response”—no more, no less. (Geoff, our instructor, asked us to repeat that out loud a couple of times—it’s that important.)
* “Your server is somewhere in Norway.” It can be confusing sometimes that your server and client are on the same machine when you’re developing, so just imagine your server sits somewhere far, far away.
* Tools to help improve workflow: `--save-dev`, [`nodemon`](http://nodemon.io/){:target="_blank"}
* Express Router is like a mini Express application that allows you to make applications more modular and flexible by creating multiple instances of the Router and applying them accordingly. A visual example of how to use it:

{% highlight javascript %}
const router = express.Router();
app.use('/docs', router)
// When you send a `get` request, you don’t need to specify `/docs/`
// in your path — just the subdirectory within that.
router.get('/important', function(req, res) {
  res.send("Some VIP docs");
})
{% endhighlight %}

* Route middleware allows you to do things before a request is processed — for example, logging to the console the `method` and `url` of each request. The order you place your middleware and routes matters greatly — if you place your middleware after a route, then the route will happen before the middleware and the request will end there, and your middleware won't run.
* Having the `next` parameter in a CRUD operation and calling `next()` will allow your code to go to the next function with the same verb and URI.
* Route parameters (e.g., ‘/users/:id’) and using `req.params` allows you to get the object with the parameters you passed in. In our example, you can do validation of the user ID number in the route middleware to make sure the user exists when they log in. `Req.query` allows you to pass in a query string in the URL.

After class, we attended a panel made up of Seniors (those in the “project-based” phase) and had the opportunity to hear about their experiences and get some advice from students who have been where we are and came out the other side relatively unscathed. Some of the tidbits I found the most important were:

* We’ll have even less time than we do now once we’re in the Senior Phase. Aka, if we have personal projects that we want to do, we should hop on those ASAP. (“Even if you only work on them for 30 minutes a day, that’s still something.”)
* I’m not the only one who feels as if “OMG I didn’t finish this workshop I need to stay late to finish and completely understand it.” That maybe doesn’t mean I’ll stop staying up late to finish and completely understand workshops...but it makes me feel better about having that feeling, at least.
* Don’t try to learn everything — get really, really good at the fundamentals, learn *how* things work and *why* they work, and then you can expand upon that. 

Note to self: you use a lot of bullet points when your brain has been looking at code for the better part of 16 hours (I spent a lot of time after class today reviewing a couple of concepts from last week and trying to catch up a bit, doing the whole “OMG I didn’t finish this workshop last week I need to stay up late to finish and completely understand it” thing). TBD on if a lot of bullet points are a good thing or a bad thing. Also TBD on if it’ll be a continuing trend.
