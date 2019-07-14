const fs = require('fs')
const request = require('request-promise-native')
const program = require('commander')

program
  .option('-p, --property <validationProperty>', 'The property to validate: branch name or PR title')
  .option('-t, --type <issueTrackerType>', 'The issue tracker to validate against')
  .parse(process.argv)

async function main() {
  // let requestParams = {
  //   method: 'POST',
  //   url: 'http://gateway.datree.io/v1/policy/orb/branchname',
  //   resolveWithFullResponse: true,
  //   json: true,
  //   simple: false,
  //   body: {issue_tracker: 'jira', branch_name: 'bla'}
  // }
  const event = JSON.parse(fs.readFileSync('/github/workflow/event.json', 'utf8'))
  let requestParams = {
    method: 'POST',
    url: 'http://gateway.datree.io/v1/policy/orb/pullrequesttitle',
    resolveWithFullResponse: true,
    json: true,
    simple: false,
    body: {issue_tracker: 'jira', pullRequestNumber: event.number, repositoryUrl: event.repository.html_url, token: process.env.GITHUB_TOKEN}
  }
  console.log(event)
  console.log(program)
  const res = await request(requestParams)

  return res
}

if (require.main === module) {
  main()
    .then(res => {
      console.log({ res })
      process.exitCode = 0
    })
    .catch(err => {
      console.log({ err })
      process.exitCode = 1
    })
}
