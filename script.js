const table = document.getElementById('studentTable');
const searchInput = document.getElementById('searchInput');
let studentsData = [];

// Fetching data from the provided URL
async function fetchData() {
    const response = await fetch('https://gist.githubusercontent.com/harsh3195/b441881e0020817b84e34d27ba448418/raw/c4fde6f42310987a54ae1bc3d9b8bfbafac15617/demo-json-data.json');
    const data = await response.json();
    studentsData = data;
    renderTable(data);
}

// Render the table with student data
function renderTable(data) {
    table.innerHTML = `
        <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Marks</th>
            <th>Passing</th>
            <th>Class</th>
        </tr>
    `;
    data.forEach(student => {
        const passingStatus = student.passing ? 'Passing' : 'Failed';
        const fullName = `${student.first_name} ${student.last_name}`;
        table.innerHTML += `
            <tr>
                <td><img src="${student.image}" alt="${fullName}">${fullName}</td>
                <td>${student.email}</td>
                <td>${student.marks}</td>
                <td>${passingStatus}</td>
                <td>${student.class}</td>
            </tr>
        `;
    });
}

// Search functionality
function search() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredData = studentsData.filter(student => {
        return (
            student.first_name.toLowerCase().includes(searchTerm) ||
            student.last_name.toLowerCase().includes(searchTerm) ||
            student.email.toLowerCase().includes(searchTerm)
        );
    });
    renderTable(filteredData);
}

// Sorting functions
function sortAZ() {
    studentsData.sort((a, b) => (a.first_name + a.last_name).localeCompare(b.first_name + b.last_name));
    renderTable(studentsData);
}

function sortZA() {
    studentsData.sort((a, b) => (b.first_name + b.last_name).localeCompare(a.first_name + a.last_name));
    renderTable(studentsData);
}

function sortByMarks() {
    studentsData.sort((a, b) => a.marks - b.marks);
    renderTable(studentsData);
}

function sortByPassing() {
    const passingStudents = studentsData.filter(student => student.passing);
    renderTable(passingStudents);
}

function sortByClass() {
    studentsData.sort((a, b) => a.class - b.class);
    renderTable(studentsData);
}

function sortByGender() {
    const maleStudents = studentsData.filter(student => student.gender === 'Male');
    const femaleStudents = studentsData.filter(student => student.gender === 'Female');

    table.innerHTML = '';
    renderTable(maleStudents);
    renderTable(femaleStudents);
}

// Initialize by fetching data
fetchData();
