//Challenge 1: Your Age in Days
ageinDays = () => {
    let date = new Date();
    let currentYear = date.getFullYear();
    let birthYear = prompt("Please enter your Birth Year", currentYear);
    let years = currentYear-birthYear;
    let days = years*365.25;
    if(days>7000){
        document.getElementById("heading-1").style="color: green";
        document.getElementById("heading-1").style="background-color: red";
    }
    document.getElementById("flex-box-result").innerHTML=`<h2>You are ${days} days old.<h2>`;
}

resetAge = () =>{
    document.getElementById("flex-box-result").innerHTML="";
}

//Challenge 2: Cat Generator
function generateCat(){
    var image = document.createElement('img');
    var div = document.getElementById('flex-cat-gen');
    image.src="https://thecatapi.com/api/images/get?format=src&type=gif&size=small";
    div.appendChild(image);
}

//Challenge 3: Rock Paper Scissors
function rpsGame(yourChoice){
    let humanChoice = yourChoice.id;
    let botChoice = selectChoice();
    results = decideWinner(humanChoice, botChoice);
    message = finalMessage(results);
    rpsFrontEnd(humanChoice, botChoice, message);
}

function rpsFrontEnd(humanChoice,botChoice,message){
    var humanimg = (document.getElementById(humanChoice)).src;
    var botimg = (document.getElementById(botChoice)).src;
    let inner = `<img id="humanChoice" src="${humanimg}"/>
        <h2 style="color:${message['color']}">${message['message']}<h2>
        <img id="botChoice" src="${botimg}"/>`
    document.getElementById("flex-box-rps-div").innerHTML= inner;
}

 function selectChoice(){
     let choice = ["rock", "paper", "scissors"];
     let index = Math.floor((Math.random() * 3));
     return choice[index];
 }

 function decideWinner(humanChoice, botChoice){
     switch(humanChoice+botChoice){
         case "rockrock":
             return [0.5,0.5];
        case "paperpaper":
            return [0.5,0.5];
        case "scissorsscissors":
            return [0.5,0.5];
        case "rockscissors":
            return [1,0];
        case "scissorspaper":
            return [1,0];
        case "paperrock":
            return [1,0];
        case "rockpaper":
            return [0,1];
        case "paperscissors":
            return [0,1];
        case "scissorsrock":
            return [0,1];
     }
 }

 function finalMessage(results){
     if(results[0]===1){
         return {'message':"You Won!",'color':'green'};
     }
     else if(results[0]===0){
         return {'message':"You Lost!",'color':'red'};
     }
     else if(results[0]===0.5){
        return {'message':"Tie!",'color':'yellow'};
    }
    else{
        console.log("Error");
    }
 }

//Challenge 4: Change the Color of all Buttons
let all_buttons = document.getElementsByTagName('button');
let copyAllButtons =[];
for(button of all_buttons){
    copyAllButtons.push(button.classList[1]);
}
let newAllButtons=[...copyAllButtons];
function buttonColorChange(color){
    if(color==='red'){
        buttonsRed();
    }else if(color==='green'){
        buttonsGreen();
    }else if(color==='random'){
        buttonsRandom();
    }else if(color==='reset'){
        buttonsReset();
    }else{
        console.log("Error");
    }
    console.log(color);
}

function buttonsRed(){
    for(let i=0; i<all_buttons.length; i++){
        all_buttons[i].classList.remove(newAllButtons[i]);
        all_buttons[i].classList.add('btn-danger');
        newAllButtons[i] = 'btn-danger';
    }
    
}

function buttonsGreen(){
    for(let i=0; i<all_buttons.length; i++){
        all_buttons[i].classList.remove(newAllButtons[i]);
        all_buttons[i].classList.add('btn-success');
        newAllButtons[i] = 'btn-success';
    }
}

function buttonsRandom(){
    let colorChoice = ['btn-success', 'btn-danger', 'btn-primary', 'btn-warning']
    for(let i=0; i<all_buttons.length; i++){
        let index = Math.floor((Math.random() * 4));
        all_buttons[i].classList.remove(newAllButtons[i]);
        all_buttons[i].classList.add(colorChoice[index]);
        newAllButtons[i] = colorChoice[index];
    }
}

function buttonsReset(){
    for(let i=0; i<all_buttons.length; i++){
        all_buttons[i].classList.remove(newAllButtons[i]);
        all_buttons[i].classList.add(copyAllButtons[i]);
        newAllButtons[i] = copyAllButtons[i];
    }
}

//Challenge 5: Blackjack
const deck = ['2C','3C','4C','5C','6C','7C','8C','9C','10C','AC','JC','QC','KC',
'2D','3D','4D','5D','6D','7D','8D','9D','10D','AD','JD','QD','KD',
'2H','3H','4H','5H','6H','7H','8H','9H','10H','AH','JH','QH','KH',
'2S','3S','4S','5S','6S','7S','8S','9S','10S','AS','JS','QS','KS',];
let gameDeck = [...deck];
let blackjackGame = {
    'you': {'scoreSpan': 'your-blackjack-result', 'div': '#your-box', 'score': 0},
    'dealer': {'scoreSpan': 'dealer-blackjack-result', 'div': '#dealer-box', 'score': 0}
}
const hitButton = document.querySelector('#blackjack-hit-button');
const standButton = document.querySelector('#blackjack-stand-button');
const dealButton = document.querySelector('#blackjack-deal-button');
dealButton.disabled = true;
standButton.disabled = true;
let wins = 0;
let losses = 0;
let draws = 0;

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];

