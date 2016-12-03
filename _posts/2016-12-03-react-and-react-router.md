---
layout: post
comments: true
title: "Week 5, Days 3.5-5: React and React Router"
date: 2016-12-03 09:00:00 -0500
description:
tags: [fullstack academy, junior phase, react]
---

We've now entered the wonderful but occasionally odd and confusing world of React. It's a super cool piece of technology and I'm very quickly falling head-over-heels for it, but it's also...weird. It'll take a little bit of time to get used to. To learn and practice React, we've been building a Spotify clone, which Fullstack has affectionately dubbed "Juke." We started by building probably one of the simplest apps ever (and a prerequsite to learning anything new in the programming world):

{% highlight javascript %}
function App() {
  return <h1>Hello React</h1>;
}

ReactDOM.render(<App />, document.getElementById('app'));
{% endhighlight %}

Yeah, we've struggled for the two and a half to create that. Ain't she a beaut?

...

Tooootally kidding.

---

### React

#### Stateful and Stateless Components

Components can either be stateful or stateless. A stateful component looks like this:

{% highlight javascript %}
class Stateful extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'Yay!'
    }
  }
  render() {
    return (
      <h1>Woo, I'm stateful!</h1>
      <p>{this.props.text}</p>
    );
  }
}
{% endhighlight %}

And a stateless component looks like this:

{% highlight javascript %}
function Stateless(props) {
  return (
    <h1>Hey ma, look, no state!</h1>
    <p>{this.props.text}</p>
  );
}

// or, ES6-ified:

const Stateless = (props) => {
  return (
    <h1>Hey ma, look, no state!</h1>
    <p>{this.props.text}</p>
  );
}
{% endhighlight %}

Separating our stateful components from our stateless components, and therefore separating our state management from our view logic, can free up our stateless components to be moved around and resused, and they'll work regardless of what component is managing their state.

#### State

State should include the minimum amount of data necessary to render our UI. Unlike `props`, it can be mutated. State can be passed down from parent to child via `props`.

`this.setState({key: value})` sets the state. The only way to cause the render method to execute again is by using `setState`.

Tom's First Law is that state must always be initialized with the appropriate data type. So, if the `albums` property will eventually be an array, it should be initialized with `[]` (or an actual array, if you know what the value will be) – not null, not undefined, not anything else you can think of. (In case you were wondering, I don't know who Tom is, although I've been meaning to ask.)

#### Component Lifecycle

All of `get` requests and `setState`s should be inside of a `componentDidMount` lifecycle method. What's the difference between using `componentDidMount` and `componentWillMount`, you ask? `componentWillMount` occurs before the component is actually rendered (as opposed to after, in `componentDidMount`), but if the response happens to take a long time and the user does something else that takes the component out of the DOM, when the response comes back, the callback will try to invoke `setState` on the unmounted component...and that doesn't sound like it ends very well.

#### Mapping Over an Array with a Key

When we're creating a loop in JSX, it can be hard for React to keep track of the DOM structure. To help React boost its lookup time for these elements, we can give the parent of each set of JSX we return from the loop a value called a `key` that is unique within the loop.

For Juke, we needed to render a component called `Albums`, which was essentially the same album information displayed for 5 different albums:

