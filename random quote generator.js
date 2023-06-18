let nextBtn = document.getElementById("nextBtn");
let quote = document.getElementById("quote");
let author = document.getElementById("author");
let quoteDiv = document.getElementById("quoteDiv");
let authorDiv = document.getElementById("authorDiv");
let body = document.querySelector("body")
let index;
let jsondata = "";
let apiUrl = "https://type.fit/api/quotes";
//page loader
$(window).load(function() {
    $('#loading').hide();
  });
//event listener on next button
nextBtn.addEventListener("click", displayQuote)
//function to fetch API
async function getJson(url) {
    let response = await fetch(url);
    let data = await response.json()
    return data;
}
async function main() {
    //OPTION 1
    //getJson(apiUrl);
    //OPTION 2
    jsondata = await getJson(apiUrl)
    //below function call is to load data by default without clicking button
    displayQuote();
}
main();
//function to display data
function displayQuote() {
    let randomIndex = Math.floor(Math.random() * (jsondata.length));
    if (randomIndex !== index) {
        //some of the quote array dosen't have author name, that is why below if else for to not to display those kind of quotes.
        if(jsondata[randomIndex].author != null) {
            quote.innerHTML = jsondata[randomIndex].text;
            author.innerHTML = jsondata[randomIndex].author;
            index = randomIndex;
            randomcolor()
        } 
        else {
            displayQuote()
        }
    }
    else {
        displayQuote()
    }
}
//setInterval to display and change data without button click
setInterval(displayQuote, 5000);
//function to change colors
function randomcolor() {
    let color1 = Math.floor(Math.random() * 255);
    let color2 = Math.floor(Math.random() * 255);
    let color3 = Math.floor(Math.random() * 255);
    let mycolor = `rgb(${color1}, ${color2}, ${color3})`;
    body.style.backgroundColor = mycolor;
    quoteDiv.style.color = mycolor;
    authorDiv.style.color = mycolor;
    nextBtn.style.backgroundColor = mycolor;
    $('#quote').animate({ opacity: 0 }, 500, function () {
        $(this).animate({ opacity: 1 }, 500);
    });
    $('#author').animate({ opacity: 0 }, 500, function () {
        $(this).animate({ opacity: 1 }, 500);
    });
}
