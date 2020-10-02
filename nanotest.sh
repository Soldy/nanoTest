#!/bin/sh
MONITORDIRX="./"

monitor() {
inotifywait -m -r -e create --format "js" "$1" | while read NEWFILE
do
    sleep 2
    nodejs test.js
    sleep 2
done
}
monitor "$MONITORDIRX" 
