'use strict';

let nameArray = [
    'bag.jpg',
    'banana.jpg',
    'bathroom.jpg',
    'boots.jpg',
    'breakfast.jpg',
    'bubblegum.jpg',
    'chair.jpg',
    'cthulhu.jpg',
    'dog-duck.jpg',
    'dragon.jpg',
    'pen.jpg',
    'pet-sweep.jpg',
    'scissors.jpg',
    'shark.jpg',
    'sweep.png',
    'tauntaun.jpg',
    'unicorn.jpg',
    'usb.gif',
    'water-can.jpg',
    'wine-glass.jpg'
];

let allProducts = document.getElementById('allProducts');
let leftImg = document.getElementById('leftImg');
let centerImg = document.getElementById('centerImg');
let rightImg = document.getElementById('rightImg');


let click = 0;
let rounds = 25
let leftImgCounts = 0;
let centerImgCounts = 0;
let rightImgCounts = 0;

let bussMall = function(name) {
    this.name = name;
    this.img = `./img/${name}`;
    this.shown = 0;
    this.click = 0;
    bussMall.all.push(this);
};
bussMall.all = [];

for (let i = 0; i < nameArray.length; i++) {
    new bussMall(nameArray[i]);
}

function render() {
    let rightIndex = randomNumber(0, nameArray.length - 1);
    let centerIndex;
    let leftIndex;
    do {
        centerIndex = randomNumber(0, nameArray.length - 1);
    } while (rightIndex === centerIndex);

    do {
        leftIndex = randomNumber(0, nameArray.length - 1);
    } while (leftIndex === rightIndex || leftIndex === centerIndex);

    rightImg.src = Sections.all[rightIndex].img;
    centerImg.src = Sections.all[centerIndex].img;
    leftImg.src = Sections.all[leftIndex].img;

    rightImgCounts = rightIndex;
    centerImgCounts = centerIndex;
    leftImgCounts = leftIndex;

    Sections.all[rightIndex].shown++;
    Sections.all[centerIndex].shown++;
    Sections.all[leftIndex].shown++;
}
render();


function randomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}