document.querySelector('#blackjack-hit-button').addEventListener('click',playerHit);
document.querySelector('#blackjack-stand-button').addEventListener('click',standBtn);
document.querySelector('#blackjack-deal-button').addEventListener('click',resetBtn);
let winner;

function resetBtn(){
    gameDeck = [...deck];
    YOU['score'] = 0;
    DEALER['score'] = 0;
    document.getElementById(YOU['scoreSpan']).innerText = 0;
    document.getElementById(DEALER['scoreSpan']).innerText = 0;
    yourImages = document.querySelector(YOU['div']).querySelectorAll('img');
    for(image of yourImages){
        image.remove();
    }
    dealerImages = document.querySelector(DEALER['div']).querySelectorAll('img');
    for(image of dealerImages){
        image.remove();
    }
    document.getElementById(YOU['scoreSpan']).style = "color:#ffffff";
    document.getElementById(DEALER['scoreSpan']).style = "color:#ffffff";
    document.getElementById('blackjack-result').innerText="Let's Play";
    document.getElementById('blackjack-result').style = "color: black";
    hitButton.disabled = false;
    standButton.disabled = true;
    dealButton.disabled=true;

}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function standBtn(){
    hitButton.disabled = true;
    standButton.disabled = true;
    while((DEALER['score']<21)&&(YOU['score']>=DEALER['score'])){
        dealerHit();
        if((DEALER['score']===21)||(DEALER['score']===20)||(DEALER['score']===19)||(DEALER['score']===18)||(DEALER['score']===17)){
            break;
        }
        await sleep(500);
    }
    if(YOU['score']>21){
        winner="Dealer"
    }else if(YOU['score']>DEALER['score']){
        winner='You';
    }else if(DEALER['score']>21){
        winner='You'
    }else if(DEALER['score']===YOU['score']){
        winner='Draw!'
    }else{
        winner = 'Dealer';
    }
    finishGame(winner);
}

function finishGame(winner){
    if(winner==='You'){
        document.getElementById('blackjack-result').innerText=`${winner} Won!`
        document.getElementById('blackjack-result').style = "color: green";
        wins+=1;
        document.getElementById('wins').innerText=wins;
    }else if(winner==='Draw!'){
        document.getElementById('blackjack-result').innerText=winner;
        document.getElementById('blackjack-result').style = "color: yellow";
        draws+=1;
        document.getElementById('draws').innerText=draws;
    }else{
        document.getElementById('blackjack-result').innerText=`${winner} Won!`
        document.getElementById('blackjack-result').style = "color: red";
        losses+=1;
        document.getElementById('losses').innerText=losses;
    }
    dealButton.disabled=false;
}

function dealerHit(){
    blackjackHit(DEALER);
    if (DEALER['score']>21){
        document.getElementById(DEALER['scoreSpan']).innerText = "BUSTED";
        document.getElementById(DEALER['scoreSpan']).style = "color:red"; 
    }
}

function playerHit(){
    blackjackHit(YOU);
    if (YOU['score']>21){
        document.getElementById(YOU['scoreSpan']).innerText = "BUSTED";
        document.getElementById(YOU['scoreSpan']).style = "color:red";
        standBtn();
    }
    standButton.disabled = false;
}

function blackjackHit(player){
    let value = showCard(player);
    value = checkAce(player,value);
    player['score']+=value;
    document.getElementById(player['scoreSpan']).innerText = player['score'];
}

function showCard(player){
    let card = getCard();
    let cardImage = document.createElement('img');
    cardImage.src = `/static/images/Deck of Cards/${card}.jpg`;
    document.querySelector(player['div']).appendChild(cardImage);
    cardScore = getCardScore(card);
    return cardScore;
}

function getCard(){
    let index = Math.floor((Math.random() * gameDeck.length));
    let selectedCard = gameDeck[index];
    gameDeck.splice(index,1);
    return selectedCard;
}

function getCardScore(card){
    if((card==='2C') || (card==='2D') || (card==='2H') || (card==='2S')){
        return 2;
    }else if((card==='3C') || (card==='3D') || (card==='3H') || (card==='3S')){
        return 3;
    }else if((card==='4C') || (card==='4D') || (card==='4H') || (card==='4S')){
        return 4;
    }else if((card==='5C') || (card==='5D') || (card==='5H') || (card==='5S')){
        return 5;
    }else if((card==='6C') || (card==='6D') || (card==='6H') || (card==='6S')){
        return 6;
    }else if((card==='7C') || (card==='7D') || (card==='7H') || (card==='7S')){
        return 7;
    }else if((card==='8C') || (card==='8D') || (card==='8H') || (card==='8S')){
        return 8;
    }else if((card==='9C') || (card==='9D') || (card==='9H') || (card==='9S')){
        return 9;
    }else if((card==='10C') || (card==='10D') || (card==='10H') || (card==='10S')){
        return 10;
    }else if((card==='JC') || (card==='JD') || (card==='JH') || (card==='JS')){
        return 10;
    }else if((card==='QC') || (card==='QD') || (card==='QH') || (card==='QS')){
        return 10;
    }else if((card==='KC') || (card==='KD') || (card==='KH') || (card==='KS')){
        return 10;
    }else if((card==='AC') || (card==='AD') || (card==='AH') || (card==='AS')){
        return 'A';
    }
}

function checkAce(player,value){
    if(value==='A'){
        if(11+player['score']>21){
            return 1;
        }
        else{
            return 11;
        }
    }
    else{
        return value;
    }
}