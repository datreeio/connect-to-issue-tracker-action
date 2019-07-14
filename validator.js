const request = require('request-promise-native')

const URLS = {
  branch: 'http://gateway.datree.io/v1/policy/orb/branchname',
  pr: 'http://gateway.datree.io/v1/policy/orb/pullrequesttitle'
}

class Validator {
  constructor(type, property) {
    this.url = URLS[property]
    this.type = type
    this.property = property
  }

  validate(event) {
    let body = { issue_tracker: this.type }
    if (this.property === 'branch') body.branch_name = event.pull_request.head.ref

    else if (this.property === 'pr') {
      body.pullRequestNumber = event.number
      body.repositoryUrl = event.repository.html_url
      body.token = process.env.GITHUB_TOKEN
    }

    return this._request(body)


  }

  _request(body) {
    let requestParams = {
      method: 'POST',
      url: this.url,
      resolveWithFullResponse: true,
      json: true,
      simple: false,
      body
    }
    return request(requestParams)
  }
}

module.exports = { Validator }
