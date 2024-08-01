document.getElementById('addVideo').addEventListener('click', function() {
    document.getElementById('videoUploadSection').style.display = 'flex';
});

document.getElementById('closevideoUploadSection').addEventListener('click', function() {
    document.getElementById('videoUploadSection').style.display = 'none';
});

///////////////////////////////////////
///////////////////////////////////////
function displayVideo(input) {
    const videoBox = document.getElementById('videoBox');
    const closeIcon = videoBox.querySelector('.close-icon');
    const videoPreviewButton = document.getElementById('videoPreviewButton');

    if (input.files && input.files[0]) {
        const file = input.files[0];
        const url = URL.createObjectURL(file);

        videoBox.innerHTML = `<video id="uploadedVideo" controls><source src="${url}" type="${file.type}"></video>`;
        videoBox.appendChild(closeIcon);
        closeIcon.style.display = 'block';

        videoPreviewButton.style.display = 'block'; // Show the preview button

        const videoElement = document.getElementById('uploadedVideo');
        videoElement.onloadedmetadata = function() {
            const duration = videoElement.duration;
            const frameCount = Math.min(20, Math.max(5, Math.floor(duration / 2))); // Adjust frame count based on video length
            extractFrames(videoElement, frameCount);
        };
    } else {
        videoPreviewButton.style.display = 'none'; // Hide the preview button if no video is selected
    }
}

///////////////////////////////////////
///////////////////////////////////////
function clearVideo() {
    const videoBox = document.getElementById('videoBox');
    const videoPreviewButton = document.getElementById('videoPreviewButton');

    videoBox.innerHTML = `<input type="file" id="videoFile" accept="video/*" style="display: none;" onchange="displayVideo(this)">
                          <div class="choose-video-button" onclick="document.getElementById('videoFile').click();">
                              <i class="fa-solid fa-video"></i>
                              <span class="blue-text">Choose Video</span>
                          </div>
                          <p id="videoDescription" class="description">Please click the button above to upload a video file from your device. Ensure the video is in a compatible format and adheres to the specified file size limits. Once uploaded, a preview will be available below.</p>
                          <i class="fa-solid fa-xmark close-icon" onclick="clearVideo()"></i>`;
    document.getElementById('framesContainer').innerHTML = '';
    videoPreviewButton.style.display = 'none'; // Hide the preview button when video is cleared
}

///////////////////////////////////////
///////////////////////////////////////
function previewVideo() {
    const videoElement = document.getElementById('uploadedVideo');
    if (videoElement) {
        videoElement.play();
    }
}

///////////////////////////////////////
///////////////////////////////////////
function displayThumbnail(input) {
    const thumbnailBox = document.getElementById('thumbnailBox');
    const closeIcon = thumbnailBox.querySelector('.close-icon');

    if (input.files && input.files[0]) {
        const file = input.files[0];
        const url = URL.createObjectURL(file);

        thumbnailBox.innerHTML = `<img src="${url}">`;
        thumbnailBox.appendChild(closeIcon);
        closeIcon.style.display = 'block';
    }
}

///////////////////////////////////////
///////////////////////////////////////
function clearThumbnail() {
    const thumbnailBox = document.getElementById('thumbnailBox');
    thumbnailBox.innerHTML = `<input type="file" id="thumbnailFile" accept="image/*" style="display: none;" onchange="displayThumbnail(this)">
                              <div class="choose-thumbnail-button" onclick="document.getElementById('thumbnailFile').click();">
                                  <i class="fa-solid fa-image"></i>
                                  <span class="blue-text">Choose Thumbnail</span>
                              </div>
                              <i class="fa-solid fa-xmark close-icon" onclick="clearThumbnail()"></i>`;
}

///////////////////////////////////////
///////////////////////////////////////
function toggleTerms() {
    const termsDetails = document.getElementById('termsDetails');
    if (termsDetails.style.display === 'none' || termsDetails.style.display === '') {
        termsDetails.style.display = 'block';
    } else {
        termsDetails.style.display = 'none';
    }
}

///////////////////////////////////////
///////////////////////////////////////
function toggleVideoInfo() {
    const videoInfo = document.getElementById('videoInfo');
    videoInfo.style.display = videoInfo.style.display === 'none' ? 'block' : 'none';
}

