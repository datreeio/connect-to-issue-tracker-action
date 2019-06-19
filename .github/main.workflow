
workflow "test flow" {
  on = "pull_request"
  resolves = ["test action"]
}

action "test action" {
  uses = "./"
  secrets = ["GITHUB_TOKEN"]
}
