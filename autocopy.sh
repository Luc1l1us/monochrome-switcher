#!/bin/bash

#Script location
script_dir=$(realpath $(dirname $0))

# copy config from default path
cp -r ~/.config/ags $script_dir/

echo "Files have been successfully copied from default path!"