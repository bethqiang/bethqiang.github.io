---
layout: post
comments: true
title: "Week 2, Days 3 and 4: SQL, Election Chat, and Revisiting Our Twitter Clone"
date: 2016-11-10 20:00:00 -0500
description: 
tags: [fullstack academy, junior phase, node.js, express.js, projects, twitter clone]
---

I don’t understand how it’s almost the end of the week already. Time is literally flying. We've spent the entirety of the past two days focused on databases, which has been a nice blast to the past – as a relatively recent data analtyics consultant, it's been nice working with SQL again, albeit in a slightly different manner. We started Wednesday with manipulating the IMDB database with SQLite. We did a lot of selecting, counting, joining, grouping, and sorting. We spent a fair amount of time on indexing, as well, and learned:

* what indexing was: a data structure that stores the values for a specific column in a table
* why we should care about it: it makes searching much faster if you have a lot of data, as the database software no longer has to look at literally every single row in the table
* how it works: it uses data structures like B-trees or hash tables
* and why and when we wouldn’t want to use them willy nilly: they take up space, and are slightly less ideal for applications that require more frequent insert/delete/update operations because the indexes also have to be inserted/deleted/updated every time the tables are

Right before lunch, President Obama was set to speak about the election results, and we took a break from anything code-related to listen to him, then had an hour-long conversation about what had happened the night before as a cohort and as a community.

Though I’m pretty sure I never actually said anything, and no one was pressured by any means to stay in the chat (and some people did leave), I really appreciated the open communication, the vulnerability that was shown, and Fullstack’s continued dedication to making sure that Fullstack was a safe environment for everyone to express their views and feel what they feel without fear of being judged, harassed, or a variety of other terrible things that happen in the real world. As a group of extremely different people from a variety of walks of life, our cohort didn’t necessarily agree on some points, but it was enlightening to hear everyone’s opinions and experiences.

In the afternoon, we learned about schema design. Most of my past work with databases was just querying from them, and I learned a little bit from our back-end teammate during [my first hackathon]({{ site.url }}/2016/10/24/react-git-and-working-with-developers/){:target="_blank"}, but I’ve never had hands-on experience with design. After the lecture, we then were put into groups to attempt to figure out how we would go about designing database schemas for some of the most popular apps: Gmail, Facebook, Instagram, Twitter, etc. I thought it was incredibly interesting, and mildly confusing, and it made me realize how large and how complicated these databases must be.

---

I started today with about a half an hour of Code Wars, and I forgot how much I like doing these coding challenges. (I also signed up for [HackerRank’s Women’s CodeSprint](https://www.hackerrank.com/womens-codesprint-2){:target="_blank"} that’s coming up, which I imagine will be something similar, and I’m very excited.) (I also forgot the difference between `forEach` and `map` for probably the fourteenth time...it’ll sink in eventually, right?!)

We spent most of the rest of the day with PostgreSQL. I didn’t realize we were going to be working on our [Twitter clone]({{ site.url }}/2016/11/09/twitter-clone-with-nodejs-and-expressjs/){:target="_blank"} again, but was pleasantly surprised when I discovered we were going to be creating and integrating a PostgreSQL database with it – I was a pretty big fan of the project the first time around.

First, we created a new database module, where we used the [node-postgres](https://github.com/brianc/node-postgres){:target="_blank"} library to create and connect to our database. Then, we reconfigured our routes so that instead of pulling from our `tweetBank.js` module and accompanying simple-array database, we were querying our database for the information that we wanted.

One of the biggest sources of confusion came when we were testing our Socket.io real-time updates via two incognito Chrome browsers – when we posted a tweet via one of the browsers, the browser that *didn’t* post the tweet would be updated in real-time, but the browser that posted the tweet wouldn’t show the tweet until we manually refreshed the page.

This was our original code:

{% highlight javascript %}
router.post('/tweets', function(req, res, next){
  let userName;
  let name = req.body.name;
  let content = req.body.content;
  client.query('SELECT id FROM users WHERE name = $1', [name], function(err, result) {
    if (err) return next(err);
    
    if (result.rows.length === 0) {
      client.query('INSERT INTO users (name) VALUES ($1)', [name], function(err, result) {
        if (err) return next(err);
        client.query('SELECT id FROM users WHERE name = $1', [name], function(err, result) {
          if (err) return next(err);
          userName = result.rows[0].id;
          client.query('INSERT INTO tweets (userid, content) VALUES ($1, $2)', [userName, content], function(err, result) {
            if (err) return next(err);
            client.query('SELECT id FROM tweets WHERE userid = $1 AND content = $2', [userName, content], function(err, result) {
              if (err) return next(err);
            });
          });
        });
      });
    
    } else {
      userName = result.rows[0].id;
      client.query('INSERT INTO tweets (userid, content) VALUES ($1, $2)', [userName, content], function(err, result) {
        if (err) return next(err);
        client.query('SELECT id FROM tweets WHERE userid = $1 AND content = $2', [userName, content], function(err, result) {
          if (err) return next(err);
        });
      });
    }
  });

  let newTweet = {
      name: name,
      content: content,
      id: result.rows[0].id
    };

    io.sockets.emit('new_tweet', newTweet);
    res.redirect('/');
    
});
{% endhighlight %}

Can we just take a moment to appreciate how much of a hot mess that code is? We’ll be learning how to make this not such a mess tomorrow, or so we’ve been *promised*. (Geddit?! Promises? ...well, I thought it was clever.)

Anyway, what was happening was that Node was being typical Node and its asynchronous nature was starting the first `query`, then jumping straight down to our `newTweet` object and the `res.redirect` that would automatically reload the page. So, the page would actually redirect and reload before the tweet was in the database. We didn’t realize this initially, as the `newTweet` object wasn’t pulling from the database at all, and most of it (the `name` and `content`) could be populated without the database. (We didn’t realize our `id` link, which required information from the database, wasn’t working until after fixing this issue.) We put the creation of the newTweet object, the Socket.io `emit` event, and the `redirect` inside the innermost callback functions, did some refactoring, and everything in our fake Twitter world was peaceful again, albeit a bit messy.

I also had an office hour/1-on-1 check-in with one of our fellows, Dani, during lunch. I was able to get her advice on how to start on a project that had been an idea floating around in my brain for a while now that I just haven’t really had the time to put into place, but I’m going to try to start carving out at least 30 minutes each day for it. I also realized today, while thinking about different ways to go about it, that I feel **a lot** more confident in my coding ability than I did a week and a half ago. Which is a little crazy to say, because it’s literally only been a week and a half, but we’ve also learned and done so much in that time.
