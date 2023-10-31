# How to create a tiny server <img height="50px" src="https://www.therpf.com/forums/attachments/wheems-jpg.359859/">

__November 2023__

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

## Quick Start
Your "mango" mini smart router comes with a white USB cord.  Plug the larger USB-A end of that cord into a computer or power source. The other end (micro USB) connects to the router. 

Once your router has booted, the left light will be solid. It is now broadcasting a wifi signal that you can connect to.  Look for GL-MT300N-V2-64d (or something like it) and connect to that network. Once connected, open your browser and go to 192.168.8.1.  The initial password is "goodlife." You can set your preferred language and set a new root password. 

We will now use that password to connect to the router using SSH. Open your terminal and enter `ssh root@192.168.8.1`. You can login with the password you just set in the browser.

Plug in your ext4 formatted usb drive (the blue light should turn on). Go to /mnt and find your drive. My drive appears as FMB, so I'll use that name. So the path to my USB drive is `/mnt/FMB`. 

To share the drive's content, we create a symbolic link between the www folder and your drive's contents.  Change directories to /www: `cd /www` and create the link `ln -s /mnt/FMB ./fmb`
You files on the USB are now available at http://192.168.8.1/fmb