function toggleThumbnailInfo() {
    const thumbnailInfo = document.getElementById('thumbnailInfo');
    thumbnailInfo.style.display = thumbnailInfo.style.display === 'none' ? 'block' : 'none';
}

///////////////////////////////////////
///////////////////////////////////////
function extractFrames(video, frameCount) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const framesContainer = document.getElementById('framesContainer');
    framesContainer.innerHTML = ''; // Clear previous frames

    const duration = video.duration;
    const interval = duration / frameCount;
    let currentFrame = 0;
    let lastCapturedTime = -1;
    let seekResolve;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    function seekToTime(time) {
        return new Promise(resolve => {
            seekResolve = resolve;
            video.currentTime = time;
        });
    }

    video.addEventListener('seeked', async function onSeeked() {
        if (seekResolve) seekResolve();
    });

    async function captureFrame() {
        if (currentFrame < frameCount) {
            await seekToTime(interval * currentFrame);
            if (video.currentTime !== lastCapturedTime) {
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
                const frame = canvas.toDataURL('image/png');
                displayFrame(frame, framesContainer, video.currentTime);
                lastCapturedTime = video.currentTime;
                currentFrame++;
            }
            requestAnimationFrame(captureFrame); // Proceed to the next frame
        }
    }

    captureFrame();
}

///////////////////////////////////////
///////////////////////////////////////
let activeOptionsContainer = null;

function displayFrame(frame, container, time) {
    const frameContainer = document.createElement('div');
    frameContainer.classList.add('frame-container');

    const img = document.createElement('img');
    img.src = frame;
    img.classList.add('frame');
    img.dataset.time = time;
    img.onclick = function() {
        const video = document.getElementById('uploadedVideo');
        video.currentTime = parseFloat(this.dataset.time);
        video.pause();
    };
    img.ondblclick = function() {
        const video = document.getElementById('uploadedVideo');
        video.currentTime = parseFloat(this.dataset.time);
        video.play();
    };

    const ellipsis = document.createElement('i');
    ellipsis.classList.add('fa-solid', 'fa-ellipsis-vertical', 'ellipsis-icon');
    ellipsis.onclick = function(event) {
        event.stopPropagation();
        toggleThumbnailOption(this, frame);
    };

    frameContainer.appendChild(img);
    frameContainer.appendChild(ellipsis);
    container.appendChild(frameContainer);
}

///////////////////////////////////////
///////////////////////////////////////
function toggleThumbnailOption(ellipsisElement, frame) {
    if (activeOptionsContainer && activeOptionsContainer === ellipsisElement.nextSibling) {
        activeOptionsContainer.remove();
        activeOptionsContainer = null;
        document.removeEventListener('click', handleClickOutside);
        return;
    }

    if (activeOptionsContainer) {
        activeOptionsContainer.remove();
    }

    const optionsContainer = document.createElement('div');
    optionsContainer.classList.add('thumbnail-options');
    optionsContainer.innerHTML = '<div class="thumbnail-option">Choose this frame as the thumbnail</div>';

    const option = optionsContainer.querySelector('.thumbnail-option');
    option.onclick = function() {
        setThumbnail(frame);
        optionsContainer.remove();
        activeOptionsContainer = null;
    };

    document.body.appendChild(optionsContainer);
    const rect = ellipsisElement.getBoundingClientRect();
    optionsContainer.style.top = `${rect.bottom + window.scrollY}px`;
    optionsContainer.style.left = `${rect.left + window.scrollX}px`;

    activeOptionsContainer = optionsContainer;

    document.addEventListener('click', handleClickOutside);
}

///////////////////////////////////////
///////////////////////////////////////
function handleClickOutside(event) {
    if (activeOptionsContainer && !activeOptionsContainer.contains(event.target)) {
        activeOptionsContainer.remove();
        activeOptionsContainer = null;
        document.removeEventListener('click', handleClickOutside);
    }
}

///////////////////////////////////////
///////////////////////////////////////
function setThumbnail(frame) {
    const thumbnailBox = document.getElementById('thumbnailBox');
    const closeIcon = thumbnailBox.querySelector('.close-icon');

    thumbnailBox.innerHTML = `<img src="${frame}">`;
    thumbnailBox.appendChild(closeIcon);
    closeIcon.style.display = 'block';
}

