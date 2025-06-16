+++
categories = ["Other"]
date = "2015-07-29T10:58:25-05:00"
description = ""
draft = false
image = "/original-images/fedup.jpg"
tags = ["bluemix", "php", "buildpack"]
title = "Common Deploy Errors with Community Buildpacks in Bluemix"
aliases = [
    "2015/07/29/cloud-foundry-php-buildpack-doesnt-support-lucid64/"
]
slug = "cloud-foundry-php-buildpack-doesnt-support-lucid64/"
+++

Recently the company that owns development for Ubuntu (Canonical) just announced it is dropping support for lucid 64 which is Ubuntu 10.04 LTS.  What does this mean for Cloud Foundry and the community buildpacks?

Well nothing really but there is a couple gotcha's you should know about.

I have seen issues with the following buildpacks, this is not a comprehensive list but the ones I at least know about.




  * PHP - https://github.com/cloudfoundry/php-buildpack.git


  * Static Build Pack - https://github.com/cloudfoundry/staticfile-buildpack.git


These issues are documented in a couple StackOverflow posts but we are going to go through what is causing it and how to fix it.

<!-- more -->


  * [Static Buildpack](http://stackoverflow.com/questions/31057357/static-buildpack-deploy-now-failing-due-to-unsupported-stack/31058075#31058075)


  * [Static Buildpack](http://stackoverflow.com/questions/31057357/static-buildpack-deploy-now-failing-due-to-unsupported-stack/31062482#31062482)


If you are pushing an app to Cloud Foundry and getting an error message like the following there is a workaround you need to do to get the community buildpack's to work.

For example I have a super simple PHP app on Github I use for debugging, it is located here. For this blog post we are going to use that app.

```
git clone https://github.com/jsloyer/phpinfo.git
cd phpinfo
cf push phpinfo-jbs2 -b https://github.com/cloudfoundry/php-buildpack.git
.....
It looks like you're deploying on a stack (currently set to *lucid64*) that's not supported by this buildpack.
That could be because you're using a recent buildpack release on a deprecated stack.
If you're using the buildpack installed by your CF admin, please let your admin know you saw this error message.
If you at one point specified a buildpack that's at git URL, please make sure you're pointed at a version that supports this stack.
Staging failed: Buildpack compilation step failed

FAILED
BuildpackCompileFailed
```


What this is saying is the instance of Cloud Foundry that you are running on the default stack you get is an old version of Ubuntu. The PHP buildpack excepts the newer version of linux. This stack is called `cflinuxfs2` also known as `Ubuntu 14.04`.

To work around this you just need to specify the stack you want to use.

```
cf push phpinfo-jbs2 -b https://github.com/cloudfoundry/php-buildpack.git -s cflinuxfs2
```

More information can be found on this issue on [Github](https://github.com/cloudfoundry/php-buildpack/issues/87).
