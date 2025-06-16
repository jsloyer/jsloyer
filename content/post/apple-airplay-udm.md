+++
categories = ["Tutorial"]
date = "2020-08-30T23:24:00-05:00"
description = "Cross VLAN traffic with a UDM/UDM-Pro and Apple Airplay"
draft = false
image = "/original-images/2020/sound_mixer.jpg"
tags = ["apple", "udm", "firewall", "unifi", "ubiquiti", "airplay"]
title = "Cross VLAN traffic with a UDM/UDM-Pro and Apple Airplay"
slug = "apple-airplay-udm/"
+++

# Background
As a follow on from a [previous post](/apple-airplay-usg) I discussed how to enable the IGMP Proxy in the USG product line to permit cross VLAN mDNS traffic.  In the UDM/UDM-Pro line its a bit different.  There is `config.gateway.json` file anymore.  There are multiple workarounds out there to run Docker containers to add in extra functionality, however this is not one of them.

If you are looking to bypass your AT&T gateway then you will need to head down the Docker path, but if you are looking for just Airplay across VLAN's you have arrived at the correct article.

# Instructions
If you followed my [previous blog post about cross VLAN traffic with Sonos and the USG](/sonos-usg-firewall-ports) it talked about how to lock down communications from the IoT VLAN to the data VLAN and allow pinholes through for Sonos.  To get things working for Apple Airplay it was actually pretty easy.  First you need to make sure you have mDNS turned on.  To check this do the following.

1. Enable mDNS
    1. Goto settings in your controller
    2. Goto the services tab on the left
    3. Click mDNS at the top
    4. Make sure the toggle is set to `On`
    5. Click apply changes
2. Enable multicast enhancement (IGMPv3)
    1. Goto settings in your controller
    2. Goto Wireless Networks
    3. For each of the wireless networks that the Airplay devices are on and your source VLAN (ex data -> IoT) VLAN's you will want to
    turn on `multicast enhancement (IGMPv3)`.  Scroll down the page to find the option for each of your wireless networks.


The next step is creating a single firewall rule.  The rule that needs to be created is an allow rule that allows established/related traffic to flow from any VLAN.  I have this as my base rule and then I add more restrictive rules after that.  See below for a screenshot.

**NOTE:**  You don't have to open things this wide open, you could just create a two rules that allows traffic to flow from the destionation VLAN to the source VLAN and vice versa.

This firewall rule should be created in the LAN_IN category.

[![udm screenshot from unifi](/images/2020/airplay-udm-1-medium.jpg)](/images/2020/airplay-udm-1-medium.jpg)

[![udm screenshot from unifi](/images/2020/airplay-udm-2-medium.jpg)](/images/2020/airplay-udm-2-medium.jpg)

[![udm screenshot from unifi](/images/2020/airplay-udm-3-medium.jpg)](/images/2020/airplay-udm-3-medium.jpg)

**Note:**  As with other allow rules this rule MUST go before your deny rules.


