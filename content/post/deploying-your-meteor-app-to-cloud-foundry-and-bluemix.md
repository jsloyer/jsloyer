+++
categories = ["Tutorial", "Sample Code"]
date = "2015-08-05T11:03:35-05:00"
description = ""
draft = false
image = "/images/meteor.jpg"
tags = ["bluemix", "meteor", "mongodb", "websockets"]
title = "Deploying your Meteor app to Cloud Foundry and Bluemix"
aliases = [
    "2015/08/05/deploying-your-meteor-app-to-cloud-foundry-and-bluemix/"
]

+++


[![meteor-logo](/images/2015/07/meteor-logo-300x71.png)](/images/2015/07/meteor-logo.png)Meteor is a pretty powerful and cool framework for developing modern webapps all in Javascript.  It provides some really cool things as a modern UI, responsive code that works on a desktop and a mobile device, and some really slick features with websockets with client and server side rendering.

I heard about Meteor mid-2014 but it peaked my interest last week when I was at a customer and a developer at the customer was building a Meteor app and they were asking how to run it on Bluemix.  Of course doing my job I helped the developer get the app running but it took a couple tweaks to the Cloud Foundry buildpack for Meteor.<!-- more -->

You might be asking what a buildpack is, that's totally fine.  In Cloud Foundry you can use basically any language you want for your app, all you need is some code to laydown the app server or middleware and compile your code together and install dependencies.  For Meteor there is a buildpack available but it was slighly out of date.

Last week and this week I committed some changes to the buildpack to make it more robust and compatible for newer Meteor apps.

The buildpack now will allow you to use your existing Meteor app and push it to Cloud Foundry and Bluemix.

For the rest of this blog post I am going to walk through on how to build an example Meteor app and push it to Bluemix.


## Pre-req's

  * Sign up for a [Bluemix](http://bluemix.net/?cm_mmc=Display-JeffSloyer.io-_-BluemixSampleApp-MeteorSample-_-Node-MongoLab-_-BM-DevAd) account.  Go [Bluemix](http://bluemix.net/?cm_mmc=Display-JeffSloyer.io-_-BluemixSampleApp-MeteorSample-_-Node-MongoLab-_-BM-DevAd) and click on Sign-up in the top right hand corner.
  * Meteor installed locally, go [Meteor install](https://www.meteor.com/install) to install Meteor
  * Cloud Foundry Command Line (CLI) installed, go [install CLI](https://www.ng.bluemix.net/docs/#starters/install_cli.html) for instructions

## Steps

1. Create a sample Meteor app, we are going to use the leaderboard example

        meteor create --example leaderboard


2. Push the sample app to Bluemix. **Note**, this command will not start the app, we will need to choose our database next. Also replace leaderboard with a unique name for your app, for example leaderboard-jbs (my intials).

        cf push leaderboard -b https://github.com/cloudfoundry-community/cf-meteor-buildpack.git --no-start


3. Next we need to choose if we want to use the built on Mongo DB with Cloud Foundry or an external third party MongoLab. It honestly doesn't matter too much but MongoLab is built for scale is more reliable, I would choose MongoLab myself.

    **Built in MongoDB:**

    1. Create the database.
            cf create-service mongodb 100 leaderboard-mongodb

    2. Connect the database to our app. Replace leaderboard with the name of your app (ex. leaderboard-jbs).

            cf bind-service leaderboard leaderboard-mongodb

        would then become

            cf bind-service leaderboard-jbs leaderboard-mongodb


    **MongoLab:**

    1. Create the database.
            cf create-service mongolab sandbox leaderboard-mongolab



    2. Connect the database to our app. Replace leaderboard with the name of your app (ex. leaderboard-jbs).

            cf bind-service leaderboard leaderboard-mongolab

     would then become

            cf bind-service leaderboard-jbs leaderboard-mongolab

4. Start the application. Replace leaderboard with the name of your app

        cf start leaderboard


Open up two web browsers and goto the same url, for me my URL would be http://leaderboard-jbs.mybluemix.net.  I got this url by putting the name of my app in front of mybluemix.net.

In the video below you can see when you choose a player and then click add 5 points the other browser is updated instantly.  The example app is saving this information in the Mongo database then using websockets to notify all the connected clients of the change.  This is one of the really powerful features of Meteor.



The work with the developer at the client last week has renewed my interest in Meteor and will have to dig into it more.

If you prefer to watch a video of this as well, check out Video – [Deploying your Meteor app to Cloud Foundry and Bluemix](https://jeffsloyer.io/2015/08/24/video-deploying-your-meteor-app-to-cloud-foundry-and-bluemix/).

I would love to hear your feedback and any suggestions you have, please reach out to me on Twitter [@jsloyer](https://twitter.com/jsloyer target=).  There will also be a video forth coming as well.
