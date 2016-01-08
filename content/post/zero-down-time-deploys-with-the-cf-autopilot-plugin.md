+++
categories = ["Sample Code", "Video", "Tutorial"]
date = "2015-06-19T10:41:59-05:00"
description = ""
draft = false
image = "/original-images/unplug.jpg"
tags = ["bluemix", "devops", "zero downtime", "cloudfoundry"]
title = "Zero Downtime Deployment with the CF Autopilot Plugin"
alises = [
  "2015/06/19/zero-down-time-deploys-with-the-cf-autopilot-plugin/"
]

+++

Zero down time deployments are a must for any Internet app running at scale.  Without the use of zero down time deployments, you would have to take down your application even just for a fraction of a second but in that fraction of a second you could lose a transaction or a purchase from a customer.  This is not acceptable anymore.  Some people like to call these apps cloud based apps, which I think is fine, but I’d rather call them Internet scale or born on the cloud apps.  The companies who create these apps understand the apps’s need to stay up, because their app is their only lifeline and, hopefully, a source of income from the world.

Companies such as Facebook, Etsy, and Twitter have been using zero down time deployments for years.  They thrive because they do multiple deployments to production a day.  The number of deployments they do in one day is actually larger than most enterprise companies do in a full year.  Part of the trick is that the code changes are small but they have employed strategies such as zero down time deployments to get code into production as fast as they can.
<!-- more -->


## Ground Rules…


There are many names for this, zero down time deployments, obviously, but some people use the term blue/green, while others use the term red/back.  They all mean the same thing.  Instead of having a bias for colors in this post lets use the term “zero down time”.

So what is it?

Zero Down time deployments are basically what they sound like.  You update production without taking downtime.  It’s not always that simple though.  For the context of this post we are going to be talking about how to do zero down time deployments in Cloud Foundry.

