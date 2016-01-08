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

+++

Backed by popular demand this is a continuation of the post [Building a Java EE app on IBM Bluemix Using Watson and Cloudant](/post/building-a-java-ee-app-on-ibm-bluemix-using-watson-and-cloudant/).

This post will detail how to build and deploy the app using [IBM DevOps Services.](http://jazzhub.com)

So let’s get started.
<!-- more -->




  1. Sign up for a Bluemix account @ [bluemix.net](http://bluemix.net/)


  2. Click catalog, click Liberty for Java, click Create, you will need to enter a unique name for the app,ex. talent-manager-johnsmith


  3. Click Add a Service


  4. Click User Modeling and then click Create


  5. Click Add A Service


  6. Click Cloudant and then click Create


  7. Click on Cloudant, click on Launch


  8. In the top right click on Add a New Database, type in `talent-manager`


  9. Click Replication on the left


  10. Click Remote Database, type in `https://jsloyer.cloudant.com/talent-manager`


    [![replicate Deploying a Watson and Cloudant App with DevOps Services](/images/2015/06/replicate1-medium.png)](/images/2015/06/replicate1-medium.png)

11. Type in your database name below, `talent-manager`, click Replicate

12. The password comes from Bluemix, switch back to Bluemix, click on Overview on the left,click on

    Show Credentials for Cloudant, copy the long password inside of the quotes for the field password

    [![password1 Deploying a Watson and Cloudant App with DevOps Services](/images/2015/06/password11-medium.png)](/images/2015/06/password11-medium.png)

13. Switch back to the Cloudant tab, click Continue Replication

14. Sign into jazzhub.com using the account you created from step 1 (it will ask you to create an account, just use the part in front of the @ sign in your email address)

15. Visit [ibm.biz/talent-manager-lab](http://ibm.biz/talent-manager-lab), click Edit at the top

16. Click fork on the left

17. Type in a name for your project, leave the rest of the information to their defaults and then click Save

    [![fork project Deploying a Watson and Cloudant App with DevOps Services](https://developer.ibm.com/bluemix/wp-content/uploads/sites/20/2014/11/fork-project-medium.png)](https://developer.ibm.com/bluemix/wp-content/uploads/sites/20/2014/11/fork-project-medium.png)
18. Edit `personafusion/manifest.yml`, change talent-manager (2 occurrences) to the name of your app

    (you can get this from the Bluemix tab you have open, its at the top of the page)

    Before:

        applications:
        - disk_quota: 1024M
          host: talent-manager
          name: talent-manager
          path: webStarterApp.war
          domain: mybluemix.net
          instances: 1
          memory: 512M



19. On the left click the second icon (its the git logo)

20. Place a check mark next to `manifest.yml`, type in a commit message, click Commit

21. On the left click Push

22. Click on Build and Deploy in the top left

23. Click on Advanced

24. Click on add a builder or the big plus sign on the left

25. Type in `personafusion` for Build Script Path, click Save

    [![builder Deploying a Watson and Cloudant App with DevOps Services](/images/2015/06/builder-medium.png)](/images/2015/06/builder-medium.png)

26. Click add a stage

27. Type in the name of your app (from step 17) in Application Name, click Save

    [![deploy Deploying a Watson and Cloudant App with DevOps Services](/images/2015/06/deploy-medium.png)](/images/2015/06/deploy-medium.png)

28. Click Request Build, (this should put a green check mark eventually), it will trigger a deploy

29. Once the deploy is done on the right you can visit your app at `appname.mybluemix.net`

    (replacing appname with your app name)

30. Voila you just deployed a Java webapp using Cloudant and Watson
