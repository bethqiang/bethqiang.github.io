---
title: "New Year, New Blog, Same Git Bewilderment"
tags: ["blogging", "hugo", "git"]
date: "2017-01-09"
excerpt: "Big things have been happening in the past three weeks! First, let's talk about this site. I started getting annoyed a while ago because my Jekyll site would build somewhat slowly — it'd take about two seconds each time."
---

Big things have been happening in the past three weeks!

First, let's talk about this site. I started getting annoyed a while ago because my Jekyll site would build somewhat slowly — it'd take about two seconds each time. Now, two seconds isn't a huge amount. But, in the larger scheme of things, I *only* have about 30 posts so far, and it would take two seconds *every time I made any kind of change and wanted to see it*. Jekyll's speed (or lack thereof) once posts start accumulating is something that's pretty well-documented, and I wanted to give this space a little bit of a facelift anyway, so I decided to explore a few alternatives and see what I could find. Plus, playing with new technology is always fun!

I first considered [Gatsby](https://github.com/gatsbyjs/gatsby), a React-based static site generator. It's no secret that I'm a huge fan of React, but I was a little put off by this:

> Gatsby is not yet stable. APIs will break. Functionality is missing. It's usable but if you plan on building with it, expect a rocky road for some time.

I'll definitely be following Gatsby along its journey, but I figured I might as well try to not make my life too much harder right now.

I meandered around the static site generator world for a short period of time, but nothing really stuck out to me. Until a few days ago, when I stumbled upon a post about migrating from Jekyll to [Hugo](https://gohugo.io/). I remembered, in some distant part of my brain, what I thought Hugo was (*"just another static site generator"*). But hey, this site actually looked kinda nifty. And it could be fun to learn Go (templates, not the real thing, but still). And it's supposed to be *WILDLY BLAZING FAST*?!

After perusing themes and others' sites, I was convinced. I coded a *super* basic "theme" (I'm not sure I can even call it that) from scratch to get a sense of the overall structure, the templating engine, and how the pieces worked together. Then, I found [a theme I liked](https://github.com/digitalcraftsman/hugo-steam-theme) and set about customizing it and incorporating my own elements, like the navigation bar, the post summaries, the back to top button, the tag cloud/archives page, etc.

## The Git Rabbit Hole

Everything was going rather swimmingly — I struggled a little bit with figuring out the nested-loop structure of the archives page, and it took me way too long to remember that VSCode has a handy "replace all" feature, but overall, it wasn't terribly painful.

Until I attempted to deploy this to my GitHub User Page. That went a little something like this:

*So...in order for GitHub pages to do anything, it needs an `index.html` in the root directory. But when Hugo builds my site, my `index.html` is sent to the public directory.*

*The documentation, and most of the (admittedly limited) tutorials out there say that I should create two different repositories — one for the source code, and one that would just serve the compiled `public` directory. Worst comes to worst, I can deal with that, but there has to be a better way...*

[Insert furious Googling here.]

*Oh look, [this guy](https://hjdskes.github.io/blog/deploying-hugo-on-personal-gh-pages/) created separate branches, and is just serving the `public` folder on the `master` branch! I can do that.*

I made sure to make at least four copies of everything I had, just in case something went terribly wrong. Then, I started taking trips down various git rabbit holes — first, not having the correct access rights, then subtrees and submodules, and then updates being rejected for various reasons. I learned the hard way what `git push origin 'git subtree split --prefix public master':master --force` does. (Spoiler alert: it deletes your `master` branch.)

Luckily, my `hugo` branch still has my entire commit history, so if in the future, I want a `master` branch with the history, I think I could just rename that branch. One more `git subtree push --prefix public origin master` command later, my `master` branch was populated with my `public` directory, and everything seemed to be working as it should!

I want to eventually create a script to automate these pushes, but given that Fullstack is starting again after a long and relaxing break, I suppose those will have to wait until I manage to get some free time again. At the very least, the site is up and running, it looks a little snazzier, and I learned some Go and Git!
