---
layout: post
comments: true
title: "Week 4, Day 3 and Break: More JQuery, WebSockets, and React"
date: 2016-11-27 22:30:00 -0500
description: "Also: lots of food, Fantastic Beasts, and TV"
tags: [fullstack academy, junior phase, jquery, es6, react]
---

We ended class early on Wednesday because of the holiday. Given the couple of hours that we had, my pair and I primarily worked on figuring out how to "persist" (at least until the server is reset) the hotels, restaurants, and activities that the user chooses on the days that they add them to – so, for example, if the user chooses a hotel and three restaurants on Day 2, that hotel and those restaurants will populate the itinerary every time the user switches to Day 2. We ended up doing this using arrays inside of objects inside of an object:

{% highlight javascript %}
var days = {
  day1: {
    hotel: [],
    restaurant: [],
    activity: []
  }
};
{% endhighlight %}

The review and solution code implemented this with arrays of hotels, restaurants, and activities as *properties* on a `Day` constructor, and then built `show/hideButton`, `add/removeAttraction`, etc. functions on the prototype. I basically completely forgot things like classes and prototypes existed while we were working through the workshop, but it makes much more sense than the way we did it. It's a lot cleaner and modular (as opposed to our way, in which we were doing everything somewhat haphazardly and very discordantly).

A couple of other JQuery practices that I saw in the review that I definitely want to keep in mind and implement going forward are:

* Saving parts of the DOM as variables so JQuery doesn't have to go looking for the element every single time you call it, as well as for better readability.
* Let's say you have a `div` with an `id` of `optionsPanel`, saved as a JQuery variable with the same name. Inside that div, you have an element with the id `hotel-choices`. Instead of getting the latter element with `$hotelSelect = $("#hotel-choices")` and forcing JQuery to start searching from the top of the DOM every time, you can utilize the `optionsPanel` div, and get that element with `$hotelSelect = $optionsPanel.find('#hotel-choices')`. It doesn't make a huge difference in terms of performance for a small app like this, but I can see how it could be useful when you're building out things on a larger scale.
* Using HTML5 `data` attributes in certain situations instead of using classes. An extra bonus of doing this is that you can use JQuery's `data` method to easily access the value.
* The revealing module pattern – using IIFEs to do everything that you don't want polluting the global space, and then returning an object containing a very small subset of the module to reveal globally.

This workshop also made me realize that I need to get better at architecting and designing the code itself – how to make code modular instead of one giant file with global variables everywhere, when should you use prototypes, how to create sensible connections between different elements and data, etc.

---

We've subsequently had the last four days off, although I've been working ahead in an effort to not fall behind in the two days I'll be missing this week for [Node.js Interactive North America]({{ site.url }}/2016/11/20/fullstack-academy-week-3/){:target="_blank"}.

I learned about TCP vs. IP protocols, event emitters, websockets, and rooms and namespaces, and then built a "World Wide Whiteboard" – an app that allows a user to "draw" something on a Microsoft Paint-like interface, and the drawing appears in real-time for all of the other users connected to the server. After the basic functionality was built, I added in the ability to join rooms, so that you could go into a specific room and whatever was drawn would only be broadcasted to other users in that room.

I also did a lot of ES6-ing and then started learning React, although I have yet to start the workshop or build anything substantial. I've been really excited about this part of the curriculum, as [I've used React before at a hackathon]({{ site.url }}/2016/10/24/react-git-and-working-with-developers/){:target="_blank"} but (1) the learning process was not any kind of smooth – it was very much learning on-the-fly and only what I absolutely needed to know at the specific moment I was building a feature, and (2) we were under a heavy time-crunch, so there wasn't any kind of depth happening. I'm excited to get actually learn how and why things work, and how powerful it can be when you're not constricted to only 36 hours!

---

I also did fun things like make around 10 pounds of macaroni and cheese (including, but not limited to, 12 cups of dry pasta + 3 pounds of cheese + an entire half gallon of whole milk + a stick and a half of butter), attend my boyfriend's giant Thanksgiving dinner (and ate so much delicious food), saw Fantastic Beasts and Where to Find Them and allowed my inner Harry Potter nerd geek out for a bit, went out with friends, caught up on West World (GREAT show), and watched some old Office episodes. Though I did do a fair amount of work, it was a nice break from the 12-ish-hour-per-day grind that our days typically are.
