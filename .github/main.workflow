
workflow "test flow" {
  on = "pull_request"
  resolves = ["test action"]
}

action "test action" {
  uses = "./"
  args = ["-p", "branch", "-t", "jira"]
  secrets = ["GITHUB_TOKEN"]
}
