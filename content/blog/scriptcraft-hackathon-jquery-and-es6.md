+++
title = "Week 4, Days 1 and 2: ScriptCraft Hackathon, JQuery, and an ES6 Intro"
tags = ["fullstack academy", "junior phase", "minecraft", "hackathons", "jquery", "es6"]
date = "2016-11-22"
+++

Yesterday morning, we had a checkpoint over Express and Sequelize – a three-hour long evaluation of sorts to see where we were at in our understanding of the concepts and their usage. I spent the almost the past week reviewing and studying and ensuring I understood the ins-and-outs of things like setting up models with validations and getters and setters and class methods and instance methods and hooks, creating associations between models, handling routes, communicating with the database to create/update/read/destroy, and eager creation and loading. I found that the checkpoint was pretty fair, and making sure that I understood everything very well definitely paid off!

I want to use what we've learned to work on at least one or two of [Free Code Camp](https://www.freecodecamp.com)'s Back-End or full-stack projects over this coming Thanksgiving break. I'm not sure how much time I'll have given the fact that I'll have to do some working ahead to attend [Node.js Interactive]({{< ref "blog/fullstack-academy-week-3.md" >}}) the week after, but I think it'd be nice (and super helpful!) to use our existing skills and knowledge and apply them in a new context.

## ScriptCraft Hackathon

In the afternoon, we had our first Fullstack Hackathon. We worked among our learning groups to create something in Minecraft using [ScriptCraft](http://scriptcraftjs.org), a Minecraft plugin that lets you extend the game and build using JavaScript. Our team ended up building what we originally called "The Hunger Games" – we could specify the size of a maze to be built, and how many animals (we tested with chickens, to not have to worry about randomizing animals and such) would be placed in the maze. The maze would then programmatically be built in real-time, the chickens were placed, and then players would enter the maze and try to kill as many chickens as they could. The game would keep track of how many chickens each player killed.

(We later re-named it to "Chicken Rain" after a comment from a classmate, because we released all of the chickens at once from the sky, thereby making it rain chickens for a small period of time.)

Though it sounds relatively simple and we don't have a huge amount of code (minus comments and failed attempts and whitespaces, it's only about 40 lines), it took a lot of effort and researching to figure out how to do each baby step. The hardest part for us was attempting to place chickens where there aren't already blocks from the maze so that the chickens would actually be in the maze, and not on top of it. We weren't able to solve this issue in the time that was given to us – apparently, ScriptCraft has really weird object structures, so you can't just pull out a property like you could in JavaScript.

Our instructors recorded a video of us presenting it, although I forgot to ask about it today during class...so here's a pretty picture of an example maze with the chickens instead.

<img src="/img/posts/2016-11/scriptcraft-hackathon-game.png" alt="ScriptCraft Hackathon Game"/>

(You can also see a random pig that's just kind of moseying around our world.)

Despite the learning curve, it was a lot of fun, and it was a great way to destress from the checkpoint. It was also really cool to apply our JavaScript knowledge to a *completely* different context.

## Discovering the Hidden Side of JQuery

Today was spent entirely on JQuery. I thought this would be a "oh, let's catch up with a good friend" kinda day – JQuery and I have spent a lot of time together throughout the my earning of Free Code Camp's Front-End Certification, but it turns out, there's *a lot* I don't know about JQuery.

We've been creating a Trip Planner app, which currently looks something like this:

<img src="/img/posts/2016-11/trip-planner-app-jquery.png" alt="Trip Planner App"/>

The user has the ability to select hotels, restaurants, and activities from the drop down menus, and add them to their itinerary. When added, a marker on the map will also be added. The user should be able to remove a hotel, restaurant, or activity from their itinerary (and by extension, the marker), as well as add a day, remove a day, and switch between days.

When we started the "add" functionality, we weren't really thinking about how to make our code reusable, so we ended up writing basically the same 13 lines of code for all three sections. (We're totally violating DRY in probably every way possible.)

```
$('#hotels').on('click', 'button', function() {
  var selectedOption = $("#hotel-choices option:selected").text();
  var hotelIndex;
  hotels.forEach(function(hotel, index) {
    if (hotel.name === selectedOption) {
      hotelIndex = index;
    }
  })
  var hotelLocation = hotels[hotelIndex].place.location;
  var newHtml = '<div id=' + hotelIndex +
    ' class="itinerary-item"><span class="title">' +
    selectedOption +
    '</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></div>'
  $("#hotel-itinerary").append(newHtml);
  var markerTest = drawMarker('hotel', hotelLocation);
  $("#hotel-itinerary #" + hotelIndex).data(selectedOption, markerTest);
});
```

The `drawMarker` function on the second-to-last line was originally part of our `maps.js` inside of another function, but because we needed to access it here, we ended up making it a global function. Our instructor brought up the idea of using a "fake" `module.exports`/`require` for the front-end as an alternative, so that's definitely something I want to look into once we're able to get the functionality down.

The thing that we hands-down struggled with the most was trying to connect the marker to the item that was added, so that when we deleted the item, the marker would be deleted along with it. The solution we ended up coming up with is also a little bit of a mess, but we were *so happy* when we finally got it working.

In the second-to-last line of the code above, we saved the marker in the (unfortunately also global) variable `markerTest`. Then, we used JQuery's `data` method on the `#hotel-itinerary` div with the corresponding database `id` of the item to store the name of the hotel/restaurant/activity, and the marker that was just added. Then, to remove both:

```
$('#itinerary').on('click', 'button', function() {
  var name = $(this).siblings()[0].textContent;
  var index = $(this).parent().attr('id');
  var parent = $(this).parent().parent().attr('id');
  var marker = $("#" + parent + " #" + index).data(name);
  marker.setMap(null);
  $(this).parent().remove();
});
```

Essentially, we jumped through several hoops to find the corresponding `div` and `id` of the text next to the "X" button that was clicked, and then used that to look up the marker that was stored with the name. `marker.setMap(null)` removes that specific marker, and then we finally remove the actual div containing the text and the button.

We were able to figure out how to add a day with slightly less headaches, and our challenge for tomorrow will be to figure out how to switch between days.

## Intro to ES6

I've also been doing some ES6 on the side, in attempt to start working ahead for the days I'll be missing for the Node conference. I was already pretty familiar with `let`/`const`, arrow functions, classes, and template literals, and have been using them whenever I remember that they exist. Other concepts, like destructuring and rest parameters, I've heard about and have demonstrated to me, but I haven't made or come across opportunities to practice yet. I watched the entirety of [Egghead.io's Learn ES6 course](https://egghead.io/courses/learn-es6-ecmascript-2015) and have also now been made aware of features like importing and exporting, `Array.from`, generators, maps and weak maps, `for-of` loops, and method definitions in object literals.

I definitely need to do more reading and practicing with all of these, and there's a workshop that's entirely devoted to ES6 that I'll be doing over break, so I'll report back when I do! :)
