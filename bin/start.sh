#!/bin/bash

work_dir=/root/riverboat
cd $work_dir
source prod.sh
source ~/.virtualenvs/riverboat/bin/activate

nohup gunicorn -w 2 \
      -k gevent   \
      --access-logfile '-' \
      --error-logfile '-' \
      -b 0.0.0.0:80 manage:app >> logs/std.log 2>&1 & echo $! > logs/pid
