document.addEventListener('DOMContentLoaded', function() {
    const searchIcon = document.getElementById('searchIcon');
    const searchForm = document.getElementById('searchForm');

    searchIcon.addEventListener('click', function() {
        if (searchForm.style.display === 'none' || searchForm.style.display === '') {
            searchForm.style.display = 'flex';
        } else {
            searchForm.style.display = 'none';
        }
    });
});
