+++
title = "Capstone, Part 3: Teleportation and Wrapping Up"
tags = ["fullstack academy", "senior phase", "vr", "capstone project"]
date = "2017-02-20"
+++

Teleportation was something I ended up working on for basically a week straight, during which I produced multiple iterations of how to accomplish it with the Daydream controller. The plan was to shoot a raycaster into the ground, find where it intersected with the ground, and then move the user's avatar to that intersection point. Sounds simple enough, right?

The [aframe-daydream-controller-component](https://github.com/ryanbetts/aframe-daydream-controller-component) comes with a built-in A-Frame raycaster, so setting up a simple scene with the controller and configuring it so that you'd move where your controller was pointing wasn't terribly difficult. ([Here's](https://github.com/bethqiang/aframe-daydream-controller) a lil baby thing I created to test it in an isolated environment, if you're curious.)

At first, I was getting wildly different coordinates when clicking the same place over and over, and was confused about why that was. I reached out on the [A-Frame Slack](https://aframevr-slack.herokuapp.com/) (which, sidenote, is a great place if you're interested in or working with A-Frame), and learned that raycasters, at least the way they're set up in A-Frame right now, typically will only give accurate coordinates when you're detecting an intersection with something with depth — so instead of planes as our grounds, we had to use boxes with significant depth and then re-position them so that their top face was at `y=0`. Just one of those A-Frame oddities that still haven't quite been ironed out, it seems.

Once I got that working successfully on a little baby app, I then attempted to implement that into our full app, and ran into a pretty big wall. With all of the assets we were loading and the other demands we were making of the browser, the browser refused to also correctly load the controller and its corresponding raycaster. Raycasters are generally pretty computationally heavy, and it seems we hit the limits of what a mobile browser could do.

So, I needed a way to bring down the expense of using a raycaster, but a raycaster was also my best bet in terms of relatively easily and accurately getting an intersection point. Thus, after talking to our fellow and another team who was also using A-Frame for their Capstone Project, we decided to create a "temporary" raycaster — when the controller's `button down` event fired, we'd create our raycaster, shoot it out with the direction vector that our controller had, and find the intersection with the ground. Then, it'd cease to exist until the next time the `button down` event was fired.

In attempt to reduce the load even further, as well as skip over some of the bugs with A-Frame's built-in raycaster, I ended up using three.js and its raycaster to do this, and placing the logic in an A-Frame component.

To find the direction vector, I found the top and bottom vertices of the physical `ray` (really, just a cyan-colored cylinder that was attached to and came out of the controller model), and found the vector between those two points. After most of a day of debugging smaller issues with the other team, we finally got this to work! (And, I had a nice little refresher with the vector math I had learned once upon a time in linear algebra.)

In our debugging session, I learned two primary lessons:

1. A-Frame and three.js can render elements with either buffer geometries or "regular" geometries. Buffer geometries are more performant and reduce memory usage, but are harder to manipulate because you don't have access to properties like their vertices. A-Frame, by default, converts all geometries to buffer geometries, but this was a no-go because that meant we couldn't do what we needed to do.

2. three.js's raycaster's `intersectObjects` method takes two arguments, an array of objects you want to detect an intersection with, and an optional recursive flag that's set to false by default if not specified. According to the documentation, `If true, it also checks all descendants. Otherwise it only checks intersection with the object. Default is false.` Because we were explicitly telling it to check for the ground, and not any of its descendants, we left this as false. After many rounds of not getting intersections when we were clearly intersecting with the ground, we changed this to `true` on the offhand that that was the issue — and what do you know, it was! We're still not certain why we need this recursive flag, so more investigation on this matter will definitely be happening.

## "The Gap"

One of my teammates added a really cool feature — the Gap! It's another room that you can access with a number of Minecraft skins, including, among many others, Admiral Grace Hopper, Princess Belle, Robocop, the Pink Power Ranger, Mario, and Woody. Clicking on a Minecraft skin changes your avatar, with a fun little "Changed skin to [skin name]" voiceover. It's super nifty!

## Presentation & Demo Day!

We then spent our last week prepping for our final presentation of this project on Demo Day. This was broadcast to a ton of people via Facebook Live, including some of my friends who were watching from around the country!

Here's our presentation, featuring all of the goodies I've talked about over the [past]({{< ref "post/react-redux-race-conditions-webrtc.md" >}}) [three]({{< ref "post/capstone-part-2-logging-in-the-chair-link-traversal.md" >}}) posts.

{{< youtube I5ND_1PI77c >}}

And [here's](https://youtu.be/_M0p3UwNhB8) a link to the entire hour of presentations, in case you want to see what my classmates have been up to!

After that, a few more workshops, and a graduation, my Fullstack experience was over. It's still weird to think about, and not logging into our Zoom classroom this morning was a slightly disorienting and also mildly sad experience, but I'm excited to continue on this journey and see what the next adventure has in store!