///////////////////////////////////////
///////////////////////////////////////
function previewVideo() {
    const videoElement = document.getElementById('uploadedVideo');
    const rightVideoBox = document.getElementById('rightVideoBox');
    const thumbnailImage = document.querySelector('#thumbnailBox img');

    if (videoElement && thumbnailImage) {
        const videoSource = videoElement.querySelector('source').src;
        const thumbnailSource = thumbnailImage.src;

        // Clear previous content
        rightVideoBox.innerHTML = '';

        // Create a video element with the thumbnail
        const videoWithThumbnail = document.createElement('video');
        videoWithThumbnail.controls = true;
        videoWithThumbnail.poster = thumbnailSource;
        videoWithThumbnail.innerHTML = `<source src="${videoSource}" type="${videoElement.querySelector('source').type}">`;

        // Append to rightVideoBox
        rightVideoBox.appendChild(videoWithThumbnail);
    }
}
///////////////////////////////////////
///////////////////////////////////////
function displayVideo(input) {
    const videoBox = document.getElementById('videoBox');
    const closeIcon = videoBox.querySelector('.close-icon');
    const videoPreviewButton = document.getElementById('videoPreviewButton');
    const videoResolution = document.createElement('p');
    videoResolution.id = 'videoResolution';

    if (input.files && input.files[0]) {
        const file = input.files[0];
        const url = URL.createObjectURL(file);

        videoBox.innerHTML = `<video id="uploadedVideo" controls><source src="${url}" type="${file.type}"></video>`;
        videoBox.appendChild(closeIcon);
        closeIcon.style.display = 'block';

        videoPreviewButton.style.display = 'block'; // Show the preview button

        const videoElement = document.getElementById('uploadedVideo');
        videoElement.onloadedmetadata = function() {
            const duration = videoElement.duration;
            const frameCount = Math.min(20, Math.max(5, Math.floor(duration / 2))); // Adjust frame count based on video length
            extractFrames(videoElement, frameCount);
            
            // Display the video resolution
            const width = videoElement.videoWidth;
            const height = videoElement.videoHeight;
            const resolutionInfo = getResolutionInfo(width, height);
            videoResolution.innerHTML = `Resolution: ${resolutionInfo.icon} ${resolutionInfo.text} (${width}x${height})`;
            
            // Append resolution after the frames
            document.getElementById('framesContainer').parentElement.appendChild(videoResolution);
        };
    } else {
        videoPreviewButton.style.display = 'none'; // Hide the preview button if no video is selected
    }
}

///////////////////////////////////////
///////////////////////////////////////
function displayVideo(input) {
    const videoBox = document.getElementById('videoBox');
    const closeIcon = videoBox.querySelector('.close-icon');
    const videoPreviewButton = document.getElementById('videoPreviewButton');
    const videoResolution = document.createElement('p');
    videoResolution.id = 'videoResolution';

    if (input.files && input.files[0]) {
        const file = input.files[0];
        const url = URL.createObjectURL(file);

        videoBox.innerHTML = `<video id="uploadedVideo" controls><source src="${url}" type="${file.type}"></video>`;
        videoBox.appendChild(closeIcon);
        closeIcon.style.display = 'block';

        videoPreviewButton.style.display = 'block'; // Show the preview button

        const videoElement = document.getElementById('uploadedVideo');
        videoElement.onloadedmetadata = function() {
            const duration = videoElement.duration;
            const frameCount = Math.min(20, Math.max(5, Math.floor(duration / 2))); // Adjust frame count based on video length
            extractFrames(videoElement, frameCount);
            
            // Display the video resolution
            const width = videoElement.videoWidth;
            const height = videoElement.videoHeight;
            const resolutionInfo = getResolutionInfo(width, height);
            videoResolution.innerHTML = `Resolution: ${resolutionInfo.icon} ${resolutionInfo.text} (${width}x${height})`;
            
            // Append resolution after the frames
            document.getElementById('framesContainer').parentElement.appendChild(videoResolution);
        };
    } else {
        videoPreviewButton.style.display = 'none'; // Hide the preview button if no video is selected
    }
}

