document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('addPostButton').addEventListener('click', function () {
        document.getElementById('postUploadForm').style.display = 'block';
    });

    document.getElementById('closePostUploadForm').addEventListener('click', function () {
        document.getElementById('postUploadForm').style.display = 'none';
    });
});

document.getElementById('choosePhotosButton').addEventListener('click', function() {
    document.getElementById('photoInput').click();
});

document.getElementById('photoInput').addEventListener('change', function(event) {
    const swiperWrapper = document.querySelector('.swiper-wrapper');
    const imagesContainer = document.getElementById('imagesContainer');
    const files = event.target.files;
    swiperWrapper.innerHTML = ''; // Clear existing images
    if (files.length > 0) {
        imagesContainer.style.display = 'block'; // Show the container
        Array.from(files).forEach(file => {
            const swiperSlide = document.createElement('div');
            swiperSlide.classList.add('swiper-slide');
            const imgElement = document.createElement('img');
            imgElement.src = URL.createObjectURL(file);
            swiperSlide.appendChild(imgElement);
            swiperWrapper.appendChild(swiperSlide);
        });
        swiper.update(); // Update Swiper with new slides
    } else {
        imagesContainer.style.display = 'none'; // Hide the container if no files are selected
    }
});

document.getElementById('chooseMusicButton').addEventListener('click', function() {
    document.getElementById('musicInput').click();
});

document.getElementById('musicInput').addEventListener('change', function(event) {
    const musicPlayer = document.getElementById('musicPlayer');
    const file = event.target.files[0];
    if (file) {
        musicPlayer.src = URL.createObjectURL(file);
        musicPlayer.style.display = 'block';
    }
});

// Initialize Swiper
const swiper = new Swiper('.swiper-container', {
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});
