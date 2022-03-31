"use strict";

let allStudents = DATABASE.students;
let allTeachers = DATABASE.teachers;
let allCourses = DATABASE.courses;

//funktion som går igenom kurser och implementerar det i HTML.  
function renderCourse (id) {
    let div = document.createElement("div");
    div.id = "course-div";
    div.innerHTML += `
        <h2>${titleOfCourse(id)} (total ${totalCourseCredits(id)} credits)</h2>
        <div id="resp-div">
        <h3>Course Responsible:</h3>
        <div id="resp-info">${courseResponsible(id)}</div>
        </div>
        <div id="teacher-div">
        <h3>Teachers:</h3>
        <div id="teacher-info">${allTeacherInfo(id)}</div>
        </div>
        <div>
        <h3>Students:</h3>
        <div id="student-div">${allStudentInfo(id)}</div>
        </div>
    `;

    return div;
}
//funktion för att hitta alla kurserna
function renderCourses (courses) {
    let coursesElement = document.getElementById("courses-result");

    for (let course of courses) {
        let courseElement = renderCourse(course.courseId);
        coursesElement.appendChild(courseElement);    
    }
}
//funktion för att hitta kurstitlarna
function titleOfCourse (id) {
    let course = DATABASE.courses[id];
    return course.title;
}

//funktion för att veta hur många högskolepoäng varje enskild kurs har
function totalCourseCredits (id) {
    let course = allCourses[id];
    return course.totalCredits;
}
//funktion som hittar kursansvarig
function courseResponsible (id) {
    let course = DATABASE.courses[id];
    let teachersName = allTeachers.map((teacher) => teacher.firstName + " " + teacher.lastName + " " + `(${teacher.post})`);
    let resp = course.courseResponsible;
    return teachersName[resp];
}
//funktion som hittar information om läraren
function allTeacherInfo (id) {
    let course = DATABASE.courses[id];
    let teachersNames = allTeachers.map((teacher) => teacher.firstName + " " + teacher.lastName + " " + `(${teacher.post})`);
    let teachers = [];

    for (let i = 0; i < teachersNames.length; i++) {
        if (course.teachers.some((value) => value == i)) {
            let div = document.createElement("div");
            let info = div.innerHTML = `<p>${teachersNames[i]}</p>`
            teachers.push(info);
        }
    }

    return teachers.toString().split(",").join(" ");
}
//funktion som tar reda på tidigare högskolepoäng
function passedCredits (takenCourse, student){
    let passedCredit = student.courses.filter((course) => course.courseId == takenCourse.courseId).map((course) => course.passedCredits)
    return passedCredit
}
//funktion som tar reda på när kursen började
function courseStarted (takenCourse, student){
    let courseStart = student.courses.filter((course) => course.courseId == takenCourse.courseId).map((course) => `${course.started.semester} ${course.started.year}`)
    return courseStart
}
//denna funktion tar reda på information om studenten
function allStudentInfo (id) {
    let courseId = DATABASE.courses[id].courseId
    let students = allStudents.filter((student) => student.courses.some((course) => course.courseId == courseId))
    let studentsDiv = []
        for (let student of students){
            let courseById = student.courses.filter((course) => course.courseId == courseId)
            for (let i = 0; i < courseById.length; i++){
                if (passedCredits(courseById[i], student)[i] == DATABASE.courses[id].totalCredits){
                    let div = document.createElement("div")
                    let info = div.innerHTML = `<div class="done">
                    <p>${student.firstName} ${student.lastName} (${passedCredits(courseById[i], student)[i]} credits)</p>
                    <h5>${courseStarted(courseById[i], student)[i]}</h5>
                    </div>`
                    studentsDiv.push(info)
                } else{
                    let div = document.createElement("div")
                    let info = div.innerHTML = `<div class="not-done">
                    <p>${student.firstName} ${student.lastName} (${passedCredits(courseById[i], student)[i]} credits)</p>
                    <h5>${courseStarted(courseById[i], student)[i]}</h5>
                    </div>`
                    studentsDiv.push(info)
                }
            }
        }
    return studentsDiv.toString().split(",").join(" ");
}
//funktion som tar reda på vad som läggs in i input
function inputResult () {
    let resultArray = [];
    let input = document.getElementById("course-input");

    for (let i = 0; i < allCourses.length; i++) {
        document.querySelector("#courses-result").innerHTML = "";
        if ("" == input.value) { 
            document.querySelector("#courses-result").innerHTML = "";
        } else if (allCourses[i].title.toLowerCase().includes(input.value.toLowerCase())) {
            resultArray.push(allCourses[i]);
        }
    }

    renderCourses(resultArray);
}

//dark mode funktion
function darkModeActivated() {
    var element = document.body;
    element.classList.toggle("dark-mode");
} 
  
//här skapade jag en eventlistener som lyssnar på när användaren skriver in i sökfunktionen.
document.getElementById("course-input").addEventListener("keyup", inputResult);

