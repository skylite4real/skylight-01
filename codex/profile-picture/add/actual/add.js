document.addEventListener('DOMContentLoaded', function() {
    const addIcon = document.querySelector('.add-icon');
    const addDropdown = document.querySelector('.add-dropdown');

    addIcon.addEventListener('click', function() {
        addDropdown.classList.toggle('active');
    });

    // Close the dropdown if the user clicks outside of it
    document.addEventListener('click', function(event) {
        if (!addIcon.contains(event.target) && !addDropdown.contains(event.target)) {
            addDropdown.classList.remove('active');
        }
    });

    // Prevent the dropdown from closing when clicking inside it
    addDropdown.addEventListener('click', function(event) {
        event.stopPropagation();
    });
});
