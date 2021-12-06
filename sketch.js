let cardWidth=75
let cardHeight=75
let margin=20
let card=-1
let milli =1000
let sons=[ ]
let images=[ ]
let visibles=[ false,false,false,false,false,false,false,false,false,false,false,false]
let shuffled=[1,2,3,4,5,6,7,8,9,10,11,12 ]
function preload(){ 
 
  
  shuffled=shuffle(shuffled)
  for(let i = 0; i < shuffled.length;i++){
    images.push(getImage(shuffled[i]))
    sons.push(loadSound("Audios/"+shuffled[i]+".mp3"))
  }
  }
function getImage(num){ 
  url="imagens/"+num+".png"
  return loadImage(url)
}

function playSound(num){
  sons[num].play()
 }    











function setup(){




  createCanvas(400, 400);
}

function draw() {
  background(220);
  
 for (let i=0;i<shuffled.length;i++){
  
  y=Math.floor(i/4 ) 
 x=i%4  
   if (visibles[ i]){
  image( images[i] ,positionX(x),positionY(y),cardWidth+25,cardHeight) 

 } 
 else{
   rect(positionX(x),positionY(y),cardWidth,cardHeight)
 }  
   
}  
}  
function mouseClicked(){
for(let i=0;i<shuffled.length;i++){
  y=Math.floor(i/4 ) 
 x=i%4
  if(positionX(x)<mouseX&&positionX(x)+cardWidth>mouseX){
       
     if(positionY(y)<mouseY&&positionY(y)+cardHeight>mouseY){  
        playSound(i);        
       if(card>-1){
   card1=shuffled    [card] 
  card2=shuffled    [i] 
          // se cliquei em cartas diferentes...
if(card1 != card2 && !visibles[i]){
    // se card1 é par...
    if(card1 % 2 == 0) {
        if(card1 - 1 == card2){
            console.log('ACHOU!!')
          visibles[i] = true
          card=-1
        } else {
            // não deu match...
            visibles[i] = true
            // esperar um tempinho
      sleep(milli).then(function() {
      
          visibles[i] = false
            visibles[card] = false
            card = -1
        })
        }
    } else { // card1 é impar...
        if(card2 - 1 == card1){            
            console.log('ACHOU!!')
          card=-1
          
          visibles[i] = true
        } else {
            // não deu match...
            visibles[i] = true
            // esperar um tempinho
     sleep(milli).then(function() {

            visibles[i] = false
            visibles[card] = false
            card = -1
       
      })
        }
    }
}
          
            } else {card=i
   visibles[i] = true       
            }             
        
    }
 }      
}
}
  
function positionX(position){   
  return margin+position*(cardWidth+margin)
          
   }
function positionY(position){
  return margin+position*(cardHeight+margin)
  }
function sleep(millisecondsDuration)
{
  return new Promise((resolve) => {
    setTimeout(resolve, millisecondsDuration);
  })
}