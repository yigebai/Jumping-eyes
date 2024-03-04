class Hand{                 
     constructor(){           
       this.img= imgHands[int(random(1,8))];
       //Define the image of the class and set its initial value to a random one of the 8 images
       this.w=this.img.width/2;    
       this.h=this.img.height/2;            
       this.x= width;          
       this.y= height -this.h; 
       this.score =0;  
       this.speed=(level-1)*4+8;
     }
  move(){                              
   this.x -=this.speed;

  }
  show(){                             
   image(this.img,this.x,this.y+5 ,this.w,this.h);;  
  }
}