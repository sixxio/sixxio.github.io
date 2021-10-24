const inputs = document.getElementsByClassName('input');
const image = document.getElementById("what");

Array.prototype.slice.call(inputs).forEach(element => {
    element.addEventListener('input', updateValue);
});

function updateValue() {
    let sum = Number(inputs[0].value);
    let age = Number(inputs[1].value);
    let sale = 0;

    if (age >= 65)
        sale = 0.1;
    else if (age <=20 && age >0)
        sale = 0.05;
    else
        sale = 0;
    if (sum >= 10000*(1-sale)) {
        image.src = "images/fridge.jpg";
        document.getElementById('whattobuy').innerHTML = "Можно купить холодильник!";
    } else if (sum >= 3000*(1-sale)) {
        image.src = "images/cleaner.jpg";
        document.getElementById('whattobuy').innerHTML = "Можно купить пылесос!";
    } else if (sum >= 300*(1-sale)) {
        image.src = "images/teapot.jpg";
        document.getElementById('whattobuy').innerHTML = age;
    } else {
        image.src = "images/nothin.jpg";
        document.getElementById('whattobuy').innerHTML = "Ничего не купить!";
    }
}