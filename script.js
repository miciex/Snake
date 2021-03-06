var snake1 = document.querySelector('#snake1')
var snake2 = document.querySelector('#snake2')
var snake3 = document.querySelector('#snake3')
var snakeC = document.querySelector('#wrapperSnake')
var boardC1 = document.querySelector('#boardColor1')
var boardC2 = document.querySelector('#boardColor2')
var boardC3 = document.querySelector('#boardColor3')
var boardC = document.querySelector('#wrapperBoard')
var boardB = document.querySelector('#wrapperBig')
var rangeB = document.querySelector('#range')
var submitB = document.querySelector('#submit')
var start = false;
var element =[];
var canvas = document.querySelector('#canvas');
var canvasContext = canvas.getContext('2d');
var elementHeight = 98;
var elementWidth = 98;
var BasedX = 401;
var BasedY = 401;
var velocityX = 100;
var velocityY = 100;
var countElements = 3;
var side;
var block = 0;
var fruit;
var points = 0;
var wherefruit = [];
var snakeColorTab=['white', 'yellowgreen', 'lightskyblue'];
var snakeColor;
var boardColorTab=['darkblue', 'violet', 'darkgrey'];
var boardColor;
var boardsize;

t=0


snake1.addEventListener('click',()=>{snakeColor = 'white'; snakeC.remove(); boardC.style.display = "flex"})
snake2.addEventListener('click',()=>{snakeColor = 'yellowgreen'; snakeC.remove(); boardC.style.display = "flex";})
snake3.addEventListener('click',()=>{snakeColor = 'lightskyblue'; snakeC.remove(); boardC.style.display = "flex";})
boardC1.addEventListener('click',()=>{boardColor = 'violet'; boardC.remove(); boardB.style.display = "flex"})
boardC2.addEventListener('click',()=>{boardColor = 'darkblue'; boardC.remove(); boardB.style.display = "flex"})
boardC3.addEventListener('click',()=>{boardColor = 'darkgray'; boardC.remove(); boardB.style.display = "flex"})
submitB.addEventListener('click', ()=>{boardsize = parseInt(rangeB.value);boardB.remove();canvas.width = boardsize*100; canvas.height = boardsize*100;start = true;})


function calculateMousePos(evt){
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var MouseY = evt.clientY - rect.top - root. scrollTop;
    return{
        x: mouseX,
        y: MouseY
    }
}

