"use strict";

let allStudents = DATABASE.students;
let allTeachers = DATABASE.teachers;
let allCourses = DATABASE.courses;

function renderCourse (id){
    let div= document.createElement("div");
    div.id = "course-div";
    div.innerHTML +=`
        <h2>${courseTitle(id)} (total ${totalCourseCredits(id)} credits)</h2>
        <div id="responsible-div">
        <h3>Course Responsible:</h3>
        <div id="responsible-info">${courseResponsible(id)}</div>
        </div>
        <div id="teacher-div">
        <h3>Teachers:</h3>
        <div id="teacher-info">${allTeacherInfo(id)}</div>
        </div>
        <div>
        <h3>Students:</h3>
        <div id="student-div">${allStudentinfo(id)}</div>
        </div>
        `;

        return div;
}

function renderCourses (courses){
    let coursesElement = document.getElementById("courses-result");

    for(let course of courses){
        let courseElement=renderCourse(course.courseId);
        coursesElement.appendChild(courseElement);

    }
}

function courseTitle (id){
    let course = DATABASE.courses[id];
    return course.title;
}

function totalCourseCredits(id){
    let course= allCourses[id];
    return course.totalCredits;
}

function courseResponsible(id){
    let course= DATABASE.courses[id];
    let nameOfTeacher= allTeachers.map((teacher)=>teacher.firstName+ " " +teacher.lastName+ " "+`(${teacher.post})`);
    let responsible= course.courseResponsible;
    return nameOfTeacher[responsible];
}

function allTeacherInfo(id){
    let course=DATABASE.courses[id];
    let nameOfTeacher= allTeachers.map((teacher)=>teacher.firstName+ "" +teacher.lastName+""+`(${teacher.post})`);
    let teachers=[];

    for(let i=0; i<nameOfTeacher.length; i++){
        if(course.teachers.some((value)=>value==i)){
            let div= document.createElement("div");
            let info=div.innerHTML= `<p>${nameOfTeacher[i]}</p>`
            teachers.push(info);
        }
    }
    return teachers.toString().split(",").join("");
}

function passedCredits(takenCourse, student){
    let passedCredits= student.courses.filter((course)=>course.courseId == takenCourse.courseId).map((course)=>course.passedCredits)
    return passedCredits;
}

function courseStarted(takenCourse, student){
    let courseStart= student.courses.filter((course)=>course.courseId == takenCourse.courseId).map((course)=> `${course.started.semester}${course.started.year}`)
}