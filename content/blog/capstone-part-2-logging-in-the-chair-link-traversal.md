+++
title = "Capstone, Part 2: Logging In, The Chair, and Link Traversal"
tags = ["fullstack academy", "senior phase", "vr", "capstone project"]
date = "2017-02-13"
+++

So, it's been a while. In the past couple of weeks, our project has gone from a scaffolded foundation to a thing with different rooms and avatar skins and couches, and it's been really cool to see!

## Logging In

One of the first things we did following [my last post]({{< ref "blog/react-redux-race-conditions-webrtc.md" >}}) was implement Login and OAuth. At one point, we were encountering a Sequelize race condition, where we couldn't refer to the `user` model with its filepath; instead, we had to import it into our file using `const User = require('../db').model('users')`. I also spent a good few hours being puzzled over the fact that, despite forming a one-to-one association, a `user_id` field was only being put on the `session` table, and a `session_id` wasn't being put on the `user` table. Silly me, `Session.belongsTo(User)` and `User.hasOne(Session)` will both put a `user_id` field on the `session` table. Definitely something I should have known, but at least I figured it out in the end?

I also had my first encounter with React inline styling while creating the Login component! I haven't come to a firm conclusion on how I feel about it yet, but some part of me seems to prefer it. It seems...like less mental overhead somehow. I *didn't* like the fact that I wasn't able to use things like `:focus`, `:hover`, `:before`, and `:after`, which my initial styling had depended on. For the first two, I ended up installing Radium, which effectively replicated them. I also learned about syntax decorators, and sprinkled that into our Babel configuration. For the last two, I resorted to just creating two `div`s.

## THE CHAIR!!!!

As I mentioned in my previous post, A-Frame and React don't really like each other very much. They're fundamentally built on different programming paradigms, and there's a lot of smaller issues that crop up (e.g. the words `height` and `width` are apparently React-specific words and we can't use them as HTML attributes, or the fact that `a-sphere`s will render fine, `a-cylinder`s will render but throw wanrings, and `a-box`es won't render at all). Because of this, the moment we React-ified what we've now dubbed "the chair" was a pretty epic moment for us. It was the first time that it felt like A-Frame and React played nicely with each other!

A-Frame HTML, like normal HTML, will ignore things it doesn't understand. Apparently, A-Frame HTML has no concept of a `div`. Therefore, in order to render different elements, we had to wrap them in `a-entity` tags. Creating a singular chair was mostly a matter of some basic shapes and positioning.

```
export default (props) => (
  <a-entity id="chair" position={`${props.x} ${props.y} ${props.z}`} rotation="0 180 0">
    <a-entity mixin="chair-part"
              geometry="height: 1; depth: 0.05; width: 0.05"
              position="-0.25 0.5 0"></a-entity>
    <a-entity mixin="chair-part"
              geometry="height: 1; depth: 0.05; width: 0.05"
              position="0.25 0.5 0"></a-entity>
    <a-entity mixin="chair-part"
              geometry="height: 0.5; depth: 0.05; width: 0.05"
              position="-0.25 0.25 0.5"></a-entity>
    <a-entity mixin="chair-part"
              geometry="height: 0.5; depth: 0.05; width: 0.05"
              position="0.25 0.25 0.5"></a-entity>
    <a-entity mixin="chair-part"
              geometry="height: 0.05; depth: 0.05; width: 0.55"
              position="0 1 0"></a-entity>
    <a-entity material="color: black"
              geometry="primitive: box; depth: 0.55; height: 0.05; width: 0.55"
              position="0 0.5 0.25"></a-entity>
  </a-entity>
);
```
(If an entity is a child of another entity, the parent element takes on what is analogous to absolute positioning, and its child elements take on what is analogous to relative positioning with relation to its parent element.)

Once we had our singular React-ified chair, we passed in an array of positions. Each position was passed down to each chair via props. And voila, we had chairs on chairs on chairs!

<img src="/img/posts/2017-02/the-chair-reactifying-aframe-entities.png" alt="The chair, a demonstration in React-ifying A-Frame Entities"/>

## Link Traversal

Early on, it was always an idea that we'd have different rooms "branching off" of our main room, where people could go to have private conversations. Our initial idea was to have one scene with interconnecting rooms literally branching off of it; almost like a real building would. However, as time went on, we realized that it might be easier for us to program the switching of rooms if we just had one room per scene, and switched out the scenes when a user entered or left a room.

So, the next natural step would be to figure out how to get a user from one scene to another. We started off with the idea of hyperlinks, where each hyperlink would render a different component that contained a full `a-scene` and everything in it. But, once we implemented them, we realized that Chromium would knock us out of VR mode to traverse links, so that was a no-go. Mozilla has apparently worked out a fix for this, but because VR mode doesn't work on the Daydream with Firefox Nightly, we had to find a different workaround.

Instead, we ended up with a single `a-scene` tag in our main React component, and switching components wrapped in `a-entity` tags in and out of it accordingly. It's not the most ideal solution, but as of this point in time, there doesn't seem to be a better way to accomplish this given the current state of the technology and Chrome's security measures that prevent us from using a lot of WebVR APIs.

Our links take the form of fancy magical floating orbs that glow a certain shade of blue when you hover over them.

<img src="/img/posts/2017-02/aframe-hyperlink-orbs.png" alt="A-Frame Hyperlink Orbs"/>

---

Coming soon, to a blog near you: how a frog caused us a lot of mental anguish, how we solved (sort of) the teleportation/everything-else-is-eating-our-browser-resources problem, and how these two topics are very related.
