document.addEventListener('DOMContentLoaded', function () {
    let currentPlayingMedia = null;
    let previouslySelectedFiles = [];
    let previouslySelectedMusic = null;

    document.getElementById('addPost').addEventListener('click', function () {
        document.getElementById('shortSection').style.display = 'none';
        document.getElementById('postSection').style.display = 'block';
    });

    document.querySelector('.close-post-icon').addEventListener('click', function () {
        document.getElementById('postSection').style.display = 'none';
    });

    const swiper = new Swiper('.swiper-container', {
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            type: 'bullets',
            dynamicBullets: true,
            dynamicMainBullets: 5,
        },
    });

    document.getElementById('postFile').addEventListener('change', function (event) {
        displaySelectedMedia(event, swiper);
    });

    document.getElementById('postMusicFile').addEventListener('change', function (event) {
        displaySelectedMusic(event);
    });

    document.getElementById('previewPostButton').addEventListener('click', function () {
        previewPost(swiper);
    });

    document.getElementById('closePostPreviewButton').addEventListener('click', function () {
        closePostPreview();
    });

    function displaySelectedMedia(event, swiper) {
        const swiperWrapper = document.getElementById('uploadedPostMedia');
        const postDisplaySection = document.getElementById('postDisplaySection');
        const previewButton = document.getElementById('previewPostButton');
        const files = event.target.files;

        if (files.length > 0) {
            previouslySelectedFiles = Array.from(files);
            swiperWrapper.innerHTML = '';
            postDisplaySection.style.display = 'block';

            previouslySelectedFiles.forEach(file => {
                const swiperSlide = document.createElement('div');
                swiperSlide.classList.add('swiper-slide');
                const mediaElement = document.createElement(file.type.startsWith('video/') ? 'video' : 'img');
                mediaElement.src = URL.createObjectURL(file);
                if (file.type.startsWith('video/')) {
                    mediaElement.controls = true;
                    mediaElement.setAttribute('controlsList', 'nodownload');
                    mediaElement.addEventListener('play', () => handleMediaPlay(mediaElement));
                }
                mediaElement.setAttribute('oncontextmenu', 'return false');
                swiperSlide.appendChild(mediaElement);
                swiperWrapper.appendChild(swiperSlide);
            });

            swiper.update();
            previewButton.style.display = 'block';
        } else {
            if (previouslySelectedFiles.length > 0) {
                swiperWrapper.innerHTML = '';
                postDisplaySection.style.display = 'block';

                previouslySelectedFiles.forEach(file => {
                    const swiperSlide = document.createElement('div');
                    swiperSlide.classList.add('swiper-slide');
                    const mediaElement = document.createElement(file.type.startsWith('video/') ? 'video' : 'img');
                    mediaElement.src = URL.createObjectURL(file);
                    if (file.type.startsWith('video/')) {
                        mediaElement.controls = true;
                        mediaElement.setAttribute('controlsList', 'nodownload');
                        mediaElement.addEventListener('play', () => handleMediaPlay(mediaElement));
                    }
                    mediaElement.setAttribute('oncontextmenu', 'return false');
                    swiperSlide.appendChild(mediaElement);
                    swiperWrapper.appendChild(swiperSlide);
                });

                swiper.update();
                previewButton.style.display = 'block';
            } else {
                postDisplaySection.style.display = 'none';
                previewButton.style.display = 'none';
            }
        }
    }

    function displaySelectedMusic(event) {
        const musicPlayer = document.getElementById('uploadedPostMusic');
        const postMusicDisplaySection = document.getElementById('postMusicDisplaySection');
        const previewButton = document.getElementById('previewPostButton');
        const file = event.target.files[0];

        if (file) {
            previouslySelectedMusic = file;
            musicPlayer.src = URL.createObjectURL(file);
            postMusicDisplaySection.style.display = 'block';
            musicPlayer.setAttribute('controlsList', 'nodownload');
            musicPlayer.setAttribute('oncontextmenu', 'return false');
            musicPlayer.addEventListener('play', () => handleMediaPlay(musicPlayer));
            previewButton.style.display = 'block';
        } else {
            if (previouslySelectedMusic) {
                musicPlayer.src = URL.createObjectURL(previouslySelectedMusic);
                postMusicDisplaySection.style.display = 'block';
                musicPlayer.setAttribute('controlsList', 'nodownload');
                musicPlayer.setAttribute('oncontextmenu', 'return false');
                musicPlayer.addEventListener('play', () => handleMediaPlay(musicPlayer));
                previewButton.style.display = 'block';
            } else {
                postMusicDisplaySection.style.display = 'none';
                previewButton.style.display = 'none';
            }
        }
    }

    function handleMediaPlay(mediaElement) {
        if (currentPlayingMedia && currentPlayingMedia !== mediaElement) {
            currentPlayingMedia.pause();
        }
        currentPlayingMedia = mediaElement;
    }

    function previewPost(swiper) {
        const postPreviewContainer = document.getElementById('postPreviewContainer');
        const postMusicDisplaySection = document.getElementById('postMusicDisplaySection');
        const musicPlayer = document.getElementById('uploadedPostMusic');
        const files = previouslySelectedFiles;

        postPreviewContainer.innerHTML = '';
        postPreviewContainer.style.display = 'block';

        const previewSection = document.createElement('div');
        previewSection.classList.add('swiper-container');
        previewSection.classList.add('preview-section');

        const previewWrapper = document.createElement('div');
        previewWrapper.classList.add('swiper-wrapper');

        if (files.length > 0 && postMusicDisplaySection.style.display === 'block') {
            files.forEach(file => {
                const swiperSlide = document.createElement('div');
                swiperSlide.classList.add('swiper-slide');
                const mediaContainer = document.createElement('div');
                mediaContainer.classList.add('media-container');

                if (file.type.startsWith('video/')) {
                    const videoElement = document.createElement('video');
                    videoElement.src = URL.createObjectURL(file);
                    videoElement.controls = true;
                    videoElement.setAttribute('controlsList', 'nodownload');
                    videoElement.setAttribute('oncontextmenu', 'return false');
                    videoElement.addEventListener('play', () => handleMediaPlay(videoElement));
                    mediaContainer.appendChild(videoElement);
                } else if (file.type.startsWith('image/')) {
                    const imageElement = document.createElement('img');
                    imageElement.src = URL.createObjectURL(file);
                    imageElement.setAttribute('oncontextmenu', 'return false');
                    imageElement.addEventListener('click', () => {
                        if (musicPlayer.paused) {
                            musicPlayer.play();
                        } else {
                            musicPlayer.pause();
                        }
                    });
                    mediaContainer.appendChild(imageElement);
                }

                swiperSlide.appendChild(mediaContainer);
                previewWrapper.appendChild(swiperSlide);
            });

            previewSection.appendChild(previewWrapper);

            const previewPagination = document.createElement('div');
            previewPagination.classList.add('swiper-pagination');
            previewSection.appendChild(previewPagination);

            postPreviewContainer.appendChild(previewSection);

            const musicNameDisplay = document.createElement('div');
            musicNameDisplay.classList.add('music-name-display');
            musicNameDisplay.innerHTML = `<i class="fa fa-music"></i> ${previouslySelectedMusic.name}`;
            postPreviewContainer.appendChild(musicNameDisplay);
        }

        if (files.length > 0 && postMusicDisplaySection.style.display === 'none') {
            files.forEach(file => {
                const swiperSlide = document.createElement('div');
                swiperSlide.classList.add('swiper-slide');
                const mediaContainer = document.createElement('div');
                mediaContainer.classList.add('media-container');

                if (file.type.startsWith('image/')) {
                    const imageElement = document.createElement('img');
                    imageElement.src = URL.createObjectURL(file);
                    imageElement.setAttribute('oncontextmenu', 'return false');
                    mediaContainer.appendChild(imageElement);
                }

                swiperSlide.appendChild(mediaContainer);
                previewWrapper.appendChild(swiperSlide);
            });

            previewSection.appendChild(previewWrapper);

            const previewPagination = document.createElement('div');
            previewPagination.classList.add('swiper-pagination');
            previewSection.appendChild(previewPagination);

            postPreviewContainer.appendChild(previewSection);
        }

        const title = document.getElementById('postTitle').value;
        const description = document.getElementById('postDescription').value;
        const tags = document.getElementById('postTags').value;
        const location = document.getElementById('postLocation').value;
        const dateTime = document.getElementById('postDateTime').value;
        const category = document.getElementById('postCategory').value;
        const privacy = document.getElementById('postPrivacy').value;
        const comments = document.getElementById('postComments').value;

        const postDescription = truncateDescription(description, 2);
        const descriptionHTML = highlightLinksAndHashtags(postDescription);
        const fullDescriptionHTML = highlightLinksAndHashtags(description);

        let previewHTML = `
            <h2 style="color: black; text-align: inherit;">${highlightLinksAndHashtags(title)}</h2>
            <p id="postPreviewDescription" style="max-width: 100%; overflow-wrap: break-word; white-space: pre-wrap; text-align: inherit;">
                <strong id="togglePostDescription" style="color: blue; cursor: pointer; display: block; text-align: left;">Description:</strong> ${descriptionHTML}
            </p>
            <p id="postPreviewFullDescription" style="display: none; max-width: 100%; overflow-wrap: break-word; white-space: pre-wrap; text-align: inherit;">
                <strong id="togglePostDescriptionFull" style="color: purple; cursor: pointer; display: block; text-align: left;">Description:</strong> ${fullDescriptionHTML}
            </p>
            <p style="max-width: 100%; overflow-wrap: break-word; text-align: inherit;"><strong>Tags:</strong> ${highlightLinksAndHashtags(tags)}</p>
            <p style="max-width: 100%; overflow-wrap: break-word; text-align: inherit;"><strong>Location:</strong> ${highlightLinksAndHashtags(location)}</p>
            <p style="text-align: inherit;"><strong>Date & Time:</strong> ${dateTime}</p>
            <p style="text-align: inherit;"><strong>Category:</strong> ${category}</p>
            <p style="text-align: inherit;"><strong>Privacy:</strong> ${privacy}</p>
            <p style="text-align: inherit;"><strong>Comments:</strong> ${comments}</p>
        `;

        const postDetailsSection = document.createElement('div');
        postDetailsSection.innerHTML = previewHTML;

        postPreviewContainer.appendChild(postDetailsSection);

        const postButtonContainer = document.getElementById('postButtonContainer');
        postPreviewContainer.appendChild(postButtonContainer);
        postButtonContainer.style.display = 'flex';

        document.getElementById('previewPostButton').style.display = 'none';

        function toggleDescription() {
            const fullDescription = document.getElementById('postPreviewFullDescription');
            const shortDescription = document.getElementById('postPreviewDescription');
            if (fullDescription.style.display === 'block') {
                fullDescription.style.display = 'none';
                shortDescription.style.display = 'block';
            } else {
                fullDescription.style.display = 'block';
                shortDescription.style.display = 'none';
            }
        }

        document.getElementById('togglePostDescription').addEventListener('click', toggleDescription);
        document.getElementById('togglePostDescriptionFull').addEventListener('click', toggleDescription);

        new Swiper('.preview-section', {
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                type: 'bullets',
                dynamicBullets: true,
                dynamicMainBullets: 5,
            },
        });

        scrollToPreview();
    }

    function closePostPreview() {
        const postPreviewContainer = document.getElementById('postPreviewContainer');
        postPreviewContainer.innerHTML = '';
        postPreviewContainer.style.display = 'none';
        document.getElementById('previewPostButton').style.display = 'inline-block';
        document.getElementById('postButtonContainer').style.display = 'none';
    }

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

    function scrollToPreview() {
        const previewButton = document.getElementById('previewPostButton');
        const postPreviewContainer = document.getElementById('postPreviewContainer');
        postPreviewContainer.style.marginTop = '20px';
        previewButton.insertAdjacentElement('afterend', postPreviewContainer);
    }
});
