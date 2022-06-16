---
title: "The Absolute Beginner’s Guide to Test Driven Development"
tags: ["testing"]
date: "2016-10-17"
subtitle: "So I know what it is...but what exactly is it?"
excerpt: "Test Driven Development (TDD) and testing were always terms that people would casually talk about and debate the merits of, but I never actually knew what it was. The furthest I ever managed to get was the understanding that it was “a way to make sure that what your code is doing what it should be doing,” which, while true, isn’t very descriptive or helpful in actually understanding what it was or how to do it."
---

Test Driven Development (TDD) and testing were always terms that people would casually talk about and debate the merits of, but I never actually knew what it was. The furthest I ever managed to get was the understanding that it was “a way to make sure that what your code is doing what it should be doing,” which, while true, isn’t very descriptive or helpful in actually understanding what it was or how to do it.

Then, people would start throwing around words like stubbing, mocking, and doubles, and I had even less of an idea of what was going on. That is, until my bootcamp’s Foundations phase, during which I was introduced to the idea in a relatively non-threatening way.

For those of you who know sort-of kind-of what it is but don’t actually know what it is, I hope this helps in allowing you to at least grasp the fundamentals. Here’s what I’ve learned of what TDD actually means and how to use it in practice.

The traditional coding process would be something like this: write code, see what happens, does it do what we want it to do? No --> rewrite code. Yes --> move on with life.

Whereas, a TDD workflow would look like this:

<img src="/images/posts/2016-10/test-driven-development.png" alt="Test Driven Development Workflow"/>

Essentially, you want to write tests, then write the simplest code possible to make those tests pass (they should be failing initially, because you haven’t written anything!). Once you’ve made all of the tests pass, go back and refactor your code to make it prettier and/or more efficient.

Okay, that’s cool, I get that. But what are these “tests,” you ask? What do they contain? What does it mean “to make a test pass”? **I didn’t understand how you could write code to make sure other code worked…because once you wrote it, wouldn’t you be able to tell if it worked or not?**

Let’s say that you want to write a program that will say, “Hello, [name]!”, where name is whatever name you give it. (Ex. If your name was Bob, and you wanted your program to say hello to you using your name: “Hello, Bob!”) If you don’t give your program a name, then you want it to say, “Hello, world!”

So let’s try this TDD thing out. The idea is to write your tests first, before you write a single line of code. Your tests for this program could look like this:

```
describe("Hello", function() {
  it("says hello", function() {
    expect(hello()).toEqual("Hello, world!");
  });

  it("says hello to someone", function() {
    expect(hello("Fred")).toEqual("Hello, Fred!");
  });
});
```

(Different testing frameworks have different syntax for actually writing tests; we’ll be ignoring the actual syntax for now and focusing on the content.)

Basically, what this test is saying is:

* There is a function called `hello`
* When you call `hello()`, you should get the string, “Hello, world!”
* When you call `hello()` with a parameter, you could get the string, “Hello, + parameter!”

As we can see in our testing framework (we’ve been using Jasmine and the test runner Test’em), both of our tests are currently failing. That’s good; that’s expected!

<img src="/images/posts/2016-10/jasmine-testing-screenshot-1.png" alt="Jasmine Screenshot 1"/>

It’s our job now to go through our tests, one by one, and write the simplest code we can to make each test pass. Our two tests are, “Hello says hello,” and “Hello says hello to someone.” The number of lines here may seem scary at first, but the key parts to pay attention to are the ones that are in light blue boxes - these tell us why our tests aren’t passing, and by extension, what we can do to fix it.

Let’s focus on the first test for now. Jasmine’s reason for why this specific test didn’t pass is that hello is not defined. So, let’s try defining hello!

```
function hello() {};
```

And if we look back at our tests:

<img src="/images/posts/2016-10/jasmine-testing-screenshot-2.png" alt="Jasmine Screenshot 2"/>

Great! We now have a different error, which means something different is happening. Now, our first test’s feedback says, “Expected undefined to equal ‘Hello, world!’.” Jasmine is telling us that we’re expecting the output of `hello()` to equal “Hello, world!”, but instead, we’re getting `undefined`. Let’s try putting something in our function that will output “Hello, world!” when the function is run.

```
function hello() {
  return "Hello, world!";
};
```

Okay, let’s see what happened.

<img src="/images/posts/2016-10/jasmine-testing-screenshot-3.png" alt="Jasmine Screenshot 3"/>

One test disappeared! We can see at the top that of the 2 specs we started with, only 1 is failing now! If we switch into our spec list:

<img src="/images/posts/2016-10/jasmine-testing-screenshot-4.png" alt="Jasmine Screenshot 4"/>

