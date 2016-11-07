---
layout: post
comments: true
title: "React, Git, and Working with Developers"
date: 2016-10-24 10:00:00 -0500
description: "What I learned during my first hackathon"
tags: [hackathons, women who code]
---

<img src="/images/posts/2016-10/women-who-code-austin-diversity-hackathon.jpg" class="center-img" alt="Women Who Code Austin Diversity Hackathon Logo"/>

<br/>

This weekend was a big weekend for me. Here’s a shortlist of what I achieved:

* Made my first real pull request (and my second, and my third)
* Made my first open source contribution(s)
* Sort-of learned React
* Understood what a back-end developer actually does
* Created a semi-functional full-stack application from scratch with a small team
* Coded so much that my brain hurt by the end of the weekend
* Met some really, really cool people
* Ate a lot of tacos

I did all this, and more, at [Women Who Code Austin’s](https://www.womenwhocode.com/austin){:target="_blank"} [Second Annual Austin Diversity Hackathon](https://www.eventbrite.com/e/austin-diversity-hackathon-2nd-annual-atxdivhack-tickets-27230014707#){:target="_blank"}. It was my first-ever hackathon, and I absolutely loved it. Looking back, I find it hard to believe how much I learned in such a short period of time, and a large chunk of that had nothing to do with the technical aspects of programming.

<br/>

### React

Oh goodness, where do I even start with React? Before this weekend, I knew that React was a JavaScript library created by Facebook, and that it’s kind of really popular, and that it had a cute little atom-like thing as its logo. That was literally the extent of my React knowledge on Saturday morning.

My team decided to use React for our app’s front-end. After a relatively brief and somewhat confusing rundown of what components and props and states and JSX were, I dived head-first into creating a login page. It was actually mostly the same as normal HTML and CSS, with just a tidbit of “real” JSX thrown in. It took me a decent amount of time. And effort. And some hand-holding.

Once I had accomplished that (and a basically static HTML/CSS profile page to be used as a template), I built out a sign-up page that had a little bit more of “real” JSX, but zero functionality - the most it did was 1. Validate that all of the fields were filled in with *something*, checked that the passwords matched, and if those were true, 2. Allow it to go to the next page on a button click.

Sunday was the fun day, when I attempted to implement states to get the input in each field and send it to the back-end database that one of our teammates had created. It was also the day that I learned that React had no ability to do any kind of AJAX request. We explored a few alternatives, and ended up attempting to fall back on JQuery in the interest of time. After some finagling of code on everyone’s end to deal with CORS restrictions and required properties that had to be sent to the server, we then ran into the issue where my sign-up form was sending some information to the server, and a teammate’s form was sending other information to the server about the same person, but neither of us could send our information without setting some default values. This resulted in her information would overriding some of my information, as it was always sent after my information was. We briefly tried to fix this by using local storage and states, but ran out of time before we could get it working.

<br/>

### Git & Collaborative Workflows

Before this hackathon, the only things I did in Git were add or update my own projects via commits. I knew generally *what* a pull request was and had made one once, while I was working through the [Git-It tutorial](http://jlord.us/git-it/){:target="_blank"}, but didn’t really understand their practical use. I knew *how* to create different branches, because at one point, in order for your projects to be deployed live on GitHub Pages, it needed to be on the gh-pages branch. (FYI if you haven’t heard, this is no longer the case.) But, I didn’t know why a person would work on a branch that isn’t master or gh-pages.

Working with other people on a project is basically a whole different world. When each person is working on a different part of the project, it’s extremely important that everyone has a good idea of what everyone else is doing, lest you start doing something that interferes with what someone else is doing.

I learned pull requests are useful in allowing other people to view what you’ve done without actually changing the project, and that comments in pull requests may be used pre-code reviews, or if you’re working on an open source project and the maintainer wants to see some change before accepting your code, or a variety of other reasons. But, when you’re sitting within a three-foot radius of everyone who’s working on a project, the comments become just a little less important.

My teammates also made sure to (mostly) adhere to best practices and encouraged me to as well, with things like working on branches that weren’t the master branch, making sure everyone approved of a pull request before merging, and how to avoid merge conflicts as much as possible but what to do if they do arise (and that they’re a pain to deal with!).

Two things that I still need to work on (relatively speaking, I still need to practice literally everything!) are committing early and often, and coming up with better commit and pull request messages. Mine were entirely too vague and uninformative because I would always write huge chunks of code before committing anything.

<br/>

### What People Who Get Paid to Do This Do

One of the most valuable parts of this experience was being able to work with professional developers. First off, I gained a much better understanding of what a back-end developer actually does - I knew vaguely that they were involved with creating APIs and building the server side of things, but I never really knew details: how to define schemas and build databases, how to create APIs, among others. I’ve never done any back-end programming, but it sounds incredibly interesting and I’m definitely going to start learning on my own ASAP!

My teammates were able to explain and show me from start to finish (mostly - like I said, we ran out of time to do everything we wanted to do), what happens in creating an app. We started off with brainstorming, creating user stories, building mockups, and defining the scope of the project. (And considering we had only the weekend to build an MVP, we constantly had to attempt to narrow down or simplify the features we wanted to build.) We then moved into building actual features, starting with the simplest versions of everything and layering more functionality on top of them as we went along.

Communication between the back-end and front-end was a prominent topic that was woven throughout. When you’re only building front-end apps like I had done before, you cater your app to the data, structure, etc. available in your APIs. But, when you have people who are building both for the same app, both ends need to be able to work together (hopefully, seamlessly) to access and store data.

Lastly, it was very interesting and enlightening to be able to talk to a wide variety of developers about what their workplaces were like, what challenges they faced, what technologies they worked with, and in general what their day-to-day was like. It was also incredible just to see the passion that they have for coding and for creating things that can make the world a better place.

<br/>

### Some Thank Yous

I definitely owe thank yous to the following:
* Women Who Code Austin, for organizing all of this.
* All of the volunteers and sponsors who made this weekend and delicious tacos possible.
* My teammates, who were incredibly patient with me, helped and supported me in any way they could, and gave me sanity checks and trips to Starbucks when needed.

If you’re interested in seeing what we built, here are links to the [front-end](https://github.com/MarkLyck/Roominate){:target="_blank"} and [back-end](https://github.com/mbetz08/roominate){:target="_blank"} of our app. We created a roommate-finding/-matching app, intended to be a better, safer, more informative, and less creepy/roll-of-the-dice version of Craiglist postings for roommates.

I feel very similar now as I did when I finished my first half-marathon: I’m exhausted, parts of my body (this time, my brain) hurt, but I’m beyond excited for the next one!
