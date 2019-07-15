const fs = require('fs')
const program = require('commander')

const { Validator } = require('./validator')

program
  .option('-p, --property <validationProperty>', 'The property to validate: branch name or PR title')
  .option('-t, --type <issueTrackerType>', 'The issue tracker to validate against')
  .parse(process.argv)

async function main() {

  const event = JSON.parse(fs.readFileSync('/github/workflow/event.json', 'utf8'))
  const validator = new Validator(program.type, program.property)

  const res = await validator.validate(event)

  if (res.body.passed) return `\n\nCongrats!! your ${program.property} references a valid ${program.type} ticket!\n\n`
  else throw new Error(`\n\n${program.property} doesn't reference a valid ${program.type} ticket\n\n`)
}

if (require.main === module) {
  main()
    .then(res => {
      console.log(res)
      process.exitCode = 0
    })
    .catch(err => {
      console.log(err.message)
      process.exitCode = 1
    })
}
