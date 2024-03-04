class WalkingEye{               
     constructor(){          
     this.img= imgEye[3];   
     this.w =this.img.width/15; 
     this.h =this.img.height/15; 
     this.x =80;              
     this.y =height-this.h;   
     this.vy=0;               
     this.gravity = 0.9;        
     }  

  jump(){                     
  if(this.y ==height-this.h){ //Only with Walkingeye's feet on the ground could they jump. Otherwise, it can jump in midair
     this.vy= -21;            
    }
  }

  move(){                                       
  this.y += this.vy;                           
  this.vy += this.gravity;                      
  this.y = constrain(this.y, 0, height-this.h); // Keep the walkingeye in the vertical direction and within the range of the screen
  }

  show(){                                       
     image(this.img,this.x,this.y-20,this.w*1.5,this.h*1.5);  
  }
  
  update(){
     if(cled==0){//If there is no collision
       if(this.y<height-100){//And walkingeye off the ground
         this.img = imgEye[2];//iamge 2 shows the jump
         }
       else {// If the dinosaur hadn't left the ground
          this.img = imgEye[index%2+3];//Make the walkingeye show as walking in figures 3 and 4
       } 
     }  
     else if (cled==1){ //If there's a collision
       this.img = imgEye[5];//image 5 shows walkingeye as colliding
     }
  }
  
  hits(hands){//Define a collision detection method for the walkingeye class
  return collideRectRect(this.x, this.y, this.w, this.h, hands.x, hands.y, hands.w, hands.h); // Returns the logical value of the detection result of whether two rectangles collide, true with collision and false without collision
  }
  
  addScore(obstacle){                                              // Define the scoring method for the class
      if((obstacle.x+obstacle.w<this.x)&&(obstacle.score==0)&&(cled==0)){ // If the right part of an obstacle is to the left of the walkingeye, and the walkingeye has not passed the obstacle before, and there is no collision
         obstacle.score=1;                                          //Giving the obstacle a score of 1 means the walkingeye has already passed the obstacle and is no longer scoring
         score+=1;                                                 //or +1 score
      }
   }
}
  