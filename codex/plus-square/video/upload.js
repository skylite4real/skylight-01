document.getElementById('addVideoButton').addEventListener('click', function () {
    document.getElementById('videoUploadForm').style.display = 'block';
});

document.getElementById('closeVideoUploadForm').addEventListener('click', function () {
    document.getElementById('videoUploadForm').style.display = 'none';
});

document.addEventListener('DOMContentLoaded', function() {
    const descriptionTextarea = document.querySelector('.form-control.description');

    descriptionTextarea.addEventListener('input', function() {
        // Reset the height to allow shrinking if the content is reduced
        this.style.height = 'auto';
        // Set the height based on the scroll height, but not more than the max-height
        if (this.scrollHeight <= 300) {
            this.style.height = this.scrollHeight + 'px';
        } else {
            this.style.height = '300px';
        }
    });

    var mandatoryFields = [
        document.getElementById('videoTitle'),
        document.getElementById('videoDescription'),
        document.getElementById('videoDateTime')
    ];

    mandatoryFields.forEach(function(field) {
        field.addEventListener('input', function() {
            var uploadButton = document.querySelector('#videoPreviewSection button');
            if (uploadButton) {
                uploadButton.disabled = !areMandatoryFieldsFilled();
            }
        });
    });
});

document.getElementById('videoFile').addEventListener('change', function(event) {
    var videoFile = event.target.files[0];
    var videoURL = URL.createObjectURL(videoFile);
    var videoElement = document.getElementById('uploadedVideo');
    videoElement.src = videoURL;
    videoElement.style.display = 'block'; // Ensure video element is displayed
    document.getElementById('videoDisplaySection').style.display = 'block';
    scrollToBottom('videoUploadForm');
});

document.getElementById('thumbnailFile').addEventListener('change', function(event) {
    var thumbnailFile = event.target.files[0];
    var thumbnailURL = URL.createObjectURL(thumbnailFile);
    var thumbnailElement = document.getElementById('chosenThumbnail');
    thumbnailElement.src = thumbnailURL;
    thumbnailElement.style.display = 'block'; // Ensure thumbnail element is displayed
    document.getElementById('thumbnailDisplaySection').style.display = 'block';
    scrollToBottom('videoUploadForm');
});



// Function to scroll to the bottom of a given element by id
function scrollToBottom(elementId) {
    var element = document.getElementById(elementId);
    element.scrollTop = element.scrollHeight;
    console.log(`Scrolled to bottom of ${elementId}`);
}

document.addEventListener("DOMContentLoaded", function() {
    const uploadedVideo = document.getElementById("uploadedVideo");

    // Disable context menu on uploadedVideo to prevent download option
    uploadedVideo.addEventListener("contextmenu", function(e) {
        e.preventDefault();
    });
});