function handleMouseClick(evt){
    if(snakeInMap()==true||snakeCollideItself()==true){
        location.reload();
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

    window.onload  = function(){    
        var framesperSecond = 10;
        
            
            setInterval(()=>{board();showElements();console.log('fr')}, 1000/framesperSecond);
        }  


function Rect(x, y, width, height, color){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.draw =function(){
        canvasContext.fillStyle = color;
        canvasContext.fillRect(this.x, this.y, this.width, this.height);
    }
}

function board(){
if(start&&t==0&&boardsize>9){
    for(let i = 0; i<boardsize; i++){
        for(let j = 0; j<boardsize; j++){
            var n = new Rect(i*100+1, j*100+1, 98, 98, boardColor)
            n.draw();
            t++;
        } 
    }
}
}

function addElement(x, y,n){
    element.push(new Rect(x, y, elementWidth, elementHeight, snakeColor));
    element[n].draw();
    
}

function addElementToMove(x, y){
    element.unshift(new Rect(x, y, elementWidth, elementHeight, snakeColor));
    
}

function showElementToMove(x,y,n){
    addElementToMove(x,y);
    element[n].draw();
}

function removeLastElement(){
    canvasContext.clearRect(element[element.length-1].x,element[element.length-1].y, elementWidth,elementHeight)
    var bg =new Rect(element[element.length-1].x,element[element.length-1].y, 98,98, boardColor);
    bg.draw();
    element.pop();
    
}

function showElements(){
    if(start==true){
    if(element.length<countElements&&block==0){
    for(let i = 0; i<=countElements; i++){
        if(element.length==0){
            addElement(BasedX, BasedY, i);
            var eye1 = new Rect(element[0].x+70, element[0].y+10,10,10,'black')
            var eye2 = new Rect(element[0].x+70, element[0].y+80,10,10,'black')
            eye1.draw()
            eye2.draw()
        }
        else{
            addElement(element[element.length-1].x-100, element[element.length-1].y, i)
        }
    }
    addFruit();
    block++;
}
    moveElements();
}
}   

function moveElements(){
    snakeCollideItself();
    snakeInMap();
    if(snakeInMap()==false&&snakeCollideItself()==false){
    var where = whereToMove();
    //console.log(where);
    if(where==39){
        removeLastElement()
        console.log(element[0]);
        showElementToMove(element[0].x+100, element[0].y, 0)
        grow();
        var eye1 = new Rect(element[0].x+70, element[0].y+10,10,10,'black')
        var eye2 = new Rect(element[0].x+70, element[0].y+80,10,10,'black')
        eye1.draw()
        eye2.draw()
        for(i = 1; i<element.length; i++){
            element[i].draw()
        }
        
    }
    if(where==37){
        removeLastElement()
        console.log(element[0]);
        showElementToMove(element[0].x-100, element[0].y, 0)
        grow();
        var eye1 = new Rect(element[0].x+30, element[0].y+10,10,10,'black')
        var eye2 = new Rect(element[0].x+30, element[0].y+80,10,10,'black')
        eye1.draw()
        eye2.draw()
        for(i = 1; i<element.length; i++){
            element[i].draw()
        }
        
    }
    if(where==38){
        removeLastElement()
        console.log(element[0]);
        showElementToMove(element[0].x, element[0].y-100, 0)
        grow();
        var eye1 = new Rect(element[0].x+10, element[0].y+20,10,10,'black')
        var eye2 = new Rect(element[0].x+80, element[0].y+20,10,10,'black')
        eye1.draw()
        eye2.draw()
        for(i = 1; i<element.length; i++){
            element[i].draw()
        }
    }
    if(where==40){
        removeLastElement()
        console.log(element[0]);
        showElementToMove(element[0].x, element[0].y+100, 0)
        grow();
        var eye1 = new Rect(element[0].x+10, element[0].y+80,10,10,'black')
        var eye2 = new Rect(element[0].x+80, element[0].y+80,10,10,'black')
        eye1.draw()
        eye2.draw();
        for(i = 1; i<element.length; i++){
            element[i].draw()
        }
    }
   
    
    fruit.drawFruit();
    }
    else showGameOverScreen();
    
}

function whereToMove(){
     
    window.addEventListener('keydown', function(evt){
        switch(evt.keyCode){
            case 37: if(side!=39){side = 37}; break;
            case 38: if(side!=40){side = 38}; break;
            case 39: if(side!=37){side = 39}; break;
            case 40: if(side!=38){side = 40}; break;
        }
    })
    return side;
}

function Fruit(){
    this.x = getRandomInt(0,9)*100+50;
    this.y = getRandomInt(0,9)*100+50;
    this.width = 50;
    this.height = 50;
    this.r = 25;
    this.color = 'red';
    this.drawFruit=function(){
        canvasContext.beginPath();
        canvasContext.arc(this.x ,this.y, this.r, 0, Math.PI*2, false);
        canvasContext.fillStyle = this.color;
        canvasContext.fill();
        
    }
}

function addFruit(){
    //while(true){
    //deleteFruit();
    fruit = new Fruit();
    fruit.drawFruit();
    //if(isCollide(fruit, element[0])==false) break;
    //}
}

function deleteFruit(){
    fruit = "";
    canvasContext.clearRect(element[element.length-1].x,element[element.length-1].y, elementWidth,elementHeight);
    var bg =new Rect(element[0].x,element[0].y, 98,98, boardColor);
    bg.draw();
}

function isCollide(a, b) {
    return !(
        ((a.y + a.height) < (b.y)) ||
        (a.y > (b.y + b.height)) ||
        ((a.x + a.width) < b.x) ||
        (a.x > (b.x + b.width))
    );
}

function grow(x,y){
    if(isCollide(fruit, element[0])){
        deleteFruit();
        addFruit();
        points++;
        //console.log(points)
        addElement(element[element.length-1].x, element[element.length-1].y, element.length-1)
        for(segment in element){
            element[segment].draw();
        }
        
    }
}

function snakeCollideItself(){
    for(i = 1; i<element.length; i++){
        if(isCollide(element[0], element[i])){
            //location.reload();
            return true;
        }
    }
    return false;
}

function snakeInMap(){
    if(element[0].x<0||element[0].x>canvas.width-100||element[0].y<0||element[0].y>canvas.width-100){
        //location.reload();
        return true;
    }
    return false;
}

function showPoints(x,y, color){
    canvasContext.font = "32px Arial";
    canvasContext.fillStyle = color;
    canvasContext.fillText("You got: "+ points+" points!", x, y);
}

function playAgain(x,y, color){
    canvasContext.font = "50px Arial";
    canvasContext.fillStyle = color;
    canvasContext.fillText("Play again!", x, y);
}

function showGameOverScreen(){
    var end = new Rect(200, 200, 600, 600, 'blue');
    end.draw();
    showPoints(370, 400, 'black');
    playAgain(375, 500);
    canvas.addEventListener('mousedown', handleMouseClick)
}

// function chooseSnakeColor(){

// }