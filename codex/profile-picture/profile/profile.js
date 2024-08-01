document.getElementById('profilePhoto').addEventListener('click', function () {
    document.getElementById('profileSection').style.display = 'block';
});

document.querySelector('.close-profile-icon').addEventListener('click', function () {
    document.getElementById('profileSection').style.display = 'none';
});

function showSection(section) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(function(content) {
        content.classList.remove('active');
    });

    // Remove active class from all tabs
    document.querySelectorAll('.tab').forEach(function(tab) {
        tab.classList.remove('active');
        const icon = tab.querySelector('i');
        icon.style.color = '#bbc0c3'; // Reset the color to original
    });

    // Show the selected section
    document.getElementById(section + 'Content').classList.add('active');
    const selectedTab = document.getElementById(section + 'Tab');
    selectedTab.classList.add('active');
    const selectedIcon = selectedTab.querySelector('i');
    selectedIcon.style.color = 'black'; // Change the color to black
}

// Set the default active tab and content
document.getElementById('videosTab').classList.add('active');
document.getElementById('videosContent').classList.add('active');
document.getElementById('videosTab').querySelector('i').style.color = 'black'; // Set the default active icon color

document.addEventListener('DOMContentLoaded', function () {
    const tabs = document.querySelector('.profile-section .tabs');
    let isDown = false;
    let startX;
    let scrollLeft;

    const startSwipe = (e) => {
        isDown = true;
        tabs.classList.add('active');
        startX = e.pageX - tabs.offsetLeft || e.touches[0].pageX - tabs.offsetLeft;
        scrollLeft = tabs.scrollLeft;
    };

    const endSwipe = () => {
        isDown = false;
        tabs.classList.remove('active');
    };

    const moveSwipe = (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - tabs.offsetLeft || e.touches[0].pageX - tabs.offsetLeft;
        const walk = (x - startX) * 3; // scroll-fast
        tabs.scrollLeft = scrollLeft - walk;
    };

    tabs.addEventListener('mousedown', startSwipe);
    tabs.addEventListener('mouseleave', endSwipe);
    tabs.addEventListener('mouseup', endSwipe);
    tabs.addEventListener('mousemove', moveSwipe);

    tabs.addEventListener('touchstart', startSwipe);
    tabs.addEventListener('touchend', endSwipe);
    tabs.addEventListener('touchmove', moveSwipe);
});

// JavaScript for Options Dropdown Functionality
document.addEventListener('DOMContentLoaded', function() {
    const optionsIcon = document.querySelector('.options-icon');
    const optionsDropdown = document.querySelector('.options-dropdown');

    optionsIcon.addEventListener('click', function(event) {
        event.stopPropagation(); // Prevent event bubbling
        optionsDropdown.classList.toggle('active');
    });

    document.addEventListener('click', function(event) {
        if (!optionsDropdown.contains(event.target) && !optionsIcon.contains(event.target)) {
            optionsDropdown.classList.remove('active');
        }
    });

    document.getElementById('logout').addEventListener('click', function(event) {
        event.preventDefault();
        alert('Logged out');
        // Add your logout functionality here
    });

    document.getElementById('deactivate').addEventListener('click', function(event) {
        event.preventDefault();
        alert('Account deactivated');
        // Add your deactivate functionality here
    });
});

document.getElementById('editProfileBtn').addEventListener('click', function() {
    document.querySelectorAll('.edit-input').forEach(input => input.style.display = 'block');
    document.querySelectorAll('.additional-info span').forEach(span => span.style.display = 'none');
    document.getElementById('editProfileBtn').style.display = 'none';
    document.getElementById('updateProfileBtn').style.display = 'inline-block';
});

document.getElementById('updateProfileBtn').addEventListener('click', function() {
    const fullName = document.getElementById('fullNameInput').value;
    const email = document.getElementById('emailInput').value;
    const dob = document.getElementById('dobInput').value;
    const location = document.getElementById('locationInput').value;
    const about = document.getElementById('aboutInput').value;
    const links = document.getElementById('linksInput').value;
    const profession = document.getElementById('professionInput').value;

    document.getElementById('fullNameText').innerText = fullName;
    document.getElementById('emailText').innerText = email;
    document.getElementById('dobText').innerText = dob;
    document.getElementById('locationText').innerText = location;
    document.getElementById('aboutText').innerText = about;
    document.getElementById('linksText').innerText = links;
    document.getElementById('professionText').innerText = profession;

    document.querySelectorAll('.edit-input').forEach(input => input.style.display = 'none');
    document.querySelectorAll('.additional-info span').forEach(span => span.style.display = 'block');
    document.getElementById('editProfileBtn').style.display = 'inline-block';
    document.getElementById('updateProfileBtn').style.display = 'none';
});