We can see that “says hello” is now green, which means it passed. Congratulations! Now onto the second one.

If you also notice, our error message has changed to “Expected ‘Hello, world!’ to equal ‘Hello, Fred!’”. So this lets us know that even when we specify a name, our program is still giving us, “Hello, world!” (Which isn’t what we want it to do!)

We want a way to input a name, and have it spit it back to us. So, let’s add name as a parameter. And it seems like we only want “Hello, world!” to be returned __*if*__ we don’t specify a name - so, let’s try using an if statement!

```
function hello(name) {
  if (name === undefined) {
    return "Hello, world!";
  } else {
    return "Hello, " + name + "!";
  };
};
```

And if we go back to our test specs:

<img src="/images/posts/2016-10/jasmine-testing-screenshot-5.png" alt="Jasmine Screenshot 5"/>

Woo, they’re both passing! Our program works exactly as it should.

## The Benefits of TDD

For the past four weeks in my bootcamp, we’ve been given test specs and then tasked to write code that makes those tests pass. Some of the benefits that I’ve personally experienced from this approach, rather than the “traditional” approach are:

* It forces you to thoroughly think of what you actually need to do, rather than willy nilly writing a bunch of functions and seeing what happens. (Which I’ve done before, and I don’t recommend it!)
* I occasionally have the bad habit of trying to dive into everything at once, and end up confused and frustrated because some problems are way too big for that to work! TDD forces you to break down the problem before you try to solve it. It’s easy to say, “okay, my program just needs to do this one thing.” And once you have that one thing, then you add on the next thing.
* It allows you to pinpoint where your code is breaking. If something didn't work in a program that was a couple hundred lines of code long, it often took going through all couple hundred of those lines and console logging almost everything to figure out what the problem was.
* It makes your code flexible, streamlined, and extensible. You’re never writing code you don’t need, and the code you do write is as straightforward and simple as possible. You always have the freedom to add to your existing code without fear that you’ll break your existing code and won’t be able to figure out why.

## The Drawback(s?) of TDD

The only drawback I’ve personally experienced so far has been that you need to choose your test cases wisely. If you leave out certain elements to test, those parts of your program may not work as you intended them to. Or, sometimes your test case has multiple ways of getting to the end result, but you only want one of those ways to be the right one.

For example, I once had a test case that started with the array `[0, 1, 2]`, and wanted me to write a function that would mutate that array and output `[0, 3, 6]`. Now, you might think the obvious way to do this would be to multiply each element by three. However, I made a mistake in my code and ended up multiplying each of the indices of the array by 3, rather than each number itself - but the test still passed because in this case, the indices were the same as the actual numbers in the array. If a different starting array had been chosen, I could have seen that mistake immediately.

*That’s not to say there aren’t any other drawbacks; I just haven’t had enough experience yet to know first-hand what the others are.

## How do I actually write tests?

So...I haven’t gotten to that point yet. I’ve started some preliminary experiments with writing my own tests for a small back-end application that I’m trying to build, but am far from being confident in my ability to do so.

(Also, on second thought, maybe I should have tried to just write tests for an existing app that I have instead of trying to figure out Node and Express and MongoDB AND writing tests, all for the first time, but hindsight is 20–20, right?)

## What should I do if I want to start practicing TDD?

One of the best resources I’ve come across has been [Exercism.io](http://exercism.io/). It’s similar to [Code Wars](https://www.codewars.com/) or [Hacker Rank](https://www.hackerrank.com/) or any other coding challenge website, in that you choose a language and there’s a repository of problems available to you to solve. However, unlike Code Wars or Hacker Rank or anything else I’ve come across, instead of having a word problem, you get test specs instead, and your solution passes when all of your tests pass. There’s a little bit of system set-up involved to do this, but it’s a great platform!

I’d also recommend just choosing a testing framework and learning the basics and syntax, then finding super easy problems and writing tests for those.

## Further Reading

If you’re looking for more resources, here are some that I’ve found to be helpful in understanding what it is, why you should do it, and a small tidbit of how to do it:

[TestFirst.org](http://testfirst.org/)

[The Newbie’s Guide to Test Driven Development](https://code.tutsplus.com/tutorials/the-newbies-guide-to-test-driven-development--net-13835)

[Kata — The Only Way to Learn TDD](http://www.peterprovost.org/writing/2012/05/02/kata-the-only-way-to-learn-tdd/)

[One Weird Trick that Will Change the Way You Code Forever: JavaScript TDD](http://jrsinclair.com/articles/2016/one-weird-trick-that-will-change-the-way-you-code-forever-javascript-tdd/) (Clickbait-y title aside, it’s a great resource and has links to many others!)
