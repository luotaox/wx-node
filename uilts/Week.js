

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
  let courses = [];
  const trs = $("#timetable tr").slice(1)
  $(trs).each((trIndex, tr) => {
    $(tr)
      .find("td")
      .each((tdIndex, td) => {
        const fonts = $(td).find(".kbcontent font")
        if (fonts.length > 0) {
          let course = {
            section: trIndex * 2 + 1,
            sectionCount: 2, // 固定两小节
            week: tdIndex + 1,
          }
          let newCourse = [];
          fonts.each((fIndex, f) => {
            const fontTitle = $(f).attr("title")
            const fontText = $(f).text()
            if (fIndex == 0 || fIndex == 10 || fIndex == 20 || fIndex == 30 || fIndex == 40 || fIndex === 50) {
              course.name = fontText
            } else if (fontTitle != undefined && fontTitleRef[fontTitle]) {
              course[fontTitleRef[fontTitle]] = fontText;
            }

            if (fontTitle == "备注") {
              newCourse.push(JSON.parse(JSON.stringify(course)))
            }
          })

          course["rawSection"] = course.rawWeeks.match(/\[(.*?)\]/g);
          let processedInput = course.rawWeeks.split("[")[0].trim();

          course["weeks"] = parseWeeks(processedInput);
          if (!courseExists(courses, course)) {
            courses.push(course);
          }

          newCourse.forEach((item) => {
            item["rawSection"] = item.rawWeeks.match(/\[(.*?)\]/g);
            let processedInput = item.rawWeeks.split("[")[0].trim();
            item["weeks"] = parseWeeks(processedInput);
            if (!courseExists(courses, item)) {
              courses.push(JSON.parse(JSON.stringify(item)));
            }
          })
        }
      })
  })
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