document.addEventListener('DOMContentLoaded', function () {
    // Get the video option and video upload form elements
    const videoOption = document.getElementById('addVideo');
    const videoUploadForm = document.getElementById('videoUploadForm');
    const closeVideoUploadForm = document.getElementById('closeVideoUploadForm');

    // Show the video upload form when the video option is clicked
    videoOption.addEventListener('click', function () {
        videoUploadForm.style.display = 'block';
    });

    // Hide the video upload form when the close arrow is clicked
    closeVideoUploadForm.addEventListener('click', function () {
        videoUploadForm.style.display = 'none';
    });
});
