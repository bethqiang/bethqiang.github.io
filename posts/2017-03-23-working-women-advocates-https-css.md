---
title: "Working Women Advocates: HTTPS and the 50 Million Ways to Style React Components"
tags: ["working women advocates"]
date: "2017-03-23"
excerpt: "In case you missed it, I've taken on the roles of both CTO and a developer for an organization called Working Women Advocates. One of my classmates from Fullstack began the project while we were in the program, and we're now working towards making it an official non-profit organization."
---

In case you missed it, [I've taken on the roles of both CTO and a developer](/blog/2017-02-23-every-new-beginning-comes-from-some-other-beginnings-end) for an organization called [Working Women Advocates](http://workingwomenadvocates.org/). One of my classmates from Fullstack began the project while we were in the program, and we're now working towards making it an official non-profit organization. Our mission is to create a safe and secure place for women to find and connect with advocates and allies to help them through the challenges of being a woman in the workplace, whether they’re actively facing hardships like discrimination or harassment, or they just need a friendly and sympathetic/empathetic ear to vent to.

We've brought on a project manager, have implemented an agile workflow, and have finally started setting deadlines for ourselves for the development process, so things have been moving along!

## Setting Up TLS/SSL/HTTPS for a Custom Domain

One of the first things we wanted to do was obtain a TLS/SSL certificate and serve our entire site over HTTPS via our custom domain name. Up to this point, we had a basic static landing page hosted at our custom domain name, and our actual app was hosted on Heroku with a Heroku domain. As you can imagine, this was inconvenient to maintain and to move forward in the development process with. We couldn't change anything on the front-end of our Heroku app because it was going to be overridden anyway by our current landing page.

I did a lot of research into the different ways of going about this; from getting a certificate from [LetsEncrypt](https://letsencrypt.org/) and attempting to install it ourselves to using Heroku's (at the time) beta SSL service to using [Cloudflare's free SSL service](https://www.cloudflare.com/ssl/). We eventually decided to go with Cloudflare with our app hosted on Heroku because it was free, easy to set up and use, and widely used and trusted, despite [recent news](https://techcrunch.com/2017/02/23/major-cloudflare-bug-leaked-sensitive-data-from-customers-websites/).

Setting this up was much easier than the research suggested. It essentially consisted of:

* Creating a Cloudflare account
* Pulling our domain records from our domain provider (which Cloudflare simplified by pulling everything automatically)
* Connecting our Heroku app to our custom domain
* Adding a CNAME record in Cloudflare to point to our Heroku app

(Somewhere in there, we also added a Cloudflare rule that said to always use HTTPS and redirect from HTTP if necessary.)

...and voila, not even a few hours later, our Heroku app was accessible via our custom domain name and we were encrypted!

## Styling in React-land

Our MVP was built using React, [Material Design Lite components](https://getmdl.io/), and vanilla CSS. Our landing page was a static site built using Bootstrap and jQuery. Somehow, we had to get our static landing page into our MVP so that our "Join Us" and "Donate" buttons were available, in addition to all of the quality information that Rachel had put on the landing page.

Our temporary solution: put Bootstrap and jQuery into our MVP, stick the landing page in one giant component, and let that be that for a little while. Once we had that in place, we had to decide on how we wanted to proceed in the future in terms of our styling, and what we wanted to do about the slightly bloated mess that our codebase turned into.

Turns out, styling in React-land is no simple task. There are approximately 50 million ways to do it: vanilla CSS, [Sass](http://sass-lang.com/), [BEM](http://getbem.com/), [atomic](https://acss.io/), inline, [CSS modules](https://github.com/css-modules/css-modules), [styled components](https://www.styled-components.com/), the list goes on. Unfortunately, Bootstrap and jQuery don't seem to be great options with React; because they operate on the real DOM, and React has its virtual DOM, those two can get out of sync and that can get sticky in some situations. I've read about [ways to use jQuery *inside* of React components](http://tech.oyster.com/using-react-and-jquery-together/), and I think the idea is intriguing, but fancy animations and DOM interaction events can happen later. We needed to have some base to work off of before we can experiment with that.

[I've used inline styles before](/blog/2017-02-13-capstone-part-2-logging-in-the-chair-link-traversal/) and liked the modularity of it, but felt meh about the fact that it's so limiting (e.g. no pseudoclasses and fun things like that, and [Radium](https://github.com/FormidableLabs/radium) only gets you so far). I'm particularly interested in CSS modules, but I also haven't quite figured out how to use it successfully in conjunction with `react-bootstrap` or `material-ui` yet. (I don't think it's quite necessary for us, at least not yet, to create our own grid/components/etc. from scratch, so something that already exists would be nice.)

We're meeting about this to discuss how we want to proceed, so decision TBD! (Also mildly hilarious fact: I'm attending a meetup that's *solely* focused on styling in React in a few days, so it appears that I'm not the only one who's confused and maybe slightly overwhelmed by all of this.)
