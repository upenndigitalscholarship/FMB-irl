# How to create a tiny Web Server <img height="50px" src="https://www.therpf.com/forums/attachments/wheems-jpg.359859/">

__September 2023__

## Overview
This is a tutorial on how to create a local web server to serve static websites. We will re-purpose a wifi router to serve data over wifi to the browser on local devices such as phones and tablets.  This is a great way to share a digital archive with people in locations with limited internet access. 

At the end of this tutorial we will have: 
- A working wifi router running OpenWRT (Linux)
- A static website with search using PageFind   
- A page to browse the collection
- A page for each document in the collection with zoomable images using Universal Viewer 


## Parts
1. GL iNet 300N Mini Smart Router (GL-MT300N-V2) $30.90
2. Cotchear Mini Super Speed Micro SD/SDXC TF USB 2.0 Card Reader Adapter (B07HFQQ71F) $5.99
3. 128G MicroSD Memory Card $12.99

Also, a computer with a USB port and an ethernet port.

## Firmware 
Our mini smart router comes with firmware installed that allows it to function as a wifi router. We will replace that firmware with OpenWRT, a Linux distribution for embedded devices.

- The OpenWRT "[Table of Hardware](https://openwrt.org/toh/start)" has device specific installation instructions.
- For this tutorial, we'll be using the [GL.iNet GL-MT300N V2](https://openwrt.org/toh/gl.inet/gl-mt300n_v2) page.
- In the supported versions section, you will see the current version of OpenWRT that is compatible with your device. For me it is 22.03.5. 
- In the installation section of the device page, you'll find a link to Firmware OpenWrt Upgrade URL. Download [that file](https://downloads.openwrt.org/releases/22.03.5/targets/ramips/mt76x8/openwrt-22.03.5-ramips-mt76x8-glinet_gl-mt300n-v2-squashfs-sysupgrade.bin).
- Now follow the link to [OEM easy installation](https://openwrt.org/toh/gl.inet/installation)
- Because the GL firmware is based on OpenWRT it is possible to run an update from the router's web interface. This is the easiest way to install OpenWRT.
- Remove the router from the box and connect it to a power source.
- Connect to the router's wifi network (SSID: GL-MT300N-V2-XXX). The default password is `goodlife`.This information was in the Easy Setup section on my device's packaging.
- You can now access the admin panel at http://192.168.8.1
- You will be asked to set the default language and change the admin password. 
- In the admin panel, select ["Upgrade"](http://192.168.8.1/#/upgrade) and then the "local upgrade" tab.
- Once the file upload is complete, you can click on the install button.
- You'll see a progress bar as OpenWRT is installed. When complete, the router will drop the wifi connection, don't panic! If the device doesn't automatically reboot, unplug it and plug it back in.
- If you don't see the GL-MT300N-V2-xxx network, you can connect your computer to the router using the ethernet cable provided and go to 192.168.8.1 in your browser. You should now see the Luci interface that comes with OpenWRT.

## USB Drive 
connect to internet
- format your sd card using ext4
https://openwrt.org/docs/guide-user/storage/usb-drives-quickstart

`ssh -v -oHostKeyAlgorithms=+ssh-rsa root@192.168.8.1`


## Web Server
https://openwrt.org/docs/guide-user/services/webserver/http.uhttpd


This project was inspired by [LibraryBox](https://makezine.com/projects/librarybox/), which used a router for file sharing. 
