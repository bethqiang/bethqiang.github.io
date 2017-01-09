+++
title = "Week 3, Days 4 and 5: CSS Fundamentals"
tags = ["fullstack academy", "junior phase", "css"]
date = "2016-11-16"
description = "Aka, when I stop just doing CSS willy-nilly and actually learn how it works"
+++

A couple of good changes have been made over the past couple of days. First, I've been making it a priority to get outside every day – even if it's just for 15 minutes, it's been great to just step away from a screen for a bit. Second, I've rearranged my desk setup so that my second monitor (which is actually just a 42-inch TV, but anyway) is at eye-level behind my laptop (which is below eye-level, often meaning I would be hunched over), and it's been a game-changer. Thirdly, and probably most importantly because it has to actually do with coding and this whole bootcamp thing, is that we've completely switched gears.

We've now spent the better part of the past two days focusing on CSS, which is simultaneously fantastic and terrible. Fantastic, because CSS is something I consistently struggle with and never really learned how to do properly (there are so many other things to learn!). But, if learned properly, I've always known it can do wonders for both my apps as well as my sanity. Terrible, for the exact same reason. (I now have a myriad of CSS articles and tutorials to read once I get a semblance of free time.)

We started off with a lecture about CSS & SASS & SCSS, and then did a workshop where we basically built some of the Bootstrap library. Most of what we talked about and did, I had used or tried to use before, without really understanding them or what they were doing, and therefore never had much success.

<img src="/images/posts/2016-11/css-family-guy.gif" class="center-img" alt="Family Guy CSS Comparison"/>

Exactly like that. You can't write a post about CSS and not include this gif, right?

Some of my key takeaways were:

* What block vs. inline vs. inline-block elements actually are, and how they behave. Block-level elements will by default try to clear their own line, can have margins, and you can have a height and a width. Inline-level elements don't clear their line, will *ignore* top and bottom margins, and they don't care about your height or width – they'll by default fit whatever content is in it. (I never knew either of these, and it's been the cause of a fair amount of my CSS frustrations.) Inline-block elements are kind of a mashup of the two: they don't clear the line but they'll respect your margins and dimensions.
* Floats. I knew they ended up collapsing the parent element, but I never really knew why, until Geoff explained and showed it to us with 3D diagrams – the floated element almost "floats" above in 3D space the element beneath it, which causes the parent element to collapse and the element below to take up the space that it was once in. Then, clearfix to the rescue! (Which I also had thrown around willy-nilly before in attempt to make it work, but now I actually know ***how*** to use it.)
* What happens when you have conflicting styles. I knew the cascading part, but I never knew the exact rules of selector specificity and it helped to see examples of different rules side-by-side and have to figure out which one took precedence.
* You can do things like for loops and math with SASS!!!!!!!!! (I like for loops and math.) Also, media queries and mixins can make your life (and the look of whatever you're building) significantly better.
* I actually ended up going through the Bootstrap source code after class, and it was pretty cool to see and understand the code underneath a tool I had used so much. Bootstrap implements their grid system with elements that have a combination of properties: floated to the left, width as percentages of the full width, and with media queries.
We also had learning group yesterday, during which we ended up talking extensively about space and Mars. Not at all related to anything, but enlightening nonetheless, especially given one our our fellows' extensive experience with NASA and space research!

---

After doing a fair amount of review in the morning over our workshop from yesterday, as well as Express and Sequelize for our upcoming checkpoint (basically a test) on Monday, we started on what will eventually be a "Trip Planner" app. Today, we mob-programmed the entire back-end and database together, and then I worked with a partner on designing the static UI. I was really excited to use some of the CSS/SASS/SCSS that we learned yesterday, and doing the styling was much less of a painful effort than it typically is for me.

We also got an interesting lesson in the separation of server and client-side execution. We had used NPM to import Bootstrap and JQuery into our app, and had all kinds of complications about JavaScript not being able to find them. In the end, and with a little help from our instructor, we ended up:

Serving our static files in our `server.js` file with `express.static`, as follows:

```
app.use(express.static(__dirname + '/public'));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'))
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'))
```

Adding link and script tags to our CSS, Bootstrap, JQuery, and Google Javascript API map:

```
<link rel="stylesheet" href="/bootstrap/css/bootstrap.min.css">
<link rel="stylesheet" href="/stylesheets/style.css">

<body></body>

<script src="/jquery/jquery.min.js"></script>
<script src="/bootstrap/js/bootstrap.min.js"></script>
<script src="https://maps.googleapis.com/maps/api/js?key=MY_API_KEY&sensor=true"></script>
```

We had originally tried to to `require` our `map.js` file in our `server.js` file, like you would a Node module, before our instructor pointed out that we'd want the client to execute it, not our server. Basically, anything you want the server to execute should go into your back-end. Anything you want the client to execute should go into your front-end. That made a lot of sense. (And seems obvious now that we know that, but such is the journey of learning how to code.) So, into our HTML it went:

```
<script src="/map.js"></script>
```

And voila! Maps and Bootstrap and JQuery.

Tomorrow's CS Saturday is all about immutability and functional programming and building(!!!) our own version of Git. Way excited. Mostly for the functional programming, but the other two are pretty cool too, I guess.

P.S. – word count: 927. Doing better at this whole "not writing thousands-of-words-long-chapter-books thing."
