document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('header');
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = menuBtn.querySelector('svg path');
    const mobileLinks = mobileMenu.querySelectorAll('a');

    const openIconPath = "M4 6h16M4 12h16m-7 6h7";
    const closeIconPath = "M6 18L18 6M6 6l12 12";

    // Sticky header on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            header.classList.add('bg-gray-900/80', 'backdrop-blur-sm', 'shadow-lg');
        } else {
            header.classList.remove('bg-gray-900/80', 'backdrop-blur-sm', 'shadow-lg');
        }
    });

    // Toggle mobile menu
    menuBtn.addEventListener('click', () => {
        const isOpen = !mobileMenu.classList.contains('hidden');
        mobileMenu.classList.toggle('hidden');
        
        if (isOpen) {
            menuIcon.setAttribute('d', openIconPath);
        } else {
            menuIcon.setAttribute('d', closeIconPath);
        }
    });

    // Close mobile menu when a link is clicked
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            menuIcon.setAttribute('d', openIconPath);
        });
    });
});
