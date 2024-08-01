document.getElementById('menuButton').addEventListener('click', function() {
    document.getElementById('userActivitySection').classList.add('active');
});

document.getElementById('closeIcon').addEventListener('click', function() {
    document.getElementById('userActivitySection').classList.remove('active');
});

// Handle button color change and display respective content
document.querySelectorAll('.icon-item').forEach(function(button) {
    button.addEventListener('click', function(event) {
        event.stopPropagation(); // Prevent the click event from bubbling up

        // Remove active class from all buttons
        document.querySelectorAll('.icon-item').forEach(function(btn) {
            btn.classList.remove('active');
        });

        // Add active class to the clicked button
        this.classList.add('active');

        // Display respective content
        displayContent(this);
    });
});

// Prevent clicks inside the userActivitySection from closing it
document.getElementById('userActivitySection').addEventListener('click', function(event) {
    event.stopPropagation();
});

function displayContent(button) {
    const contentMap = {
        'fa-thumbs-up': 'You liked this!',
        'fa-thumbs-down': 'You disliked this!',
        'fa-comments': 'Here are some comments.',
        'fa-bookmark': 'You saved this!',
        'fa-clock-rotate-left': 'Here is your history.'
    };

    // Hide all content
    document.querySelectorAll('.content').forEach(function(content) {
        content.style.display = 'none';
    });

    // Show the respective content
    const iconClass = button.querySelector('i').classList[1];
    const contentText = contentMap[iconClass];
    let contentDiv = document.getElementById('content');

    if (!contentDiv) {
        contentDiv = document.createElement('div');
        contentDiv.id = 'content';
        contentDiv.classList.add('content');
        document.getElementById('userActivitySection').appendChild(contentDiv);
    }

    contentDiv.innerText = contentText;
    contentDiv.style.display = 'block';
}
