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


let clicker = 0;
let rounds = 25
let leftImgCounts = 0;
let centerImgCounts = 0;
let rightImgCounts = 0;
let leftNewIndex = 0;
let centerNewIndex = 0;
let rightNewIndex = 0;




let product = function(name) {
    this.name = name;
    this.img = `./img/${name}`;
    this.timesShown = 0;
    this.Click = 0;
    product.all.push(this);
};
product.all = [];

for (let i = 0; i < nameArray.length; i++) {
    new product(nameArray[i]);
}

function render() {
    let rightIndex;
    let centerIndex;
    let leftIndex;

    do {
        rightIndex = randomNumber(0, nameArray.length - 1);
        centerIndex = randomNumber(0, nameArray.length - 1);
        leftIndex = randomNumber(0, nameArray.length - 1);
    } while (leftIndex === rightIndex || leftIndex === centerIndex || rightIndex === centerIndex || rightIndex === leftNewIndex || rightIndex === centerNewIndex || rightIndex === rightNewIndex || leftIndex === leftNewIndex || leftIndex === centerNewIndex || leftIndex === rightNewIndex || centerIndex === rightNewIndex || centerIndex === centerNewIndex || centerIndex === leftNewIndex);

    rightImg.src = product.all[rightIndex].img;
    centerImg.src = product.all[centerIndex].img;
    leftImg.src = product.all[leftIndex].img;

    rightImgCounts = rightIndex;
    centerImgCounts = centerIndex;
    leftImgCounts = leftIndex;

    product.all[rightIndex].timesShown++;
    product.all[centerIndex].timesShown++;
    product.all[leftIndex].timesShown++;

    leftNewIndex = leftIndex;
    centerNewIndex = centerIndex;
    rightNewIndex = rightIndex;
}
render();

allProducts.addEventListener('click', clickIt);

function clickIt(event) {
    if ((event.target.id === 'rightImg' || event.target.id === 'centerImg' || event.target.id === 'leftImg') && clicker < rounds) {

        if (event.target.id === 'rightImg') {
            product.all[rightImgCounts].Click++;
        }

        if (event.target.id === 'rightImage') {
            product.all[centerImgCounts].Click++;
        }

        if (event.target.id === 'leftImg') {
            product.all[leftImgCounts].Click++;
        }
        clicker++;
        render();
    } else{ renderChart(); 
        
    }
}

// console.log(product.all);


const results = document.getElementById('results');
const list = document.getElementById('list');

results.addEventListener('click', function dataResults() {
    for (let i = 0; i < nameArray.length; i++) {
        let item = document.createElement('li');
        list.appendChild(item);
        item.textContent = `${product.all[i].name.split('.')[0]} had ${product.all[i].Click} votes, and was seen ${product.all[i].timesShown} times.`;
    }
    results.removeEventListener('click', dataResults);
},
);
// when I want to click a button and see the results one time without dublicating it when I click again,
//  I can use one of these two ways
// results.removeEventListener('click', dataResults);
// or
// {
    // once: true
// }

function randomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// # Chart.js
function renderChart() {
    let votes = [];
    let names = [];
    let timesShown = [];
    for (let i = 0; i < product.all.length; i++) {
        votes.push(product.all[i].votes);
        names.push(product.all[i].name); 
        timesShown.push(product.all[i].timesShown); 
    }
    let ctx = document.getElementById('myChart').getContext('2d');
    let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: names,
        datasets: [{
            label: 'Votes',
            data: votes,
            backgroundColor: 
            'rgb(243, 173, 150)',
            borderColor: 
            'rgb(243, 173, 150)',
            borderWidth: 1
        }, {
            label: 'Times Shown',
            data: timesShown,
            backgroundColor: 
            'rgb(169, 50, 38)',
            borderColor: 
            'rgb(169, 50, 38)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
}

console.log(renderChart);