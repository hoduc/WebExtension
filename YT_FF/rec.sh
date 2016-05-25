#!/bin/bash
UTUBE_BASE="https://youtube.com";
OUTPUT="recommended.txt"

RESPONSE="curl -L $UTUBE_BASE > $OUTPUT"
echo $RESPONSE
RESPONSE=`$RESPONSE`
#echo $RESPONSE
