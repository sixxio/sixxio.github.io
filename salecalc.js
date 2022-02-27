/* sales calculator functions */

/* defining inputs and image */
const inputs = document.getElementsByClassName('input');
const image = document.getElementById("what");

/* adding event listeners on input forms*/
Array.prototype.slice.call(inputs).forEach(element => {
    element.addEventListener('input', updateValue);
});

function updateValue() {
    /* defining input variables */
    let sum = Number(inputs[0].value);
    let age = Number(inputs[1].value);
    let sale = 0;
    /* choosing sale percent basing on age */
    if(age <= 20 && age >0)
        sale = 0.05;
    else if (age >= 65)
        sale = 0.1;
    /* choosing affordable product(w/sale) basing on budget */
    if (sum >= 300*(1-sale)) {
        if (sum >= 3000*(1-sale)) {
            if (sum >= 10000*(1-sale)) {
                image.src = "images/fridge.jpg";
                document.getElementById('whattobuy').innerHTML = "Можно купить холодильник!";
            } else {
                image.src = "images/cleaner.jpg";
                document.getElementById('whattobuy').innerHTML = "Можно купить пылесос!";
            }   
        } else {
            image.src = "images/teapot.jpg";
            document.getElementById('whattobuy').innerHTML = "Можно купить чайник!";
        }
    } else {
        image.src = "images/nothin.jpg";
        document.getElementById('whattobuy').innerHTML = "Ничего не купить!";
    }
}

/* menu functions */
function generateElements() {
    /* defining variables */
    let Content = document.querySelector('.words-nums');
    let DataString = document.querySelector('.input-words-nums').value;
    let DataArray = DataString.split('-').sort();
    let NumArray = new Array();
    let DataMap = new Map();
    let FirstWordIndex = DataArray.length;

    /* looking for index of first word in array */
    for (let i = 0; i < DataArray.length; i++)
        if (isNaN(DataArray[i])){
            FirstWordIndex = i;
            break;
        }    
        
    /* separating nums from words to another array to correct sorting */
    for (let i=0; i < FirstWordIndex; i++)
        NumArray.push(DataArray[i]);
    NumArray.sort((a,b) => a-b);

    /* inserting words and nums into map */
    for (let i = FirstWordIndex; i < DataArray.length; i++) 
        DataMap.set('a' + (i + 1 - FirstWordIndex), DataArray[i]);
    for (let i = 0; i < NumArray.length; i++) 
        DataMap.set('n' + (i + 1), NumArray[i]);

    /* adding elements to html using our map */
    for (let i = FirstWordIndex; i < DataMap.size; i++) {
        let TempLi = document.createElement("li");
        TempLi.innerHTML = 'a' + (i + 1 - FirstWordIndex) + ' ' + DataMap.get('a' + (i + 1 - FirstWordIndex));
        TempLi.className = "btn-li";
        Content.appendChild(TempLi);
    }
    for (let i = 0; i < FirstWordIndex; i++) {
        let TempLi = document.createElement("li");
        TempLi.innerHTML = 'n' + (i + 1) + ' ' + DataMap.get('n' + (i + 1));
        TempLi.className = "btn-li";
        Content.appendChild(TempLi);
    }

    /* getting all inserted elements and adding eventlisteners to add words and nums into string by click*/
    let ButtonsList = document.getElementsByClassName('btn-li');
    for (let index = 0; index < ButtonsList.length; index++) 
        ButtonsList[index].addEventListener( "click" , generateString);
    
}

/* adding words and nums (w/spacing) into string */
function generateString() {
    let ButtonsList = document.querySelector('.buttons');
    let TempLi = document.createElement("li");
    TempLi.innerHTML = this.innerHTML.split(' ')[1];
    ButtonsList.appendChild(TempLi);
}