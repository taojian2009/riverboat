#!/bin/bash

work_dir=/root/riverboat
cd $work_dir
source prod.sh
source ~/.virtualenvs/riverboat/bin/activate


python scripts/clear_inbox.py >> logs/clear.log 2>&1




