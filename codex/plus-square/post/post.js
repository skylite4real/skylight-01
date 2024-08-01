// JavaScript for Post Section
$(document).ready(function() {
    // Show post section when Post is clicked
    $('#plusDropdownMenu .dropdown-item:contains("Post")').on('click', function() {
        $('#postSection').show();
    });

    // Hide post section when close icon is clicked
    $('#closePostSection').on('click', function() {
        $('#postSection').hide();
    });
});
