let searchInProgress = false;

async function search() {
    if (searchInProgress) {
        return; // O(1) - Constant time check
    }

    searchInProgress = true; // O(1) - Constant time assignment
    const searchTerm = document.getElementById('searchInput').value.toLowerCase(); // O(1) - Constant time

    // Record the start time
    const startTime = performance.now(); // O(1) - Constant time

    try {
        const response = await fetch('https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=IGSqPAauZVbFQQB0249Oj4AVNIKHtaGZ'); // O(1) - Constant time

        const data = await response.json(); // O(1) - Constant time
        const booksList = data.results.lists; // O(N) - Linear time, where N is the number of lists
        const allResults = []; // O(1) - Constant time

        for (const list of booksList) { // O(N) - Linear time
            const books = list.books; // O(M) - Linear time, where M is the number of books in each list
            const results = books.filter(book => { // O(M) - Linear time
                return (
                    book.title.toLowerCase().includes(searchTerm) || // O(1) - Constant time
                    book.author.toLowerCase().includes(searchTerm) || // O(1) - Constant time
                    book.primary_isbn13.toLowerCase() === searchTerm // O(1) - Constant time
                );
            });

            results.forEach(book => { // O(M) - Linear time
                if (!allResults.some(b => b.title === book.title)) { // O(N * M) - Quadratic time
                    allResults.push(book); // O(1) - Constant time
                }
            });
        }

        if (allResults.length > 0) { // O(1) - Constant time
            displayAllResults(allResults); // O(N * M) - Quadratic time

            // Record the end time and calculate the elapsed time
            const endTime = performance.now(); // O(1) - Constant time
            const elapsedTime = endTime - startTime; // O(1) - Constant time

            // Display the time taken to the user
            displayElapsedTime(elapsedTime); // O(1) - Constant time
        } else {
            displayNoResults(); // O(1) - Constant time
        }
    } catch (error) {
        console.error('Error:', error); // O(1) - Constant time
    } finally {
        searchInProgress = false; // O(1) - Constant time
    }
}

function displayElapsedTime(time) {
    const timeDisplay = document.getElementById('timeTaken'); // O(1) - Constant time
    timeDisplay.textContent = `Time taken: ${time.toFixed(2)} milliseconds`; // O(1) - Constant time
}

function displayAllResults(allResults) {
    const resultsDiv = document.getElementById('results'); // O(1) - Constant time
    resultsDiv.innerHTML = ''; // O(1) - Constant time

    allResults.map(result => { // O(N * M) - Quadratic time
        const listContainer = document.createElement('div'); // O(1) - Constant time
        listContainer.innerHTML = `<h3>Books List</h3>`; // O(1) - Constant time

        const ul = document.createElement('ul'); // O(1) - Constant time
        const li = document.createElement('li'); // O(1) - Constant time
        li.innerHTML = `<strong>${result.title}</strong><br>
            <img src="${result.book_image}" height="200px" width="300px"/><br>
            Author: ${result.author}<br>Description: ${result.description}<br>
            ISBN: ${result.primary_isbn13}>` // O(1) - Constant time
        ul.appendChild(li); // O(1) - Constant time

        listContainer.appendChild(ul); // O(1) - Constant time
        resultsDiv.appendChild(listContainer); // O(1) - Constant time
    });
}

function displayNoResults() {
    const resultsDiv = document.getElementById('results'); // O(1) - Constant time
    resultsDiv.innerHTML = 'No results found in any of the lists.'; // O(1) - Constant time
}
