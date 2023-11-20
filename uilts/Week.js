

const courseExists = (courses, course) => {
  for (let i = 0; i < courses.length; i++) {
    if (JSON.stringify(courses[i]) === JSON.stringify(course)) {
      return true;
    }
  }
  return false;
}

const courseParser = ($) => {
  // font title 索引
  const fontTitleRef = {
    教师: "teacher",
    "周次(节次)": "rawWeeks",
    教室: "address",
  }
  '-----------------------'
  return courses;
}

function parseWeeks(inputString) {
  let ranges = inputString.match(/\d+-\d+|\d+/g);
  let result = [];

  if (ranges) {
    ranges.forEach((range) => {
      if (range.includes("-")) {
        let start = parseInt(range.split("-")[0]);
        let end = parseInt(range.split("-")[1]);
        for (let i = start; i <= end; i++) {
          result.push(i);
        }
      } else {
        result.push(parseInt(range));
      }
    });
  }
  return result;
}



module.exports = {
  courseParser,
}