///////////////////////////////////////
///////////////////////////////////////
function clearVideo() {
    const videoBox = document.getElementById('videoBox');
    const videoPreviewButton = document.getElementById('videoPreviewButton');
    const videoResolution = document.getElementById('videoResolution');

    videoBox.innerHTML = `<input type="file" id="videoFile" accept="video/*" style="display: none;" onchange="displayVideo(this)">
                          <div class="choose-video-button" onclick="document.getElementById('videoFile').click();">
                              <i class="fa-solid fa-video"></i>
                              <span class="blue-text">Choose Video</span>
                          </div>
                          <p id="videoDescription" class="description">Please click the button above to upload a video file from your device. Ensure the video is in a compatible format and adheres to the specified file size limits. Once uploaded, a preview will be available below.</p>
                          <i class="fa-solid fa-xmark close-icon" onclick="clearVideo()"></i>`;
    document.getElementById('framesContainer').innerHTML = '';
    videoPreviewButton.style.display = 'none'; // Hide the preview button when video is cleared
    if (videoResolution) {
        videoResolution.remove(); // Remove the resolution text when video is cleared
    }
}

///////////////////////////////////////
///////////////////////////////////////
function getResolutionInfo(width, height) {
    if (width >= 3840 && height >= 2160) {
        return { text: '4K', icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="blue" class="bi bi-badge-4k-fill" viewBox="0 0 16 16" style="color: white;">
                                          <path d="M3.577 8.9v.03h1.828V5.898h-.062a47 47 0 0 0-1.766 3.001z"/>
                                          <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm2.372 3.715.435-.714h1.71v3.93h.733v.957h-.733V11H5.405V9.888H2.5v-.971c.574-1.077 1.225-2.142 1.872-3.202m7.73-.714h1.306l-2.14 2.584L13.5 11h-1.428l-1.679-2.624-.615.7V11H8.59V5.001h1.187v2.686h.057L12.102 5z"/>
                                       </svg>` };
    }
    if (width >= 2560 && height >= 1440) {
        return { text: '1440p', icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="blue" class="bi bi-2-square-fill" viewBox="0 0 16 16" style="color: white;">
                                          <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm4.646 6.24v.07H5.375v-.064c0-1.213.879-2.402 2.637-2.402 1.582 0 2.613.949 2.613 2.215 0 1.002-.6 1.667-1.287 2.43l-.096.107-1.974 2.22v.077h3.498V12H5.422v-.832l2.97-3.293c.434-.475.903-1.008.903-1.705 0-.744-.557-1.236-1.313-1.236-.843 0-1.336.615-1.336 1.306"/>
                                       </svg>` };
    }
    if (width >= 1920 && height >= 1080) {
        return { text: '1080p', icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="blue" class="bi bi-badge-hd-fill" viewBox="0 0 16 16" style="color: white;">
                                          <path d="M10.53 5.968h-.843v4.06h.843c1.117 0 1.622-.667 1.622-2.02 0-1.354-.51-2.04-1.622-2.04"/>
                                          <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm5.396 3.001V11H6.209V8.43H3.687V11H2.5V5.001h1.187v2.44h2.522V5h1.187zM8.5 11V5.001h2.188c1.824 0 2.685 1.09 2.685 2.984C13.373 9.893 12.5 11 10.69 11z"/>
                                        </svg>` };
    }
    if (width >= 1280 && height >= 720) {
        return { text: '720p', icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="blue" class="bi bi-badge-hd-fill" viewBox="0 0 16 16" style="color: white;">
                                          <path d="M10.53 5.968h-.843v4.06h.843c1.117 0 1.622-.667 1.622-2.02 0-1.354-.51-2.04-1.622-2.04"/>
                                          <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm5.396 3.001V11H6.209V8.43H3.687V11H2.5V5.001h1.187v2.44h2.522V5h1.187zM8.5 11V5.001h2.188c1.824 0 2.685 1.09 2.685 2.984C13.373 9.893 12.5 11 10.69 11z"/>
                                        </svg>` };
    }
    if (width >= 854 && height >= 480) {
        return { text: '480p', icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="blue" class="bi bi-badge-sd-fill" viewBox="0 0 16 16" style="color: white;">
                                          <path d="M10.338 5.968h-.844v4.06h.844c1.116 0 1.622-.667 1.622-2.02 0-1.354-.51-2.04-1.622-2.04"/>
                                          <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm5.077 7.114c1.521 0 2.378-.764 2.378-1.88 0-1.007-.642-1.473-1.613-1.692l-.932-.216c-.527-.114-.821-.351-.821-.712 0-.466.39-.804 1.046-.804.637 0 1.028.33 1.103.76h1.125c-.058-.923-.849-1.692-2.22-1.692-1.322 0-2.24.717-2.24 1.815 0 .91.588 1.446 1.52 1.657l.927.215c.624.145.923.36.923.778 0 .492-.391.83-1.13.83-.707 0-1.155-.342-1.234-.808H2.762c.052.95.79 1.75 2.315 1.75ZM8.307 11h2.19c1.81 0 2.684-1.107 2.684-3.015 0-1.894-.861-2.984-2.685-2.984H8.308z"/>
                                        </svg>` };
    }
    if (width >= 640 && height >= 360) {
        return { text: '360p', icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="blue" class="bi bi-badge-sd-fill" viewBox="0 0 16 16" style="color: white;">
                                          <path d="M10.338 5.968h-.844v4.06h.844c1.116 0 1.622-.667 1.622-2.02 0-1.354-.51-2.04-1.622-2.04"/>
                                          <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm5.077 7.114c1.521 0 2.378-.764 2.378-1.88 0-1.007-.642-1.473-1.613-1.692l-.932-.216c-.527-.114-.821-.351-.821-.712 0-.466.39-.804 1.046-.804.637 0 1.028.33 1.103.76h1.125c-.058-.923-.849-1.692-2.22-1.692-1.322 0-2.24.717-2.24 1.815 0 .91.588 1.446 1.52 1.657l.927.215c.624.145.923.36.923.778 0 .492-.391.83-1.13.83-.707 0-1.155-.342-1.234-.808H2.762c.052.95.79 1.75 2.315 1.75ZM8.307 11h2.19c1.81 0 2.684-1.107 2.684-3.015 0-1.894-.861-2.984-2.685-2.984H8.308z"/>
                                        </svg>` };
    }
    if (width >= 426 && height >= 240) {
        return { text: '240p', icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="blue" class="bi bi-badge-sd-fill" viewBox="0 0 16 16" style="color: white;">
                                          <path d="M10.338 5.968h-.844v4.06h.844c1.116 0 1.622-.667 1.622-2.02 0-1.354-.51-2.04-1.622-2.04"/>
                                          <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm5.077 7.114c1.521 0 2.378-.764 2.378-1.88 0-1.007-.642-1.473-1.613-1.692l-.932-.216c-.527-.114-.821-.351-.821-.712 0-.466.39-.804 1.046-.804.637 0 1.028.33 1.103.76h1.125c-.058-.923-.849-1.692-2.22-1.692-1.322 0-2.24.717-2.24 1.815 0 .91.588 1.446 1.52 1.657l.927.215c.624.145.923.36.923.778 0 .492-.391.83-1.13.83-.707 0-1.155-.342-1.234-.808H2.762c.052.95.79 1.75 2.315 1.75ZM8.307 11h2.19c1.81 0 2.684-1.107 2.684-3.015 0-1.894-.861-2.984-2.685-2.984H8.308z"/>
                                    </svg>` };
    }
    return { text: '144p', icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="blue" class="bi bi-badge-sd-fill" viewBox="0 0 16 16" style="color: white;">
                                      <path d="M10.338 5.968h-.844v4.06h.844c1.116 0 1.622-.667 1.622-2.02 0-1.354-.51-2.04-1.622-2.04"/>
                                      <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm5.077 7.114c1.521 0 2.378-.764 2.378-1.88 0-1.007-.642-1.473-1.613-1.692l-.932-.216c-.527-.114-.821-.351-.821-.712 0-.466.39-.804 1.046-.804.637 0 1.028.33 1.103.76h1.125c-.058-.923-.849-1.692-2.22-1.692-1.322 0-2.24.717-2.24 1.815 0 .91.588 1.446 1.52 1.657l.927.215c.624.145.923.36.923.778 0 .492-.391.83-1.13.83-.707 0-1.155-.342-1.234-.808H2.762c.052.95.79 1.75 2.315 1.75ZM8.307 11h2.19c1.81 0 2.684-1.107 2.684-3.015 0-1.894-.861-2.984-2.685-2.984H8.308z"/>
                                    </svg>` };
}


///////////////////////////////
//////////////////////////////
document.getElementById('videoPreviewButton').addEventListener('click', function() {
    // Hide the preview button
    this.style.display = 'none';

    // Hide all close icons
    document.querySelectorAll('.close-icon').forEach(function(icon) {
        icon.style.display = 'none';
    });

    // Show the close preview button
    document.getElementById('closePreviewButton').style.display = 'block';
});

function closePreview() {
    const rightVideoBox = document.getElementById('rightVideoBox');

    // Clear the right video box content
    rightVideoBox.innerHTML = '';

    // Show all close icons
    document.querySelectorAll('.close-icon').forEach(function(icon) {
        icon.style.display = 'block';
    });

    // Hide the close preview button
    document.getElementById('closePreviewButton').style.display = 'none';

    // Show the video preview button again
    document.getElementById('videoPreviewButton').style.display = 'block';
}


///////////////////////////////////////
///////////////////////////////////////
function showMiddleSection() {
    document.getElementById('nextButton').style.display = 'none';
    document.getElementById('middleBox').style.display = 'block';
}

// Ensure next button is displayed when a video and thumbnail are chosen
document.getElementById('videoFile').addEventListener('change', function() {
    document.getElementById('nextButton').style.display = 'block';
});

document.getElementById('thumbnailFile').addEventListener('change', function() {
    document.getElementById('nextButton').style.display = 'block';
});

document.addEventListener('DOMContentLoaded', function() {
    const categories = ['Dance', 'Cooking', 'Travel', 'Vlogs', 'Education'];
    const categorySelect = document.getElementById('videoCategory');

    categories.forEach(function(category) {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
    });
});


// Function to toggle the info box visibility
function toggleInfoBox(infoBoxId) {
    var infoBox = document.getElementById(infoBoxId);
    if (infoBox.style.display === "none" || infoBox.style.display === "") {
        infoBox.style.display = "block";
    } else {
        infoBox.style.display = "none";
    }
}

// Event listeners for info icons
document.getElementById('infoTitle').addEventListener('click', function() {
    toggleInfoBox('infoBoxTitle');
});

document.getElementById('infoDescription').addEventListener('click', function() {
    toggleInfoBox('infoBoxDescription');
});

document.getElementById('infoTags').addEventListener('click', function() {
    toggleInfoBox('infoBoxTags');
});

document.getElementById('infoLocation').addEventListener('click', function() {
    toggleInfoBox('infoBoxLocation');
});

document.getElementById('infoCategory').addEventListener('click', function() {
    toggleInfoBox('infoBoxCategory');
});

// Function to populate the categories from categories.txt
fetch('/path/to/categories.txt')
    .then(response => response.text())
    .then(data => {
        const categories = data.split('\n');
        const select = document.getElementById('videoCategory');
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.text = category;
            select.appendChild(option);
        });
    })
    .catch(error => console.error('Error loading categories:', error));

