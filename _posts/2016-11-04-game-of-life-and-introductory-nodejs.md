---
layout: post
comments: true
title: "Week 1, Day 5: Game of Life and Introductory Node.js"
date: 2016-11-04 18:30:00 -0500
description:
tags: [fullstack academy, junior phase, node.js]
---

We spent the first half of the day working on [Conway’s Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life){:target="_blank"}, which is probably one of the more widely known examples of cellular automaton. In this “game,” the player’s only interaction with the game is at the very beginning, when the board is first set. (It can also be set randomly, requiring no user input at all.) Each round after, cells “live” or “die” according to predetermined rules.

My first introduction to the Game of Life was actually through [Free Code Camp](https://www.freecodecamp.com/){:target="_blank"}, as it’s one of their “Data Visualization” projects to be implemented via React. So, I had seen it before and knew generally what it did, but I had never thought before of how to actually create it.

We were given a hint that a `forEachCell` function would be useful, as we would be iterating through the board (we started with a 12x12 board) multiple times. It was set up to take an iterator function, and my partner and I had some trouble understanding how to implement it, which meant we put it off, which meant that we didn’t use it quite as much as we should have.

We knew the biggest challenge was going to be a function that stores the number of alive neighbors around each cell, then is able to correlate that number with a future state, without changing its present state. Then, once the next state for each cell was determined, and only then, we’d change the state of every cell at once. If we changed the state at the same time we determined it (and not after every cell was determined), we would have a board that didn’t have distinct states and would literally always be in flux.

 We brainstormed two primary ways to solve this: either create a 2-D array, or store states in objects. (When we reviewed this with our instructor, we also learned that we could have stored the next state by adding an attribute on the HTML element.) We also briefly debated attempting promises, but in the end, went with storing them in objects and creating separate functions. This would allow us to attach any number of properties we wanted to our cells, and seemed a little simpler.

Each of our objects had three properties: the cell (the HTML element ID), the count of that cell’s alive neighbors, and an array of the cell’s neighbors. (The array of its neighbors was introduced during the debugging process; it won’t be in the final version.) Each cell had an object, and all 144 objects were pushed into an array.

We ended up using nested `for` loops to find the number of alive neighbors — this would have been a great place to use our `forEachCell` function, but again, we hadn’t written it yet. (Another thing to go back and do in the refactoring/cleaning up process!)

We also had some difficulty getting the number of alive cells for all of the cells surrounding a cell without taking into consideration the cell itself. We attempted to use an if statement, but we were doing `if (i !== xcoordinate && j !== ycoordinate)` — and we figured out that it was only counting the diagonals, which makes sense. However, we couldn’t figure out how to structure our if statement so that it would exclude the current cell, so we created a hack and if the cell was alive at the time, decrement the number of alive cells by one before storing it in the object. (Another thing to go back and actually do properly!)

We ran the `forEach` method (again, a great place for that `forEachCell` function!) on our game array containing all of the objects to then set its class and attribute to alive or dead based on the rules given.

The last step that we attempted to work on was enabling autoplay — that is, at the press of a button, change the state every pre-specified time interval. In order for the `setInterval` method to be called on the game itself and not the button that it was clicked on, we needed to bind (literally by using the `bind` method) the function to our game.

{% highlight javascript %}
var playButton = document.getElementById("play_btn");
    playButton.onclick = function() {
      var autoplay = setInterval(
      gameOfLife.step.bind(gameOfLife)
}, 1000);
{% endhighlight %}

We were able to get it working without much trouble, but then quickly realized we didn’t have a way to stop it once it started. Our attempt at implementing the `clearInterval` method ended up completely breaking our play button, so that’s still a work in progress.

There’s still a lot of work to be done on this project, including, but definitely not limited to:

* Fixing our autoplay function, and being able to stop it.
* Allowing the user to specify a width and height for the board.
* Creating a random pattern on the board to start, in case the user doesn’t want to initially click a bunch of boxes.
* Possibly creating pre-determined patterns?
* Refactoring and cleaning up. Lots and lots and lots of both.

I’m excited to continue working on it independent of the program. I’ve wanted to create a vanilla JavaScript app for a while now, and just haven’t gotten around to it, so this gave me some great practice with that. Eventually, I want to re-implement it using React to submit to Free Code Camp. (Even though I am in a full-time, immersive program, I’d still like to complete Free Code Camp’s curriculum.)

<br/>

### Introduction to Node.js

We also did a brief introduction to Node.js, where we talked about what it was and what it did, came up with a pretty great analogy between JavaScript/Node.js and cooking, and talked about concurrency, asynchronicity, and callback functions. Having done a little bit of self-learning about Node.js and some of its intricacies, not all of it was entirely new to me, but I was able to learn nuggets like this:

{% highlight javascript %}
var start = new Date;
setTimeout(function() {
  var end = new Date;
  console.log("Time elapsed:", end - start, "ms");
}, 500);

while (new Date - start < 1000) {};
{% endhighlight %}

What does this print out?  Various answers included `Time elapsed: 500 ms`, `Time elapsed: 1000 ms`, `Time elapsed: 1500 ms`, among a few others. The answer was 1000ms — what happens in this block of code is that the `start` variable will be set with a date and time. The `setTimeout` function will begin, and wait for 500 ms. While it’s waiting (before it completes), it’ll jump straight down to the `while` loop. The loop is blocking, which means that even though the `setTimeout` function is yelling at Node because it’s done at 500ms, Node won’t interrupt the `while` loop. So, 1000 ms after the start, the loop will complete, and then Node will complete the `setTimeout` and console log `Time elapsed: 1000 ms`.

We ran into an interesting problem while starting our Node.js workshop today that was related to this, but we weren’t able to find an answer yet — I’ll report back on Monday with what we’ve found!

We also heard about what’s planned in our VR Lab and I’m SO excited. Part of our homework for next week consists of learning how to play Minecraft, and we’ll eventually be using ScriptCraft to hack in VR as well as building out VR projects. I have very little experience with VR, but I'm excited to explore the possibilities!
