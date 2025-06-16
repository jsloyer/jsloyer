+++
categories = ["Tutorial", "Sample Code"]
date = "2014-11-24T22:06:16-05:00"
description = ""
draft = false
image = "/original-images/personality.jpg"
tags = ["node.js", "watson", "cloudant", "devops", "twilio", "bluemix"]
title = "Twitter Personality Comparisons Using Watson"
alises = [
    "2014/11/24/twitter-personality-comparisons-using-watson/"
]
slug = "twitter-personality-comparisons-using-watson/"
+++

Hey Yall!

We are back at it again with some demos!!!

Did you ever wonder if you and your favorite celebrity would be compatible if you met?? I sure do! Or did you ever wonder how you could become a better leader, I sure do. Today you would have to go Google the person and analyze posts and articles about them and be a personality expert to see if you have personality traits in common.

Gone are those days now!

Enter [FriendMe](http://friendme.mybluemix.net/)!  Your trusted personality comparison using IBM Watson. The answer to the above questions are easy now.  For example,  if I compared myself to the IBM Design Twitter account, I can see my personality is very much alike with the IBM Design team.  Thats good news for me because I never considered myself a designer…
[![jeff and ibm design Twitter Personality Comparisons Using Watson](/images/2015/06/jeff-and-ibm-design-medium.jpg)](/images/2015/06/jeff-and-ibm-design-medium.jpg)

<!-- more -->
For the leadership, personal, and professional case, Jerry Cuomo is a very successful leader at IBM. I can see that myself and Jerry share 5 out of the top 5 personality traits in common.  In my career development I can see I need to develop myself more as a transformational leader.

[![jeff and jerry Twitter Personality Comparisons Using Watson](/images/2015/06/jeff-and-jerry-medium.jpg)](/images/2015/06/jeff-and-jerry-medium.jpg)

Lastly, I am going to do one more comparison, between myself and Blake McGregor (a product manager for Bluemix).

[![jeff and blake Twitter Personality Comparisons Using Watson](/images/2015/06/jeff-and-blake-medium.jpg)](/images/2015/06/jeff-and-blake-medium.jpg)

So let’s jump right into it.

This app was written in about 6 hours, its built using obviously IBM Bluemix, Node.JS, Angular.JS, Bootstrap, JQuery, IBM Watson, Cloudant, and Twilio.

If you went to the link above, [here it is again](http://friendme.mybluemix.net/).  You can actually text the app.  If you text the app two Twitter handles it will tell you the compatibility between two people.

So the source code is available [on Github](https://github.com/IBM-bluemix/friendme).

First, we are going to walk through on how to deploy this app and get it working in Bluemix.  Secondly, we are going to walk through how to use the command line to deploy this app as well.

If you haven’t already sign up for a [Bluemix account](http://bluemix.net/?cm_mmc=developerWorks-_-dWdevcenter-_-bluemix-_-lp).  Once you have done that head over to[ jazzhub.com](http://jazzhub.com).  Login there with the username and password you created from your Bluemix account.  If you haven’t logged in yet to jazzhub it will ask you to create an id.  For example if my email is jsmith@co.com, I would create a username of jsmith.

First, let’s open a web browser and goto [https://github.com/IBM-bluemix/friendme](https://github.com/IBM-bluemix/friendme).  Since we already created an account or logged in jazzhub above we should be logged in.  On the right hand side near the top there should be a big button that says "Fork Project".  Let’s click that.

[
](/images/2015/06/fork-medium.png)[![fork 300x83 Twitter Personality Comparisons Using Watson](/images/2015/06/fork-medium.png)](/images/2015/06/fork-medium.png)

Let’s go ahead and enter a project name, for example friendme, you can name it anything you want though.  Next place a check mark next to "Make it Private", more on this later…  Next make sure an organization and space is shown, it should should your email address as the organization and the space should be dev.  Lastly, click "Save".

[
](/images/2015/06/fork2-medium.png)[![fork2 300x239 Twitter Personality Comparisons Using Watson](/images/2015/06/fork2-medium.png)](/images/2015/06/fork2-medium.png)

Next we need to create the app in Bluemix and setup some services.  So in a new browser window navigate to[ http://bluemix.net](http://bluemix.net/).  In the top right click login.

Once you login click on catalog and find SDK for Node.JS.  Go ahead and click on it.

[![node 269x300 Twitter Personality Comparisons Using Watson](/images/2015/06/node-medium.png)](/images/2015/06/node-medium.png)

Type in a name for your app, this will also be the URL for your app, remember this as we will need it later…  Then click "Create".

Behind the scenes Bluemix is spinning up a container for our app, setting up SSL, and setting up load balancing. In a traditional IaaS, you would have to do all this manually and it can take hours or days…

[![createapp 228x300 Twitter Personality Comparisons Using Watson](/images/2015/06/createapp-medium.png)](/images/2015/06/createapp-medium.png)

Next, we need to add some services to our app.  We need Watson and Cloudant.  Let’s do Watson first.  The Watson service that we want is User Modeling.  It will analyze text and determine someone’s personality.  So to do this let’s click "Add A Service".

[![addservice 300x76 Twitter Personality Comparisons Using Watson](/images/2015/06/addservice-medium.png)](/images/2015/06/addservice-medium.png)

Let’s go to the Watson section and click on "User Modeling".

[![usermodeling 300x115 Twitter Personality Comparisons Using Watson](/images/2015/06/usermodeling-medium.png)](/images/2015/06/usermodeling-medium.png)

It will bring up a dialog asking us to bind the service to our app, on the right hand side, click "Create".

[![usermodeling2 224x300 Twitter Personality Comparisons Using Watson](/images/2015/06/usermodeling2-medium.png)](/images/2015/06/usermodeling2-medium.png)

It will ask us if we want to restage the app, go ahead and click ok.  What this means is it needs to bind the service to the app and to do this it needs to restart it.

Next, we need to create a database, to do this let’s click on the Cloudant tile.

[![cloudantclick 300x221 Twitter Personality Comparisons Using Watson](/images/2015/06/cloudantclick-medium.png)](/images/2015/06/cloudantclick-medium.png)

Then let’s click on the launch button.

[![cloudantlaunch 300x103 Twitter Personality Comparisons Using Watson](/images/2015/06/cloudantlaunch-medium.png)](/images/2015/06/cloudantlaunch-medium.png)

Next we need to create a database, click on "Add New Database" in the top right.

[![addnewdb 300x48 Twitter Personality Comparisons Using Watson](/images/2015/06/addnewdb-medium.png)](/images/2015/06/addnewdb-medium.png)

Then enter a name for the database, let’s use friendme, if you use something else we will have to edit the code…  Go ahead and click "Create".

[![db 300x150 Twitter Personality Comparisons Using Watson](/images/2015/06/db-medium.png)](/images/2015/06/db-medium.png)

We can close out of Cloudant now.

So, since we are making API calls to Twilio and Twitter we need to register for API key’s.

Let’s do Twitter first, head on over to [http://apps.twitter.com](http://apps.twitter.com) and login with your Twitter username and password.

In the top right let’s click on "Create New App".  Type in a name and description for the app, the URL actually doesn’t matter but let’s type in something real.  Remember above the name you created for your app in Bluemix, let’s type that in.  For example http://friendme.mybluemix.net.  Replace friendme with the name of your app.

Click on the "Keys and Access Tokens" tab.  Under Access Tokens click "Create my access token".  Leave this tab open, we will need these API’s keys in a bit…

Next we need a Twilio phone number if you would like to be able to text your app.  If you don’t want to be able to text the app skip this section, you can use the UI of the app to interact with it.  Head on over to [https://www.twilio.com/try-twilio](https://www.twilio.com/try-twilio?promo=bluemix) and create an account.  If you already have an account go ahead and goto [https://www.twilio.com/user/account/phone-numbers/incoming](https://www.twilio.com/user/account/phone-numbers/incoming) or if you just created an account go there as well.

We need to buy a number, to do this click on "Buy Number" in the top right.  Make sure the number has texting capabilities.

[![twilio 300x137 Twitter Personality Comparisons Using Watson](/images/2015/06/twilio-medium.png)](/images/2015/06/twilio-medium.png)

Try to find one of the cheaper ones, the cheapest you can find is $1/month, not bad…

So once we buy the number we will need our API key’s.  They can be found at [https://www.twilio.com/user/account/settings](https://www.twilio.com/user/account/settings).  Leave this tab open like we did for Twitter, we will come back to this…

Ok so finally time to deploy our app.  To do this switch back to Jazzhub, click the "Build & Deploy" button in the top right.

[![buildanddeploy 300x53 Twitter Personality Comparisons Using Watson](/images/2015/06/buildanddeploy-medium.png)](/images/2015/06/buildanddeploy-medium.png)

Go ahead and click on "Advanced" to turn on deployments.

[![advanced 300x54 Twitter Personality Comparisons Using Watson](/images/2015/06/advanced-medium.png)](/images/2015/06/advanced-medium.png)

Click on "add a builder".

[![addabuilder 300x293 Twitter Personality Comparisons Using Watson](/images/2015/06/addabuilder-medium.png)](/images/2015/06/addabuilder-medium.png)

For builder type choose "Shell Script".

For the build script text area enter the following.


    #!/bin/bash
    echo "do nothing"


Since it is node we really don’t need a build here…  If this wasn’t a demo and real app we would probably run some unit tests and do some linting here…

Click on Save.

[![builderdone 300x228 Twitter Personality Comparisons Using Watson](/images/2015/06/builderdone-medium.png)](/images/2015/06/builderdone-medium.png)

Next we need to set up the deployment.  Click on "add a stage".

[![addstage 300x242 Twitter Personality Comparisons Using Watson](/images/2015/06/addstage-medium.png)](/images/2015/06/addstage-medium.png)

Make sure the app name matches the app name we created in Bluemix.

Last thing we need to do is modify the build script.  This is the only really confusing bit, you need to make sure you set this up correct or the app won’t work…

When you first click on "add a stage" it will look like the following...

[![deploybefore 300x239 Twitter Personality Comparisons Using Watson](/images/2015/06/deploybefore-medium.png)](/images/2015/06/deploybefore-medium.png)

The script will look like the following.
```
cf push "${CF_APP}" -n "${CF_APP}-${CF_SPACE}"

# View logs
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]
then
    cf logs "${CF_APP}" --recent
    exit $EXIT_CODE
fi
```

We will need to update it to the following.
```
cf set-env "${CF_APP}" TWILIO_PHONENUMBER "replaceme"
cf set-env "${CF_APP}" TWILIO_SID "replaceme"
cf set-env "${CF_APP}" TWILIO_TOKEN "replaceme"
cf set-env "${CF_APP}" TWITTER_ACCESSTOKEN_KEY "replaceme"
cf set-env "${CF_APP}" TWITTER_ACCESSTOKEN_SECRET "replaceme"
cf set-env "${CF_APP}" TWITTER_CONSUMER_KEY "replaceme"
cf set-env "${CF_APP}" TWITTER_CONSUMER_SECRET "replaceme"

cf push "${CF_APP}" -c "node lib/app.js"

# View logs
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]
then
    cf logs "${CF_APP}" --recent
    exit $EXIT_CODE
fi
```

For each of these values we need to substitute in the the correct values from the tab’s we kept open earlier from Twitter and Twilio.

If you remember earlier we made the project private, this was to prevent other people from seeing our secret access key’s.  DevOps Service will be rolling out a new over the coming weeks where you can find information for a public project.

Once you replace the values go ahead and click "Save".

Last thing to do is click "Request Build".  That should successfully complete and that will trigger a deployment of your app.

You can see the deployment is being performed by the following screen shot.

[![buildrunning 300x195 Twitter Personality Comparisons Using Watson](/images/2015/06/buildrunning-medium.png)](/images/2015/06/buildrunning-medium.png)

Once the deployment finishes you can click the link (name of your app) to your app to use it!

[![done 300x207 Twitter Personality Comparisons Using Watson](/images/2015/06/done-medium.png)](/images/2015/06/done-medium.png)

Please reach out to me on Twitter ([@jsloyer](http://twitter.com/jsloyer)) if you have any issues or post a comment below.
