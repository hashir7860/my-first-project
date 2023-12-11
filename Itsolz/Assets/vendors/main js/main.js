
(function () {
    "use strict";

    /**
     * Easy selector helper function
     */
    const select = (el, all = false) => {
        el = el.trim()
        if (all) {
            return [...document.querySelectorAll(el)]
        } else {
            return document.querySelector(el)
        }
    }

    /**
     * Easy event listener function
     */
    const on = (type, el, listener, all = false) => {
        let selectEl = select(el, all)
        if (selectEl) {
            if (all) {
                selectEl.forEach(e => e.addEventListener(type, listener))
            } else {
                selectEl.addEventListener(type, listener)
            }
        }
    }

    /**
     * Easy on scroll event listener 
     */
    const onscroll = (el, listener) => {
        el.addEventListener('scroll', listener)
    }

    /**
     * Toggle .header-scrolled class to #header when page is scrolled
     */

    let selectnavbar = select('.navbar')
    if (selectnavbar) {
        const navbarScrolled = () => {
            if (window.scrollY > 100) {
                selectnavbar.classList.add('navbar-scrolled')
            } else {
                selectnavbar.classList.remove('navbar-scrolled')
            }
        }
        window.addEventListener('load', navbarScrolled)
        onscroll(document, navbarScrolled)
    }


    //*************** INDEX PAGE SCRIPT *****************/
    // index Nav bar
    document.addEventListener("DOMContentLoaded", function () {

        let selectindexNavbar = select('.indexNavbar');
        let selectNavbarBrand = select('.navbar-brand img');

        if (selectindexNavbar && selectNavbarBrand) {
            const changeLogo = (newLogoPath) => {
                selectNavbarBrand.src = newLogoPath;
                console.log(selectNavbarBrand);
            }

            const indexNavbarScrolled = (newLogoPath) => {
                const scrolledLogoPath = newLogoPath || 'Assets/image/block-text-logo.png';

                if (window.scrollY > 100) {
                    selectindexNavbar.classList.add('indexNavbar-scrolled');
                    changeLogo(scrolledLogoPath);
                } else {
                    selectindexNavbar.classList.remove('indexNavbar-scrolled');
                    changeLogo('Assets/image/logo.png'); // Change to the original logo path
                }
            }

            window.addEventListener('load', () => indexNavbarScrolled());
            onscroll(document, () => indexNavbarScrolled());
        }
    });

    // Index slider
    const slider = document.querySelector(".slider");
    const cardContainer = document.querySelector(".card-container");
    const controls = document.querySelector(".controls");

    let currentIndex = 2;

    for (let i = 0; i < cardContainer.children.length; i++) {
        const circle = document.createElement("div");
        circle.classList.add("circle");
        circle.onclick = function () {
            changeSlide(i);
        };
        controls.appendChild(circle);
    }

    function changeSlide(index) {
        currentIndex = index;
        updateSlider();
    }

    function updateSlider() {
        const translateValue = -currentIndex * 18.5 + "rem";
        slider.style.transform = "translateX(" + translateValue + ")";


        document.querySelectorAll(".circle").forEach((circle) => {
            circle.classList.remove("active");
        });

        document.querySelectorAll(".card").forEach((card) => {
            card.classList.remove("active");
        });

        document
            .querySelector(".circle:nth-child(" + (currentIndex + 1) + ")")
            .classList.add("active");
        document
            .querySelector(".card:nth-child(" + (currentIndex + 1) + ")")
            .classList.add("active");
    }

    // Set the initial state
    updateSlider();

})()