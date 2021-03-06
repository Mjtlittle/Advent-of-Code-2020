const fs = require('fs')

const lines = fs
  .readFileSync('src/day_6/input.txt', 'utf-8')
  .split('\n')
  .map((line) => line.trim())

// get what people answered yes to for each group
let groups = [[]]
lines.forEach((line) => {
  // add new group if empty line
  if (line == '') {
    groups.push([])
    return
  }

  // add each person to the last group
  groups[groups.length - 1].push(line)
})

const count_questions = (group) => {
  let prev = null
  group.forEach((person) => {
    let intersection = new Set()
    for (const question of person) {
      if (prev == null || prev.has(question)) {
        intersection.add(question)
      }
    }
    prev = intersection
  })
  return prev.size
}

const sum_reducer = (a, b) => a + b

const total_questions = groups.map(count_questions).reduce(sum_reducer)

exports.result = total_questions
exports.expected = 3351
