document.addEventListener('DOMContentLoaded', function () {
    const tabs = document.querySelectorAll('.nav-link');

    tabs.forEach(tab => {
        tab.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent default link behavior

            // Remove active class from all tabs
            tabs.forEach(innerTab => {
                innerTab.classList.remove('active');
            });

            // Add active class to the clicked tab
            this.classList.add('active');

            // Load content for the clicked tab
            const targetId = this.getAttribute('href').substring(1);
            loadContent(targetId);
        });
    });

    // Load initial content for the active tab
    loadContent('home');

    function loadContent(tabId) {
        const contentPlaceholder = document.getElementById(`${tabId}-content`);
        // Clear current content
        contentPlaceholder.innerHTML = 'Loading...';

        // Fetch content from the database (simulate with a timeout)
        setTimeout(() => {
            contentPlaceholder.innerHTML = `Content loaded for ${tabId}`;
            // Replace this with your actual data fetching logic
            // Example:
            // fetch(`/api/${tabId}`)
            //     .then(response => response.json())
            //     .then(data => {
            //         contentPlaceholder.innerHTML = JSON.stringify(data);
            //     });
        }, 1000);
    }
});
