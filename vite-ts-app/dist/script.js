const data = loadJSON('../DO_NOT_TOUCH/data.json'); //Don't delete this line. All your data is here. It does take a few seconds for Replit to load the data because it's so large.
console.log(data);


function searchBooks() {
    // Get the user's search query and perform the search
    const searchQuery = document.getElementById('searchInput').value;
    console.log(searchQuery)
    const resultsContainer = document.getElementById('results');
    const timeTakenContainer = document.getElementById('timeTaken');

    // Perform the search logic based on the searchQuery
    const searchResults = performSearch(searchQuery);
    console.log(searchResults)

    // Display search results
    displayResults(searchResults, resultsContainer);

    // Calculate and display the time taken (you can measure the time taken in your specific search logic)
    const timeTaken = calculateTimeTaken(searchQuery);
    timeTakenContainer.textContent = `Search completed in ${timeTaken.toFixed(2)} ms`;
    timeTakenContainer.classList.add('time');
}

// Implement your search logic here
function performSearch(searchQuery) {
    // Create an array to store matching results
    const results = [];

    // Loop through your data arrays and check for matches
    for (let i = 0; i < data.bookName.length; i++) {
        // Convert both the search query and the data to lowercase for case-insensitive search
        const searchLower = searchQuery.toLowerCase();
        // console.log(searchLower)
        const bookNameLower = data.bookName[i].toLowerCase();
        const firstNameLower = data.firstName[i].toLowerCase();
        const lastNameLower = data.lastName[i].toLowerCase();
        const guidLower = data.guid[i].toLowerCase();

        // Check if the search query matches any of the criteria
        if (
            bookNameLower.includes(searchLower) ||
            firstNameLower.includes(searchLower) ||
            lastNameLower.includes(searchLower) ||
            guidLower.includes(searchLower)
        ) {
            // If there's a match, add the corresponding book to the results
            results.push({
                bookName: data.bookName[i],
                firstName: data.firstName[i],
                lastName: data.lastName[i],
                guid: data.guid[i],
                gender:data.gender[i]
            });
        }
    }
    console.log(results)
    return results;
    
}

// Function to display search results
function displayResults(results, container) {
    //container=>resultconatiner
    // Clear previous results
    container.innerHTML = '';

    if (results.length === 0) {
        container.innerHTML = '<p>No results found.</p>';
    } else {
        // Sort the results alphabetically by last name
        results.sort((a, b) => a.lastName.localeCompare(b.lastName));

        results.forEach(result => {
            const card = document.createElement('div');
            card.classList.add('card'); // Add a CSS class for styling

            const cardContent = document.createElement('div');
            cardContent.classList.add('card-content'); // Add a CSS class for styling

            const title = document.createElement('h2');
            title.textContent = result.bookName;

            const author = document.createElement('p');
            author.textContent = `Author: ${result.firstName} ${result.lastName}`;

            const uniqueId = document.createElement('p');
            uniqueId.textContent = `Unique ID: ${result.guid}`;

            const gender = document.createElement('p');
            gender.textContent = `Gender: ${result.gender}`;

            cardContent.appendChild(title);
            cardContent.appendChild(author);
            cardContent.appendChild(uniqueId);
            cardContent.appendChild(gender);

            card.appendChild(cardContent);
            container.appendChild(card);
        });
    }
}


// Function to measure time taken (you can implement this according to your needs)
function calculateTimeTaken(searchQuery) {
    // Measure the time taken for the search operation
    const startTime = performance.now();

    // Your search logic here, based on the provided searchQuery
   performSearch(searchQuery);

    const endTime = performance.now();
    const timeTaken = endTime - startTime;

    return timeTaken;
}

function bookList() {
    // Create an array to store matching results
    const booklistresults = [];

    // Loop through your data arrays and check for matches
    // for (let i = 0; i < data.bookName.length; i++) { 
        for (let i = 0; i < 10; i++) {        
        
            booklistresults.push({
                bookName: data.bookName[i],
                firstName: data.firstName[i],
                lastName: data.lastName[i],
                guid: data.guid[i],
                gender:data.gender[i]
            });
        
    }
    console.log(booklistresults)
    return booklistresults;
    
}

function displayTable(booklistresult, container) {
    // Clear previous results
    container.innerHTML = '';
    searchQuery.value=""
   

    if (booklistresult.length === 0) {
        container.innerHTML = '<p>No results found.</p>';
    } else {
        const table = document.createElement('table');
        table.classList.add('table'); // Add a CSS class for styling

        const tableHeader = table.createTHead();
        const headerRow = tableHeader.insertRow(0);
        headerRow.innerHTML = `
                                <th>Book Name</th>
                                <th>Author</th>
                                <th>Unique ID</th>
                                <th>Gender</th>
                                `;

        const tableBody = table.createTBody();
        booklistresult.forEach(result => {
            const row = tableBody.insertRow();
            row.innerHTML = `<td>${result.bookName}</td><td>${result.firstName} ${result.lastName}</td><td>${result.guid}</td><td>${result.gender}</td>`;
        });

        container.appendChild(table);
    }
}

function showBookList() {
    document.getElementById('searchInput').value="";
    const booklistresult = bookList();
    const resultsContainer = document.getElementById('results');
    displayTable(booklistresult, resultsContainer);
}






