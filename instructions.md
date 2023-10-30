# How to create a tiny server <img height="50px" src="https://www.therpf.com/forums/attachments/wheems-jpg.359859/">

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
Our mini smart router comes with firmware installed that allows it to function as a wifi router. We will replace that firmware with OpenWRT, a Linux distribution for embedded devices. The GL firmware is based on OpenWRT and [it is possible to keep it if you want](https://forum.gl-inet.com/t/web-server-in-gl-mt300n/1714/3). By installing OpenWRT, you will have full control of the operating system and you can rely on regularly updated open source documentation. 

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

### Enable Wireless
If you don't see your wifi router listed as an available wifi connection, you'll need to configure it in Luci. Go [here](http://192.168.8.1/cgi-bin/luci/admin/network/wireless). In the Wireless Overview section, click on the enable button next to SSID: OpenWRT. If you'd like to change the name of the network, click on edit, change the values under ESSID and then "Save and Apply".

### Connect Router to Internet
To update the OS and for other tasks, you router will need to be connected to the internet. To connect to another wifi signal, go to Network > Wireless and look for the wireless radio (radio0). Click on the "Scan" button and then "Join Network" next to the network you want to connect to. You'll need to enter the password for the network. Once you've joined the network, click on "Save and Apply".

If you are able to connect to your usual wifi router but don't have a connection to the internet, there may be a conflict between your wifi router and the mango.  To fix this, try changing the address of the mango. Go to Network > Interfaces. Find lan and click on the edit button.  Change the IPv4 address to 192.168.2.1  Then reboot the router. 
### Connect to Router via SSH
To connect to your router via SSH, open your terminal and type: `ssh -v -oHostKeyAlgorithms=+ssh-rsa root@192.168.8.1` and enter the same password you used to log into the admin panel.

To confirm that the router's internet connection is working, type `opkg update` in the terminal. If you get an error, try removing and re-adding the wireless connection as detailed in the previous section.

## USB Drive 
The GL router has a USB port that can used for storage. We first need to configure the device to find and mount the USB drive. The OpenWRT documentation on this step can be found [here](https://openwrt.org/docs/guide-user/storage/usb-drives#install_and_verify_usb_drivers.)
- Using your computer, format the microSD card using the ext4 format.
- Insert the microSD card into the USB adapter and then into the router's USB port.
- Connect to the router via SSH.
- Type `opkg update` to update the package list.
- Type `opkg install kmod-usb-storage`.
- Type `opkg install usbutils`.
- You can now run `lsusb -t` and see a list of connected drives.
For example:
```
root@GL-MT300N-V2:~# lsusb -t
/:  Bus 02.Port 1: Dev 1, Class=root_hub, Driver=ohci-platform/1p, 12M
/:  Bus 01.Port 1: Dev 1, Class=root_hub, Driver=ehci-platform/1p, 480M
    |__ Port 1: Dev 2, If 0, Class=, Driver=usb-storage, 480M
```
The router can now see the connected drive.  The next step is to mount the drive. The OpenWRT documentation on this step can be found [here](https://openwrt.org/docs/guide-user/storage/usb-drives#automount_the_partition).

- Run `opkg install block-mount`
- Type `block detect | uci import fstab`
- Enter `block info | grep "/dev/sd"` to see the name of the drive. For example:
```
/dev/sda1: UUID="1a3f57c4-5836-4158-a25e-9cd6c430e91a" LABEL="FMB" VERSION="1.0" TYPE="ext4"
```
- Next enter `uci set fstab.@mount[-1].enabled='1'`
- Then `uci commit fstab` which will automatically mount the drive when the drive is booted.
- Reboot your router. 
- After reboot, connect over SSH and you should be able to see the drive in the file system. For example, I can now see a `/mnt/sda1` folder.


## [Web Server](https://openwrt.org/docs/guide-user/services/webserver/http.uhttpd)

OpenWRT comes with a web server installed called uHTTPd. If you are familiar with Apache, this will feel very familiar. Files in the /www directory are available at 192.168.8.1. This is how the Luci admin panel is loaded in your browser. We can serve files from the USB drive by creating a symbolic link to the /www directory on the router.
For example, if my site folder on the USB (sda1) is called `site`, I can create a symbolic link to it with the following command:
```
ln -s /mnt/sda1/site /www/site
```
The site can then be loaded at `192.168.8.1/site`



vvv in progress vvv
If you don't want to use the IP address to access your router, you can give it an alias. 
In the `/etc/resolv.conf` file, add a line with the alias and your IP
```
digital-archive 192.168.8.1
```

This project was inspired by [LibraryBox](https://makezine.com/projects/librarybox/), which used a router for file sharing. 

