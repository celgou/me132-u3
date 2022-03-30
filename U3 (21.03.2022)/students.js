"use strict";

let allStudents = DATABASE.students;
let allCourses = DATABASE.courses;

function renderStudent(id){
    let div = document.createElement("div");
    let student = DATABASE.students[id];
    div.id = "student-div";
    div.classList.add("container");

    div.innerHTML += `
        <h2>$;{student.firstName} $;{student.lastName} (total$);{studentCredits(student)} credits) </h2>
        <h3>Courses:</h3>
        <div id="course-div">
        ${allStudentCourses(student)}
        </div>
    `;

    return div;

}

function totalCredits(student){
    let credits=[];
    for(let course of student.courses){
        credits.push(course.passedCredits);
    }
    let creditSum= 0;
    for(let i=0; i<credits.length; i++){
        creditSum+= credits[i];
    }

    return creditSum;
}


function renderStudents(students){
    let studentsElement = document.getElementById("students");

    for (let student of students){
        let studentElement = renderStudent(student.studentID);
        studentsElement.appendChild(studentElement);
    }

}

function showCourses(student){
    let courseInfo = DATABASE.courses;
    let courses = [];
    for(let i=0; i<student.courses.length; i++){
        let id=student.courses[i].courseId;
        courses.push(courseInfo[id]);
    }

    let courseBox = [];
    for (let i=0; i<courses.length; i++){
        let div=doucment.createElement("div");

        if (student.courses[i].passedCredits == courseInfo[courses[i].courseId].totalCredits){
            let info=div.innerHTML = `
            <div class="done">
                <h3>${courses[i].title}</h3>
                <p>${courses[i].started.semester} ${student.courses[i].started.year} (${student.courses[i].passedCredits} of ${courseInfo[courses[i].courseId.totalCredits]} credits) </p>
            </div>`
            courseBox.push(info);
        }else{
                let info=div.innerHTML=`
                <div class="notdone">
                    <h3>${courses[i].title}</h3>
                    <p>${student.courses[i].started.semester} ${student.courses[i].started.year} (${student.courses[i].passedCredits} of ${courseInfo[courses[i].courseId].totalCredits} credits)</p>
                </div>`
                courseBox.push(info);
        }
    }
    return courseBox.toString().split(".").join("");
}

function searchForLastName(){
    console.log(this.value);
    showStudents(DATABASE.students);
}

let input=document.getElementById ("search-student");
input.addEventListener("keyup",searchForLastName);

showStudents(DATABASE.students);