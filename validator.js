class Validator {
  constructor(url, type, property) {
    this.url = url
    this.type = type
    this.property = property
  }

  validate(val) {
    this._request({issue_tracker: this.property})


  }

  _request(params) {
    let requestParams = {
      method: 'POST',
      url: 'http://gateway.datree.io/v1/policy/orb/branchname',
      resolveWithFullResponse: true,
      json: true,
      simple: false,
      body: {issue_tracker: 'jira', branch_name: 'bla'}
    }

  }
}

module.exports = { Validator }
