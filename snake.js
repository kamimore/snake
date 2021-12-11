const canvas=document.getElementById('canvas');
const HighestScore=document.getElementById('highest-score');
const arrowT=document.querySelectorAll('.fas');
const restart=document.querySelector('.restart');
const resume=document.querySelector('.resumeC');
const speed=document.querySelector('#speedM');

let speedv;
if(location.search!='' && location.search!='?speed' ){
  speedv=location.search.substr(7);
  speed.value=speedv;
}
else{
  speedv=1
}

speed.addEventListener('change',function(){
    //for github we have to made a change in url otherwise we donot have to add /snake into the url
  location.href=`${location.origin}/snake?speed=${speed.value}`;
  //console.log(`${location.href}/snake?speed=${speed.value}`);
  
})
manageD();

function manageD()
{
  if(window.outerWidth<=519)
  {
    document.querySelector('#main').style.width='300px'

    document.querySelectorAll('.arrowc')[1].style.paddingLeft='1.6rem'
    canvas.width='300';
    canvas.height='250';

  }
  if(window.outerWidth<=425)
  {
    document.querySelector('#main').style.width='280px'
    document.querySelectorAll('.arrowc')[1].style.paddingLeft='1.6rem'
    canvas.width='280';
    canvas.height='250';

  }
  if(window.outerWidth<=400)
  {
    document.querySelector('#main').style.width='250px'
    document.querySelector('#main').style.marginTop='-3.8rem'
    document.querySelectorAll('.arrowc')[1].style.paddingLeft='1.6rem'
    canvas.width='250';
    canvas.height='200';

  }
  if(window.outerWidth<=365)
  {
    document.querySelector('#main').style.width='200px'
    document.querySelectorAll('.arrowc')[0].style.marginTop='11rem'
    document.querySelectorAll('.arrowc')[1].style.marginTop='11rem'
    document.querySelectorAll('.arrowc')[1].style.paddingLeft='1.6rem'
    canvas.width='200';
    canvas.height='200';

  }
}

arrowT.forEach(function(value){
  value.addEventListener('click',arrowf);
});

resume.addEventListener('click',function(){
  alert('Click okay to Resume');
  
});
restart.addEventListener('click',function()
{
  location.href=location.href;
});
arrowT.forEach(function(value){
  value.addEventListener('click',arrowf);
});

const ctx=canvas.getContext("2d");
let score=document.querySelector("#score span");


let rightPressed=false;
let leftPressed=false;
let upPressed=false;
let downPressed=false;
let use=null;
let valueH;


function retrieveHscore()
{
  if(localStorage.getItem('Hscore')!=null)
  {
     valueH=JSON.parse(localStorage.getItem('Hscore'));
    HighestScore.innerText=`Highest Score is ${valueH[0]}`;
  }
}
retrieveHscore();

let snake=[{ x:110,y:100},{ x:105,y:100},{x:100,y:100}];
let food={};
let snakeW= snakeH=10;
let interval=null;
drawSnake();
moveSnake();
navigateSnake();
drawFood();

function createRandomFoodPosition(){
  const x=Math.floor(Math.random() * (canvas.width-snakeW));
  const y=Math.floor(Math.random() * (canvas.height-snakeH)) ;
  food.x=x;
  food.y=y;
}
createRandomFoodPosition();


function drawFood(){

  ctx.beginPath();
  ctx.rect(food.x,food.y,snakeW,snakeH);
  ctx.fillStyle="orangered";
  ctx.fill();
  ctx.closePath();

}

function drawSnake(){
  snake.forEach(function(rect){
    ctx.beginPath();
    ctx.rect(rect.x,rect.y,snakeW,snakeH);
    ctx.fillStyle="#9a9898";
    ctx.fill();
    ctx.closePath();
  });

}

