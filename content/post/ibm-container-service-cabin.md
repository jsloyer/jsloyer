+++
categories = ["Tutorial"]
date = "2017-03-29T09:45:24-05:00"
description = ""
draft = true
image = "/original-images/2015/06/1USIIGtkypiwhO6W4o8cwIw.jpeg"
tags = ["containers", "bluemix", "kubernetes"]
title = "Using Cabin with the IBM Bluemix Container Service"

+++
I haven't posted in awhile because I have taken a new role at IBM and helped lead the development of the
new IBM Bluemix Container Service that allows you to run managed Kubernetes clusters on IBM.

For a little background, IBM has introduced a managed Kubernetes Service, for more information
please read the announce post [here](https://www.ibm.com/blogs/bluemix/2017/03/kubernetes-now-available-ibm-bluemix-container-service/).

[Cabin](http://www.skippbox.com/cabin/) is a pretty cool mobile app that lets you manage your Kubernetes cluster through your Android or iPhone.  Check out the video below on a walkthrough of Cabin.

{{< youtube MzeEgu3gJRE >}}

## Create your Bluemix account

To get started you will first need a Bluemix account, head over to [bluemix.net](http://bluemix.net) and sign up.

## CLI Setup

Once you sign up you will need to download our CLI.  Head over to [http://clis.ng.bluemix.net](http://clis.ng.bluemix.net) to download our installer.  Open the installer and go through the prompts to install the CLI.

Once you have the CLI you will need to login to the CLI, to do that do the following.

```
bx login
```

It will ask for your username and password.  If you have an account already it might ask you to select an account, org, and space.

Once you are logged in you will need to download our plugin to create a Kubernetes cluster.  To do that do the following.

```
bx plugin install container-service -r Bluemix
```

## Create your Kubernetes Cluster

To create a free Kubernetes cluster run the following, replacing clustername with anything of your choosing:
```
bx cs init
bx cs cluster-create --name clustername
```


If you had a paid account you can create a cluster with the following command.  It might ask you for VLAN's.  If it does you can get your available VLAN's by running `bx cs vlans dal10`.

```
bx cs init
bx cs cluster-create --name clustername --datacenter dal10 --workers 3 --machine-type b1c.4x16
```

An example of choosing your own VLAN's you will see below.  Also, you can customize the machine type by listing all the available machine types, run `bx machine-types dal10`.  **Note** you will need to enter the VLAN ID.

```
bx cs init
bx cs cluster-create --name clustername --datacenter dal10 --public-vlan 12356 --private-vlan 67891 --workers 3 --machine-type u1c.16x64
```

## Setup Cabin
The following instructions are quite hacky and we will be rolling out something more permanent and easier in the near future.

First you will need to download the cluster config for your Kubernetes cluster.  You will need to wait until the cluster is provisioned.  To see if it's been provisioned run `bx cs clusters`.  Under `state` it should show `deployed`.

Next, you will need to download the Kube config, to do that run what is below replacing `clustername` with the name of your cluster.
```
bx cs cluster-config clustername
```

It will download a file and print out something like `export KUBECONFIG=/Users/jsloyer/.bluemix/plugins/container-service/clusters/jefftest/kube-config-prod-dal10-jefftest.yml`.  Run the command that it prints out, if you are on Windows it will be slightly different, it will start with `set`.

Next, you will need the hostname of your cluster, to get that run the following replacing `clustername` with the name of your cluster.
```
bx cs cluster-get clustername
```

You will want to copy the `Master URL`.  I have pasted mine below omitting my port and part of my IP.

```
$ bx cs cluster-get jefftest
Retrieving cluster jefftest...
OK
Name:		jefftest
ID:		xxxxxx
Created:	2017-03-28T22:54:50+0000
State:		deployed
Master URL:	https://169.47.xxx.xxx:xxxx
Ingress host:	-
Ingress secret:	-
Workers:	1
```

Lastly, you will need to get the token for your Kube cluster.  To do that run the following.

```
kubectl get secrets | grep default-token
```

It will output something like the following:
```
$ kubectl get secrets | grep default-token
default-token-gjswg      kubernetes.io/service-account-token   3         21h
```

In the following command replace xxxx with the couple of random characters from the command above.
```
kubectl get secret default-token-xxxx -o yaml | grep token
```

It is going to output a bunch of stuff, you are going to want to copy the value for `token` for the next step.

With the copied value for `token` run the following, **note** the following will only work on Mac or Linux...  You will want to replace token with the really long value you copied.

```
echo token | base64 --decode
```

If everything worked you have something outputted that starts with `ey`.  It if outputs some garbled text you probably copied it wrong, in writing this I missed a letter on the beginning of mine so be careful.

you can then use that in app for your token

Open up the Cabin app on your phone, if you havent downloaded it you can download it from Google Play or the App Store by searching for `cabin kubernetes`.

Open the app enter the `Master URL` from a couple steps above in the URL field, make sure you have `https://` and the port after the IP address.

Under authentication tap `Token`, paste in the value for the token from the previous step, remember it starts with `ey`, for a configured cluster, see the screenshot below.

![Cabin Setup](/images/cabin1-medium.jpeg)

Cabin is pretty cool, you can exec into containers and view logs and almost do anything with your Kube Cluster.  I would love to see the SkipppBox guys open source this...

![Cabin Overview](/images/cabin2-medium.jpeg)

![Cabin Pods](/images/cabin3-medium.jpeg)

Thats it, you are configured to connect to your Kubernetes cluster on the IBM Bluemix Containers Service.  Please leave any comments or feedback below.  If you are a Windows user I would love some comments on the steps to get this working :).

## Known Issues
 - tiller seems busted which deploys apps into the cluster.  For more info check out [this GitHub issue](https://github.com/skippbox/cabin-issues/issues/24).
