const galleryContainer = document.querySelector('.gallery-container');
const galleryControlsContainer = document.querySelector('.gallery-controls');
const galleryControls = ['previous', 'add', 'next'];
const galleryItems = document.querySelectorAll('.gallery-item');

class Carousel {
    constructor(container, items, controls) {
        this.carouselContainer = container;
        this.carouselControls = controls;
        this.carouselArray = [...items];


    }

    // Update css classes for gallery
    updateGallery() {
        this.carouselArray.forEach(el => {
            el.classList.remove('gallery-item-1');
            el.classList.remove('gallery-item-2');
            el.classList.remove('gallery-item-3');
        });

        this.carouselArray.slice(0, 3).forEach((el, i) => {
            el.classList.add(`gallery-item-${i+1}`);
        });
    }

    // Update the current order of the carouselArray and gallery
    setCurrentState(direction) {

        if (direction.className == 'gallery-controls-previous') {
            this.carouselArray.unshift(this.carouselArray.pop());
        } else {
            this.carouselArray.push(this.carouselArray.shift());
        }

        this.updateGallery();
    }

    setDotState(direction) {
        console.log(direction);
        if (direction == 'pre') {
            this.carouselArray.unshift(this.carouselArray.pop());
        } else {
            this.carouselArray.push(this.carouselArray.shift());
        }

        this.updateGallery();
    }

    // Construct the carousel navigation
    setNav() {
        galleryControlsContainer.appendChild(document.createElement('ul')).className = 'gallery-nav';

        this.carouselArray.forEach((item, index) => {
            let data = index + 1;
            let cssClass = "gallery-controll-" + data;
            const nav = galleryControlsContainer.lastElementChild;
            let li = document.createElement('li')
            li.setAttribute("data-index", "" + data + "");
            li.setAttribute("class", cssClass);
            if (index == 1) {
                li.classList.add("gallery-item-active");
            }
            nav.appendChild(li);
        });
    }



    // Add a click event listener to trigger setCurrentState method to rearrange carousel
    useControls() {
        const triggers = [...galleryContainer.childNodes];

        triggers.forEach(control => {
            control.addEventListener('click', e => {
                e.preventDefault();
                console.log(control);
                const action = control.getAttribute('data-index');
                const current = document.getElementsByClassName('gallery-item-2')[0].getAttribute('data-index');
                const currentLi = document.getElementsByClassName('gallery-item-active')[0];
                const setCurrentLi = document.getElementsByClassName("gallery-controll-" + action)[0];;
                currentLi.classList.remove("gallery-item-active");
                setCurrentLi.classList.add("gallery-item-active");
                if (parseInt(current) > parseInt(action)) {
                    const counts = parseInt(current) - parseInt(action);
                    for (var i = 0; i < counts; i++) {
                        this.setDotState('pre');
                    }
                } else if (parseInt(current) < parseInt(action)) {
                    const counts = parseInt(action) - parseInt(current);
                    for (let i = 0; i < counts; i++) {
                        this.setDotState('next');
                    }
                } else {
                    const url = control.getAttribute('data-url');
                    window.location.href = url;
                }

            });
        });
    }
    useNav() {
        const galleryControlsContainers = document.querySelector('.gallery-controls');
        const triggers = [...galleryControlsContainers.childNodes][0].childNodes;
        triggers.forEach(control => {

            control.addEventListener('click', e => {
                e.preventDefault();
                const current = document.getElementsByClassName('gallery-item-2')[0].getAttribute('data-index');
                const currentLi = document.getElementsByClassName('gallery-item-active')[0];
                currentLi.classList.remove("gallery-item-active");
                control.classList.add("gallery-item-active");
                const action = control.getAttribute('data-index');
                if (parseInt(current) > parseInt(action)) {
                    const counts = parseInt(current) - parseInt(action);
                    for (var i = 0; i < counts; i++) {
                        this.setDotState('pre');
                    }
                } else if (parseInt(current) < parseInt(action)) {
                    const counts = parseInt(action) - parseInt(current);
                    for (let i = 0; i < counts; i++) {
                        this.setDotState('next');
                    }
                }
            });
        });
    }
}

const exampleCarousel = new Carousel(galleryContainer, galleryItems, galleryControls);

exampleCarousel.setNav();
exampleCarousel.useControls();
exampleCarousel.useNav();