function navigateSnake(){
document.addEventListener('keydown',(e)=>{
  if(e.key==="ArrowRight"){
    rightPressed=true;
    leftPressed=false;
    upPressed=false;
    downPressed=false;

  }
  if(e.key==="ArrowLeft"){
    rightPressed=false;
    leftPressed=true;
    upPressed=false;
    downPressed=false;

  }
  if(e.key==="ArrowUp"){
    rightPressed=false;
    leftPressed=false;
    upPressed=true;
    downPressed=false;
  }
  if(e.key==="ArrowDown"){
    rightPressed=false;
    leftPressed=false;
    upPressed=false;
    downPressed=true;
  }

});

/*document.addEventListener('keyup',(e)=>{
  if(e.key==="ArrowRight"){
    rightPressed=false;


  }
  if(e.key==="ArrowLeft"){
    leftPressed=false;

  }
  if(e.key==="ArrowUp"){
    upPressed=false;

  }
  if(e.key==="ArrowDown"){
    downPressed=false;

  }


});*/

}

function moveSnake(){
  //let direction="x";
  //let speed=1;
  let dx=snakeW;
  let dy=0;
  interval=setInterval(()=>{

    ctx.clearRect(0,0,canvas.width,canvas.height);

      //snake.x+=1;
      //snake.y+=1;
      if(downPressed){
        //direction='y';
        //speed=1
        dy=snakeW;
        dx=0;
      }
      if(rightPressed){
      //  direction='x';
        //speed=1
        dy=0;
        dx=snakeH;
      }
      if(leftPressed){
        //direction='x';
        //speed=-1;
        dy=0;
        dx=-snakeH;
      }if(upPressed){
        //direction='y';
        //speed=-1;
        dx=0;
        dy=-snakeW;
      }

const head={x:snake[0].x+dx , y:snake[0].y + dy}
snake.unshift(head);
snake.pop();
      //snake.forEach(rect=>{rect[direction]+=speed;})
      //snake[0][direction]+=speed;
      /*if(rightPressed){
        snake.x+=1;

      }
      if(leftPressed){
        snake.x+=-1;

      }if(upPressed){
        snake.y+=-1;

      }if(downPressed){
        snake.y+=1;

      }*/



      drawSnake();
      drawFood();
      let length=snake.length-3;
      score.innerHTML=length;

      collisionDetecton();

  },speedv*100);
}
function collisionDetecton(){
  //console.log("check");
  const topCollision=snake[0].y < 0;
  const bottomCollison=snake[0].y+snakeH > canvas.height;
  const leftCollision=snake[0].x < 0;
  const rightCollision=snake[0].x+snakeW > canvas.width;

  if(topCollision || bottomCollison || leftCollision || rightCollision){
    score.innerHTML=`Your Score is ${snake.length-3}`;
    score.classList.add('after');
    score.classList.remove('before');

    if(localStorage.getItem('Hscore')==null)
    {
      var arrayH=[];
      arrayH.push(snake.length-3);
      localStorage.setItem('Hscore',JSON.stringify(arrayH));
    }
    else
    {
      console.log('ccheck');
      let valueGH=JSON.parse(localStorage.getItem('Hscore'));
      console.log(valueGH);
      console.log(snake.length-3);
      console.log(valueGH[0]);
      if(valueGH[0]<snake.length-3)
      {
        console.log('c3');
      var arrayH=[];
      arrayH.push(snake.length-3);
      localStorage.setItem('Hscore',JSON.stringify(arrayH));
      HighestScore.innerText=`Highest Score is ${snake.length-3}`;

    }
      }

    alert("Game Over");
    

    clearInterval(interval);

  }
  if((snake[0].x>=food.x-8 && snake[0].x<=food.x+8 )&&
  (snake[0].y>=food.y-8 && snake[0].y<=food.y+8))
  {

    growSnake();
    createRandomFoodPosition();
  }


}

function growSnake(){
snake.push({x:food.x,y:food.y});
}


//for mobile device
function arrowf(e)
{

    if(e.target.classList.contains('right')){
      rightPressed=true;
      leftPressed=false;
      upPressed=false;
      downPressed=false;
  
    }
    if(e.target.classList.contains('left')){
      rightPressed=false;
      leftPressed=true;
      upPressed=false;
      downPressed=false;
  
    }
    if(e.target.classList.contains('up')){
      rightPressed=false;
      leftPressed=false;
      upPressed=true;
      downPressed=false;
    }
    if(e.target.classList.contains('down')){
      rightPressed=false;
      leftPressed=false;
      upPressed=false;
      downPressed=true;
    } 

}