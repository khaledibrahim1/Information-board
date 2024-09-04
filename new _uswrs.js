function updateNewUsers(users) {
    users.forEach((user, index) => {
        document.getElementById(`img-${index + 1}`).src = user.imgSrc;
        document.getElementById(`name-${index + 1}`).textContent = user.name;
        document.getElementById(`time-${index + 1}`).textContent = user.time;
    });
}

// Example data to update




// Call the function with the new data
updateNewUsers(users);