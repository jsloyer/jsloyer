+++
categories = ["Tutorial"]
date = "2014-11-24T21:54:23-05:00"
description = ""
draft = false
image = "/original-images/devops.jpg"
tags = ["bluemix", "javaee", "cloudant", "watson", "liberty"]
title = "Deploying a Watson and Cloudant App with DevOps Services"
aliases = [
    "2014/11/24/deploying-a-watson-and-cloudant-app-with-devops-services/"
]
slug = "deploying-a-watson-and-cloudant-app-with-devops-services/"
+++

Backed by popular demand this is a continuation of the post [Building a Java EE app on IBM Bluemix Using Watson and Cloudant](/post/building-a-java-ee-app-on-ibm-bluemix-using-watson-and-cloudant/).

This post will detail how to build and deploy the app using [IBM DevOps Services.](http://jazzhub.com)

There is a bit of magic behind this, its called "The Deploy to Bluemix Button"...

Clicking the magic button below will setup the app using IBM DevOps services and deploy the whole application for you.

[![Deploy to Bluemix](https://deployment-tracker.mybluemix.net/stats/500deb1cbae77105c6d2ae42b50120cd/button.svg)](https://bluemix.net/deploy?repository=https://github.com/IBM-Bluemix/talent-manager.git)

So let's talk about what this magic button does.  The button is actually just a shortcut to setting up the deployment pipeline for you.  What it does behind the covers is the following.

1. Clones the git project
2. Configures the devops pipeline
3. Triggers the pipeline
    1. Compiles the `.war` file
    2. Deploys the application To Bluemix

Isn't that pretty cool?  Well what are you waiting for, click the button above!
