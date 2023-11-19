function parseWeeks(week, fullWeek) {
  const result = []
  const ranges = week.split(",")
  ranges.map((range) => {
    const nums = range.split("-")
    if (nums.length == 1) {
      result.push(parseInt(nums[0]))
    } else {
      for (let i = parseInt(nums[0]); i <= parseInt(nums[1]); i++) {
        if (
          fullWeek == "" ||
          (fullWeek == "单" && i % 2 == 1) ||
          (fullWeek == "双" && i % 2 == 0)
        ) {
          result.push(i)
          continue
        }
      }
    }
  })
  return result
}

module.exports = parseWeeks;