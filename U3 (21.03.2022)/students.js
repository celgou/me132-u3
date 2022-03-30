"use strict";

let allStudents = DATABASE.students;
let allCourses = DATABASE.courses;

function renderStudent(student){
    let div = document.createElement("div");
    div.id = "student-div";
    div.innerHTML += `
        <h2>${student.firstName} ${student.lastName} (total${studentCredits(student)} credits) </h2>
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
    console.log("hej");
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
                <p>${courses[i].started.semester} ${student.courses[i].started.year} (${student.courses[i].passedCredits}
                of ${courseInfo[courses[i].courseId.totalCredits]} credits) </p>
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
    return courseArray.toString().split(",").join("");
}

function inputResult(){
    let result=[];
    let input= document.getElementById("student-input");

    for(let i=0; i<allStudents.length; i++){
        document.querySelector("#student-results").innerHTML="";
        if (""==input.value){
            document.querySelector("#student-results").innerHTML="";
        }else if(allStudents[i].lastName.toLowerCase().includes(input.value.toLowerCase())){
            resultArray.push(allStudents[i]);
        }
        
    }

    renderStudents(resultArray);
}

document.getElementById("student-input").addEventListener("keyup",inputResult);