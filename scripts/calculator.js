'use strict';

const gradePoints = {
  "A+": 4.00,
  "A": 4.00,
  "A-": 3.67,
  "B+": 3.33,
  "B": 3.00,
  "B-": 2.67,
  "C+": 2.33,
  "C": 2.00,
  "C-": 1.67,
  "D+": 1.33,
  "D": 1.00,
  "D-": 0.67,
  "F": 0.00,
};

var courseCounter = 1;

const sgpaCalculator = {
  counter: 1,
};


function viewGradePoints() {

  let gradePointsView = document.getElementById("grade-points");

  let form = document.createElement("form");
  form.setAttribute("class", "form-control grade-points-form");
  form.setAttribute("id", "grade-points-form");

  let gradePointshtml = "";

  for (const [key, value] of Object.entries(gradePoints)) {
    gradePointshtml += `
    <div class="input-group mb-3">
      <span class="input-group-text" id="basic-addon1">${key}</span>
      <input type="number" name="${key}" id="grade-points-${key}" value="${value}" onchange="updateGradePoint('${key}');" required />
      <br>
    </div>
    `;
  }

  form.innerHTML = gradePointshtml;
  gradePointsView.appendChild(form);
}

function updateGradePoint(key) {
  let newval = + document.getElementById(`grade-points-${key}`).value;
  if (!isNaN(newval)) {
    gradePoints[key] = newval;
    console.log(`Data of grade-points-${key} changed to ${newval}`);
  } else {
    console.log(`Error! Data of grade-points-${key} can't be changed to ${newval}`);
  }
}

//sgpa

function addCourseStr(cid) {
  let coursehtml = `
    <tr id="course-row-${cid}">
      <td><input type="text" placeholder="Course Name (Optional)" class="form-control course" required /></td>
      <td><input type="number" placeholder="Credit Hours" class="form-control credit-hour" onchange="viewCalGpa();" required /></td>
      <td>
        <select class="form-control grade" onchange="viewCalGpa();" required>
  `;

  for (const [key, _] of Object.entries(gradePoints)) {
    coursehtml += `
          <option value="${key}" onchange="viewCalGpa();">${key}</option>
    `;
  }

  coursehtml += `
        </select>
      </td>
      <td>
        <button type="button" class="btn btn-danger" onClick="rmCourseIn('course-row-${cid}');viewCalGpa();">
          <i class="fas fa-trash"></i>
        </button>
      </td>
    </tr>
  `;
  return coursehtml;
}

function addCourseIn(formid) {
  document.getElementById(formid).
    insertAdjacentHTML('beforeend', addCourseStr(courseCounter++));
}

function addCourseIn() {
  document.getElementById("sgpa-body").
    insertAdjacentHTML('beforeend', addCourseStr(courseCounter++));
}

function rmCourseIn(courseid) {
  console.log("Removing: " + courseid);
  let ele = document.getElementById(courseid);
  console.log(ele);
  ele.remove();
}

function viewGpaCalculator() {
  for (let i = 0; i < 5; i++) {
    addCourseIn();
  }
}

function calculateGpa(id) {
  let gpa = 0;
  let totalchr = 0;

  let table = document.getElementById(id).rows;

  for (let i = 0; i < table.length; i++) {
    let chr = +table[i].cells[1].children[0].value;
    let grade = gradePoints[table[i].cells[2].children[0].value];

    if (!isNaN(chr) && chr != 0) {
      gpa += (chr * grade);
      totalchr += chr;
    }
  }
  gpa /= totalchr;
  return gpa;
}

function viewCalGpa() {
  let gpa = calculateGpa("sgpa-body");
  document.getElementById("calulated-sgpa").innerHTML = `Your GPA is ${gpa}`;
}

////////////////////////////////////////////////////////

function addSemesStr(cid) {
  return `
    <tr id="semester-row-${cid}">
      <td><input type="text" placeholder="Semester (Optional)" class="form-control semester" required /></td>
      <td><input type="number" placeholder="Credit Hours" class="form-control semes-credit-hour" onchange="viewCalCGpa();" required /></td>
      <td><input type="number" placeholder="SGPA" class="form-control sgpa" onchange="viewCalCGpa();" required /></td>
      <td>
        <button type="button" class="btn btn-danger" onClick="rmSemesIn('semester-row-${cid}');viewCalCGpa();">
          <i class="fas fa-trash"></i>
        </button>
      </td>
    </tr>  
    `;
}

function addSemesIn(formid) {
  document.getElementById(formid).
    insertAdjacentHTML('beforeend', addSemesStr(courseCounter++));
}

function addSemesIn() {
  document.getElementById("cgpa-body").
    insertAdjacentHTML('beforeend', addSemesStr(courseCounter++));
}

function rmSemesIn(sid) {
  console.log("Removing: " + sid);
  let ele = document.getElementById(sid);
  console.log(ele);
  ele.remove();
}

function viewCGpaCalculator() {
  for (let i = 0; i < 3; i++) {
    addSemesIn();
  }
}

function calculateCGpa(id) {
  let cgpa = 0;
  let totalchr = 0;

  let table = document.getElementById(id).rows;

  for (let i = 0; i < table.length; i++) {
    let chr = +table[i].cells[1].children[0].value;
    let sgpa = +table[i].cells[2].children[0].value;

    if (!isNaN(chr) && !isNaN(sgpa)) {
      cgpa += (chr * sgpa);
      totalchr += chr;
    }
  }
  cgpa /= totalchr;
  return cgpa;
}

function viewCalCGpa() {
  let gpa = calculateCGpa("cgpa-body");
  document.getElementById("calulated-cgpa").innerHTML = `Your CGPA is ${gpa}`;
}

//////////////////////////////////////////////////

function calculateTGpa(id) {
  let gpa = 0;

  let table = document.getElementById(id).rows;

  let currentchr = +table[0].cells[0].children[0].value;
  let currentgpa = +table[0].cells[1].children[0].value;
  let remainingchr = +table[1].cells[0].children[0].value;
  let targetgpa = +table[1].cells[1].children[0].value;

  gpa = (targetgpa * (currentchr + remainingchr) - (currentchr * currentgpa)) / remainingchr;

  return gpa;
}

function viewCalTGpa() {
  let tgpa = calculateTGpa("tgpa-body");
  document.getElementById("calulated-tgpa").innerHTML = `You need ${tgpa} or higher gpa in remaining credits to reach your target.`;
}