+++
title = "The Rest of Week 6: Redux, Authentication, and Social Activities"
tags = ["fullstack academy", "junior phase", "react", "redux", "authentication"]
date = "2016-12-11"
+++

So, I’ve kind of fallen off the face of this blog for the past week. Apologies for that – it’s been an incredibly busy week. Tomorrow is our Senior Checkpoint; it’s kind of like our final exam to make sure that we’re sufficiently prepared to move on to Senior Phase. I’ve spent the pretty much all of my free time (of which we have little to begin with) this past week gearing up for that and attempting to review everything we’ve learned in the past six weeks, which isn’t really an easy feat by any means, given the amount of material we’ve covered!

Since my last blog post, we’ve covered Redux, Redux with React, and authentication. It took me a little more time and effort to wrap my head around Redux and how everything is working than it has for the other topics we’ve covered, but after completely re-doing the entirety of the 5-day workshop we did in class, I think I have a decent grasp of it now. (If you’re interested, you can see the result of my solo work in [this GitHub repo](https://github.com/bethqiang/juke).)

With Redux and the help of one of my fellows, I’ve formed a little workflow and mental checklist for myself for handling Redux:

1. Create constants for action types. (It’s been suggested to us, instead of using strings for action types, to use variables that have values of strings instead – our linter can pick up on spelling mistakes if they happen, which has been super useful when my tired brain forgets how to spell “receive.”)

2. Create synchronous action creators. Synchronous action creators are functions that return objects, called actions, that are formatted to be sent into the Redux state. These typically have a type, which will be the action type that we created in the previous step, and sometimes a payload.

3. Create asynchronous action creators, or dispatchers, or “thunks” using `thunkMiddleware` from `redux-thunk`. Instead of dispatching an action object, this allows us to dispatch a new function! Basically, it says, “Oh, it looks like this person is trying to do something asynchronous. Instead of giving it to the reducer, let me invoke it and pass the store’s dispatch method on it, so whenever the side effect completes or the action resolves, they can use it to dispatch a new action with the data they get.”

4. Create reducers. We pass an `action` to the store's `dispatch` method, and the store executes its `reducer` function. Typically, the reducer consists of a `switch` statement that describes a different update depending on the action's type. It's super important that the reducer is a pure function, which means that there's no side effects like AJAX calls. (That's what #3 is for!)

5. Create the actual components and containers needed. Set local state, pass down props, and create functions as needed. If we’re using `react-redux`, we can use `mapStateToProps` and `mapStateToDispatch` and `connect` to do this in a less boilerplate-y fashion. If we need a local state (for forms and stuff) as well as access to the global store, we can create a container and put a container inside of that that will then render the presentational component. Also in `react-redux`, if we need to access a component’s own props, we can use `ownProps` in either or both of those functions as the second argument. `connect` also does a couple of other super useful things for us, which I won’t repeat here in the interest of typing and space and not being repetitive, but needless to say that I’m a big fan.

6. Fix up your routes if you need to.

I still haven’t yet implemented Redux or `react-redux` straight out of the box. I've so far just built out a normal React app and then refactored to use Redux/`react-redux`. One of my to-dos over break will be to try to get the hang of doing it from scratch without an existing React component.

We also talked about and used the `Provider` component and initial/route-specific loading, where we can use React Router’s `<Route>` element prop `onEnter`. This allows us to set the next router state and do things like load data from an AJAX call upon entering a route.

We spent about a day on authentication, but to be honest, most of my group's attempt at implementing authentication was stymied because we were still trying to wrap our heads around Redux. Learning more about and understanding authentication to at least some degree has been put on the to-do list for winter break!

## Other Things

### Review Month, Game Night (and the Reign of DJ Rumba), and Hot Seat

Speaking of which, we also talked about Review “Month” (for most cohorts, there’s only a week, but we have all of winter break as well!) and what we should be doing during that time – not only should we go through some of the material that we may be shaky on, but it’ll be a good time to explore the programming world and start some projects and start our tech talks, as well. I’ve been putting together a list of things I want to do over break and prioritizing them (because I honestly don’t think three weeks is enough to do everything I want to do!). I’ll post that soon...once I have it figured out for myself. (Creating the list of things I want to do isn’t terribly difficult. It’s prioritizing them that will be...)

Sometime in the middle of the week (days blur together after a while), we also did a short little Game Night. We played [Agamari](http://agamari.herokuapp.com/), which is a game developed by a group from the recently graduated cohort at Fullstack. Everyone's a ball and you roll around a spherical world eating other balls, which makes you bigger. You can also eat other players, which, depending on their size, can make you *a lot* bigger. One of our fellows became absolutely massive and was basically taking over our world.

<img src="/images/posts/2016-12/agamari.png" class="center-img" alt="Agamari Game"/>

She was so big that she couldn't really see where she was rolling, and kept eating us by accident, even when she was trying to avoid eating people! I had a lot of fun and the game itself is quite impressive, both graphically and the amount of thought and work that was put into it. (They even took physics laws into account!)

We also finished up with our Hot Seat in our cohort and learned about one of our fellow’s previous lives, which included going door-to-door selling $3500 vacuums. I think we’re going to be doing Hot Seat Round 2 in Senior Phase, as a way to just find out more about each other, because how else do you find out that one of your fellows once was a vacuum salesman?
