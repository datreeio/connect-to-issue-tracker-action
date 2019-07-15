#!/bin/sh -l
cd /
npm ci
node verifyIssueTracker.js $*
