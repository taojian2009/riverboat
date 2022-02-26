#!/bin/bash

env='dev'
# init the env

WORK_DIR=../
cd $WORK_DIR

source venv/bin/activate

source "$env".env

python scripts/clear_inbox.py




