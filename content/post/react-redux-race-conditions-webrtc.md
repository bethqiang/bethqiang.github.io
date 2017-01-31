+++
title = "A Story of React, Redux, Race Conditions, and Real-Time Communication"
tags = ["fullstack academy", "senior phase", "vr", "capstone project"]
date = "2017-01-30"
+++

Most of our work on our Capstone project this past week has been trying to set up the base for what we'll be building the super cool features off of. So far, I ported [my prototype]({{< ref "post/how-to-develop-a-vr-app-prototype.md" >}}) over, put React in, took React out, put React in again, put Redux and Immutable.js in, fixed race conditions (race conditions and I have grown a little too familiar with each other for my liking), and learned an important lesson about `querySelector`. I've also attempted to aid in implementing WebRTC, which has turned out to be surprisingly frustrating.

## React and A-Frame

We put React in initially because we thought it'd be a nice-to-have. Then we realized that, for our base MVP at least, we definitely wouldn't be using it to any meaningful degree. A-Frame and React also don't necessarily always play nice with each other; A-Frame is an entity-component-system framework, which favors composability over inheritance. React, on the other hand, is based on inheritance. One of the reasons React is so performant is that it batches its updates; however, when we're going for 60 or 90fps+ real-time rendering, that's maybe not quite what we want.

Despite this, using React with A-Frame does have a few benefits. First, as long as we're able to let A-Frame do the 3D and VR bits, React does a great job at what it was meant for: a view layer and managing state. Furthermore, I've heard that wrapping React over three.js (our other possible option) results in a lot of performance issues, but A-Frame provides the much-needed bridge between the 3D/VR world and React, lessening that performance hit by a not insignificant amount.

We ultimately decided that if we do want to have various views in the future (which ideally we will, at least on the desktop version), it'd be better to have React in from the start, rather than needing to go back later to finagle it back in and make it play nice with everything already there. We've been told in our initial code review that, despite having React in our app, (1) it's very un-React like and we could probably do more React-ifying, which I definitely want to look into soon and (2) it almost resembles an Angular app, because it's very event-based right now.

## Redux and Immutable.js

I threw Redux into both ends as well, and converted our state to use Immutable.js. Using Redux on the back-end was an entirely new experience and it took an afternoon to go baby-step-by-baby-step to un-boggle my brain, but once I realized that it was *the exact same* as Redux on the front-end — you dispatch an action, and your reducer changes the state based on that action — everything pretty much clicked afterwards.

As I was adding in Immutable.js, I learned an interesting tidbit: socket.io doesn't really understand Immutable collections and ends up converting them to plain JavaScript structures when sending them across the Internet. We were exceptionally confused for a short period of time when our back-end was supposedly sending an Immutable Map and our front-end could access properties on it like it was a normal object.

## Another Race Condition

### Or, when I learn that getElementById > querySelector === true

We also had another race condition emerge that is strangely absent in my prototype. When a new user joined and there were existing users in the "room," the back-end would sometimes start pushing this new user's updates to the front-ends of everyone else before the new user had been able to be added to everyone else's DOM. The `newUser` function and the `updateUsers` function were originally separate:

```
socket.on('newUser', user => {
  console.log('Someone else has joined');
  putUserOnDOM(user);
});

socket.on('usersUpdated', users => {
  console.log('Updating position for all users');
  Object.keys(users).forEach(user => {
    const otherAvatar = document.querySelector(`#${users[user].id}`);
    otherAvatar.setAttribute('position', `${users[user].x} ${users[user].y} ${users[user].z}`);
    otherAvatar.setAttribute('rotation', `${users[user].xrot} ${users[user].yrot} ${users[user].zrot}`);
  });
});
```

To get rid of the race condition that this caused, I ended up implementing a conditional statement — if the element didn't exist on the DOM, add it. If it did, then update as normal.

```
socket.on('usersUpdated', users => {
  Object.keys(users).forEach(user => {
    const otherAvatar = document.querySelector(`#${users[user].id}`);
    if (!otherAvatar) {
      putUserOnDOM(users[user]);
    } else {
      otherAvatar.setAttribute('position', `${users[user].x} ${users[user].y} ${users[user].z}`);
      otherAvatar.setAttribute('rotation', `${users[user].xrot} ${users[user].yrot} ${users[user].zrot}`);
    }
  });
});
```

Even after implementing this, we were having issues with the `querySelector` — there seemed to be times that the `querySelector` errored out, which prevented the `if` statement from ever being executed, which means the user was never put on the DOM. As you can imagine, that's a small problem. So, instead, I decided to use `getElementById` (which I hadn't tried in the first place because the majority of A-Frame examples I had seen used `querySelector`). Since it was a guarantee that `getElementById` would return `null` if the element didn't exist, we could ensure that the `if` statement would execute when it needed to.

I later discovered that in order to use `querySelector` on IDs that are numbers, you sometimes [need to handle them in special ways](http://stackoverflow.com/questions/20306204/using-queryselector-with-ids-that-are-numbers). So, the reason it only sometimes freaked out on us was because our IDs were simply socket IDs, only some of them started with numbers. The more you know!

## Real-Time Audio Communication

Though I hadn't done a lot of WebRTC outside of my initial research when putting together my prototype, I started helping one of my teammates implement WebRTC. He had gotten *really* close over the past few days, but still not quite there — two browsers were connected, but audio still wasn't streaming from one to the other. We ended up attempting to use the [SimpleWebRTC library](https://simplewebrtc.com/), which we knew *was physically possible* to integrate with our socket structure, but something about it was just not happy with our sockets. So, we moved on to reimplementing from scratch. TBD on how that turns out, but fingers crossed!
