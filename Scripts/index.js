//Bamburger menu open close logic

//Element select
const hamburgerMenuButton = document.getElementById("hamburgerMenuButton");
const collapsableMenuItems = document.querySelector(".hamburger-aside");

//Open and close Collapsable Menu Items by clicking Hamburger Menu Button
let openCloseCounter = 0;

hamburgerMenuButton.addEventListener("click", ()=>{
    openCloseCounter++;
    if(openCloseCounter == 1){
        collapsableMenuItems.classList.remove("active");
    }else if(openCloseCounter == 2){
        collapsableMenuItems.classList.add("active");
        openCloseCounter = 0;
    }
});




//Current Date and time

//Element selection
const dateDisplay = document.querySelector(".date-and-day");

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = ["Jan", "Feb", "Mar", "Apr", "May","June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

const getDateAndTime = ()=>{
    
    //Get all the date parameters from date object
    const dateObj = new Date();
    let minute = dateObj.getMinutes();
    let hour = dateObj.getHours();
    let date = dateObj.getDate();
    let day = dateObj.getDay();
    let month = dateObj.getMonth();
    let year = dateObj.getFullYear();

    //Day count according to index
    day = days[day];
    //Month count according to index
    month = months[month];
    //Make 2 digit count if minute is less then 10
    if(minute < 10){
        minute = "0" + minute;
    }
    //Make 2 digit count if hour is less then 10
    if(hour < 10){
        hour = "0" + hour;
    }
    //Make 2 digit count if date is less then 10
    if(date < 10){
        date = "0" + date;
    }

    
   dateDisplay.innerHTML = `${hour} : ${minute} | ${day}, ${month} ${date}, ${year}`;
}

//Update date and time every minute
setInterval(getDateAndTime, 1000);




//Get current date to upadate news 
let currentDate = " ";
let currentDateObj = new Date;
let y = currentDateObj.getFullYear();
let m = currentDateObj.getMonth();
let d = currentDateObj.getDate();
if(m < 10){
    m = "0" + m;
}
if(d < 10){
    d = "0" + d;
}
currentDate += `${y}-${m}-${d}`;




//Get news data from API

const getNews = ()=>{
    fetch(`https://newsapi.org/v2/everything?q=technology&from=${currentDate}&apiKey=99243e11ce174ba7a05b8ab5702dbf74`)
    .then((res)=>res.json())
    .then((res)=>{
        createCard(res.articles);
    });
}

getNews();






//Create news cards dynamically

//Element selection
const newsCardContainer = document.querySelector(".all-latest-news");
// let newsIndex = Math.ceil(Math.random() * 60);
let newsIndex = -1;

const createCard = (articles)=>{
    for(let i = 1; i <= 60; i++){
        const cardEl = document.createElement("a");
        cardEl.classList.add("news");
        cardEl.target = "_blank";

        newsCardContainer.appendChild(cardEl);
    }
    const newsElements = document.querySelectorAll(".news");
    newsElements.forEach((newsEl) =>{
        newsIndex++;
        newsEl.style.backgroundImage = `url(${articles[newsIndex].urlToImage})`;
        newsEl.href = articles[newsIndex].url;
        newsEl.innerHTML = `<h3 class="news-heading">${articles[newsIndex].title}</h3>`
    });
}




//News search handler

//Element selection
const inputField = document.getElementById("searchField");
const searchButton = document.getElementById("searchNews");

searchButton.addEventListener("click", ()=>{
    collapsableMenuItems.classList.add("active");
    openCloseCounter = 0;
    let userInput = inputField.value.toLowerCase().toString();
    
        fetch(`https://newsapi.org/v2/everything?q=${userInput}&from=${currentDate}&apiKey=99243e11ce174ba7a05b8ab5702dbf74`)
        .then((res)=>res.json())
        .then((res)=>{
            console.log(res);
            const newsElements = document.querySelectorAll(".news");
        newsElements.forEach((newsEl) =>{
            newsIndex++;
            newsEl.style.backgroundImage = `url(${res.articles[newsIndex].urlToImage})`;
            newsEl.href = res.articles[newsIndex].url;
            newsEl.innerHTML = `<h3 class="news-heading">${res.articles[newsIndex].title}</h3>`
        });
        
        });
    
    
});


//Reload page upon clicking logo
const logoEl = document.querySelector(".logo");
logoEl.addEventListener("click", ()=>{
    window.location.reload();
});


//Close collapsable nav menu of small screen by clicking nav links
const navButtons = document.querySelectorAll(".nav-btn");
navButtons.forEach((navBtn)=>{
    navBtn.addEventListener("click", ()=>{
        collapsableMenuItems.classList.add("active");
        openCloseCounter = 0;
    })
})







