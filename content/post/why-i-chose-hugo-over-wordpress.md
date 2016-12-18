+++
categories = ["Other"]
date = "2016-01-08T14:11:14-05:00"
description = ""
draft = false
image = "/original-images/migrate.jpg"
tags = ["wordpress", "migrate"]
title = "Why I Chose Hugo over Wordpress"

+++

I am finally back with my blog, sorry it has been quite awhile.  I just recently finished a migration of my blog my running on Wordpress, which was hosted on [WPEngine](http://wpengine.com) and is a really awesome service, to Github pages.  I got tired of using Wordpress and WPEngine cost me about $30/month...  So I decided to migrate the site to Github pages where I can run the site for free.

## Wordpress vs. Jekyll

So let's back up a bit and talk about why I first went with Wordpress.  It mostly came down to speed of getting my site up.  I took the easy way out, I didn't want have to deal with managing a VM and maintaing Wordpress so spent a decent amount of time reading about different hosting providers for Wordpress.  WPEngine consistently rose to the top mainly for its use of use and speed.  At this point I was also dabbling with Github pages but was using Jekyll and didn't have much luck with it.  When I was looking at using Jekyll it was being re-written, there was a version with a bunch of Ruby Gems and then a new version.  The Ruby Gems version had way more plugins and flexibility but the new version was much simplier to get up and running.  I honestly gave it a good try, I spent a couple hours trying to get things working and I couldn't.  I am someone who usually never gives up on something, by gosh I'll get that squre to fit into a circle...

[![square into a cirlc](/images/circle-into-square-thumb.png)](/images/circle-into-square-thumb.png)

But this time, I had to throw up the white flag...  I just couldn't deal with Jekyll anymore, this is when I decided to jump in feet first with WPEngine.

[![white flag](/images/white-flag-thumb.jpg)](/images/white-flag-thumb.jpg)

## Life with WPEngine

Life was good with WPEngine.  It was really easy to crank out a bunch of blog posts, I mean Wordpress has a great [WYSIWYG editor](https://en.wikipedia.org/wiki/WYSIWYG).  I eventually got my site up and running an launched the site!

I then realized I needed to optimize the site for speed and SEO.  My first task was enabling SSL.  This was incredibly easy with WPEngine, just pay them $53 bucks for a year and you get an SSL cert, that was easy...

[![easy](/images/easy-thumb.jpg)](/images/easy-thumb.jpg)

My next order of business was increasing the speed of Wordpress, WPEngine already does a lot and their infrastructure is top notch but Wordpress needs some help to speed itself up.  I followed some stepson speeding up Wordpress, most of it involved caching, minifying, and uglfying assets.

Life was pretty good at this point but as the site continued to grow it became slower and slower...

## Time for a change

I was talking to a [colleague from work, Raymond Camden](https://twitter.com/raymondcamden) about our blogs and he mentioned I should check out Hugo.  Basically I kind of stopped blogging because WPEngine was too easy, plus I needed a Holiday project as well over Christmas.  I started looking into Hugo and could of not been more happy!!!

Basically Hugo is a static site generator liked Jekyll but way more simplier.  Plus Hugo is written in Go and I have been recently learning Go so I was sold!

## Hugo vs. Wordpress

So honestly you really can not beat the speed of a static site.  Wordpress no matter what has to query a database for every request and that adds up.  I decided to run my Hugo generated blog on Github Pages for even more speed.  Github fronts themselves with [Fastly](http://fastly.com), which is probably the coolest and most pimp CDN out there.  Its super fast, like no one can beat them on time to first byte.  Fastly uses SSD's in the cache machines so delivering content is blazing fast.  Additionally Fastly has an API to configure your site and basically allows you to do everything programatically, plus they have self on-boarding, a big plus that you don't have to call some sales person...

I have been using markdown a bit more recently and I felt like this time I was more prepared to jump into markdown.  My Hugo site uses marketdown for the content files then HTML for the theme.  Its really nice that you can keep your content stored in markdown and its agnostic of the presentation layer (the theme).  If you don't want to use markdown thats ok, you can create your content in HTML as well.

Additionally, with Hugo I am storing my site on [Github](http://github.com/jsloyer/jsloyer) and I check in source content and source files such as images.  My build process uses [Wercker](http://wercker.com) to build my static site and to generate the correctly sized images for my blog as well.  Plus Wercker auto-deploys my site to Github Pages whenever there is a checkin!

## Migrating the site

In my [next post](/post/why-i-chose-hugo-over-wordpress/) I will go through how I migrated my site from Wordpress to Hugo.  Hope this has been informative and hopefully interesting.  Please leave some comments below!

Also please follow me on Twitter at [@jsloyer](http://twitter.com/jsloyer) and follow me on [Youtube](https://www.youtube.com/channel/UCQb6E0NWy6kVglreLNigxng)!
