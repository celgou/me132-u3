<<<<<<< Updated upstream
=======
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
    let course=DATABASE.courses[id];
    return course.title;
}

//function totalCourseCredits;
>>>>>>> Stashed changes
