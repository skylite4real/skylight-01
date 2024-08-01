document.getElementById('plusIconWrapper').addEventListener('click', function () {
    var dropdownMenu = document.getElementById('plusDropdownMenu');
    if (dropdownMenu.classList.contains('show')) {
        dropdownMenu.classList.remove('show');
    } else {
        dropdownMenu.classList.add('show');
    }
});

// Close the dropdown if the user clicks outside of it
window.addEventListener('click', function (e) {
    var dropdownMenu = document.getElementById('plusDropdownMenu');
    if (!document.getElementById('plusIconWrapper').contains(e.target)) {
        dropdownMenu.classList.remove('show');
    }
});
