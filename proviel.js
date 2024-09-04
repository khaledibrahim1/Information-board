

// Function to update profile information
function updateProfile(profile) {
    document.getElementById('username').textContent = profile.username;
    document.getElementById('role').textContent = profile.role;
    document.getElementById('profile-photo').src = profile.profilePhoto;
}


// Call the function with the profile data
updateProfile(profileData);
