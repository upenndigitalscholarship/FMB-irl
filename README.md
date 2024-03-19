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

Usage:

1. Plug the router into a USB power source (5V-1A). Wait until the two yellow lights are on. The center light will not be on. The blue light on the USB drive will be on.
2. Connect to the router's wifi network (SSID: FMB)
3. Open a browser and navigate to http://192.168.2.1/fmb

You can now search the files and view them on your device. I recommend turning your phone horizontally for the best experience.

Uso:

1. Conecte el enrutador a una fuente de alimentación USB (5V-1A). Espere hasta que las dos luces amarillas se enciendan. La luz central no se encenderá. La luz azul de la unidad USB estará encendida.
2. Conéctese a la red wifi del enrutador (SSID: FMB)
3. Abra un navegador y navegue hasta http://192.168.2.1/fmb
[ciento noventa y dos punto ciento sesenta y ocho punto dos punto uno barra fmb]

Ahora puede buscar los archivos y verlos en su dispositivo. Recomiendo girar su teléfono horizontalmente para obtener la mejor experiencia.


# Mar 7
- Remove parquet code 
- load BL metadata and text from json 
- create collections 
- add pagefind for text search
- keep browse by box 
- make page responsive for phones 
- possible to make embedding visualization? search? 