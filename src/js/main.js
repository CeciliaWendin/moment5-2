"use strict"

//variabler
const url = 'http://studenter.miun.se/~cewe1800/dt173g/moment5-1/api.php';
let addCourseBtn = document.getElementById("addCourse");
let codeInput = document.getElementById("code");
let nameInput = document.getElementById("name");
let progressionInput = document.getElementById("progression");
let syllabusInput = document.getElementById("course_syllabus");

//Eventlisteners
window.addEventListener("load", getCoarses);
addCourseBtn.addEventListener("click", addCourse);

//get function
function getCoarses() {
fetch(url)
    .then((result) => result.json())
    .then(data => {
console.log("data", data);
let output = '';
let courses = data.data;
for(let i in courses) {
    output += `<tr>
    <td>${courses[i].code}</td>
    <td>${courses[i].name}</td>
    <td>${courses[i].progression}</td>
    <td><a href='${courses[i].course_syllabus}' target='_blank'>Webblänk</a></td>
    <td><button id='${courses[i].id}' onClick='deleteCourse(${courses[i].id})'>Radera</button></td>
    </tr>`;
}

document.querySelector('.tbody').innerHTML = output;
}).catch(error => console.log(error));
}

//Delete function
function deleteCourse(id) {
fetch('http://studenter.miun.se/~cewe1800/dt173g/moment5-1/api.php?id=' + id, {
method: 'DELETE',
})
.then((result) => result.json())
.then(data => {
getCoarses();
    
    //document.querySelector('.tbody').innerHTML = output;
    })
    .catch(error => console.log(error));
}

//Add function
function addCourse() {
    let code = codeInput.value;
    let name = nameInput.value;
    let progression = progressionInput.value; 
    let course_syllabus = syllabusInput.value;

    let course = {'code': code, 'name': name, 'progression': progression, 'course_syllabus': course_syllabus };

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(course),
    })
    .then((result) => result.json())
    .then(data => {
        getCoarses();
    })
    .catch(error =>  { 
        console.log(error)
    });
}

