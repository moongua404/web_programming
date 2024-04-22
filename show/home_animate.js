const element = document.getElementById("boom_animate");
const weatherIcon = document.getElementById("weather_img");
let width = 10;
let boom_intervalId;
let rainbowChange_intervalId;
let percents = 0;
let rainbowDuration;

function getRainbow(percents){
    let r, g, b;
    if (percents < 20) { r = 255; g = percents*12.75; b = 0; }
    else if (percents < 40) { r = (40 - percents)*12.75; g = 255; b = 0; }
    else if (percents < 60) { r = 0; g = 255; b = (percents-40)*12.75; }
    else if (percents < 80) {r = 0; g = (80 - percents)*12.75; b = 255; }
    else { r = (percents - 80)*12.75; g = 0; b = (100 - percents)*12.75; }
    return `rgb(${r}, ${g}, ${b})`
}

function rainbowChange_animation(){
    percents += 1;
    if (percents <= 100){
        element.style.backgroundColor = getRainbow(percents);
    } else{
        percents = 0;
    }
}
function rainbowChange(){
    percents = 0;
    rainbowDuration = 2;
    rainbowChange_intervalId = setInterval(rainbowChange_animation, 5); 
}

function stopRainbow(){
    element.style.backgroundColor = '#125B9F';
    clearInterval(rainbowChange_intervalId);
}

function getWeather(){
    let randV = Math.floor(Math.random()*5);
    let res;
    switch(randV){
        case 0:
            res = "../images/weather/weather_cloudy.svg";
            break;
        case 1:
            res = "../images/weather/weather_rainy.svg";
            break;
        case 2:
            res = "../images/weather/weather_snowy.svg";
            break;
        case 3:
            res = "../images/weather/weather_sunny.svg";
            break;
        case 4:
            res = "../images/weather/weather_windy.svg";
            break;
    }
    console.log(res);
    weatherIcon.src = res;
}