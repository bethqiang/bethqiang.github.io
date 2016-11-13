---
layout: post
comments: true
title: "Week 1, Days 1 and 2: Introductions, Make Your Own Adventure Game, Data Structures, and Hot Seat"
date: 2016-11-01 18:30:00 -0500
description: 
tags: [fullstack academy, junior phase, data structures]
---

Though our cohort technically started at the end of September with 4 weeks of Foundations, October 31, 2016, marks my first day of Fullstack Academy's Remote Immersive.

The first half of the day was dedicated to introductions from everyone and an orientation outlining everything to come. I'm excited to get to know everyone in my cohort better, and I'm interested to see if Fullstack can replicate their in-person experience and if so, how they do it. I'm a little nervous about everything being online - that in and of itself typically adds a little bit of distance when trying to connect with people - but I'm very hopeful that they can succeed, at least to a great degree.

David, one of the founders of Fullstack, was our primary instructor today, although we did get to meet our actual full-time instructors. We also have two fellows, who can be likened to teaching assistants. They're students who have gone through the program previously, succeeded, and elected to stay on for another 13 weeks to mentor and help us navigate both the world of coding and the world of Fullstack.

The second half of the day, we split into pairs work on a simple Make Your Own Adventure Game in the command line. The only pair programming experience I had previously was in [my bootcamp interviews]({{ site.url }}/2016/10/17/the-journey-to-fullstack-part-2-the-bootcamp-admissions-process/){:target="_blank"}, so it was a completely new experience for me, but I was a huge fan - after months of coding on my own, it was really nice to have someone to bounce ideas off of and gain a different perspective from.

After spending a few hours on that, we dove right into abstract data types and data structures. Nimit, Fullstack's other co-founder, led the evening's session. We talked about information theory and hardware when it comes to the storage of physical bits, as well as abstraction and encoding with text (morse code, the binary system, hexadecimal notation, UTF-8), images, and audio.

<br/>

### Day 2

We started off the next day by finishing up the general lecture with topics like machine code, assembly, compilers, and operating systems.

The rest of the day was entirely devoted to certain kinds of abstract data types and data structures. An abstract data type is a description of information, how that information is connected, and performable operations on that information. If you think that's a little vague, that's because it is. A few (slightly more) concrete examples of abstract data types are lists, which are ordered collections of elements, and dictionaries, which are sets of key-value pairs.

A data structure is a specific programmatic solution for storing, referencing, and accessing data in computer memory. Their purpose is to implement some kind of abstract data type - so, for example, you can implement a binary search tree (an abstract data type) with a linked list (a data structure).

In the afternoon, we implemented queues and linked lists in JavaScript. We implemented a queue using a simple array with the ability to add and remove a elements to the queue and find the size of the queue. We were expressly forbidden from using any `Array.prototype` methods (including, but not limited to, `push`, `shift`, `length`, etc.) Instead, we used `head` and `tail` indices. Every time an element was added to the queue in our `enqueue` method, we incremented the tail index by one so that whatever element we added after would be placed at the end. We did something similar in our `dequeue` method - we returned the head index of the array, and incremented the head index by one. To find the size, we'd subtract the head index from the tail index, making sure that they could never cross and the size of the queue could never be less than 0.

Next, we created a linked list using two constructor functions: `LinkedList`, which was empty, but necessary so that we could place methods on the prototype, and `Node`, which represented each “element” in the linked list. Ours was bi-directional, so the `Node` constructor had a `value` property, a `previous` property, and a `next` property. We created methods to add nodes to the tail and head of the list, to remove nodes to the tail and head of the list, and to search the list for a value and return true or false depending on its existence in the list.

We ended the day with an introduction to Hot Seat. Hot Seat is a Fullstack tradition, whereby each person in the class sits in the "hot seat" for 10 minutes. It starts off with the person telling the class anything they deem is relevant about them, and then the floor opens up and the class is able to ask the person anything they want or that comes to mind. Our two instructors, Omri and Geoff, went first, and we learned some interesting facts about the both of them. Geoff's background sounds really similar to mine - he also began college with the intent of going to medical school, and then pivoted and ended up in the programming world.

It's been an exhausting two days, and we've been reassured that our brains will get used to working so hard for so long. We'll see if that pans out to be true! (I certainly hope so.)
