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

let initialCourses = 5;
let courseCounter = 1;

function getGrades() {
  lst = [];
  for (const [key, _] of Object.entries(gradePoints)) {
    lst.push(key);
  }
  return lst;
}

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

function addCourseStr(cid) {
  let coursehtml = `
  <p id="course-row-${cid}">
    <input type="text" placeholder="Course Code (Optional)" class="course-${cid}" required>
    <input type="number" placeholder="Credit Hourse" class="credit-hour-${cid}" onchange="viewCalGpa();" required>
    <select class="grade-${cid} form" required>
  `;

  for (const [key, _] of Object.entries(gradePoints)) {
    coursehtml += `
    <option value="${key}" onchange="viewCalGpa();">${key}</option>
    `;
  }

  coursehtml += `
    </select>
    <button type="button" class="btn btn-danger" onClick="rmCourseIn('course-row-${cid}');viewCalGpa();">
      <i class="fas fa-trash"></i>
    </button>
  </p>
  `;
  return coursehtml;
}

function addCourseIn(formid) {
  document.getElementById(formid).
    insertAdjacentHTML('beforeend', addCourseStr(courseCounter++));
}

function addCourseIn() {
  document.getElementById("gpa-cal-form").
    insertAdjacentHTML('beforeend', addCourseStr(courseCounter++));
}

function rmCourseIn(courseid) {
  console.log("Removing: " + courseid);
  let ele = document.getElementById(courseid);
  console.log(ele);
  ele.remove();
}

function viewGpaCalculator() {
  let gpaCalView = document.getElementById("gpa-cal");

  let form = document.createElement("form");
  form.setAttribute("class", "gpa-cal-form");
  form.setAttribute("id", "gpa-cal-form");

  gpaCalView.appendChild(form);

  for (let i = 0; i < initialCourses; i++) {
    addCourseIn("gpa-cal-form");
  }
}

function calculateGpa(formid) {
  let gpa = 0;
  let totalchr = 0;
  let allcourses = document.getElementById(formid);
  for (let i = 1; i < allcourses.length; i += 4) {
    let chr = +allcourses[i].value;
    let grade = gradePoints[allcourses[i + 1].value];

    if (!isNaN(chr) && chr != 0) {
      gpa += (chr * grade);
      totalchr += chr;
    }
  }
  gpa /= totalchr;
  return gpa;
}

function viewCalGpa() {
  let gpa = calculateGpa("gpa-cal-form");
  document.getElementById("calulated-gpa").innerHTML = `Your GPA is ${gpa}`;
}