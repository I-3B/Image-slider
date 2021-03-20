let previousImage = document.querySelector('#previous-image');
let currentImage = document.querySelector('#current-image');
let nextImage = document.querySelector('#next-image');
let imagesSlider = document.querySelector('#images-slider');
let imagesBrowser = document.querySelector('#images-browser');
let images = [];
for (let i = 0; i <= 12; i++) {
    images.push(`./imgs/${i}.jpg`);
}
initImages();
addEventListeners();
initBrowser();
currentImageInBrowser();
nextTimeout(next);
function addEventListeners() {
    previousImage.addEventListener('click', previous);
    nextImage.addEventListener('click', next);
    document.addEventListener('keyup', (e) => {
        if (
            e.code === 'ArrowUp' ||
            e.code === 'ArrowRight' ||
            e.code === 'Space'
        )
            next();
        else if (e.code === 'ArrowDown' || e.code === 'ArrowLeft') previous();
    });
}
function initImages() {
    setImage(previousImage, images.length - 1);
    setImage(currentImage, 0);
    setImage(nextImage, 1);
}
function initBrowser() {
    images.forEach((imageURL) => {
        let img = document.createElement('div');
        img.setAttribute('class', 'browser-image');
        img.setAttribute('style', `background-image:url(${imageURL})`);
        imagesBrowser.appendChild(img);
        img.addEventListener('click', () => {
            gotoImage(img);
        });
    });
}
function setImage(element, imageIndex) {
    if (imageIndex >= images.length) {
        element.setAttribute('style', `background-image:url(${images[0]})`);
    } else if (imageIndex < 0) {
        element.setAttribute(
            'style',
            `background-image:url(${images[images.length - 1]})`
        );
    } else {
        element.setAttribute(
            'style',
            `background-image:url(${images[imageIndex]})`
        );
    }
}
function getImageIndex(element) {
    let name = element.style.backgroundImage;
    name = name.match(/\d+/g);
    name = name[name.length - 1];
    return Number(name);
}
function previous() {
    moveImages(-1);
    nextTimeout(previous);
}
function next() {
    moveImages(1);
    nextTimeout(next);
}
function moveImages(step) {
    setImage(previousImage, getImageIndex(previousImage) + step);
    setImage(currentImage, getImageIndex(currentImage) + step);
    setImage(nextImage, getImageIndex(nextImage) + step);
    currentImageInBrowser();
}

function gotoImage(img) {
    let ind = getImageIndex(img);
    setImage(previousImage, ind - 1);
    setImage(currentImage, ind);
    setImage(nextImage, ind + 1);
    currentImageInBrowser();
    nextTimeout(next);
}
function currentImageInBrowser() {
    let ind = getImageIndex(currentImage);
    imagesBrowser.childNodes.forEach((e) => e.classList.remove('active'));
    imagesBrowser.childNodes[ind].classList.add('active');
}

function nextTimeout(func) {
    let id = window.setTimeout(function () {}, 0);
    while (id--) {
        window.clearTimeout(id);
    }
    setTimeout(func, 500000);
}
