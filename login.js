document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get user input
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Send credentials to the backend for authentication
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => {
        if (response.ok) {
            // Redirect to index.html if login is successful
            window.location.href = 'index.html';
        } else {
            // Display error message if credentials are incorrect
            alert('Invalid username or password');
        }
    })
    .catch(error => console.error('Error:', error));
});