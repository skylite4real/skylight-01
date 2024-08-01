// JavaScript for Video Section
$(document).ready(function() {
    // Show video section when Video is clicked
    $('#plusDropdownMenu .dropdown-item:contains("Video")').on('click', function() {
        $('#videoSection').show();
    });

    // Hide video section when close icon is clicked
    $('#closeVideoSection').on('click', function() {
        $('#videoSection').hide();
    });
});
