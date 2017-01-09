<!DOCTYPE html>
<html lang="en-us">
<head>
  <meta http-equiv="Content-Type" content="text/html" charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

  <title>Express.Js &middot; Beth Qiang</title>
  <meta name="author" content="Beth Qiang">
  <meta name="description" content="A developer&#39;s thoughts on life, code, and the pursuit of happiness.">
  <meta name="generator" content="Hugo 0.18.1" />
  <meta name="HandheldFriendly" content="True">
  <meta name="MobileOptimized" content="320">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">

  <!-- RSS autodiscovery -->
  
    <link href="http://bethqiang.com/tags/express.js/index.xml" rel="alternate" type="application/rss+xml" title="Beth Qiang" />
    <link href="http://bethqiang.com/tags/express.js/index.xml" rel="feed" type="application/rss+xml" title="Beth Qiang" />
  

  <link rel="shortcut icon" href="http://bethqiang.com/img/favicon.ico">
  <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css">

  <!-- Stylesheets -->
  <link rel="stylesheet" href="http://bethqiang.com/css/main.css">
  <link rel="stylesheet" href="http://bethqiang.com/css/github.css">
  <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.8.0/styles/default.min.css">

  

  <!-- Stylesheet for theme color -->
  <style type="text/css">
  a {color: #3498db;}
  .pagination a {color: #3498db;}
  .gist .gist-file .gist-meta {color: #3498db !important;}
  a:focus, a:hover {color: #2079b4;}
  h1.post-title a:focus, h1.post-title a:hover, h1.blog-title a:focus, h1.blog-title a:hover {color: #2079b4;}
  .older-posts:hover, .newer-posts:hover {color: #2079b4;}
</style>
</head>

<body class="home-template">
  <div class="site-header">
  <nav class="site-nav">
    <a href="#" id="menu-icon" class="menu-icon">
      <svg viewBox="0 0 18 15">
        <path fill="#424242" d="M18,1.484c0,0.82-0.665,1.484-1.484,1.484H1.484C0.665,2.969,0,2.304,0,1.484l0,0C0,0.665,0.665,0,1.484,0 h15.031C17.335,0,18,0.665,18,1.484L18,1.484z"
        />
        <path fill="#424242" d="M18,7.516C18,8.335,17.335,9,16.516,9H1.484C0.665,9,0,8.335,0,7.516l0,0c0-0.82,0.665-1.484,1.484-1.484 h15.031C17.335,6.031,18,6.696,18,7.516L18,7.516z"
        />
        <path fill="#424242" d="M18,13.516C18,14.335,17.335,15,16.516,15H1.484C0.665,15,0,14.335,0,13.516l0,0 c0-0.82,0.665-1.484,1.484-1.484h15.031C17.335,12.031,18,12.696,18,13.516L18,13.516z"
        />
      </svg>
    </a>

    <div class="trigger">
      <div class="social">
        
          <a href="//twitter.com/bethqiang" target="_blank" title="Twitter" class="contact-icon"><i class="fa fa-twitter"></i></a>
        
        
          <a href="//github.com/bethqiang" target="_blank" title="GitHub" class="contact-icon"><i class="fa fa-github"></i></a>
        
        
          <a href="//www.linkedin.com/in/bethanyqiang" target="_blank" title="linkedIn" class="contact-icon"><i class="fa fa-linkedin"></i></a>
        
        
          <a href="mailto:you@example.com" target="_blank" title="Email" class="contact-icon"><i class="fa fa-envelope"></i></a>
        
        
          <a href="http://bethqiang.com/tags/express.js/index.xml" target="_blank" title="RSS" class="contact-icon"><i class="fa fa-rss"></i></a>
        
      </div>

      <div class="main-nav">
        <a href="http://bethqiang.com/" class="page-link">Blog</a>
        
          <a href="about/" class="page-link">About</a>
        
          <a href="portfolio/" class="page-link">Portfolio</a>
        
      </div>
    </div>
  </nav>
</div>


  <main class="content" role="main">
    
  
  
    <article class="preview">
  <header>
    <h1 class="post-title"><a href="http://bethqiang.com/post/building-a-wikipedia-clone/">Week 3, Day 1: Building a Wikipedia Clone</a></h1>
    <div class="post-meta"><time datetime="November 14, 2016">November 14, 2016</time></div>
  </header>
  <section class="post-excerpt">
    <a class="excerptlink" href="http://bethqiang.com/post/building-a-wikipedia-clone/"><p>The past day has been a complete whirlwind of learning and figuring out why things are going wrong. We built a Wikipedia clone with the following features:
 A homepage that lists all the pages in the Wiki The ability to create new pages Page searching Tagging  We started from the very beginning – a blank text editor, in which we required a bunch of modules, set up our middleware, enabled our Nunjucks rendering engine and created simple templates, and created and connected to our Postgres database...</p></a>
    <p class="readmore"><a href="http://bethqiang.com/post/building-a-wikipedia-clone/">Keep reading <i class="fa fa-angle-double-right" style="padding-left: 5px;"></i></a></p>
  </section>
</article>
  
    <article class="preview">
  <header>
    <h1 class="post-title"><a href="http://bethqiang.com/post/sql-election-chat-and-revisiting-twitter-clone/">Week 2, Days 3 and 4: SQL, Election Chat, and Revisiting Our Twitter Clone</a></h1>
    <div class="post-meta"><time datetime="November 10, 2016">November 10, 2016</time></div>
  </header>
  <section class="post-excerpt">
    <a class="excerptlink" href="http://bethqiang.com/post/sql-election-chat-and-revisiting-twitter-clone/"><p>I don’t understand how it’s almost the end of the week already. Time is literally flying. We&rsquo;ve spent the entirety of the past two days focused on databases, which has been a nice blast to the past – as a relatively recent data analtyics consultant, it&rsquo;s been nice working with SQL again, albeit in a slightly different manner. We started Wednesday with manipulating the IMDB database with SQLite. We did a lot of selecting, counting, joining, grouping, and sorting...</p></a>
    <p class="readmore"><a href="http://bethqiang.com/post/sql-election-chat-and-revisiting-twitter-clone/">Keep reading <i class="fa fa-angle-double-right" style="padding-left: 5px;"></i></a></p>
  </section>
</article>
  
    <article class="preview">
  <header>
    <h1 class="post-title"><a href="http://bethqiang.com/post/twitter-clone-with-nodejs-and-expressjs/">Week 2, Day 2: Building a Twitter Clone with Node.js and Express.js</a></h1>
    <div class="post-meta"><time datetime="November 9, 2016">November 9, 2016</time></div>
  </header>
  <section class="post-excerpt">
    <a class="excerptlink" href="http://bethqiang.com/post/twitter-clone-with-nodejs-and-expressjs/"><p>We built a Twitter clone app with Node and Express, and wanted it to have the following:
 A place to store data (nothing fancy yet – just an object will do) A homepage that lists all tweets from all users A profile page that displays a specific user’s tweets A form to post new tweets (and as an extra bonus, enable it to update in real-time for all clients connected to the server at the time)  Initializing the Project First, we set up a twitter-js directory, and ran git init and npm init...</p></a>
    <p class="readmore"><a href="http://bethqiang.com/post/twitter-clone-with-nodejs-and-expressjs/">Keep reading <i class="fa fa-angle-double-right" style="padding-left: 5px;"></i></a></p>
  </section>
</article>
  
    <article class="preview">
  <header>
    <h1 class="post-title"><a href="http://bethqiang.com/post/node-shell-expressjs-and-senior-panel/">Week 2, Day 1: Node-Shell Workshop, Express.js, and Advice from People Who Sort of Know What They’re Doing</a></h1>
    <div class="post-meta"><time datetime="November 8, 2016">November 8, 2016</time></div>
  </header>
  <section class="post-excerpt">
    <a class="excerptlink" href="http://bethqiang.com/post/node-shell-expressjs-and-senior-panel/"><p>I started off my day with watching a fantastic talk about event loops, and then briefly looking at a Code Wars problem. I’ve done a few Code Wars problems in the past, but we’ve now been incentivized — if we reach 4 kyu (for those who aren’t familiar, that just refers to a certain level) by the end of Junior Phase, we get a cool shirt. And a lot of knowledge and practice...</p></a>
    <p class="readmore"><a href="http://bethqiang.com/post/node-shell-expressjs-and-senior-panel/">Keep reading <i class="fa fa-angle-double-right" style="padding-left: 5px;"></i></a></p>
  </section>
</article>
  
  

  </main>

  <a href="javascript:">
  <div id="back-to-top">
    <p class="backtotop">
      <i class="fa fa-lg fa-angle-double-up"></i>
      <a class="backtotoptext">Back to top</a>
    </p>
  </div>
</a>

  <footer class="site-footer">
  <div class="inner">
    <section class="copyright">A developer&rsquo;s thoughts on life, code, and the pursuit of happiness.</section>
  </div>
</footer>

  <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<script src="http://bethqiang.com/js/index.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.8.0/highlight.min.js"></script>

<script>hljs.initHighlightingOnLoad();</script>


<script>
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-85574806-1', 'auto');
ga('send', 'pageview');
</script>

</body>
</html>