const request = require('request-promise-native')

const URLS = {
  branch: 'http://gateway.datree.io/v1/policy/orb/branchname'
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
    else throw new Error(`Property ${this.property} not supported`)

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
