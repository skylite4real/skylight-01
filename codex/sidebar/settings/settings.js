document.addEventListener('DOMContentLoaded', function () {
    const gearIcon = document.querySelector('.gear-icon');
    const settingsSection = document.getElementById('settingsSection');
    const closeSettingsIcon = document.querySelector('.close-settings-icon');

    gearIcon.addEventListener('click', function () {
        settingsSection.style.display = 'block';
        setTimeout(() => settingsSection.classList.add('show'), 10); // Delay to allow for display change
    });

    closeSettingsIcon.addEventListener('click', function () {
        settingsSection.classList.remove('show');
        setTimeout(() => settingsSection.style.display = 'none', 100); // Match this timeout with the transition duration in CSS
    });

    // Toggle sub-options
    document.querySelectorAll('.settings-option').forEach(option => {
        option.addEventListener('click', function () {
            const subOption = this.nextElementSibling;
            if (subOption && subOption.classList.contains('sub-option')) {
                const icon = this.querySelector('.toggle-icon');
                if (subOption.style.display === 'none' || !subOption.style.display) {
                    subOption.style.display = 'flex';
                    icon.classList.remove('fa-angle-down');
                    icon.classList.add('fa-angle-up');
                } else {
                    subOption.style.display = 'none';
                    icon.classList.remove('fa-angle-up');
                    icon.classList.add('fa-angle-down');
                }
            }
        });
    });
});
