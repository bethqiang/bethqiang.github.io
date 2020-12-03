---
title: "Week 5, Day 1: I Never Thought JQuery Could Be So Confusing"
tags: ["fullstack academy", "junior phase", "jquery"]
date: "2016-11-28"
excerpt: "We spent the day continuing to work with JQuery and AJAX on our Trip Planner app (previous posts: here and here, this time with the goal of making it persistent – that is, making the user's trip data more permanent by saving it to and retrieving it from a database."
---

We spent the day continuing to work with JQuery and AJAX on our Trip Planner app (previous posts: [here](/blog/2016-11-22-scriptcraft-hackathon-jquery-and-es6/) and [here](/blog/2016-11-22-more-jquery-websockets-and-react/), this time with the goal of making it persistent – that is, making the user's trip data more permanent by saving it to and retrieving it from a database, rather than an object that clears itself every time the page is refreshed or the server is reset.

First, we reconfigured a `get` route so that it would serve up all of our attraction information.

```
router.get('/options', (req, res, next) => {
  Promise.all([
    Hotel.findAll(),
    Restaurant.findAll(),
    Activity.findAll()
  ])
  .spread((hotels, restaurants, activities) => {
    res.send({hotels, restaurants, activities})
  })
  .catch(next);
});
```

Then, in our front-end, we made an AJAX request to get the data from our new `/options` URL to make our list of available options in the dropdown menu. My pair and I did this step in a separate file and therefore ended up exposing more functions and variable to the global scope, although our class solution did it directly in one of the existing files. Though it required a little more configuration later in the workshop, there's definitely something to be said for not polluting the global scope.

We then created a `Day` model, which held only the day number but we connected it to the rest of our data using Sequelize associations.

```
var Day = db.define('day', {
  number: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});
// associations
Day.belongsTo(Hotel);
Day.belongsToMany(Restaurant, {through: 'day_restaurants'});
Day.belongsToMany(Activity, {through: 'day_activities'});
```

You can only stay at one hotel per day, but the same hotel on multiple days, so that was a one-to-many relationship. For both restaurants and activities, you could eat/do multiple things in the same day, and you could eat/do the same thing over multiple days, so those were many-to-many relationships.

We then mounted a `/api/days` route to our app, which would route things like creating a new day, deleting a day, adding attractions, and removing attractions.

We got to use our [new-found eager loading skills](/blog/2016-11-14-building-a-wikipedia-clone/) to get all of the activities for all of the days:

```
router.get('/', (req, res, next) => {
  Day.findAll({
    include: [Hotel, Restaurant, Activity],
    order: 'number ASC'
  })
  .then(days => res.send(days))
  .catch(next);
});
```

One of the things that we had to ensure that we did was manage the many-to-many relationship when adding and removing restaurants and activities. We added our hotel by doing:

```
router.put('/:dayId/hotel', (req, res, next) => {
  Day.findById(req.params.dayId)
  .then(day => day.setHotel(req.body.hotelId))
  .then(() => res.status(204))
  .catch(next);
});
```

But in order to add a restaurant, because you could have many restaurants, we had to do the following instead:

```
router.put('/:dayId/restaurants/', (req, res, next) => {
  Day.findById(req.params.dayId)
  .then(day => day.addRestaurant(req.body.restaurantId))
  // if we setRestaurants, we'd be replacing whatever restaurants are currently there and not adding to
  .then(() => res.status(204))
  .catch(next);
});
```

There was a pretty consistent theme among a lot of these routes – we'd find our day, then do something with the day. To clean up our code a little bit via DRY, we used `router.param` to configure this `findById`:

```
router.param('dayId', (req, res, next, theDayId) => {
  Day.findById(theDayId)
  .then(foundDay => {
    req.day = foundDay;
    next();
  })
  .catch(next);
});
```

And then we could delete a lot of the beginning of our routes, and instead do:

```
router.put('/:dayId/hotel', (req, res, next) => {
  req.day.setHotel(req.body.hotelId)
  .then(() => res.status(204))
  .catch(next);
});
```

Another thing I didn't realize we could dictate while we were actually working on it was whether we wanted to pass the information from our front-end through actually posting an object using the AJAX `data` field, and therefore using `req.body` on the back-end, or through the URL, and therefore using `req.params` on the back-end. We did all of ours the latter way (simply because we just didn't think of the former), although I'm not sure if one is necessarily better than the other.

---

Re-configuring our front-end I found more challenging for two reasons:

1. We at first weren't entirely sure what we could move to the back-end and what we needed to move to the front-end. (We learned the hard way that you can't `module.exports` and `require` front-end files into the back-end, because the back-end files don't have access to the module's dependencies, including JQuery! [And by the hard way, I mean lots of commenting out things and maybe some hair-pulling.])

2. There's not really any separation of functions with JQuery – we found ourselves with functions that did a million and one things at a time, and it wasn't the easiest to keep them straight in our heads, but it was also pretty much unavoidable.

Most of our re-configuration was just removing references to the global variables that used to hold our hotels, restaurants, and activities and instead used AJAX requests to populate those fields. When we clicked a button to add a day or an attraction or remove a day or an attraction, we needed to write AJAX requests for each of those as well, so our changes not only showed up in the front-end but also would change the data in our database.

One of the last things we had to do was create a `beforeDestroy` hook so that when a day was deleted, all of the following days' numbers would be decremented by one.

```
hooks: {
  beforeDestroy: function(dayBeingDestroyed) {
    return Day.findAll({
    // the return ensures it will wait for everything to happen before deleting
      where: {
        number: {
          $gt: dayBeingDestroyed.number
        }
      }
    })
    .then(daysAfter => {
      var updatingDayNumbers = daysAfter.map(day => {
        day.number --;
        return day.save();
      });
      return Promise.all(updatingDayNumbers);
    })
  }
}
```

And because our `Day.destroy` method that we were using with a `where` to find our exact day won't trigger the `beforeDestroy` hook, we had to reconfigure that so that we were destroying a single instance of Day instead.

```
router.delete('/:id', (req, res, next) => {
  Day.findById(req.params.id)
  .then(day => day.destroy())
  .then(() => res.status(204))
  .catch(next);
});
```

This was definitely one of the more frustrating workshops to figure out, and one of our instructors even said that he'd argue it was the most frustrating out of all of them. While JQuery can be extremely powerful, it definitely has its drawbacks when creating a large application, which I hadn't experienced before this. One of them is that it doesn't really tell us where to put anything – should AJAX requests be in a separate part of our app from our DOM manipulation? We can't match up a template to some kind of dataset, and thereby avoid having to manually make DOM manipulations. We also can't just loop over objects and re-render – we have to add them piece by piece.

It's been interesting over the past few days to watch our code spiral out of control, but I'm now very ready to enter a realm where at least some structure exists. Bring on React!
