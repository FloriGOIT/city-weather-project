let quoteAll = [
    {
      quote: 'Climate is what we expect, weather is what we get.',
      author: 'Mark Twain',
    },
    {
      quote:
        'In the Spring, I have counted 136 different kinds of weather inside of 24 hours.',
      author: 'Mark Twain',
    },
    { quote: 'Weather forecast for tonight: dark.', author: 'George Carlin' },
    {
      quote:
        'There is no such thing as bad weather, only different kinds of good weather.',
      author: 'John Ruskin',
    },
    {
      quote:
        'Wherever you go, no matter what the weather, always bring your own sunshine.',
      author: 'Anthony J. D`Angelo',
    },
    {
      quote: 'Bad weather always looks worse through a window.',
      author: 'Tom Lehrer',
    },
    {
      quote: 'The weather is like the government, always in the wrong.',
      author: 'Jerome K. Jerome',
    },
    {
      quote: 'A beach and warm weather is all I really need.',
      author: 'Rob Gronkowski',
    },
    {
      quote: 'The weather is perfect. The gods are shining on us.',
      author: 'Frank Shorter',
    },
    {
      quote: 'There`s no such thing as bad weather, just soft people.',
      author: 'Bill Bowerman',
    },
    { quote: 'I love the rain, it can hide my tears', author: 'JS programmer' },
    {
      quote: 'If you want to see the sunshine, you have to weather the storm',
      author: 'Frank Lane',
    },
    {quote:'Just for the record, the weather today is calm and sunny, but the air is full of shit.', author:'Ellie Yelizarieva '}
  ];

let page12beforeBtn = document.querySelector(".weather-quote");
let page12beforeBtnHeight = page12beforeBtn.clientHeight;
let page12afterBtn = document.querySelector(".container");
let page12afterBtnHeight = page12afterBtn.clientHeight;
page12beforeBtn.style.visibility = 'visible';
page12afterBtn.style.visibility = 'visible';
let oneDayBtn = document.querySelector("#one");
let fiveDayBtn = document.querySelector("#five");
oneDayBtn.style.visibility = "hidden";
let page22 = document.querySelector(".fivedayscontainer");
page22.style.visibility = "hidden";
console.log(page22)

setInterval(function() {let quoteText = document.querySelector(".quote-text");
                        let quoteAuthor = document.querySelector(".quote-author");
                        let x = Math.floor(Math.random() * 13)
                        quoteText.textContent = quoteAll[x].quote;
                        quoteAuthor.textContent = quoteAll[x].author;}, 10000);

function oneDayhidden(){page12beforeBtn.style.visibility = 'hidden';
                      page12afterBtn.style.visibility = 'hidden';
                      page12beforeBtn.style.height = '0px';
                      page12afterBtn.style.height = '0px';
                      fiveDayBtn.style.visibility = 'hidden';
                      oneDayBtn.style.visibility = 'visible';
                      page22.style.visibility = 'visible';
                      //page22.style.transform = `translatey(-100px)`
                      console.log(page22);
                    }
function fiveDayhidden(){page12beforeBtn.style.visibility = 'visible';
                        page12afterBtn.style.visibility = 'visible';
                        page12beforeBtn.style.height = `${page12beforeBtnHeight}`;
                        page12afterBtn.style.height = `${page12afterBtnHeight}`;
                        page22.style.visibility = 'hidden';
                        oneDayBtn.style.visibility = 'hidden';
                        fiveDayBtn.style.visibility = 'visible';
                        //page22.style.transform = `translatey(0px)`
                      //fiveDayBtn.disabled = true;
                      //oneDayBtn.disabled = false;
                    }
fiveDayBtn.addEventListener("click",oneDayhidden)
oneDayBtn.addEventListener("click",fiveDayhidden)
