MINUTES=${1:-""}

awslogs get /aws/lambda/warmup-test-dev-test --begin "3m ago" --filter "WarmUp$MINUTES"  | sort -k3 > /tmp/log
cut /tmp/log -f2 -d ' ' | sort | uniq -c
cut /tmp/log -f2 -d ' ' | sort | uniq -c | wc -l
wc -l /tmp/log
