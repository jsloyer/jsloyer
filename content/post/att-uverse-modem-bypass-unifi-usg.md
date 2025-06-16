+++
categories = ["Tutorial"]
date = "2018-04-04T13:24:00-05:00"
description = ""
draft = false
image = "/original-images/secure.jpg"
tags = ["att", "unifi", "ubiquiti"]
title = "ATT Uverse Modem Bypass - UniFi USG"
slug = "att-uverse-modem-bypass-unifi-usg/"
+++

# Background
Ever since I have switched over to Ubiquiti's Unifi setup for my home I have been searching for a way to eliminate AT&T's
residential gateway from my setup.  I have AT&T Fiber and I detest AT&T's residential gateway.  I won't go into the reasons now but just
know the list is almost endless.  It would be great if AT&T just allowed you not to use that if you have a router of your own.  I would love
to see AT&T allow residential fiber customers on their PON network to bypass the ONT but that might be too much to ask.  I will gladly take
a set in the right direction by eliminating the residential gateway in my routing to the Internet.

I recently stumbled on some amazing instructions when researching why AT&T uses a public IP that isn't assigned to them, 1.1.1.1.  If you
aren't aware of 1.1.1.1, it's Cloudflare's new DNS servers that promise to be faster than Google's public DNS servers.  If you aren't using them I would highly encourage you to do so, check out [this](http://1.1.1.1/) for more information.  Turns out I found a blog post that
documented if you remove the AT&T gateway you can then route to 1.1.1.1 on AT&T's network and not get blocked.

If you don't have your own Unifi USG you can order one on Amazon.
<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ac&ref=qf_sp_asin_til&ad_type=product_link&tracking_id=jeffsloyer-io-20&marketplace=amazon&region=US&placement=B00LV8YZLK&asins=B00LV8YZLK&linkId=a6294bfe7ebd3dc2749c57258d5e2c5c&show_border=false&link_opens_in_new_window=true&price_color=333333&title_color=0066c0&bg_color=ffffff">
    </iframe>

If you don't have a Unifi Cloud Key you can use the following to get one off of Amazon also.

<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ac&ref=qf_sp_asin_til&ad_type=product_link&tracking_id=jeffsloyer-io-20&marketplace=amazon&region=US&placement=B017T2QB22&asins=B017T2QB22&linkId=95f00631c34a46551eb4cd2d8b3bb828&show_border=false&link_opens_in_new_window=true&price_color=333333&title_color=0066c0&bg_color=ffffff">
    </iframe>

Just a note here, I am not taking any credit for any of the instructions, I am just merely adding my custom work I needed to do to get it working.  The instructions were great actually, there is just a step at the end that is a little confusing and hard.  You have to generate
a custom config for your USG and its not straightforward on how to do this so I am posting my experience with it.

