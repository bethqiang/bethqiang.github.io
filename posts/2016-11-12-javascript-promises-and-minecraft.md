---
title: "Week 2, Day 5: JavaScript Promises and Minecraft"
tags: ["fullstack academy", "junior phase", "promises", "minecraft"]
date: "2016-11-12"
excerpt: "After the callback hell we experienced yesterday, we learned about promises today. A promise, according to my instructor and the Promises/A+ Spec and basically any other legitimate source, represents the eventual result of an asynchronous operation."
---

After the [callback hell we experienced yesterday](/blog/2016-11-10-sql-election-chat-and-revisiting-twitter-clone/), we learned about promises today. A promise, according to my instructor and [the Promises/A+ Spec](https://promisesaplus.com/) and basically any other legitimate source, represents the **eventual result of an asynchronous operation**.

Let’s bring back our (slightly refactored, with the `insertIntoTable` function omitted, so it’s not 40+ lines long) gorgeous code from yesterday, and illustrate everything that’s wrong with it:

```
router.post('/tweets', function(req, res, next){
  let userName, name = req.body.name, content = req.body.content;
    client.query('SELECT id FROM users WHERE name = $1', [name], function(err, result) {
      if (err) return next(err);
      if (result.rows.length === 0) {
        client.query('INSERT INTO users (name) VALUES ($1)', [name], function(err, result) {
          if (err) return next(err);
          client.query('SELECT id FROM users WHERE name = $1', [name], function(err, result) {
            if (err) return next(err);
            insertIntoTable(result.rows[0].id, content);
          });
        });
      } else {
        insertIntoTable(result.rows[0].id, content);
      }
    });
  });
}
```

* I don’t know what you’re talking about, it’s perfect.

Just kidding. For real this time:

* It’s not very portable – you’d be hard-pressed to reuse parts of this code anywhere else.
* You can’t perform concurrent callback functions if you wanted to.
* Our code isn’t any kind of linear, and it can be hard to read and figure out what, when, and where things are happening and variables are passed through.
* We’re constantly repeating the error handler, although we need to if we want any error that happens to be registered – we can’t just omit it.

## Basics of Promises

We were given a `promisifiedReadFile` function, which returned a new `Promise` with a `fs.readFile` function inside of it. We did various exercises in the context of reading and subsequently logging stanzas of a poem, where each stanza was its own text file. So, to read and log stanzas one and two, in any order:

```
promisifiedReadFile('poem-one/stanza-01.txt')
.then(function(stanza1) {
  console.log(stanza1);
});

promisifiedReadFile('poem-one/stanza-02.txt')
.then(function(stanza2) {
  console.log(stanza2);
});
```

These two read processes would occur in parallel. However, one of the powerful thing about promises is that we can chain them in a specified order, so one thing always happens after another has completed.

```
promisifiedReadFile('poem-one/stanza-01.txt')
.then(function(stanza1) {
  console.log(stanza1);
  return promisifiedReadFile('poem-one/stanza-02.txt');
})
.then(function(stanza2) {
    console.log(stanza2);
});
```

**We need to return the promise at the end of the first `then`** – otherwise, the second `then` wouldn’t know to wait for the file to be read before logging stanza 2, and then our order wouldn’t be guaranteed.

## Multiple Handlers

We can also handle two promises concurrently using multiple handlers. Let’s say we don’t care in which order stanzas 2 and 3 are read and printed, we just want them to be read and printed *after* stanza 1 is read.

```
const stanza1 = promisifiedReadFile('poem-one/stanza-01.txt')

stanza1
.then(function() {
return promisifiedReadFile('poem-one/stanza-02.txt');
})
.then(function(stanza2) {
  console.log(stanza2);
})

stanza1
.then(function() {
return promisifiedReadFile('poem-one/stanza-03.txt');
})
.then(function(stanza3) {
  console.log(stanza3);
})
```

## Error Handling

Another one of the advantages of using promises is error handling. Let’s see what our promise chain would look like if we included an error handler. We can do this one of three ways:

* Create a new `then` statement with the first argument as null and the second being the error function
* Attach our error handler to our last `then` statement
* Use `catch`

```
promisifiedReadFile('poem-one/stanza-01.txt')
.then(function(stanza1) {
  console.log(stanza1);
  return promisifiedReadFile('poem-one/stanza-02.txt');
})
.then(function(stanza2) {
  console.log(stanza2);
})
.then(null, function(err) { // the first argument is always the success function, the second is the failure function
  console.log(err);
})

// is equivalent to

promisifiedReadFile('poem-one/stanza-01.txt')
.then(function(stanza1) {
  console.log(stanza1);
  return promisifiedReadFile('poem-one/stanza-02.txt')
})
.then(function(stanza2) { // success function
  console.log(stanza2);
},
function(err) { // failure function
  console.log(err);
};
)
// is equivalent to

promisifiedReadFile('poem-one/stanza-01.txt')
.then(function(stanza1) {
  console.log(stanza1);
  return promisifiedReadFile('poem-one/stanza-02.txt')
})
.then(function(stanza2) {
  console.log(stanza2);
})
.catch(function(err) { // use catch instead
  console.log(err);
})
```

Either stanza 1 or stanza 2 could have failed, and in both cases, the promise chain would end and the closest error handler after the promise would run. This means we don’t need to create an error handler for each part of the function; we can just include a unified error at the end. If any one of the parts before it fail, it will look for the closest error handler after it, and use that to handle the error. The promise chain is only followed if *everything* successful.

However, something to be aware of is that **if an error is successfully handled, that promise will have succeeded**. What this means is that if we have a promise chain that looks like this:

```
promisifiedReadFile('poem-one/stanza-01.txt')
.then(function(stanza1){
  console.log(stanza1);
  return promisifiedReadFile('poem-one/stanza-02.txt');
})
.then(function(stanza2) {
  console.log(stanza2)
})
.then(null, function(err) {
  console.log(err);
})
.then(function() {
  console.log('successfully done');
})
```

If there is an error in reading stanza 1, we'll skip past the second `then` and go directly to the error handler. If our error handler is successful in handling that error (e.g. if another error doesn’t arise when it’s running the function inside of it), then we’ll see “everything successfully done” in the console – even though it wasn’t.

If we *only* wanted to see “everything successfully done” if the reading of both stanzas 1 and 2 were successful, we’d have to either force another error to be thrown in our error handler (which seems a bit silly), or we could just move the `console.log` of the success message before the error handler, like so:

```
promisifiedReadFile('poem-one/stanza-01.txt')
.then(function(stanza1){
  console.log(stanza1);
  return promisifiedReadFile('poem-one/stanza-02.txt');
})
.then(function(stanza2) {
  console.log(stanza2)
})
.then(function() {
  console.log('everything successfully done');
})
.then(null, function(err) {
  console.log(err);
})
```

If no errors occur, the entire promise chain will be followed and we’ll get a “everything successfully done” console logged at the end. If an error is thrown somewhere, our message won’t be logged.


## Promise.all and Promise.each

Finally, we also used `Promise.all` and `Promise.each`, the last of which is fairly specific to the bluebird library, but very useful in certain cases.

Instead of having to manually write out eight `then` statements for each of eight stanzas, we can use `Promise.all`.

```
// create an array that contains filenames for each of the stanzas
let filenames = [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) {
  return 'poem-one/' + 'stanza-0' + n + '.txt';
});

let promiseArr = [];
// create an array of promises corresponding to each file
filenames.map(function(filename) {
  promiseArr.push(promisifiedReadFile(filename)
  .then(function(filename) {
    console.log(filename);
    })
  )
});

Promise.all(promiseArr)
.then(function() {
  console.log('everything succesfully done');
})
.then(null, function(err) {
  console.log(err);
});
```

First, we create an array that contains filenames for each of the stanzas. Then, we create an array of promises corresponding to the reading and printing of each file. Lastly, we pass our promise array as an argument into `Promise.all`, and when all of the stanzas are successfully read and printed, log a success message. If an error occurs anywhere in reading or printing those eight stanzas, the promise chain will be stopped and the error handler at the bottom will catch it.

An important thing to note is that `Promise.all` logs the result of promises in the order that files are done being read – not necessarily sequentially. If we wanted them in order, we’d have to use `Promise.each` instead.

```
let filenames = [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) {
  return 'poem-one/' + 'stanza-0' + n + '.txt';
});

let promiseArr = [];

Promise.each(filenames, function(filename) {
  return promisifiedReadFile(filename)
  .then(function(stanza) {
    console.log(stanza);
  });
})
.then(function() {
  console.log('everything successfully done');
})
.then(null, function(err) {
  console.error(err);
})
```

After we have our array of filenames, we pass the filename and a callback function into `Promise.each`. The callback function returns a new promise for the first file, then prints it, then returns a new promise for the second file, then prints it, and so on until it runs through all eight files. Once it does, then it console.logs “everything successfully done.” If an error occurs anywhere in reading or printing those eight stanzas, the promise chain will be stopped and the error handler at the bottom will catch it.

So, in summary, promises allow for:

* Portable code/functions
* “Linear”/“flat” chains
* Multiple handlers
* Unified error handling

## Minecraft

Friday evening, we had our first Game Night. Because hacking and using VR in Minecraft will both be a part the upcoming weeks, we used Game Night this week to start learning how to play. Fullstack actually built their New York campuses (Fullstack and Grace Hopper) in Minecraft – the end result is seriously impressive. We were also each given a plot of land in front of the building to build whatever we wanted to.

A lot of mishaps were had, but a lot of fun was as well. A few of our more notable events include:

* We didn’t quite get the settings right for people to be able to build or destroy or do anything except walk/fly around and whack each other... so that’s what we did for 45 minutes, until staff did a hack to work around the issue.
* A few of our cohort kept getting lost in the forest, or stuck outside, and more than a few fell off of the world multiple times.
* A classmate was building a lava moat around his plot (because you know, why not?) and at one point, his lava spilled over to someone else’s plot. It was quite the effort to contain the lava before it spread.
* One of Fullstack’s co-founders attempted to build [the Oculus structure at the World Trade Center transportation hub]( http://www.panynj.gov/wtcprogress/transportation-hub.html). And once he got bored of that (the partial thing was actually quite impressive!), he started continuously teleporting one of our instructors to him and then blowing him up with TNT.

And if you’re curious, here’s a small snippet of video that our Product Manager, Mark Davis, recorded:

{{< youtube jzLrYTZ47sc

<br />

I had a lot of fun, and I’m kind of obsessed with my cohort and our staff and instructors. I’m *really* looking forward to getting our VR headsets and trying them out in our virtual world, as well as just getting to spend more time with all of these people, both in front of a code editor and not!
