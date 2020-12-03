---
title: "Week 6, Day 1: Do One Thing Every Day That Scares You"
tags: ["fullstack academy", "junior phase", "react", "women who code", "talks"]
date: "2016-12-05"
excerpt: "Today, we talked about forms in React. And practiced more React-y stuff. The more important part of the day was that I stood up in front of people, talked, and was slightly less terrified than I am when I see a spider! But we'll get to that in a second."
---

Today, we talked about forms in React. And practiced more React-y stuff. The more important part of the day was that I stood up in front of people, talked, and was slightly less terrified than I am when I see a spider! But we'll get to that in a second. First, the React stuff:

* Application state vs. UI/local state. Sometimes, we know ahead of time that some kinds of state are going to be localized to a particular area of our app – state like form data, timers, small animations, etc. Some people prefer to make a distinction between the application state, state that's central to our app that needs to be available to different components, and UI/local state, for things like forms. Creating a local state is literally the same process as creating an application state: initialize the property in the constructor, set it, and pass it through the props.

* Synthetic events. Whenever you pass a callback function to an event listener like `onClick`, React will implicitly pass an `event` object to it as its first argument. `SyntheticEvent` is React's wrapper class for the native browser event. React pools all events into the same `SyntheticEvent` object, which means that it's a single object allocation that React mutates at runtime. So, we can't use the event object itself asynchronously – including doing things like `setState` – so once you have the object, you should grab any values you want off of it before doing anything asynchronous.

```
this.setState({ input: event })
// the above is bad
// do the below instead
this.setState({ inputValue: event.target.value }
```

* Controlled vs. uncontrolled components. A controlled component is a form field whose value is managed by state. To do this, all we have to do is pass the `inputValue` from our state in as the `value` prop on the input element itself. In our input tag, we passed in `value={props.inputValue}`, so that the `value` in the input field is the same as the `inputValue` on the state. So, to clear the value in the input field (say, after the user clicks the Submit button), you just need to clear it from state!

* Disabling/enabling buttons and hiding/showing divs with error messages conditionally. Once we realized that `disable` was a native HTML button attribute, that made our lives a lot easier. (In our state, we added a `disabled` property, passed it to our component, and in the button tag of the component, we added `disabled={props.disabled}`.) Similarly, to display an error message with the error ('Cannot be empty' or 'Too long'), and nothing if no error, we set a `message` property on the state with the error, passed it to the same component, and then rendered:

```
{props.message ?
  <div className="alert alert-warning">{props.message}</div> : ''}
```

* `componentWillReceiveProps`. When we rendered a playlist component, and then tried to switch from playlist to playlist from the sidebar, the component wouldn't update – even when our URL did. My pair and I spent a while trying to puzzle this out (without knowing that `componentWillReceiveProps` even existed), with the vague feeling that we had encountered this before but we were having trouble applying what we had done in the past to our current situation. (Also to be fair, it was the end of a long day and our brains weren't anywhere near full functioning capacity.) After a small hint, we attempted to implement it, knowing that we need to only fetch and reset the playlist when the `id` changes – otherwise, we'd end up in an infinite loop! (Which actually did happen the first time we tried.)

```
componentWillReceiveProps (nextProps) {
  const nextPlaylistId = nextProps.routeParams.playlistId;
  const currentPlaylistId = this.props.routeParams.playlistId;
  const selectPlaylist = this.props.selectPlaylist;
  if (nextPlaylistId !== currentPlaylistId)
    selectPlaylist(nextPlaylistId);
    // selectPlaylist is a function in our stateful component that set the state to whichever playlist we clicked on
}
```

We also got in some quality practice with building views and mapping over arrays of data and routing that we learned last week.

---

> "Do one thing every day that scares you."
*– Eleanor Roosevelt*

One of the more significant parts of today was that I presented a lightning talk at tonight's Women Who Code meetup! Public speaking is something that's terrified me throughout my entire life, although I've gotten a little more comfortable with it over the years. (That doesn't mean it still doesn't terrify me!)

I had a little technical difficulty at the beginning. And by that, I mean, I didn't realize my Mac didn't have the port that the little doo-hickey that gets attached to HDMI cables sometimes needs...but it does have an HDMI port! I also mean that I didn't quite fully test out how slides.com worked before actually presenting (this was not a shining example of how to prepare for a presentation) and ended up going without my notes. Given that, I think it went pretty well – I may have talked a little too fast and I have no idea how many times I said "um" (I decided to not worry about it after the notes debacle), but it's something!

I'm actually really excited for next month's lightning talks. (And that's a pretty big statement, coming from someone who never in a million years would think she'd be excited about anything related to people listening to her talk.) I'll ideally have my tech talk for Fullstack prepped by then, so that might be a good avenue to practice that! I haven't quite decided the topic yet, but I know I'll definitely be signing up to speak again.

I also met a number of cool women tonight, and we had some real-talk about our experiences in the workplace, and I'm really looking forward to seeing them again! One of the women's New Year's resolution is to give a lightning talk every month, which I think is incredibly admirable, and something I may consider adopting. Whether I do or not, it was a fantastic experience, and I'm comfortable enough with the community and with being a newbie to much of the general world that, as much as public speaking still somewhat terrifies me, I'm okay with putting myself out there. I'm okay with admitting the fact that I didn't know what ports my Mac had, and not having everything go perfectly, and maybe talking a little bit too fast – so long as I'm always growing and learning along the way.
