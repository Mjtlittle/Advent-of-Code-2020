const path = require('path')
const fs = require('fs')
const glob = require('glob')

const run_day = (number) => {
  console.log(`Day ${number}:`)
  const day_folder = path.resolve(path.join('.', 'src', `day_${number}`))
  if (!fs.existsSync(day_folder)) {
    console.log('    Not Started')
    return
  }

  const part_1_file = path.join(day_folder, 'part_1.js')
  if (fs.existsSync(part_1_file)) {
    process.stdout.write(`    Part 1: `)
    require(part_1_file)
  } else {
    console.log('    Not Started')
    return
  }

  const part_2_file = path.join(day_folder, 'part_2.js')
  if (fs.existsSync(part_2_file)) {
    process.stdout.write(`    Part 2: `)
    require(part_2_file)
  }
}

// cli
const args = process.argv.splice(2)

// yarn day <day>
if (args.length == 1) {
  const day = args[0]

  if (day == '*') {
    glob(path.resolve('src/day_*'), (err, folders) => {
      let days = []
      folders.forEach((folder) => {
        const day_folder_name = path.basename(folder)
        const day = parseInt(day_folder_name.split('_')[1])
        days.push(day)
      })
      days.sort((a, b) => a - b)
      days.forEach((day) => run_day(day.toString()))
      console.log()
    })
  } else {
    run_day(day)
    console.log()
  }
}
