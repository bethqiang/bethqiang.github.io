---
title: "How to Develop a VR App Prototype, in 26 Steps"
tags: ["fullstack academy", "senior phase", "stackathon", "vr"]
date: "2017-01-23"
excerpt: "Step 1: Come up with an idea. Decide upon attempting to prototype a social VR app that would support many users, as there isn't one that exists today that does so, and ideally (if time permits) implement real-time audio."
---

Step 1: Come up with an idea. [Decide upon attempting to prototype a social VR app](/writing/2017-01-18-codsworth-robotics-stackathon-design-lecture/) that would support many users, as there isn't one that exists today that does so, and ideally (if time permits) implement real-time audio.

Step 2: Notice that [A-Frame](https://aframe.io/) is supposedly easy to get up-and-running. Do some digging into creating multiuser experiences in A-Frame. Discover that someone has created a [Firebase component in A-Frame](https://github.com/ngokevin/kframe/tree/master/components/firebase), making the multiuser part *very* easy.

Step 3: Implement A-Frame and the Firebase component according to the example. Render a scene where when a user hits the page, another "avatar" pops up! With head-tracking!

Step 4: Realize that with the enormous degree of abstraction going on, it's really hard to understand what's happening, and by extension, do anything to customize what's in front of you.

Step 5: Puzzle over what to do for a bit. Decide that websockets might be a better idea, instead of Firebase. You're familiar with them, and you know that you could customize them to your liking.

Step 6: Implement the basics of websockets. Get stuck on how to add A-Frame elements (which it calls "entities") to the view when a user hits the page. Spend a few hours being confused.

Step 7: Replace A-Frame with [three.js](https://threejs.org/), in attempt to get rid of some of the abstractions it's making. Manage to render a view that would pop a cube on the screen when someone hit the page.

Step 8: Become confused at why, when you opened a second incognito page, the first person/element wasn't present anymore. (Fast forward to step 14.5: it's because you never configured your sockets to do so. Whoops.)

Step 9: Attempt to refactor the [webvr-boilerplate](https://github.com/borismus/webvr-boilerplate) so that you could work with it slightly easier. End up breaking a lot of stuff.

Step 10: Complain to a classmate about how terrible VR is. Contemplate starting a different project, although it's 11pm on Friday night and you're presenting on Monday. Create a new GitHub repo for your project. Start customizing the [electron-react-boilerplate](https://github.com/chentsulin/electron-react-boilerplate) to fit the project you have in mind.

Step 11: Wake up the next morning, determined once again to conquer VR. Download Unity for the first time. Watch an introductory video going over how to start developing an app for the Google Daydream with Unity. Use Unity to successfully create an app with a floating box and view it on the Daydream.

Step 12: Follow a tutorial made for Google Cardboard to create a social VR app with Unity. Get stuck halfway through. Puzzle why over the person in the tutorial was able to delete his main camera, and you can't, but also why you're not able to switch the camera to the box that represents your avatar.

Step 13: Decide to take another crack at A-Frame. Realize that A-Frame is just an HTML wrapper around a three.js object. Also realize that because of this, you can just append A-Frame entities to the DOM like you would anything else. Feel a tad bit dumb, because you should have realized this a while ago. But also feel wonderful, because this makes your life infinitely easier.

Step 14: Bang out half of your app's functionality, including the creation of a user, getting all existing users for the new user, and adding the new user to everyone else's DOM. Get stuck on how to update each user's position on everyone else's view.

Step 15: Have a chat with one of the core contributors to A-Frame. He recommends trying to use the built-in `tick` component, which hooks into the browser's native render loop. Attempt to implement this. Sort of succeed, except now a rather important part of your app is failing: a new user who joins isn't able to receive the already-existing users. The already-existing users aren't appearing at all on the new user's DOM. Decide to call it a night and go to bed.

Step 16: Wake up the next morning, and spend some time at the shelter, walking and playing with dogs. Because dogs make everything better.

Step 17: Continue attempting to figure out what's going wrong and how to fix it. Fail. Intermittently chat with previously mentioned core contributor, who's traveling and on planes and can only talk sparingly and can't really look at your code thoroughly. Fail to come to any meaningful conclusions.

Step 18: Reach out to your fellow who's a socket whiz, because you suspect this may have more to do with sockets than with A-Frame. He says give him a few hours.

Step 19: Eat, because it's 2pm and you haven't eaten yet. Research WebRTC.

Step 20: Meet with your fellow. Do A LOT of debugging, gradually getting closer and closer to the issue. Discover the issue was that entities were trying to push updates to new entities, before the new entities were able to load on the new user's DOM.

Step 21: Implement a somewhat roundabout and possibly non-ideal way to fix this, including creating a variable that switches to `true` once the new user has received the existing users, and sending somewhat meaningless socket events back-and-forth between the client and the server. In the process, end up updating the user's position twice for every render loop, which meant that the new user was experiencing some weird spazzy movements.

Step 22: Hear from said fellow that A-Frame's built-in WASD controls may not actually update the position. You may have to either programmatically temporarily disable them (for a very quick period of time) in order for the position to be updated, then enabled again after you update the position, or just create your own WASD controls.

Step 23: Go grocery shopping. Wait forever in line, because everyone does their grocery shopping on Sunday evenings but you still haven't learned to not go at that time.

Step 24: Fix your double-updating-position problem. Tentatively try out just updating the user's positions with the normal built-in WASD controls still enabled. REALIZE IT WORKS AND YOU DON'T HAVE TO ROLL YOUR OWN WASD CONTROLS!!!!!!!! Successfully broadcast the position of each user to every other user with a slightly hacky `setInterval` loop and more somewhat meaningless socket events back and forth.

Step 25: Add rotation tracking. Spend a couple of hours making your scene look pretty with trees and mountains. Create a super basic slideshow to start your presentation with for the next day.

Step 26: Sigh in relief after your presentation. You might not have had time to implement real-time audio, but you accomplished at least your base goal, and that's definitely something to be proud of.

---

The biggest lessons I learned from prototyping this app were:

1. Experimenting is fun. Learning new technologies is fun. But, maybe when you only have five days to pull off a project, you should use something that's above version 0.4.0.

2. VR is hard. Literally no one knows what they're doing. Developing on a platform that was released a month ago makes it enormously harder.

3. Most importantly, before you embark on implementing a new technology, understand the abstractions that it's making. I spent much more time fighting with A-Frame than I did working with it, because I didn't understand any of the abstractions that it uses.

As is the pace of life at Fullstack, we presented our Stackathon projects today, and immediately jumped into our final Capstone project. I was nervous (and still am) about doing another VR project, because this one took a fair bit out of me and I was slightly disillusioned with VR by the end. However, my teammates were excited about building upon what I had done and making this into a fully-fledged *thing* (and despite my exhaustion and frustration, I was still very much excited about it as well) — so that's happening! Wish us luck; we'll definitely need it. I'm looking forward to the adventure we're about to embark on!

---

GitHub Repo for my project here: [link](https://github.com/bethqiang/transcend)

Live demo of my project here: [link](https://transcend.herokuapp.com/)

(The demo will probably be more effective if you have two incognito windows open, or recruit a friend to get on at the same time as you. Or, even better, have one person use a WebVR-enabled device, and one use a desktop!)