function showMiddleSection() {
    document.getElementById('nextButton').style.display = 'none';
    document.getElementById('middleBox').style.display = 'block';
    
    // Show the Go Back and Middle Box Next buttons
    document.getElementById('goBackButton').style.display = 'block';
    document.getElementById('middleBoxNextButton').style.display = 'block';
}

function goBack() {
    document.getElementById('middleBox').style.display = 'none';
    
    // Hide the Go Back and Middle Box Next buttons
    document.getElementById('goBackButton').style.display = 'none';
    document.getElementById('middleBoxNextButton').style.display = 'none';

    // Show the Next button below the preview
    document.getElementById('nextButton').style.display = 'block';
}

function proceedToNextSection() {
    // Hide the middle box content (step-2 content)
    document.getElementById('middleBox').style.display = 'none';
    
    // Show the Circle-3 content in place of the middle box
    document.getElementById('circle3Box').style.display = 'block';
}

function goBackToMiddleBox() {
    // Hide Circle-3 content
    document.getElementById('circle3Box').style.display = 'none';
    
    // Show the middle box content (step-2 content)
    document.getElementById('middleBox').style.display = 'block';
}

function submitSettings() {
    // Hide Circle-3 content
    document.getElementById('circle3Box').style.display = 'none';
    
    // Show the Circle-4 content in place of the Circle-3 box
    document.getElementById('circle4Box').style.display = 'block';
}

function goBackToCircle3() {
    // Hide Circle-4 content
    document.getElementById('circle4Box').style.display = 'none';
    
    // Show the Circle-3 content again
    document.getElementById('circle3Box').style.display = 'block';
}

function uploadVideo() {
    // Implement the upload functionality here
    alert('Your video is being uploaded!');
    
    // Optionally, you can redirect the user or perform other actions after the upload
}

