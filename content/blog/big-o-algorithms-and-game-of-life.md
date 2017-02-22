+++
title = "Week 1, Day 4: Big O, Algorithms, and Game of Life"
tags = ["fullstack academy", "junior phase", "algorithms"]
date = "2016-11-03"
+++

Today, we went over our [selector/DOM traversal exercise from yesterday]({{< ref "blog/binary-search-trees-and-creating-a-javascript-library.md" >}}), and our instructors showed us some ES6 syntax. I thought the coolest one was array destructuring, which allows you to assign multiple variables to multiple array elements at once. For example, instead of doing this:

```
arrayOfVals = [1, 2, 3];
x = arrayOfVals[0];
y = arrayOfVals[1];
z = arrayOfVals[2];
```

You can do this:

```
arrayOfVals = [1, 2, 3];
[x, y, z] = arrayOfVals;
```

And x, y, and z will be assigned to 1, 2, and 3.

We talked extensively about Big-O algorithm complexity, which is used to describe the performance, whether by execution time or spaced used, of an algorithm. It specifically describes the worst-case scenario, although [this awesome cheat sheet](http://bigocheatsheet.com/) gives you different scenarios.

Using what we learned, we then implemented two sorting algorithms: bubble sort and merge sort.

Bubble sort takes two adjacent numbers in a list and compares them, swapping the two if the second one is greater than the first. It then does this over and over, until it can go through the list without making swaps. We ended up doing this in a single function, although our instructor later showed us a more modular solution. We didn’t have a lot of trouble with this one — our biggest roadblock was figuring out when it went through the list without making swaps, although we fixed that relatively easily with the addition of a variable inside of the if statement — if an element was greater than the element next to it, it would go into the loop and the variable’s value was changed. If not, it would remain the default value.

We had a lot more trouble with the merge sort algorithm. Merge sort takes an array, splits it until each element is its own, singular array, and then merges neighboring arrays in sorted order together. Repeat until there’s only one array left.

We were able to get the “splitting” part quite easily through using the `shift` method on the array prototype. We later learned that this increased the Big-O complexity from `O(n*log(n))`, which is what it was supposed to be, to `O(n^2*log(n))`, because every time you shift, you have to walk through all of the values in each array. The way to do split an array and maintain the original complexity was to use the `slice` method from index 0 until the midpoint.

Then came the function that did the actual sorting, merging, and recursing. We tried doing it all in one function and it was not having any of that. We ended up talking in circles for most of the hour until we were called back to the main classroom, as we couldn’t figure out how to make the primary parameter a single array (that would be broken into multiple arrays by our split function), but then have it recurse back with two parameters to then merge.

This was also the first time we had to write our own tests, and that was an adventure in and of itself. It forced us to think much more about the structure of our inputs and outputs, which was one of the things that really tripped us up when we were trying to implement the merge sort function. We were never really sure what exactly our input should have been, and it’s very hard to write a function that does anything when you don’t know what you’re putting into it!

We also started on [Conway’s Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life), a cellular automaton with simple rules to somewhat emulate “life” — each cell in a grid can suffer from underpopulation and overcrowding, and will only become alive or dead based on pre-defined criteria. We didn’t have that much time today to work on it, but I’m really excited to continue with it tomorrow.

In non-technical news, we had our first "learning group" meeting today. Learning groups are smaller groups of 3-4 students headed by an instructor or fellow who meet once a week to chat about how things are going, ask questions, and just get to know classmates in a more intimate setting. I was a big fan of it — we bonded over feeling a little overwhelmed, VR and watching a Youtube video of our CEOs play in it, a classmate’s super lazy dog, and some technical difficulties where our fellow’s mic cut out and it was a joint effort to figure out how to fix it.

All in all, another great day.
