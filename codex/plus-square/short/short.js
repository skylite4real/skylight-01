// JavaScript for Short Section
$(document).ready(function() {
    // Show short section when Short is clicked
    $('#plusDropdownMenu .dropdown-item:contains("Short")').on('click', function() {
        $('#shortSection').show();
    });

    // Hide short section when close icon is clicked
    $('#closeShortSection').on('click', function() {
        $('#shortSection').hide();
    });
});
