---
title: "Shopping Carts & Being Seniors"
tags: ["fullstack academy", "senior phase", "grace shopper"]
date: "2017-01-15"
excerpt: "In the past few days, we've moved on from working primarily on the back-end of Codsworth Robotics to actually rendering the data our back-end is feeding to us. We've also started putting together an overall theme and look."
---

In the past few days, we've moved on from working primarily on the back-end of [Codsworth Robotics](/blog/2017-01-12-what-ive-been-up-to-for-4-weeks/) to actually rendering the data our back-end is feeding to us. We've also started putting together an overall theme and look.

The features I've primarily been working on have been the Orders History page for a logged in user, and I just started working on our cart. Relatively early on in the process, we decided we were just going to have our cart saved on the session, and never actually persisted in the database. One of the main challenges I've faced while doing this was coming to terms with the fact that we weren't actually going to the database in our back-end route to fetch and update and delete items in our cart; we were just setting an array on the `req.session` object. Though the premise was the same — the front-end would dispatch an action, that would send an AJAX request to our back-end, which would manipulate that array, then send the resulting array back to the front-end — it just felt a little strange doing it.

The primary benefits, I think, to doing it this way are it's a little less intensive on our server and it's a little easier to transition someone's cart when they're not signed up or logged in originally to when they do sign up or log in. The drawbacks are, that let's say someone's kid throws some Pokemon's cards into dad's cart, and then dad actually signs in, dad probably doesn't want those Pokemon cards. Likewise, if you put items in your cart when logged into a computer that's not primarily yours, your cart will persist to the next person who uses that computer but when you log in via a different computer, your cart may* not be there anymore. And, this didn't even occur to me until our fellow mentioned it, but we actually have no knowledge about what's in our users' carts, so we can't gather data about it or market to them or send them endless emails about things sitting in their carts.

*We may be attempting to solve this in the near future by setting the session ID to be the user's email. May, being the key word...

## Deployment & Continuous Integration

We also went through a workshop about how to deploy and run continuous integration our apps via [Heroku](https://www.heroku.com/) and [Codeship](http://codeship.com/). I've deployed apps to Heroku before, so I was relatively familiar with that process. But, I've never used any continuous integration tool before. Our first attempt at using CodeShip didn't end up going so well — we ran into some errors, did something to fix it, ran into more errors, fixed those, then came across *new* errors...until finally our fellow told us we were spending too much time on it and it might be a good idea to kind of sort of make our app somewhat functional before really worrying about it. So, we deleted that and moved on.

I did think the integration with CodeShip and Heroku was really cool; we could automate things to the point where all we'd have to do is push to GitHub, and then CodeShip would run, and then it would deploy automatically to Heroku. I'm excited for when we do get it to work to see all of it in action!

## Not-Project-Related Things

I met with Career Services for the first time on Friday! Like most things in life, it was both wonderful and terrifying — wonderful because the future is always an exciting thing. Terrifying because, well, no one *really* likes the job hunt, do they?! We talked mostly about what I'm looking for, where I'm looking for it, and in general things I should be thinking about. I took some time over the weekend to research some companies to put on my "Companies I'd Love to Work For" list, which I'll be building out over the next few weeks.

We also had our first Fullstack social with the new Remote cohort. First of all, it was a little weird (not in a bad way, just different...) to see people who were not in our cohort in our video classroom! It was cool getting to meet and talk to the new class though, and we played some games together — [Agamari](/blog/2016-12-11-redux-authentication-and-social-activities/), [Path Paradox](https://pathparadox.com/) (which was *also* built by a Fullstack group for their Capstone Project), and then I fought some zombies in Fullstack's Minecraft world before calling it a night.

I've volunteered to be on the Senior Panel for this class this week — [remember when my cohort was the one listening to the Senior Panel](/blog/2016-11-08-node-shell-expressjs-and-senior-panel/)?! It's crazy to think about. It's also a little weird thinking about the fact that people are actually looking to us for guidance now, because I still often feel like I have no idea what I'm doing. (I'm told that this never really changes.)
