#!/bin/sh -l
ls -sla
cd /
npm ci
node verifyIssueTracker.js -t jira -i $*
