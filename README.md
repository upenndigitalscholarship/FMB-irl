# FMB-irl
Static site generator for FMB wi-fi router

Parts
1. GL iNet 300M Mini Smart Router (GL-MT300N-V2) $30.90

2. Cotchear Mini Super Speed Micro SD/SDXC TF USB 2.0 Card Reader Adapter (B07HFQQ71F) $5.99

3. 128G MicroSD Memory Card $12.99

4. DGZZI USB Female Socket 4 AA Battery Case Box Holder with ON-Off Switch. USB to mini-USB cable. $8.99

5. 3 AA Batteries $4.50

Total cost: $63.37
[Running OpenWrt](https://openwrt.org/toh/hwdata/gl.inet/gl.inet_gl-mt300n_v2)
[uHTTPd webserver](https://openwrt.org/docs/guide-user/services/webserver/http.uhttpd)

ssh with `ssh -v -oHostKeyAlgorithms=+ssh-rsa root@192.168.2.1`

Question:
Is it faster to run the build and then copy to the sd card or set --output=sdcard_path and build directly to the sd card?
build to sd: `npx eleventy --output=/media/apjanco/FMB/fmb`
copy to sd: `ls -1 ./_site/ | xargs -i cp -r _site/{} /media/apjanco/FMB/`
Either seems to take forever.
also `rsync -r ./_site/ /media/apjanco/FMB/fmb/` hangs and never finishes.

`cp ./_site/mfc* /media/apjanco/FMB/fmb/` works 
but too many in GHC. 

trying `ls -1 ./_site/ | xargs -i cp -rvu _site/{} /media/apjanco/FMB/fmb/`
bug: this copies folders from assets into fmb, not sure why

Change home directory from www/ to sdcard/ in /etc/config/uhttpd

Note: tried `--pathprefix=` but does not work given that I'm not using urls in the templates. There's only three templates, so I updated them manually.

Feature request to self; it would be nice to rebuild the site without having to re-copy/passthrough GHC and MFC. 
possible with env variables: https://www.11ty.dev/docs/environment-vars/

https://openwrt.org/docs/guide-user/services/webserver/uhttpd

fun next step, rather than build from folder of files, build from HF dataset