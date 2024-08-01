document.addEventListener("DOMContentLoaded", function() {
    var searchIcon = document.querySelector(".search-icon-container");
    var searchSection = document.getElementById("searchSection");
    var closeSearchIcon = document.getElementById("closeSearchIcon");
    var clearIcon = document.querySelector(".clear-icon");
    var searchInput = document.querySelector(".search-input");
    var categories = document.querySelectorAll(".category");
    var contentDisplay = document.getElementById("contentDisplay");

    searchIcon.addEventListener("click", function() {
        searchSection.classList.add("active");
        searchSection.classList.remove("d-none");
    });

    closeSearchIcon.addEventListener("click", function() {
        searchSection.classList.remove("active");
        setTimeout(function() {
            searchSection.classList.add("d-none");
        }, 300); // Delay to match the transition duration
    });

    searchInput.addEventListener("input", function() {
        if (searchInput.value.length > 0) {
            clearIcon.classList.add("visible");
        } else {
            clearIcon.classList.remove("visible");
        }
    });

    clearIcon.addEventListener("click", function() {
        searchInput.value = "";
        clearIcon.classList.remove("visible");
    });

    categories.forEach(function(category) {
        category.addEventListener("click", function() {
            var selectedCategory = this.getAttribute("data-category");
            fetchContent(selectedCategory);
        });
    });

    function fetchContent(category) {
        // Make an API call or database query to fetch content based on the category
        // Here, I'm using a dummy function to simulate fetching data
        // Replace this with your actual database call
        var dummyData = {
            "new": "<p>New content here...</p>",
            "trending": "<p>Trending content here...</p>",
            "dance": "<p>Dance content here...</p>",
            "entertainment": "<p>Entertainment content here...</p>",
            "music": "<p>Music content here...</p>",
            "education": "<p>Education content here...</p>",
            "games": "<p>Games content here...</p>",
            "news": "<p>News content here...</p>",
            "sports": "<p>Sports content here...</p>",
            "travel": "<p>Travel content here...</p>",
            "nature": "<p>Nature content here...</p>",
            "food": "<p>Food content here...</p>",
            "comedy": "<p>Comedy content here...</p>",
            "technology": "<p>Technology content here...</p>",
            "space": "<p>Space content here...</p>",
            "fashion-beauty": "<p>Fashion & Beauty content here...</p>",
            "vlogs": "<p>Vlogs content here...</p>"
        };

        contentDisplay.innerHTML = dummyData[category] || "<p>No content available for this category.</p>";
    }
});
