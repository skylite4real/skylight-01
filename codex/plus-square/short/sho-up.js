document.getElementById('addShortButton').addEventListener('click', function () {
    document.getElementById('shortUploadForm').style.display = 'block';
});

document.getElementById('closeShortUploadForm').addEventListener('click', function () {
    document.getElementById('shortUploadForm').style.display = 'none';
});

document.addEventListener("DOMContentLoaded", function() {
    const chooseVideoButton = document.getElementById("chooseVideoButton");
    const videoInput = document.getElementById("videoInput");
    const videoPreviewContainer = document.getElementById("videoPreviewContainer");
    const videoPreview = document.getElementById("videoPreview");
    const previewButton = document.getElementById("previewButton");
    const previewSection = document.getElementById("previewSection");
    const previewDetails = document.getElementById("previewDetails");

    chooseVideoButton.addEventListener("click", function() {
        videoInput.click();
    });

    videoInput.addEventListener("change", function() {
        const file = videoInput.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            videoPreview.src = url;

            videoPreview.onloadedmetadata = function() {
                videoPreviewContainer.style.paddingTop = '0';
                videoPreviewContainer.style.height = 'auto';
                videoPreviewContainer.style.display = "block";
            };
        }
    });

    previewButton.addEventListener("click", function() {
        const title = document.getElementById("videoTitle").value;
        const description = document.getElementById("videoDescription").value;
        const tags = document.getElementById("videoTags").value;
        const location = document.getElementById("videoLocation").value;
        const dateTime = document.getElementById("videoDateTime").value;

        let formattedDateTime = "Invalid Date";
        if (dateTime) {
            formattedDateTime = new Date(dateTime).toLocaleString();
        }

        const videoDetailsHTML = `
            <h3>Video Preview</h3>
            <div class="preview-video-wrapper">
                <video src="${videoPreview.src}" controls controlsList="nodownload"></video>
            </div>
            <h3>Title</h3>
            <p>${title}</p>
            <h3>Description</h3>
            <p>${description}</p>
            <h3>Tags</h3>
            <p>${tags}</p>
            <h3>Location</h3>
            <p>${location}</p>
            <h3>Date and Time</h3>
            <p>${formattedDateTime}</p>
        `;

        previewDetails.innerHTML = videoDetailsHTML;
        previewSection.style.display = "block";

        // Store the video and details in the database
        // Make an AJAX request to store the video and details
        // Example code for making an AJAX request
        /*
        const formData = new FormData();
        formData.append('video', videoInput.files[0]);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('tags', tags);
        formData.append('location', location);
        formData.append('dateTime', dateTime);

        fetch('/your-server-endpoint', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
        */
    });

    // Disable context menu on videoPreview to prevent download option
    videoPreview.addEventListener("contextmenu", function(e) {
        e.preventDefault();
    });
});