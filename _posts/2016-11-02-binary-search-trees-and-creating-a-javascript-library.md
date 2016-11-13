---
layout: post
comments: true
title: "Week 1, Day 3: Binary Search Trees and Creating a JavaScript Library"
date: 2016-11-02 18:30:00 -0500
description: 
tags: [fullstack academy, junior phase, data structures]
---

We started off the day attempting to implement binary search trees and hash tables. We implemented our binary search tree with a linked list. We started by creating two constructor functions, one called `BinarySearchTree` and one called `Node` - our original approach was to create the root node as an instance of `BinarySearchTree`, and then for each node off of it to be an instance of `Node`. However, we didn’t realize that each node of the tree should also effectively its own tree, so we were getting errors left and write about how things couldn’t be found. Our test specs were looking for instances of the `BinarySearchTree`, and we were trying to give it objects that had completely different properties.

With recursion, we implemented a method on the tree prototype to insert a value into our tree, and then to check if the tree already contained a given value. It was with the latter that we were enlightened to a fundamental principle of recursion.

{% highlight javascript %}
BinarySearchTree.prototype.contains = function(value) {
  if (value === this.value){ 
    return true;
  } else {
    if (value < this.value) {
      if (this.left === null) {
        return false;
      }
      this.left.contains(value);
    } else {
      if (this.right === null) {
        return false;
      }
      this.right.contains(value);
    }
  }
  return false;
};
{% endhighlight %}

Our function was continually returning false, even when we put in test cases that used the numbers we knew we had added to the tree. We then changed our final return statement to `return foo`, and we’d always get foo. So, we needed to figure out why our function seemed to completely disregard, well, everything that was in it.

We started by console logging each number as it was compared, and found that our program was finding matches — but still seemed to be skipping straight down to the bottom. After much struggling and finally asking for help, our instructor gave us a simple example to demonstrate what was happening.

If we have a simple tree that looks like:

{% highlight javascript %}
  1 <=a
2 3 <= b, c
{% endhighlight %}

Where 1, 2, and 3 are the values of each node and a, b, and c are the names of each node. If we’re trying to find the number “3,” and we called `a.contains(3)`, the program would first check a to see if it was 3. It’s not, and 3 is greater than 1, so it’ll check c. `c.contains(3)` IS 3, so it would return true — except we never returned that value, so the program skips directly to the bottom and returns `a.contains(3)` instead (which is false!).

After a small adjustment in the form of adding return statements and a lesson in recursion principles, we had a working program!

We didn’t have time to complete the breadth-first and depth-first search methods in our tree, nor did we get to the part about hash tables. There’s also an entire world of other data structures out there that we didn’t cover, so I’m definitely planning on looking into those on my own!

<br/>

### DOM Traversal

We also created our own mini JavaScript library of sorts, in which we wrote three functions:
* The first would take in a selector (ex. an ID like `#pagetitle`, a class like `.image`, a tag.class like `img.thumbnail`, or a tag like `div`) and return what kind of selector it was.
* The second would test an element to see if it matches the user’s selector.
* The third would traverse the entire DOM tree and collect the elements that had the selector specified. 

It was during the last part that my partner and I learned two more fundamental facts. 

We learned that the `childNodes` attribute (vs. `children`) gives you text nodes, comment nodes, and whitespaces, in addition to actual HTML elements. And those text nodes, comment nodes, and whitespaces don’t have attributes like ID and class. And that was interfering with our ability to get the HTML nodes.

We also learned that the `concat` method on the array prototype doesn’t work how we thought it did. We were trying to use recursion in the third function — if an element had children, to run through the same function on the children as well. Because we wanted to ultimately return an array with all of the elements that matched the input selector, we wanted to concatenate the children results with the primary node results, but the concat method we were using just wasn’t working.

After an hour and a half of going in circles and trying everything we could think of and Google (including using the `childNodes` attribute — that’s how we ended up down that rabbit hole...), we were informed that the `concat` method on the array prototype returns a new array...but the original array remains unchanged.

Sigh. Isn’t programming great?