{% highlight javascript %}
render() {
  return (
    <div className="col-xs-10">
      <h3>Albums</h3>
      <div className="row">
        {this.props.albums.map(album => (
          <div key={album.id} className="col-xs-4">
            <a className="thumbnail" href="#">
              <img src={album.imageUrl} />
              <div className="caption">
                <h5>
                  <span>{album.name}</span>
                </h5>
                <small>{album.songs.length}</small>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
{% endhighlight %}

We used `album.id` as our `key`, placed it in the `div` that we were creating for each album, and then extracted the information for each album.

#### Passing Down Props and Click Handlers

At some point, we eventually got to this view:

<img src="/images/posts/2016-12/react-juke-single-album-view.png" class="center-img" alt="React Juke Single Album View"/>

Where we could click on any album, and then we'd be given details of the album below it. To do this, we had to:

* Create a method on our stateful `Main` component, that would receive the album we selected as a parameter:

{% highlight javascript %}
handleClick(album) {
  console.log(album.id);
}
{% endhighlight %}

* Bind the method to our constructor to preserve the `this` context of the `Main` class:

{% highlight javascript %}
// in constructor of Main
this.handleClick = this.handleClick.bind(this);
{% endhighlight %}

* Pass the method down as a prop to our `Albums` component:

{% highlight html %}
<Albums albums={this.state.albums} handleClick={this.handleClick} />
{% endhighlight %}

* Pass the prop to our click handler, and also make sure we pass along the album we want as the argument. (We won't always need an anonymous function in the click listener, but in this case, it's necessary because we wanted to send back the album).

{% highlight html %}
<a className="thumbnail" href="#" onClick={() => this.props.handleClick(album)}>
{% endhighlight %}

* Edit our `handleClick` function so that it does more than `console.log` and forces a re-render:

{% highlight javascript %}
handleClick(album) {
  this.setState({
    selectedAlbum: album,
  });
}
{% endhighlight %}

* Add the `Album` component as a child to the `Main` component, and pass our album in as `props`.

{% highlight html %}
<Album selectedAlbum={this.state.selectedAlbum} />
{% endhighlight %}

Then, we could change our JSX in our `Album` component to reflect the properties we were passing down.

All of this became MUCH easier when we used React Router, which we'll get to in a bit.

#### Actually Changing the View

But we didn't want both of these components on the page at the same time; we wanted to be able to click on an album on the homepage, and to be taken to a page with that album's information.

We could tell from our state whether or not we have a chosen album – our selected album will either be an empty object if no album is selected or an object representing an album, so we checked the truthiness of `album.id` to determine whether one was selected. Then, we needed to conditionally switch between whether we rendered the `Albums` component or the `Album` component, so we used a ternary control operator:

{% highlight javascript %}
{
  this.state.selectedAlbum.id ?
  <Album album={this.state.selectedAlbum}/> :
  <Albums albums={this.state.albums}/>
}
{% endhighlight %}

This also gets a little easier with React Router.

---

### React Router

Not going to lie, we struggled a fair bit at first to figure out what was going on with React Router.

#### Router Basics

React Router is a handy way to okeep your UI in sync with your URL. It ties into URL and history to allow for easy navigation to and between different parts of your application, and it easily integrates the nesting of components.

A route is composed of a URL and a React component. When the URL bar matches the one specified in the route, React Router causes the specific component's render function to execute.

So, if we had a route that looked like this:

{% highlight javascript %}
<Route path="/specificstuff" component={SpecificStuff}>
{% endhighlight %}

And someone entered `www.domain.com/specificstuff` into the URL, the component `SpecificStuff` would be rendered.

#### Children and cloneElement

`this.props.children` is a special prop that every component receives, which references the child components of that component. If we wanted to pass props from our parent component to its children component, we can use one of React's static methods – `cloneElement`.

For example, if we had a Router hierarchy that looked like this:

{% highlight javascript %}
ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Main}>
      <Route path="/albums" component={Albums} />
      <Route path=":albumId" component={Album} />
    </Router>
  </Router>,
  document.getElementById('app')
);
{% endhighlight %}

And a `Main` component render that looked like this:

{% highlight javascript %}
render() {
  return (
    <Sidebar />
    {
      this.props.children ?
        React.cloneElement(this.props.children, {
          albums: this.state.albums,
          album: this.state.selectedAlbum
        })
      : null
    }
  )
}
{% endhighlight %}

`this.props.children` would refer to the components `Album` and `Albums`, and we're passing `this.props.albums` and `this.props.album` to both of them.

We need to check that `this.props.children` exists first, or else `React.cloneElement` will throw a fun little error. We also need to "clone" the element to keep our render method pure – we don't want to mutate anything. It's the same idea as using `Array.prototype.map`.

Notice that this is basically doing the same thing as the code with the ternary operator from above – conditionally rendering `Album` or `Albums` depending on what information we want to see, except that we don't actually have to use a ternary operator! Whichever URL it matches on will be the component that is rendered.

#### Params

For a dynamic route like this:

{% highlight html %}
<Route path="albums/:albumId" component={Album} />
{% endhighlight %}

In addition to whatever props we pass down to it, it'll also have a whole lot of other props attached to it like location, router, routeParams, etc. These are all being passed by the Route component. We can use the `params` prop to get the appropriate album ID.

#### Link

The Link component is a thin wrapper around the `<a>` element that we can pass a prop called `to` that will tell it how to change the URL.

Remember the sort-of complicated `handleClick` and `onClick` steps we had to do above to pass the album that was clicked to our `Main` component so that we could render our single album view? Well, turns out, instead of doing all of that, we can do:

{% highlight html %}
<Link to={`/albums/${album.id}`} className="thumbnail">
  <img src={album.imageUrl} />
  <div className="caption">
    <h5>
      <span>{album.name}</span>
    </h5>
    <small>{album.songs.length}songs</small>
  </div>
</Link>
{% endhighlight %}

No `handleClick` method, no binding, and no passing methods down as props or having to pass props to our click handler!

#### A Fun Little Aside

It's an interesting, but maybe frustrating, result when you attempt to nest a component inside of the same component. For a very long time, we were attempting to do something similar to this:

{% highlight javascript %}
ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/artist" component={Artist}>
      <Route path="artist/:artistId/albums" component={Artist} />
    </Router>
  </Router>,
  document.getElementById('app')
);
{% endhighlight %}

(Let's just say you wanted to try some album inception.)

What we ended up with was errors that properties on our `props` were undefined, and we struggled along for an hour, changing distant parts of our code attempting to figure out what was going on and why.

At the end of a slightly painful journey, we discovered that the DOM was actually rendering twice; once properly the first time with the properties on `this.props` that had the information we wanted, but the second time, no information was being passed to the properties on `this.props` and we got a happy slew of errors.

Needless to say, that's not a mistake we'll be making again!
