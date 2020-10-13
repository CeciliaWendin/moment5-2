"use strict"
const url = 'http://localhost:8888/moment5-1/api.php';

//fetch function
fetch(url)
    .then((result) => result.json())
    .then(data => {
console.log("data", data);
let output = '';
for(let i in data) {
    output += `<tr>
    <td>${data[i].code}</td>
    <td>${data[i].name}</td>
    <td>${data[i].progression}</td>
    <td>${data[i].course_syllabus}</td>
    </tr>`;
}

document.querySelector('.tbody').innerHTML = output;
}).catch(error => console.log(error));
