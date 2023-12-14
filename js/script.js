document.addEventListener('DOMContentLoaded', function () {
    // Retrieving HTML elements by their IDs
    const studentIdElement = document.getElementById('student-id');
    const studentNameElement = document.getElementById('student-name');
    const jobInfoElement = document.getElementById('job-info');
    const jobNameInput = document.getElementById('job-name-input');
    const searchButton = document.getElementById('search-button');

    // Defining the value student name and student number
    const studentName = 'Arnav Saini';
    const studentId = '200542352';

    // Set student information in the HTML
    studentNameElement.textContent = `Name: ${studentName}`;
    studentIdElement.textContent = `Student ID: ${studentId}`;

    // Function to fetch job data based on the provided job name
    async function fetchData(jobName) {
        // Constructing the URL for the job search API
        const url = `https://jsearch.p.rapidapi.com/search?query=${jobName}&page=1&num_pages=1`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '49aacd7061mshf22d724dbe0256bp1a026cjsn488a7a372fe3',
                'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
            }
        };

        try {
            // Making an asynchronous request to the API
            const response = await fetch(url, options);
            const data = await response.json();

            // Checking if job data is available
            if (data && data.data && data.data.length > 0) {
                const jobData = data.data;

                // Clearing previous job information
                jobInfoElement.innerHTML = '';

                // Iterating through job data and create HTML elements for display
                jobData.forEach((job, index) => {
                    const jobContainer = document.createElement('div');
                    jobContainer.classList.add('job-info', 'animated');

                    // Creating HTML elements for job information
                    const titleElement = document.createElement('p');
                    titleElement.textContent = `Job Title: ${job.job_title}`;

                    const employerElement = document.createElement('p');
                    employerElement.textContent = `Employer Name: ${job.employer_name}`;

                    const logoElement = document.createElement('p');
                    logoElement.innerHTML = `Employer Logo: ${job.employer_logo ? `<img src="${job.employer_logo}" alt="Employer Logo">` : 'Not available'}`;

                    const cityElement = document.createElement('p');
                    cityElement.textContent = `Job City: ${job.job_city}`;

                    const typeElement = document.createElement('p');
                    typeElement.textContent = `Job Type: ${job.job_employment_type}`;

                    // Appending HTML elements to the job container
                    jobContainer.appendChild(titleElement);
                    jobContainer.appendChild(employerElement);
                    jobContainer.appendChild(logoElement);
                    jobContainer.appendChild(cityElement);
                    jobContainer.appendChild(typeElement);

                    // Appending the job container to the main jobInfoElement
                    jobInfoElement.appendChild(jobContainer);
                });
            } else {
                // Displaying a message if no job information is available
                jobInfoElement.textContent = 'No job information available.';
            }
        } catch (error) {
            // Logging an error message if there's an issue with fetching data
            console.error('Error fetching data:', error);
        }
    }

    // Function to display a message when no job name is entered
    function displayNoResults() {
        jobInfoElement.textContent = 'Enter a job name to search.';
    }

    // Event listener for the search button
    searchButton.addEventListener('click', function () {
        // Getting the trimmed value of the job name input
        const jobName = jobNameInput.value.trim();
        if (jobName.length > 0) {
            // Calling the fetchData function with the provided job name
            fetchData(jobName);
        } else {
            // Displaying a message if no job name is entered
            displayNoResults();
        }
    });
});
