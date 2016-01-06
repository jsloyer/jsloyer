+++
categories = ["Sample Code", "Tutorial", "Video"]
date = "2015-01-03T22:19:30-05:00"
description = ""
draft = false
image = "/img/about-bg.jpg"
tags = ["bluemix", "cloudfoundry", "etherpad", "mysql"]
title = "Etherpad in Cloud Foundry – Quick Start Guide"
aliases = [
    "2015/01/13/etherpad-in-cloud-foundry-quick-start-guide/"
]

+++

Etherpad Lite is an awesome online collaboration platform.  Multiple open source projects use it for collaboration.  One of the most notable ones is the Openstack Project [Openstack Etherpad](https://etherpad.openstack.org/). To help you navigate the setup, this post provides step-by-step instructions to get things running. You may have read that Etherpad is complicated to install in a PaaS and there really isn’t a comprehensive quick start guide for running Etherpad-lite in Cloud Foundry. No worries, here is one!
<!-- more -->


### Login/Register for Bluemix


The first step is creating a Node.js app in Bluemix.  Let’s login to Bluemix, open a web browser and visit [Bluemix](http://bluemix.net/) and click LOG IN.  If you don’t have an account click, SIGN UP.  Since Etherpad-Lite is built using Node.js, we want to start with an empty Node.js app in Bluemix.  We will do this from the command line.

If you already have the CLI command line executable, you can skip this step.  If you don’t have it, follow the steps from the [Bluemix docs](https://www.ng.bluemix.net/docs/#cli/index.html#cli) on how to install the command line for your platform and how to set it up.  Once you get things setup you should be able to run `cf s` and get the following output:


    [01:30 PM] jsloyer@jeffs-mbp [blah]>cf s
    cf domains Getting domains in org jbsloyer@us.ibm.com as ...
    name status
    mybluemix.net shared


Your output will be slightly different (this is ok).  This was just a check to make sure things are setup correctly.  If you are getting an auth error or error that you aren’t pointing to Cloud Foundry, refer back to the docs, reply to this post, or post a question to [Stackoverflow](http://stackoverflow.com/questions/tagged/bluemix) for help.


### Upload Etherpad-Lite Code to Bluemix


OK, next we need to upload the Etherpad-Lite code to Bluemix. The version of Etherpad-Lite is a forked version of the Etherpad code that has made things easy for us with Cloud Foundry. So head on over to the [releases page](https://github.com/cloudfoundry-community/etherpad-lite-cf/releases) for `etherpad-lite-cf`.  Choose the latest, as of this writing it was version 1.4.1.  Download the etherpad-lite-cf.zip file.  We need to extract this file to a new folder—do not extract it in the folder it is sitting in.  For example, I extracted it into an empty folder called blah.  Make sure you do not have the zip file you downloaded in the newly created folder, it should just contain the extracted files:


    [10:50 AM] jsloyer@jeffs-mbp [blah]>pwd
    /Users/jsloyer/Downloads/blah
    [10:50 AM] jsloyer@jeffs-mbp [blah]>ls
    CHANGELOG.md Procfile node_modules src var
    CONTRIBUTING.md README.md package.json start.bat
    LICENSE bin settings.json tests
    Makefile doc settings.json.template tools



The next step is pushing the app to Bluemix.  Run the following command, replacing yourappname with a unique name for your app.  This name will also be the url to your app as well.  If you get an error mentioning the host is taken, just choose a different name.

```
cf push yourappname -m 512M -b https://github.com/cloudfoundry/nodejs-buildpack.git
```

The above is saying we are giving our app 512MB of memory and calling out a specific buildpack to use (in this case Node.js). This step will take awhile but eventually you should get the following output.


    0 of 1 instances running, 1 starting
    0 of 1 instances running, 1 starting
    0 of 1 instances running, 1 starting
    1 of 1 instances running
    App started Showing health and status for app jbs-etherpad3 in org jbsloyer@us.ibm.com / space demos as ...
    OK
    requested state: started
    instances: 1/1
    usage: 512M x 1 instances
    urls: jbs-etherpad3.mybluemix.net
    state since cpu memory disk
    #0 running 2015-01-13 10:36:32 AM 0.0% 87.2M of 512M 242.1M of 1G


If you visit the url from above, Etherpad will be functional, however it is using a built-in database and this isn’t what we want.  We want to back in with MySQL.


### Create and bind a database to our app


Next, we need to create a service to allow Etherpad to connect to our database.  To do that, let’s go back to the Bluemix UI.  In the top click on Dashboard, you should see the app you created.  Let’s go ahead and click on it.

To add the service Bluemix will provision and bind a service to our app for us.  Click "Add A Service" and scroll down to data management.  We want ClearDB for this app.  Click on ClearDB.  ClearDB is a hosted version of MySQL.  Everything on the right should be pre-populated so let’s just click "Create".  If things are not pre-populated, choose the appropriate app, the one we just created.

It will ask if you want to restage the app, that is fine, so click RESTAGE.

![restage Etherpad in Cloud Foundry – Quick Start Guide](/images/2015/06/restage.jpg)


### Configure the app with ClearDB (MySQL)


To switch the app over to MySQL, we need to edit the `settings.json` for the app and then re-upload the app to Bluemix. You will need to replace the value DATABASE on line 9 with the name of your ClearDB service.  To get this info, let’s go back to the Bluemix UI and our app.  If you click on "Show Credentials", it will give you the name of your ClearDB service, copy this.

![showcreds Etherpad in Cloud Foundry – Quick Start Guide](/images/2015/06/showcreds.jpg)

Copy the name, in this example it is "ClearDB MySQL Database-hu", without quotes.  I have highlighted below what you need to copy, don’t copy the quotes.  I have hidden my connection info to my database so my database can’t be hacked.

![dbname Etherpad in Cloud Foundry – Quick Start Guide](/images/2015/06/dbname.jpg)

Open up settings.json with your favorite text editor and on line 9 replace DATABASE with the name of your ClearDB service that we copied from above.  Save the file. Here is my line 9:
```
"dbService": "ClearDB MySQL Database-hu",
```

The last step is re-pushing our app to Bluemix since we made a change to it.  To do this we need to use the push command we used above:

```
cf push yourappname -m 512M -b https://github.com/cloudfoundry/nodejs-buildpack.git
```

Eventually it should show us that our app is running, my output is below:


    0 of 1 instances running, 1 starting
    0 of 1 instances running, 1 starting
    0 of 1 instances running, 1 starting
    1 of 1 instances running
    App started Showing health and status for app jbs-etherpad3 in org jbsloyer@us.ibm.com / space demos as ...
    OK
    requested state: started
    instances: 1/1
    usage: 512M x 1 instances
    urls: jbs-etherpad3.mybluemix.net
    state since cpu memory disk
    #0 running 2015-01-13 10:36:32 AM 0.0% 87.2M of 512M 242.1M of 1G


So if we visit the url it gave us, Etherpad should be up and running.  If you run into issues please post a comment here or post to [Stackoverflow](http://stackoverflow.com/questions/tagged/bluemix).


### SSL


Bluemix provides SSL out of the box for your app.  If your app is running at **http**://jbs-etherpad3.mybluemix.net you are given SSL for free.  To use SSL, just access your app over https, for my example it would be **https**://jbs-etherpad3.mybluemix.net.  If you want to use SSL with your own domain name and certificate, you can do this also!  See [SSL Certificates and Bluemix Custom Domains](https://jeffsloyer.io/2014/08/18/inbound-ssl-in-bluemix/) on how to do it.

For more info about SSL in for free in Bluemix check out the following video.

<iframe width="560" height="315" src="https://www.youtube.com/embed/3Y0wLQcXbQ0" frameborder="0" allowfullscreen></iframe>


### Caveats






  * The biggest issue to me is that this deployment of Etherpad only allows 1 instance. While this works for development and testing, it is not suitable for production.  This is a limitation right now of Etherpad in the way it uses socket.io and sessions. If you need more capacity, just bump up your RAM for your app.




### Instructions adapted from these references






  * [https://github.com/cloudfoundry-community/etherpad-lite-cf#using-database-from-user-provided-service](https://github.com/cloudfoundry-community/etherpad-lite-cf#using-database-from-user-provided-service)


  * [http://arthurh.fr/blog-Install-etherpad-lite-with-cloudfoundry](http://arthurh.fr/blog-Install-etherpad-lite-with-cloudfoundry)


