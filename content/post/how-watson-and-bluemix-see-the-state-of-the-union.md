+++
categories = ["Sample Code", "Tutorial"]
date = "2015-01-21T09:45:24-05:00"
description = ""
draft = true
image = "/images/2015/06/1USIIGtkypiwhO6W4o8cwIw.jpeg"
tags = ["watson", "bluemix", "node.js"]
title = "How Watson and Bluemix see the State of the Union"
aliases = [
    "2015/01/21/how-watson-and-bluemix-see-the-state-of-the-union/"
]

+++


The State of the Union, a live broadcast that many Americans historically use as a tool to form opinions about the current political system, and gain insight from their Commander in Chief into the transparency of a system of checks and balances.  What is more interesting is the thoughts and underlying feelings between the State of the Union.  If we could figure out how the President is feeling or portraying himself, could we infer how the President will schedule and work with legislation and policy for the rest of the year?

![ How Watson and Bluemix see the State of the Union](/images/2015/06/1USIIGtkypiwhO6W4o8cwIw.jpeg)

If we tried to do this today, could we go back and re-read all of the State of the Unions and apply custom algorithms to help determine the sentiment behind the speeches?  This is no longer a dream, but a reality.  We can use [IBM Bluemix](http://bluemix.net/) to create an app that will pull in the speeches and leverage the IBM Watson User Modeling Service to analyze the speeches.

<!-- more -->

Wouldn’t it be interesting if we could compare the speeches from previous State of the Union addresses and compare the underlying sentiment behind them?  Today we can, and it is pretty easy.  MSNBC published [How a supercomputer sees the State of the Union](http://www.msnbc.com/msnbc/how-supercomputer-sees-the-state-the-union) explaining how they used IBM Watson to do this.  Let’s take it a step further, let’s build our app in about 5 minutes, and try it ourselves!


<blockquote>The biggest takeaway? This year’s State of the Union was surprisingly on-trend with the patterns established by previous speeches.Sam Petulla and Mina Liu – MSNBC</blockquote>


So let’s dig into how we could do this.

![BluemixSOTU3 How Watson and Bluemix see the State of the Union](/images/2015/06/BluemixSOTU3.gif)


### Let’s Build it!


The goal at the end of these couple steps is to have our own Node.js app that uses the User Modeling Service to analyze the 2015 State of the Union.




  1. So first we need to sign up for [Bluemix](http://bluemix.net/) if you don’t have an account.


  2. Once we have logged in visit the Catalog and at the top under Boilerplates let’s click on UserModeling Node.js, or go [directly here](https://console.ng.bluemix.net/catalog/personality-insights-nodejs-web-starter/).


  3. On the right hand side we just need to give our app a name.  This will be the URL we will access our app at.  Note, it needs to be unique, for my app I chose sotu-jbs, you can choose anything you want.![watsonappcreate How Watson and Bluemix see the State of the Union](/images/2015/06/watsonappcreate.jpg)


  4. Click Create.  What is happening behind the scenes is Bluemix is spinning up a Node.js starter app that will allow you to analyze the state of the union address with Watson.  Pretty cool huh?


  5. Bluemix will take you to a dashboard and after a little bit it will show you that your app is up and running.  To access our app, click the URL near the top of the dashboard under the name of our app.![apprunning1 How Watson and Bluemix see the State of the Union](/images/2015/06/apprunning1.jpg)![urlforapp How Watson and Bluemix see the State of the Union](/images/2015/06/urlforapp.jpg)


  6. Now the hard bit, we need to grab the full text of the speech.  This year was the first time the White House put out the full text of the speech, it is available on [CNN](http://edition.cnn.com/2015/01/20/politics/state-of-the-union-2015-transcript-full-text/index.html).  I have also made the full text available [here](https://dl.dropboxusercontent.com/u/66686/2015sotu.txt).  Copy this text.


  7. Go back to your app you created that just opened up.  It should show something like the following.  We want to clear the text and paste the full contents of the State of the Union.![usermodelingapp How Watson and Bluemix see the State of the Union](/images/2015/06/usermodelingapp.jpg)


  8. Click "Analyze".


That’s it.   You should have some output like the following. With Bluemix and Watson we were just able to analyze the sentiment/personality of the President in the 2015 State of the Union.

Personality with percentages:

![personalitysotu 461x1024 How Watson and Bluemix see the State of the Union](/images/2015/06/personalitysotu-461x1024.jpg)

Personality Visualization:

![visualizationsotu How Watson and Bluemix see the State of the Union](/images/2015/06/visualizationsotu.jpg)


### Wrap up


So let’s go over what we did, in a matter of less than 5 minutes we spun up a Node.js app, connected it to Watson and analyzed the State of the Union.  What Bluemix does for us is gives us a platform to run our apps and connects super cool and powerful services such as Watson to our apps in a matter of seconds.  In the image below, we can see our app running and that is connected to Watson.

![watsonconnected How Watson and Bluemix see the State of the Union](/images/2015/06/watsonconnected.jpg)

If you want to give this a try without deploying an app head over to the [User Modeling Demo in Bluemix](http://watson-um-demo.mybluemix.net/) and paste in your text.


### Learn More


If you want to learn more about other Bluemix services and Watson services go to the following links.




  * [Bluemix Solutions](https://console.ng.bluemix.net/?cm_mmc=developerWorks-_-dWdevcenter-_-bluemix-_-lp#/solutions)


  * [Bluemix Services](https://console.ng.bluemix.net/?cm_mmc=developerWorks-_-dWdevcenter-_-bluemix-_-lp#/store/cloudOEPaneId=store)


  * [Watson Services in Bluemix](https://console.ng.bluemix.net/?cm_mmc=developerWorks-_-dWdevcenter-_-bluemix-_-lp#/solutions/solution=watson)


  * [Watson Developer Cloud – User Modeling](http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/user-modeling.html)