Basically it’s a little trick to taking advantage of the way Cloud Foundry runs underneath the covers.  Before we jump into it, there are a couple of caveats that we should discuss first.  To successfully take advantage of zero down time deployments you should have followed the [12 Factor App guidelines](http://12factor.net/). This will ensure that your app is horizontally scalable and can be deployed in a manner that will result in zero down time.  Below are some highlights that you should abide by.




  1. Do not store sessions on disk or in memory.  Store them in some type of shared database or file system.  This could be your favorite database or an in memory database as well.


  2. Do not store configuration information in your application or on disk.  You should store your config info for your app in environment variables.


  3. This is probably the most important, your application needs to be forward and backwards compatible with your database schema…  Say what?  Yes, you need to trust your developers to manage the database schema from your code.If you are using a relational database, you will need some kind of framework to do database migrations for you.  It’s not just that simple with relational databases though…  If you have a big database migration DO NOT PERORM MIGRATIONS THAT WILL INTERRUPT TRAFFIC!  Perform them slowly over time where migrations do not impact users and traffic.  Yahoo had a major application upgrade and it took them 6 months to do the migration to avoid impacting users and taking an outage.  Remember we do not take outages…  If you are in NoSQL land, your life is easier.  Just revision your API’s and educate your developers on forward and backwards data compatibility.




## Importance of Zero Down Time Deployments


So why are zero down time deployments so important?  The answer is simple, to keep your website/app up so you can make money!  Well that might be over-simplified a bit, but basically it all boils down to keeping your app up so you can continue to do what you do best, and hopefully that involves making money.  If you look at Facebook, for example, they put code into production weeks and months before a feature is exposed to the public.  They extensively test the features on employees first, then slowly enable the features to the rest of the world.

This is key, getting features in front of your customers and getting feedback from them.  If it works that’s great, but if it doesn’t at least you know in a short time frame so you can remove it and pivot to go in a different direction.  The current landscape is so fast paced that if you don’t get a feature out, your competition could beat you.


## How does it work?


So let’s walk through what needs to happen to perform zero downtime deployments in Cloud Foundry.  For the use of the walk-through, the application is currently taking traffic on `myapp.mybluemix.net`.




  1. Deploy your app or use a currently running app.
Currently your application is taking traffic on `myapp.mybluemix.net`.
[![zero downtime graphics.001 Zero Down Time Deploys with the CF Autopilot Plugin](/images/2015/06/zero-downtime-graphics.001-medium.png)](/images/2015/06/zero-downtime-graphics.001-medium.png)


  2. Deploy the new version of your app to `myapp-temp.mybluemix.net`.
At this time there is currently two versions of your app running.  `myapp.mybluemix.net` is still taking production traffic.
The new app `myapp-temp.mybluemix.net` is separate, it can be pointed to your production API keys and databases at this point.
[![zero downtime graphics.002 Zero Down Time Deploys with the CF Autopilot Plugin](/images/2015/06/zero-downtime-graphics.002-medium.png)](/images/2015/06/zero-downtime-graphics.002-medium.png)


  3. Perform smoke tests on the new version of the application.
Some people say this step is optional, but to me its not.  This is key to make sure there wasn’t any weird regressions or merge issues, they CAN happen…


  4. Map production traffic to the new version of your app.
At this point the old version of your app and the new version are both taking production traffic.
[![zero downtime graphics.003 Zero Down Time Deploys with the CF Autopilot Plugin](/images/2015/06/zero-downtime-graphics.003-medium.png)](/images/2015/06/zero-downtime-graphics.003-medium.png)


  5. Unmap production traffic from the old version of the app.  You can optionally delete the old version as well.
At this point the new version becomes production and ONLY it is taking traffic.
The new version still has two URL’s though, `myapp.mybluemix.net` and `myapp-temp.mybluemix.net`.
[![zero downtime graphics.004 Zero Down Time Deploys with the CF Autopilot Plugin](/images/2015/06/zero-downtime-graphics.004-medium.png)](/images/2015/06/zero-downtime-graphics.004-medium.png)


  6. Remove the temporary route `myapp-temp.mybluemix.net` from the new version of your app.
[![zero downtime graphics.005 Zero Down Time Deploys with the CF Autopilot Plugin](/images/2015/06/zero-downtime-graphics.005-medium.png)](/images/2015/06/zero-downtime-graphics.005-medium.png)


While this can be scripted there really isn’t a need to do that, there is a Cloud Foundry CLI plugin to do this.


## Autopilot plugin


Recently the Cloud Foundry CLI started supporting plugins.  This is the holy grail for CF and you can start doing some fun stuff.  In this case, the fun stuff is automating the complex, possibly human error-prone, steps above.  As a dev, if I can automate something and reduce the chance of something going wrong, I am all in.  If you do this, your IT/operations department will love you.

[The plugin](https://github.com/concourse/autopilot) performs the above steps for you for performing the zero downtime deployment.




  1. Ensure you have a [Bluemix](http://bluemix.net/?cm_mmc=Display-JeffSloyer.io-_-BluemixSampleApp-AutoPilotPlugin-_-Node-WatsonPersonalityInsights-_-BM-DevAd) account, if you do not sign up [Bluemix](http://bluemix.net/?cm_mmc=Display-JeffSloyer.io-_-BluemixSampleApp-AutoPilotPlugin-_-Node-WatsonPersonalityInsights-_-BM-DevAd).


  2. Install dependencies.


    1. Golang installed ([instructions](https://golang.org/doc/install))


    2. Version 6.7.0 or greater of the Cloud Foundry CLI
    To check what version you have running, run `cf -v` in your terminal.


            [01:36 PM] jsloyer@jeffs-mbp-2 [~]>cf -v
            cf version 6.8.0-b15c536-2014-12-10T23:34:29+00:00


    To upgrade go [here](https://github.com/cloudfoundry/cli/releases).

  3. Ensure you have an app running/already deployed.  The plugin requires that you have an app already deployed.


  4. Run the following.  I will describe what each line is doing.

        go get github.com/concourse/autopilot
        cf install-plugin $GOPATH/bin/autopilot
        cf login -a ${CF_API} -u ${CF_USERNAME} -p ${CF_PASSWORD} -o ${CF_ORG} -s ${CF_SPACE}
        cf zero-downtime-push myapp -f manifest.yml

    Line 1 fetches the source code for the plugin.
    Line 2 installs the plugin
    Line 3 logins into Bluemix.  I have the sensitive information replace with environment variables.
    Line 4 performs the zero down time deployment.


The plugin does require a `manifest.yml`.  The plugin basically views the `manifest.yml` files as the truth of the state of the application.


## Extensions with CI Pipelines


This will be forthcoming in an upcoming blog post on how to use some of the most popular CI engines out there.


## Recap


Just to review what we did here, we learned what zero down time deployments are, why they are crucial to any Internet scale application, and how to perform a zero down time deployment.  Then, we took it a step further on how to use a Cloud Foundry plugin to do the heavy lifting for us and automate the zero down time deployment.

I would love to hear your feedback and any suggestions you have, please reach out to me on Twitter [@jsloyer](https://twitter.com/jsloyer target=)


## Video


I have also published a video if you prefer to watch that instead, please check out [Zero Downtime Deployment with the CF Autopilot Plugin – Video.](/post/zero-downtime-deployment-with-the-cf-autopilot-plugin-video/)


## Additional part's






  * [Zero downtime deployments with Bluemix and Codeship](/post/zero-downtime-deployments-with-bluemix-and-codeship/)
