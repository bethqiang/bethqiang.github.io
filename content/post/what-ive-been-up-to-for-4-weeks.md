+++
title = "What I've Been Up To For The Past 4 Weeks"
tags = ["fullstack academy", "senior phase", "talks", "grace shopper", "stackathon"]
date = "2017-01-12"
+++

I'm alive, I promise. Mostly. I'm just running on very little sleep. Also, can we talk about the fact that this is the first post I get to tag with "senior phase"?!

So, let's talk about everything I've been doing since the last time I wrote about something that wasn't me accidentally deleting my master branch of my blog. Over winter break, I:

* Re-did, in its entirety, [Game of Life](https://github.com/bethqiang/game-of-life) using React and Redux. ([Here's]({{< ref "post/game-of-life-with-react-and-redux.md" >}}) the post I wrote about the first half of it.)
* Created [a baby WebVR + three.js app](https://github.com/bethqiang/vr-winter-wonderland). It's a snow scene with falling snow, like five trees, and a stationary penguin that I attempted to animate but would do weird things when I did. Weird penguin aside, it's pretty rad. Also a cool and slightly surreal experience to view it in VR!
* Watched Guardians of the Galaxy for the first time and it was absolutely amazing.
* Re-did our [Junior Phase workshop on authentication & OAuth](https://github.com/bethqiang/authentication-data-flow). I felt like I definitely didn't understand a lot of it the first time around, and going back a second time at least made me feel slightly better about it.
* Implemented most of [a todo app](https://github.com/bethqiang/todo-react-redux-immutable) using React, Redux, and Immutable.js. I used this to also practice some frontend testing. It was thrilling.
* Started and finished most of my tech talk on Immutable Data & Immutable.js.

And in the past four days, a lot has happened.

## Grace Shopper

Probably the biggest thing that's happened is that we started our Grace Shopper project, an (eventually) fully-functioning e-Commerce store. Our store, [Codsworth Robotics](https://github.com/Codsworth-Robotics/codsworth-robotics), sells bots to help you with your gardening and cooking and butlering and general life-ing needs.

I've personally worked on:

* Setting up ESLint and configuring it
* Creating a few of the database models
* Writing tests for said models
* Adding signup and login features and functions that filter based on authorization
* And most recently writing the routes and views for users to view their orders

I also just spent the last three hours trying and failing to fix a rather small but important thing (rendering the orders view automatically instead of on a click of a button, as it is right now), so this project is currently not on my list of favorite things ever.

In general, it's definitely been challenging trying to figure out what goes where and how all of the pieces fit together. It's our first time creating a fully-fledged app with only a set of requirements and literally *nothing* else. I 110% believe we're definitely all capable of doing all of it and doing it well, but we're still in some ways getting our bearings straight.

It's also been an interesting experience working as part of a team on a longer-term and larger-scale project (instead of just having a pairing partner for a workshop and then getting a different partner the next day). We have three people in our group, and we've paired all together on some things, and we've worked completely independently of each other on others, and sometimes one person branches off on their own while the other two pair.

Regardless of who works on what, everyone reviews all pull requests before we agree to merge, and it's definitely not uncommon, if/when we're working individually, for someone to pipe up and say, "Hey, I'm having trouble with this, can I share my screen and get y'all's input?" Needless to say, I've also learned more of and become much more comfortable with Git over the past few days! I'm still very afraid of merge conflicts and Git yelling at me, but I'm sure I'll get used to it eventually.

## Tech Talk: Immutable Data & Immutable.js

I finished my tech talk. I really wanted to incorporate live coding instead of the code snippets at the end, but I was pushing the time limit before I put in the code at all. Next time!

I also presented it today. The good: I didn't say "um" *quite* as much as I typically do when speaking in public. The bad: when I was re-watching myself, I noticed at least two mistakes in my slides, and I think I relied on my notes a little too heavily. But hey, only way to get good at something is to keep doing it!

If you're interested in seeing it, [it's already up on Fullstack's YouTube channel](https://www.youtube.com/watch?v=IDf-tpuj8Kw)! The slides can be viewed [here](https://speakerdeck.com/bethqiang/immutable-data-and-immutable-dot-js).

## Stackathon

Another project that all Fullstack seniors do is the Stackathon project. We're given four days to do literally anything we want, and we're encouraged to work alone. (Although if you *really* want to work with another person, no one's going to stop you.)

My instructor and I have thrown around some ideas for what I could do. Right now, I'm leaning towards either creating a library that I can publish to npm, or an Electron app. (My idea right now for the latter basically amounts to a WYSIWYG editor to write in with an option to convert it to Markdown for static site generators.) I'm torn between these because I think writing my own legitimate library would be fun, but I wouldn't get to do any front-end design, which really frustrates me sometimes but it's also something I really enjoy. I keep hearing from people I trust that Electron isn't terribly hard to learn, so I'll probably take a look at it this weekend and see if it would be do-able to do what I want to do in the span of the four days we'll be given.

I'm simultaneously really looking forward to working on this, but also somewhat scared as well. It'll be something I choose and something that excites me, but if given the chance and an excuse, I work *way* too much – and that's not in the humble brag "I work too hard" kinda way. That's an I'll-stay-up-unhealthily-late-(until 5 am late, hello Tuesday night)-working-on-things-because-I-can-and-because-it's-more-fun-than-sleep-and-because-things-not-being-perfect-bother-me kinda way.
