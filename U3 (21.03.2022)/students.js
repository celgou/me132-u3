"use strict";
//globala variabler för databasen
let allStudents = DATABASE.students
let allCourses = DATABASE.courses
let allTeachers = DATABASE.teachers


/*Funktion för att skapa en student baserat på informationen med syftet att skapa en div med id "student-div"
som innehåller studentens förnamn och efternamn samt deras totala credits, därefter lägger jag till courses och ännu en div för alla kurserna
vidare tänkte jag returnera den nya diven skapad */

function renderStudent (student) {
    let div = document.createElement("div");
    div.id = "student-div";
    div.innerHTML += `
        <h2>${student.firstName} ${student.lastName} (total ${totalStudentCredits(student)} credits)</h2>
        <h3>Courses:</h3>
        <div id="course-div">
        ${allStudentCourses(student)}
        </div>
    `;

    return div;
}

// funktion som ska gå igenom varje student och lägger till HTML
function renderStudents (students) {
    let studentsElement = document.getElementById("student-results");

    for (let student of students) {
        let studentElement = renderStudent(student);
        studentsElement.appendChild(studentElement);    
    }
}
// funktion för att räkna ut de totala högskolepoängen för en student, denna filtrerar studentens totala credits.
function totalStudentCredits (student) {
    let credits = [];

    for (let course of student.courses) {
        credits.push(course.passedCredits);
    }

    let creditSum = 0;
    for (let i = 0; i < credits.length; i++) {
        creditSum += credits[i];
        
    }

    return creditSum;
}


// funktion som hittar kurserna baserat på deras id
function allStudentCourses(student) {
    let theCourses = [];

    for (let i = 0; i < student.courses.length; i++) {
        let Id = student.courses[i].courseId;
        theCourses.push(allCourses[Id]);
    }

    let courseArray = [];

    for (let i = 0; i < theCourses.length; i++) {
        let div = document.createElement("div");

        if (student.courses[i].passedCredits == 
            allCourses[student.courses[i].courseId].totalCredits
        ) {
            let info = (div.innerHTML = `
            <div id="done">
            <h4 id="course-h">${allCourses[i].title}</h4>
            <p id="course-p">${student.courses[i].started.semester} ${student.courses[i].started.year} 
            ( ${student.courses[i].passedCredits} of 
            ${allCourses[student.courses[i].courseId].totalCredits} credits)
            </div>
            `)
            courseArray.push(info)
        } else {
            let info = (div.innerHTML = `
            <div id="not-done">
            <h4 id="course-h">${allCourses[i].title}</h4>
            <p id="course-p">${student.courses[i].started.semester} ${student.courses[i].started.year} 
            ( ${student.courses[i].passedCredits} of 
            ${allCourses[student.courses[i].courseId].totalCredits} credits)
            </div>
            `)
            courseArray.push(info)
        }
    }

    return courseArray.toString().split(",").join("");
}

//Funktion för att veta vad som läggs in i sökrutan och implementera det i HTML.
function inputResult () {
    let resultArray = [];
    let input = document.getElementById("student-input");

    for (let i = 0; i < allStudents.length; i++) {
        document.querySelector("#student-results").innerHTML = "";
        if ("" == input.value) { 
            document.querySelector("#student-results").innerHTML = "";
        } else if (allStudents[i].lastName.toLowerCase().includes(input.value.toLowerCase())) {
            resultArray.push(allStudents[i]);
        }
    }

    renderStudents(resultArray);
}

//Eventlistener som lyssnar på vad användaren skriver in.

document.getElementById("student-input").addEventListener("keyup", inputResult);

//funktion för att kunna ha darkmode, däremot inte genom LocalStorage
function darkModeActivated(){
    var element = document.body;
    element.classList.toggle("dark-mode");
} 