The original instructions can be found at [https://blog.taylorsmith.xyz/att-uverse-modem-bypass-unifi-usg/](https://blog.taylorsmith.xyz/att-uverse-modem-bypass-unifi-usg/).

# Custom Config
In the instructions you will eventually get to a point where you have to generate a custom config file from your USG, the output will be a file called `configdump.txt`.

You will need to heavily modify that file to remove information that you can configure in the Unifi UI to avoid issues going forward.  The author provided a wonderful example of his config file called `config.gateway.json`, it can be found below.

```json
{
	"interfaces": {
		"ethernet": {
			"eth0": {
				"address": [
					"dhcp"
				],
				"description": "WAN",
				"dhcp-options": {
					"client-option": [
						"retry 60;"
					],
					"default-route": "update",
					"default-route-distance": "1",
					"name-server": "no-update"
				},
				"duplex": "auto",
				"firewall": {
					"in": {
						"name": "WAN_IN"
					},
					"local": {
						"name": "WAN_LOCAL"
					},
					"out": {
						"name": "WAN_OUT"
					}
				},
				"speed": "auto",
				"vif": {
					"0": {
						"address": [
							"dhcp"
						],
						"description": "WAN VLAN 0",
						"dhcp-options": {
							"default-route": "update",
							"default-route-distance": "210",
							"name-server": "update"
						},
						"firewall": {
							"in": {
								"name": "WAN_IN"
							},
							"local": {
								"name": "WAN_LOCAL"
							}
						},
						"mac": "E0:BB:CC:DD:EE:FF"
					}
				}
			},
			"eth2": {
				"address": [
					"dhcp"
				],
				"description": "AT&T router",
				"dhcp-options": {
					"client-option": [
						"retry 60;"
					],
					"default-route": "update",
					"default-route-distance": "220",
					"name-server": "update"
				},
				"duplex": "auto",
				"firewall": {
					"in": {
						"name": "WAN_IN"
					},
					"local": {
						"name": "WAN_LOCAL"
					},
					"out": {
						"name": "WAN_OUT"
					}
				},
				"speed": "auto"
			}
		}
	},
	"port-forward": {
		"wan-interface": "eth0.0"
	},
	"service": {
		"dns": {
			"dynamic": {
				"interface": {
					"eth0.0": {
						"service": {
							"custom-cloudflare": {
								"host-name": [
									"websiteurl"
								],
								"login": "email",
								"options": [
									"zone=websiteurl use=web ssl=yes"
								],
								"password": "apikey",
								"protocol": "cloudflare",
								"server": "www.cloudflare.com"
							}
						}
					}
				}
			}
		},
		"nat": {
			"rule": {
				"5010": {
					"description": "masquerade for WAN",
					"outbound-interface": "eth0.0",
					"protocol": "all",
					"type": "masquerade"
				}
			}
		},
		"upnp2": {
			"listen-on": [
				"eth1"
			],
			"nat-pmp": "enable",
			"secure-mode": "enable",
			"wan": "eth0.0"
		}
	}
}
```

The only problem with the above file is I had a VPN setup and running and after going through the author's instructions everything worked except the VPN so I had to go through and add in the relative bits related to my VPN setup on my USG.

Below is my config file `config.gateway.json` with some sensitive information nulled out.

```json
{
	"interfaces": {
		"ethernet": {
			"eth0": {
				"address": [
					"dhcp"
				],
				"description": "WAN",
				"dhcp-options": {
					"client-option": [
						"retry 60;"
					],
					"default-route": "update",
					"default-route-distance": "1",
					"name-server": "no-update"
				},
				"duplex": "auto",
				"firewall": {
					"in": {
						"name": "WAN_IN"
					},
					"local": {
						"name": "WAN_LOCAL"
					},
					"out": {
						"name": "WAN_OUT"
					}
				},
				"speed": "auto",
				"vif": {
					"0": {
						"address": [
							"dhcp"
						],
						"description": "WAN VLAN 0",
						"dhcp-options": {
							"default-route": "update",
							"default-route-distance": "210",
							"name-server": "update"
						},
						"firewall": {
							"in": {
								"name": "WAN_IN"
							},
							"local": {
								"name": "WAN_LOCAL"
							}
						},
						"mac": "ab:cd:ef:12:34:56"
					}
				}
			},
			"eth2": {
				"address": [
					"dhcp"
				],
				"description": "AT&T router",
				"dhcp-options": {
					"client-option": [
						"retry 60;"
					],
					"default-route": "update",
					"default-route-distance": "220",
					"name-server": "update"
				},
				"duplex": "auto",
				"firewall": {
					"in": {
						"name": "WAN_IN"
					},
					"local": {
						"name": "WAN_LOCAL"
					},
					"out": {
						"name": "WAN_OUT"
					}
				},
				"speed": "auto"
			}
		}
	},
	"port-forward": {
		"wan-interface": "eth0.0"
	},
	"service": {
		"dns": {
			"dynamic": {
				"interface": {
					"eth0.0": {
						"service": {
							"dyndns": {
								"host-name": [
									"domain.dyndns.org"
								],
								"login": "someuser",
								"password": "xxxxxx"
							}
						}
					}
				}
			},
			"forwarding": {
				"except-interface": [
					"eth0.0"
				]
			}
		},
		"nat": {
			"rule": {
				"5010": {
					"description": "masquerade for WAN",
					"outbound-interface": "eth0.0",
					"protocol": "all",
					"type": "masquerade"
				}
			}
		},
		"lldp": {
			"interface": {
				"eth0.0": {
					"disable": "''"
				}
			}
		}
	},
	"vpn": {
		"ipsec": {
			"ipsec-interfaces": {
				"interface": [
					"eth0.0"
				]
			}
		},
		"l2tp": {
			"remote-access": {
				"dhcp-interface": "eth0.0"
			}
		}
	}
}
```

The most important thing to note is anywhere you find `eth0`, you need to replace it with `eth0.0`.  It took some guessing and checking and having to reset my USG a couple times but I eventually got things working.

Make sure to special attention to the config above.  You only need to copy down to an individual key pair in the JSON to get to `eth0`.  However if a key is called `eth0` you will need to copy everything below it as its the key for that information.  A good example of this can be found in the dns section above.

I would highly encourage you to use the above file as a starting point and modify it as you see fit if you have any other information referencing `eth0`.

# Speed Test Results
Below are a couple speed tests I captured after.  My speeds roughly stayed the same which is amazing as I have seen some instructions that greatly reduce the speed with a bridge running on the USG.  I did notice the ping times went down a couple milliseconds, I will take that any day, things feel a lot more snappier now!!!

## Speed tests

### AT&T
![att speed test](http://www.speedtest.net/result/7204894482.png)


### Celito Fiber
![celito fiber speed test](http://www.speedtest.net/result/7204900004.png)

# Credits
Again I don't want to detract from the amazing work that was done at [https://blog.taylorsmith.xyz/att-uverse-modem-bypass-unifi-usg/](https://blog.taylorsmith.xyz/att-uverse-modem-bypass-unifi-usg/).

Also shout out to [Jay Soffian](https://github.com/jaysoffian) for writing the EAP Proxy, checkout the [Github project](https://github.com/jaysoffian/eap_proxy) and give it a star for his awesome work!
