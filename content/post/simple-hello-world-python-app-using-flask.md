+++
categories = ["Video", "Tutorial", "Sample Code"]
date = "2015-03-30T10:17:51-05:00"
description = ""
draft = false
image = "/original-images/helloworld.png"
tags = ["bluemix", "flask", "python"]
title = "Simple Hello World Python App using Flask"
aliases = [
    "2015/03/30/simple-hello-world-python-app-using-flask/"
]

+++


Hey Y’all!  Jeff here again, today we are going to be going through some really simple steps to get started deploying a simple hello world python app using Flask on Bluemix.

[Flask](http://flask.pocoo.org/) is an awesome and really lightweight framework in Python to create powerful webapps.  We are going to use it make a really simple hello world app in Python though.
<!-- more -->

In this post we are going to go through the written instructions on how to do it but if you prefer watching a video check out the video below.

<iframe width="560" height="315" src="https://www.youtube.com/embed/b-SF3bgaQTw" frameborder="0" allowfullscreen></iframe>

In this tutorial we are going to go through two steps to deploy the app.  One is a simple click a button to deploy to your app, we will go through that first.  The second approach is a little more in depth and involves installing a command line tool to upload the application.  This is great and preferred if you will be editing the code or you want to dig into the nuts and bolts of things.


## Simple Getting Started Steps

  1. Sign up for a Bluemix account, visit [http://bluemix.net](http://bluemix.net/?cm_mmc=developerWorks-_-dWdevcenter-_-bluemix-_-lp) in your web browser and click “Sign-up” in the top right.  We require a couple bits of information


  2. Wait for an email to arrive, it should only take a couple minutes.  There should be a link in the email that says “Click here to complete your registration”, click that.  Sign in with the username and password you created from step 1.


  3. Click the button below (this will deploy the app for you).

    [![button Simple Hello World Python App using Flask](/images/2015/03/button-medium.png)](https://bluemix.net/deploy?repository=https%3A%2F%2Fgithub.com%2FIBM-Bluemix%2Fpython-hello-world-flask.git&cm_mmc=developerWorks-_-dWdevcenter-_-bluemix-_-lp)


  4. You will come to a page that has a button called “Login”.  Go ahead and click that.


  5. Next you will be taken to a page that asks you to create an alias.  If my email address was jeff.davis251@gmail.com I would use jeffdavis251.  Hint it doesn’t like periods ![icon smile Simple Hello World Python App using Flask](/images/2015/03/icon_smile-medium.gif)


  6. Click Create.


  7. It will take you to another page, click “Continue”.


  8. Now everything is basically setup, it will take us to a page that looks like what is below, just click the “Deploy” button.
[![deploybutton1 1024x541 Simple Hello World Python App using Flask](/images/2015/03/deploybutton1-1024x541-medium.png)](/images/2015/03/deploybutton1-medium.png)


  9. Grab a cup of coffee or take a bathroom break, well a quick one!  It will only take a minute or two to deploy the app.


  10. In a hot second you should be taken to a page that looks like what is below.  To view your hello world app just click the button “View your App”.
[![deploy done 1024x544 Simple Hello World Python App using Flask](/images/2015/03/deploy-done-1024x544-medium.png)](/images/2015/03/deploy-done-medium.png)


Thats it for the quick and easy steps.  Let’s go through the more advanced steps where you can modify the code and upload the app from your own machine.


## A little more involved steps
  1. This will assume you have signed up for an account, steps 1 and 2 from above.  If you haven’t signed up for an account scroll up and do that now.


  2. Install Git, follow the instructions from [here](http://git-scm.com/book/en/v2/Getting-Started-Installing-Git).


  3. Install the Cloud Foundry command line.  Choose the appropriate installer from [here](https://github.com/cloudfoundry/cli/releases) and download it and run the installer.  You might be asking what Cloud Foundry is, its the open source Platform as a Service that Bluemix is built on.


  4. Open up the terminal/command prompt
Mac – Click on the finder icon in the top right, search for terminal and open that
Linux – Depends on your distro, but you probably know where it is, in the menu look for accessories usually then terminal, open that
Windows – Click the start button, search for cmd, open that


  5. Type the following.  The following commands downloads the starter app and puts us into the right directory to deploy the app.


        git clone https://github.com/IBM-Bluemix/python-hello-world-flask.git
        cd python-hello-world-flask

  6. Next we need to login to Bluemix, we will use the terminal window that we already have open for this.


        cf login -a https://api.ng.bluemix.net


    __Note__: It will ask for your username and password, this is the one you just created.


  7. Last step, we just need to upload the app, run the following replacing myappname with the URL you want your app to be available at.  Bluemix will give you a URL based on this name.  If I chose jeff-is-awesome, my app would be available at http://jeff-is-awesome.mybluemix.net.


        cf push myappname


If you get an error mentioning something like below, that means someone already has an app using that URL, just choose another one and rerun the command


#### Error:

```
[01:54 PM] jsloyer@Jeffs-MacBook-Pro [python-hello-world-flask]>cf push jeff-is-awesome
Creating app jeff-is-awesome in org jbsloyer@us.ibm.com / space demos as jbsloyer@us.ibm.com...
OK

Creating route jeff-is-awesome.mybluemix.net...
FAILED
Server error, status code: 400, error code: 210003, message: The host is taken: jeff-is-awesome
```



#### Fix:

```
cf push myappname-unique
```

You will basically get some output that looks like the following.  It will give you the URL to access your app.  In this case the URL to my app is `http://jeff-is-awesome2.mybluemix.net`.

```
[02:05 PM] jsloyer@Jeffs-MacBook-Pro [python-hello-world-flask]>cf push jeff-is-awesome2
Updating app jeff-is-awesome2 in org jbsloyer@us.ibm.com / space demos as jbsloyer@us.ibm.com...

... snip ...

App jeff-is-awesome2 was started using this command `python hello.py`

Showing health and status for app jeff-is-awesome2 in org jbsloyer@us.ibm.com / space demos as jbsloyer@us.ibm.com...
```

## Wrapping Up


To recap we just went through two different ways to deploy a python app to Bluemix.  The first method is really quick so you can see the power of the platform and get something up and running quick.  The second approach used the command line so you can modify the app and hack on it and customize it.


## Feedback


Follow us on Twitter at [@IBMBluemix](http://twitter.com/IBMBluemix).

Follow the author of this blog post (Jeff Sloyer, one of our developer advocates) at [@jsloyer](http://twitter.com/jsloyer)
