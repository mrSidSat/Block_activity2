const grid = document.getElementById("grid");
const gridWidth = 500;
const gridHeight = 500;
const appleBoxes = [];
const characters = [];
const movements = [[20,10],[-20,-10]];
let numberOfApples = 10;
const appleLogo = "public/apple.jpg";
var interval;
let speed0 = 1000,speed1 = 1500;

//user instructions
const instructions = document.createElement('div');
instructions.classList.add('instructions');
instructions.innerHTML = "Construct the block and click on \"Run Blocks\"";
grid.appendChild(instructions);

//apple grid
class applebox{
    constructor(logo,leftoffset,topoffset){
        this.logo = logo;
        this.topLeft = [leftoffset,topoffset];
        this.topRight = [leftoffset + 50,topoffset];
        this.bottomLeft = [leftoffset,topoffset + 50];
        this.bottomRight = [leftoffset+50,topoffset + 50];
    }
}

//fill the grid
for(let i=0;i<10;i++)
{
    for(let j=0;j<10;j++)
    {
        const appbox = new applebox(appleLogo,i*50,j*50);
        const appboxdiv = document.createElement('div');
        appboxdiv.classList.add("applebox");
        appboxdiv.style.left = appbox.topLeft[0] +'px';
        appboxdiv.style.top = appbox.topLeft[1] + 'px';
        appleBoxes.push(appbox);
        grid.appendChild(appboxdiv);
    }
}

//fill apples
function fillApples(){
    for(let i = 0;i<numberOfApples;)
    {
        let temp = Math.floor(Math.random() * appleBoxes.length);
        if(grid.children[temp].innerHTML == "")
        {
            grid.children[temp].style.backgroundImage = "url(" + appleLogo + ")";
            i++;
        }
    }
}


//characters class
class character{
    constructor(url,name,x,y){
        this.name = name;
        this.logo = url;
        this.topLeft = [x,y];
        this.score = 0;
    }
}

//create characters
function createCharacter(url,name,left,top){
    const chara = new character(url,name,250,250);
    const character1 = document.createElement('div');
    character1.classList.add("character");
    character1.style.left = left + "px";
    character1.style.top = top + "px"
    character1.style.backgroundImage = "url(" + url + ")";
    characters.push(chara);
    grid.appendChild(character1);
}

//move function
function move0(){
    for(let i =0;i<characters.length;i++)
    {
        
        checkGame();
        checkApples(0);
        checkBorder(0);
        characters[0].topLeft[0] += movements[0][0];
        characters[0].topLeft[1] += movements[0][1];
        let temp = grid.getElementsByClassName("character")[0];
        temp.style.left = characters[0].topLeft[0] + "px";
        temp.style.top = characters[0].topLeft[1] + "px";
    }
}
function move1(){
        checkGame();
        checkApples(1);
        checkBorder(1);
        characters[1].topLeft[0] += movements[1][0];
        characters[1].topLeft[1] += movements[1][1];
        let temp = grid.getElementsByClassName("character")[1];
        temp.style.left = characters[1].topLeft[0] + "px";
        temp.style.top = characters[1].topLeft[1] + "px";
}

//check Border Condition
function checkBorder(i){
    
    if(gridWidth - (characters[i].topLeft[0] + 100) < 20 ||
        characters[i].topLeft[0] <=10
    )
    {
        movements[i][0] *= - 1;
        movements[i][1] *=  1;
    }
    else if(gridHeight - (characters[i].topLeft[1] + 100) < 20 ||
    characters[i].topLeft[1] <=10
    )
    {
        movements[i][0] *= 1;
        movements[i][1] *= -1;
    }
}

//check for contact with apples
function checkApples(j){
    for(let i=0;i<appleBoxes.length;i++)
    {
        if(
            (((appleBoxes[i].topLeft[0] >= characters[j].topLeft[0]) &&
             (appleBoxes[i].topLeft[0] <= characters[j].topLeft[0] + 100) && 
             (appleBoxes[i].topLeft[1] >= characters[j].topLeft[1]) && 
             (appleBoxes[i].topLeft[1] <= characters[j].topLeft[1] + 100)) ||
             ((appleBoxes[i].topRight[0] >= characters[j].topLeft[0]) &&
             (appleBoxes[i].topRight[0] <= characters[j].topLeft[0] + 100) && 
             (appleBoxes[i].topRight[1] >= characters[j].topLeft[1]) && 
             (appleBoxes[i].topRight[1] <= characters[j].topLeft[1] + 100)) ||
             ((appleBoxes[i].bottomLeft[0] >= characters[j].topLeft[0]) &&
             (appleBoxes[i].bottomLeft[0] <= characters[j].topLeft[0] + 100) && 
             (appleBoxes[i].bottomLeft[1] >= characters[j].topLeft[1]) && 
             (appleBoxes[i].bottomLeft[1] <= characters[j].topLeft[1] + 100)) ||
             ((appleBoxes[i].bottomRight[0] >= characters[j].topLeft[0]) &&
             (appleBoxes[i].bottomRight[0] <= characters[j].topLeft[0] + 100) && 
             (appleBoxes[i].bottomRight[1] >= characters[j].topLeft[1]) && 
             (appleBoxes[i].bottomRight[1] <= characters[j].topLeft[1] + 100))) &&
             grid.getElementsByClassName("applebox")[i].style.backgroundImage != ""
        )
        {
            const temp = grid.getElementsByClassName('applebox')[i];
            temp.classList.remove('applebox');
            numberOfApples--;
            appleBoxes.splice(i,1);
            characters[j].score++;
            updatescore();
        }
    }
}

//check game over
function checkGame() {
    if(numberOfApples <=1)
    {
        endGame();
    }
}

//Trigger movement
function startGame(){
    interval = setInterval(move0,speed0);
    interval = setInterval(move1,speed1);
}

//Stop movement
function endGame(){
    displayWinner();
    clearInterval(interval);
}

//inject scoreboard
function injectScoreBoard(){
    const ele = document.createElement('div');
    ele.classList.add("scoreboard");
    grid.appendChild(ele);
    const scoreTile1 = document.createElement('div');
    const scoreTile2 = document.createElement('div');
    scoreTile1.classList.add("scoreboardTiles");
    scoreTile2.classList.add("scoreboardTiles");
    ele.appendChild(scoreTile1);
    ele.appendChild(scoreTile2);
    updatescore();
    
}

// updatescore
function updatescore(){
    const elet = document.getElementsByClassName("scoreboardTiles");
    for(let i=0;i<characters.length;i++)
    {
        elet[i].innerHTML = "" + characters[i].name + " : " + characters[i].score;
    }
} 

//call obj
const obj={
    character1:"",
    character2:"",
    speed1:"",
    speed2:"",
    numberOfApples:""
}

// startGame();
function startSimulation(){
    createCharacter("public/" + obj.character1 + ".jpg",obj.character1,250,250);
    createCharacter("public/"+ obj.character2 +".jpg",obj.character2,250,250);
    numberOfApples = obj.numberOfApples;
    speed0 = Math.floor(parseFloat(10000/parseInt(obj.speed1)));
    speed1 = Math.floor(parseFloat(10000/parseInt(obj.speed2)));
    grid.removeChild(instructions);
    injectScoreBoard();
    fillApples();
    startGame();
}

//
function displayWinner(){
    if(characters[0].score > characters[1].score){
        document.getElementsByClassName('winner')[1].innerHTML = "Player1 wins";
    }
    else document.getElementsByClassName('winner')[1].innerHTML = "Player2 wins";
}


