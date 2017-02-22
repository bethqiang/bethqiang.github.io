+++
title = "Node.js Interactive North America 2016"
tags = ["node.js", "conferences", "women who code"]
date = "2016-11-30"
+++

Thanks to [Women Who Code](https://www.womenwhocode.com/), I was given a ticket to [Node.js Interactive North America](http://events.linuxfoundation.org/events/node-interactive), “the marquee event for JavaScript developers, companies that rely on Node.js, and the vendors that support both of these constituents.” The two days covered a wide spectrum of aspects and use cases for Node.js and its ecosystem.

<img src="/img/posts/2016-11/nodejs-interactive-2016-registration.JPG" alt="Node.js Interactive North America Registration"/>

In the opening keynotes alone, we heard from a wide variety of speakers and corresponding organizations. (The following list is not completely inclusive.) [Mikeal Rogers](https://twitter.com/mikeal) of the Node Foundation started off, talking about the state of Node.js, the world’s fastest growing open-source platform with over 400 packages being published to npm ***per day***. (What.) Next, [Doug Wilson](https://twitter.com/blipsofadoug) spoke on the state of Express and Express 5.0, which will have cool features like native promise support in routing. [Joe McCann](https://twitter.com/joemccann) from Node Source talked about enterprise organizations like NASA, Master Card, and Condé Nast that used a mission-critical, enterprise version of Node.js with an emphasis on security, reliability, and extensibility. [Andy Hoyt](https://twitter.com/andrew_j_hoyt) of IBM talked about Node.js’s role in the digital revolution, the API economy, the rise of serverless environments, and demo’ed a Slackbot operating on serverless Node.js.

## Contributing to Node.js Core

Two of the first morning’s talks, one of which was also a keynote, were about contributing to the Node.js core code. The first of these was from [William Kapke](https://twitter.com/williamkapke), a Node.js contributor who had quite the bumpy journey through the ecosystem. In addition to telling his story, Kapke also provided tips for interacting and contributing to the community. They didn’t necessarily paint the rosiest picture, but seemed like very down-to-earth and realistic advice. These were:

* Don’t assume that you’re right.
* Research and offer solutions; don’t just go into an issue and say “I want to contribute, what can I do?”.
* Your work ***will*** be scrutinized, and you need to be okay with that.
* BE PATIENT! And persistent. Also, champion your own cause. You may not be able to figure something out or get an answer the first time around, but if you keep at it, you will eventually.

The second was *A Beginner’s Guide to Reading the Node.js Core Source*, by [Rich Trott](https://twitter.com/trott), another contributor and a member of the Node.js Core Technical Committee.

<img src="/img/posts/2016-11/nodejs-interactive-2016-contributing.JPG" alt="Reading the Node.js Core Source"/>

His steps:

* Step 0: If you're not familiar with JavaScript, familiarize yourself with it. Maybe try writing a "Hello World!" program, if you're feeling particularly adventurous.
* Step 1: Pick an API (or multiple) and read the documentation. API usage often provides clues to implementation. Also, merged PRs/closed issues count as documentation!
* Step 2: Look at some code. Some modules are short and digestible and some are longer and slightly less digestible.
* Step 3: Find tests for that module and read those. Sometimes, there’s behavior that’s only documented in tests.
* Step 4 (optional, but encouraged): Contribute! If you’re intimidated or don’t know where to start, Trott started [Node Todo](http://nodetodo.org/) just for you: follow his initial instructions, and then reach out to him via email or Twitter (info in the instructions) and he/his team will help you find something worthwhile that you can personally do to contribute given your ability level/skillset.

Both of these talks were really useful to me because I’ve sort-of-attempted to dip my toes into the world of open source before, but every time I go through GitHub issues in attempt to find something I want to fix and make a pull request for, I find it really hard to accurately judge whether I have the ability/skillset to do so or if I’m throwing myself into the deep end without being able to get out. And then I get slightly disillusioned, and don't think about it for a period of time, and then decide that maybe I want to try this open source thing again. And repeat.

## The Rest of the First Day

Some of the other talks I found particularly interesting from the first day were:

* The different types of bots and how to build one with [Rachel White](https://twitter.com/ohhoe). I recently discovered that [Open Austin](https://www.open-austin.org/) built [a Twitter bot](https://github.com/open-austin/CutePetsAustin) that randomly pulls pictures of adoptable animals at the Austin Animal Center, and this got me thinking that maybe I’d be able to do the same with the shelter that I volunteer with...or create a different, similarly semi-useful one. Or just do something completely ridiculous. I haven’t quite thought it out fully yet...

* Full stack testing and test automation, the different tools available (and there are a lot!), best practices, and the 80/20 rule (you can do 80% of your testing with a very small number of commands – focus on those first, and add in the fancy stuff later) with [Stacy Kirk](https://twitter.com/queenofagileqa). Testing is still something I need a lot of practice with, and this was a great overview of the ecosystem and the high-level things I should be keeping in mind.

* [nodeGame](http://nodegame.org/), an open source JavaScript framework for online, multiplayer, real-time games and experiments directly in the browser, with [Stefano Balietti](https://twitter.com/balietti), a computational social scientist. I majored in psychology in college and a large part of my four years was spent doing psychological research, so this talk brought out that part of my inner nerd. It was really cool to see the combination of behavioral sciences and tech like sockets and Node.js as a way to to find out just how weirdly people behave.

<img src="/img/posts/2016-11/nodejs-interactive-2016-nodegame.JPG" alt="nodeGame at Node.js Interactive North America"/>

## Security

There were quite a lot of security talks on the second day. Though it’s arguably one of the most important parts of the tech world, security has always been a little bit of a black box to me. I haven’t really ever investigated it on my own (mostly because I just haven’t needed it yet), and we haven’t gotten to that portion of Fullstack’s curriculum yet.

The first security-related talk I attended was *Writing Secure Node Code: Understanding and Avoiding the Most Common Node.js Security Mistakes* with [Guy Podjarny](https://twitter.com/guypod). One of his key messages was that the things that make JavaScript awesome, like the event loop, are also the things that make JavaScript vulnerable.

<img src="/img/posts/2016-11/nodejs-interactive-2016-security.JPG" alt="Writing Secure Node Code at Node.js Interactive North America"/>

Vulnerabilities aren’t always in your code either – most of your app’s code probably comes from npm, which also means that most of your vulnerability comes from npm. Podjarny then did some live hacking, in which he was able to exploit vulnerabilities in some very widely-used packages: [st](https://www.npmjs.com/package/st) using different HTML & URL encodings, [marked](https://www.npmjs.com/package/marked) using long algorithm runs*, [ms](https://www.npmjs.com/package/ms) using type manipulation, and [mongoose](https://www.npmjs.com/package/mongoose) using Buffers. (I’d also like to give his company, Snyk, the “best sticker” award: it’s a dog with sunglasses with code in them. [Anything with dogs can win over my heart pretty easily.])

*Something really cool that was related to the long algorithm runs/uncontrolled regexes happened later in the day, when I was working on a React workshop with two of my classmates. When I ran `npm install` on the project, I was informed that I should upgrade one of the dependencies of the app we were building, because our version was vulnerable to “Regex DoS,” and I knew exactly what that meant, thanks to this talk!

I learned the basics of cryptography with [Adam Englander](https://twitter.com/adam_englander) – what it is, what makes good cryptography, the different types, and some best practices. I also learned about data validation with [Paul Milham](https://www.linkedin.com/in/paul-milham-6693a810), why it’s important (we’ve all seen [the XKCD comic](https://xkcd.com/327/), right?), tools that you can use to do it ([Joi](https://github.com/hapijs/joi), [Celebrate](https://github.com/continuationlabs/celebrate), [Tean](https://www.npmjs.com/package/tean)), and how to make sure that data validation is coded into your app, and that it isn’t tossed off to the wayside.

## Other, Not-Strictly-Technical Things

### Including some very necessary thank yous

* There was a distinct lack of women. Someone in passing told me that only about 10% of the attendees were women. Regardless of the actual proportion, I often found myself one of a few women in a room at any given time. And, all of the opening keynote speakers were white men. I wasn’t really surprised at all, but it was just another reminder of tech’s diversity problem.

* On a different, but related-to-diversity-and-inclusion, note, the conference provided onsite childcare. I don’t have a child, but I think it’s awesome that they provided it! Also, the JW Marriott, where the conference was held, had both gender-neutral and gender-specific bathrooms on opposite sides of the floor. So, if you were uncomfortable with one, you had the option of the other.

* I’ve been meaning to get myself a Raspberry Pi and start tooling around with it, and just hadn’t gotten around to it. So, when I discovered that I could get one for free by doing a few Google Cloud coding challenges, I was all about it! I learned how to use the Cloud Shell & gcloud, I deployed a basic Node.js Express application in the App Engine, I used the Cloud Vision API to detect objects, faces, and landmarks in photos, and translated a small speech sample to text using the Cloud Speech API. I also learned how to use vim – or at least, I was able to Google my way through using it while doing all of these! After these, [I earned my Raspberry Pi – and got a Cardboard as a bonus](https://twitter.com/BethQiang/status/803717252755419136)!

* I have two groups of people to give enormous thanks to. The first is Women Who Code, without whom I never would have been able to attend due to cost. The second is my amazing instructors at Fullstack, for working with me on giving me early access to workshops and previous cohorts’ lectures, which allowed me to work ahead so that I could take two days away from class without missing out on too much!
