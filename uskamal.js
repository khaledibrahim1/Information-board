function updateNewUsers(users) {
    const userList = document.getElementById('user-list');
    userList.innerHTML = '';  // Clear existing content

    users.forEach(user => {
        // Create a new user element
        const userDiv = document.createElement('div');
        userDiv.classList.add('user');
        
        // Create and set user image
        const userImg = document.createElement('img');
        userImg.src = user.imgSrc;
        userDiv.appendChild(userImg);
        
        // Create and set user name with ID
        const userName = document.createElement('h2');
        userName.innerHTML = `ID: <span>${user.userID}</span> - ${user.name}`;
        userDiv.appendChild(userName);
        
        // Create and set user time
        const userTime = document.createElement('p');
        userTime.textContent = user.time;
        userDiv.appendChild(userTime);

        // Append user element to the list
        userList.appendChild(userDiv);
    });
}



// Call the function with the new data
updateNewUsers(users);