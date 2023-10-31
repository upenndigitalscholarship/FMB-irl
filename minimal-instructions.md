Connect to GL-MT300N-V2-64d
goodlife
Go to 192.168.8.1
Set language and password

In terminal ssh root@192.168.8.1
Plug in your formatted usb drive (the blue light should turn on)
Go to /mnt and find your drive 
Then go to /www and add a symbolic link
ln -s /mnt/FMB ./fmb
You files on the USB are now available at http://192.168.8.1/fmb

