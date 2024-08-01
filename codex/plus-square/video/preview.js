document.getElementById('previewVideoButton').addEventListener('click', function () {
    integrateThumbnailWithVideo();
    displayPreview();
});

function integrateThumbnailWithVideo() {
    var videoElement = document.getElementById('uploadedVideo');
    var thumbnailElement = document.getElementById('chosenThumbnail');

    if (thumbnailElement.src) {
        videoElement.poster = thumbnailElement.src;
    }
}

function displayPreview() {
    var previewSection = document.createElement('div');
    previewSection.id = 'videoPreviewSection';
    previewSection.style.position = 'relative';
    previewSection.style.display = 'block';

    var videoElement = document.getElementById('uploadedVideo').cloneNode(true);
    videoElement.controls = true;
    videoElement.style.maxWidth = '100%';

    var closeButton = document.createElement('button');
    closeButton.textContent = 'Close Preview';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '10px';
    closeButton.style.right = '10px';
    closeButton.className = 'filter-button';
    closeButton.addEventListener('click', function () {
        document.getElementById('videoUploadForm').removeChild(previewSection);
        document.getElementById('previewVideoButton').style.display = 'block';

        // Reset the poster attribute to allow selecting new videos and thumbnails
        var originalVideoElement = document.getElementById('uploadedVideo');
        originalVideoElement.poster = '';
    });

    var uploadButton = document.createElement('button');
    uploadButton.textContent = 'Upload';
    uploadButton.style.position = 'absolute';
    uploadButton.style.bottom = '10px';
    uploadButton.style.left = '10px';
    uploadButton.className = 'filter-button'; // Add class for styling
    uploadButton.disabled = !areMandatoryFieldsFilled();
    uploadButton.addEventListener('click', function () {
        uploadVideo();
    });

    previewSection.appendChild(videoElement);
    previewSection.appendChild(closeButton);
    previewSection.appendChild(uploadButton);

    document.getElementById('videoUploadForm').appendChild(previewSection);

    document.getElementById('previewVideoButton').style.display = 'none';
}

function areMandatoryFieldsFilled() {
    var title = document.getElementById('videoTitle').value.trim();
    var description = document.getElementById('videoDescription').value.trim();
    var dateTime = document.getElementById('videoDateTime').value.trim();

    return title !== '' && description !== '' && dateTime !== '';
}

function uploadVideo() {
    var title = document.getElementById('videoTitle').value;
    var description = document.getElementById('videoDescription').value;
    var tags = document.getElementById('videoTags').value;
    var location = document.getElementById('videoLocation').value;
    var dateTime = document.getElementById('videoDateTime').value;
    var videoFile = document.getElementById('videoFile').files[0];
    var thumbnailFile = document.getElementById('thumbnailFile').files[0];

    // Placeholder for the database upload functionality
    console.log('Uploading video with the following details:');
    console.log('Title:', title);
    console.log('Description:', description);
    console.log('Tags:', tags);
    console.log('Location:', location);
    console.log('Date & Time:', dateTime);
    console.log('Video File:', videoFile);
    console.log('Thumbnail File:', thumbnailFile);

    // Implement actual upload functionality here
}
