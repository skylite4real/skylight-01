document.addEventListener('DOMContentLoaded', (event) => {
    const addShort = document.getElementById('addShort');
    const shortSection = document.getElementById('shortSection');
    const closeShortIcon = document.querySelector('.close-short-icon');

    addShort.addEventListener('click', () => {
        shortSection.style.display = 'block';
        shortSection.classList.add('fullscreen');
    });

    closeShortIcon.addEventListener('click', () => {
        shortSection.style.display = 'none';
        shortSection.classList.remove('fullscreen');
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const shortFileInput = document.getElementById('shortFile');
    const shortDisplaySection = document.getElementById('shortDisplaySection');
    const uploadedShort = document.getElementById('uploadedShort');
    const shortPreviewButton = document.getElementById('previewShortButton');
    const shortClosePreviewButton = document.getElementById('closeShortPreviewButton');
    const shortUploadButton = document.getElementById('uploadShortButton');
    const shortButtonContainer = document.getElementById('shortButtonContainer');
    const shortFormContainer = document.querySelector('.short-form-content');
    const closeShortIcon = document.querySelector('.close-short-icon');
    let previewShort;

    let shortSelected = false;

    // Initially hide the preview button and other buttons
    shortPreviewButton.style.display = 'none';
    shortButtonContainer.style.display = 'none';

    shortFileInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const shortURL = URL.createObjectURL(file);
            uploadedShort.src = shortURL;
            shortDisplaySection.style.display = 'block';
            shortSelected = true;
            checkShortPreviewButton();
        }
    });

    function checkShortPreviewButton() {
        if (shortSelected) {
            shortPreviewButton.style.display = 'inline-block';
        }
    }

    shortPreviewButton.addEventListener('click', function() {
        const title = document.getElementById('shortTitle').value;
        const description = document.getElementById('shortDescription').value;
        const tags = document.getElementById('shortTags').value;
        const location = document.getElementById('shortLocation').value;
        const dateTime = document.getElementById('shortDateTime').value;
        const category = document.getElementById('shortCategory').value;
        const privacy = document.getElementById('shortPrivacy').value;
        const comments = document.getElementById('shortComments').value;
        const paid = document.getElementById('shortPaid').value;
        const ads = document.getElementById('shortAds').value;

        const shortDescription = truncateDescription(description, 2);
        const descriptionHTML = highlightLinksAndHashtags(shortDescription);
        const fullDescriptionHTML = highlightLinksAndHashtags(description);

        let previewHTML = `
            <h2 style="color: black; text-align: inherit;">${highlightLinksAndHashtags(title)}</h2>
            <video id="previewShort" controls src="${uploadedShort.src}" style="max-width: 100%;" 
                controlsList="nodownload noremoteplayback"></video>
            <p id="shortPreviewDescription" style="max-width: 100%; overflow-wrap: break-word; white-space: pre-wrap; text-align: inherit;">
                <strong id="toggleShortDescription" style="color: blue; cursor: pointer; display: block; text-align: left;">Description:</strong> 
            </p>
            <p id="shortPreviewFullDescription" style="display: none; max-width: 100%; overflow-wrap: break-word; white-space: pre-wrap; text-align: inherit;">
                <strong id="toggleShortDescriptionFull" style="color: purple; cursor: pointer; display: block; text-align: left;">Description:</strong> ${fullDescriptionHTML}
            </p>
            <p style="max-width: 100%; overflow-wrap: break-word; text-align: inherit;"><strong>Tags:</strong> ${highlightLinksAndHashtags(tags)}</p>
            <p style="max-width: 100%; overflow-wrap: break-word; text-align: inherit;"><strong>Location:</strong> ${highlightLinksAndHashtags(location)}</p>
            <p style="text-align: inherit;"><strong>Date & Time:</strong> ${dateTime}</p>
            <p style="text-align: inherit;"><strong>Category:</strong> ${category}</p>
            <p style="text-align: inherit;"><strong>Privacy:</strong> ${privacy}</p>
            <p style="text-align: inherit;"><strong>Comments:</strong> ${comments}</p>
            <p style="text-align: inherit;"><strong>Paid:</strong> ${paid}</p>
            <p style="text-align: inherit;"><strong>Ads:</strong> ${ads}</p>
        `;

        const shortPreviewSection = document.createElement('div');
        shortPreviewSection.innerHTML = previewHTML;

        // Ensure only one preview is displayed at a time
        const existingShortPreview = document.getElementById('shortPreviewSection');
        if (existingShortPreview) {
            existingShortPreview.remove();
        }

        shortPreviewSection.id = 'shortPreviewSection';
        shortFormContainer.appendChild(shortPreviewSection);

        shortPreviewButton.style.display = 'none';
        shortButtonContainer.style.display = 'flex';

        function toggleDescription() {
            const fullDescription = document.getElementById('shortPreviewFullDescription');
            const shortDescription = document.getElementById('shortPreviewDescription');
            if (fullDescription.style.display === 'block') {
                fullDescription.style.display = 'none';
                shortDescription.style.display = 'block';
            } else {
                fullDescription.style.display = 'block';
                shortDescription.style.display = 'none';
            }
        }

        document.getElementById('toggleShortDescription').addEventListener('click', toggleDescription);
        document.getElementById('toggleShortDescriptionFull').addEventListener('click', toggleDescription);

        // Disable right-click context menu on the video
        previewShort = document.getElementById('previewShort');
        previewShort.addEventListener('contextmenu', function(e) {
            e.preventDefault();
        });

        // Disable long press on mobile devices to prevent downloading the video
        previewShort.addEventListener('touchstart', function(e) {
            e.preventDefault();
        });

        // Add event listener to handle playing only one video at a time
        uploadedShort.addEventListener('play', handlePlayEvent);
        previewShort.addEventListener('play', handlePlayEvent);
    });

    shortClosePreviewButton.addEventListener('click', function() {
        const shortPreviewSection = document.getElementById('shortPreviewSection');
        if (shortPreviewSection) {
            shortPreviewSection.remove();
        }
        shortPreviewButton.style.display = 'inline-block';
        shortButtonContainer.style.display = 'none';
    });

    closeShortIcon.addEventListener('click', function() {
        // Clear all form fields
        shortFileInput.value = '';
        document.getElementById('shortTitle').value = '';
        document.getElementById('shortDescription').value = '';
        document.getElementById('shortTags').value = '';
        document.getElementById('shortLocation').value = '';
        document.getElementById('shortDateTime').value = '';
        document.getElementById('shortCategory').value = '';
        document.getElementById('shortPrivacy').value = '';
        document.getElementById('shortComments').value = '';
        document.getElementById('shortPaid').value = '';
        document.getElementById('shortAds').value = '';
        
        // Hide video preview and reset video source
        uploadedShort.src = '';
        shortDisplaySection.style.display = 'none';
        
        // Hide preview button and button container
        shortPreviewButton.style.display = 'none';
        shortButtonContainer.style.display = 'none';
        
        // Remove the short preview section if it exists
        const shortPreviewSection = document.getElementById('shortPreviewSection');
        if (shortPreviewSection) {
            shortPreviewSection.remove();
        }

        shortSelected = false;
    });

    function truncateDescription(description, wordLimit) {
        const words = description.split(" ");
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(" ") + "...";
        }
        return description;
    }

    function highlightLinksAndHashtags(text) {
        const urlPattern = /(https?:\/\/[^\s]+)/g;
        const hashtagPattern = /(^|\s)(#[a-z\d-]+)/ig;
        return text
            .replace(urlPattern, '<a href="$1" target="_blank" style="color: blue;">$1</a>')
            .replace(hashtagPattern, '$1<a href="https://twitter.com/hashtag/$2" target="_blank" style="color: blue;">$2</a>');
    }

    function handlePlayEvent(event) {
        if (event.target === uploadedShort && previewShort && !previewShort.paused) {
            previewShort.pause();
        } else if (event.target === previewShort && !uploadedShort.paused) {
            uploadedShort.pause();
        }
    }
});
