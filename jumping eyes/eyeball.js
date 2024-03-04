class Eyeball{                                    
    constructor(){                           
       this.img= imgEyeball[1];                   //Define the image of the class and set its initial value to iamge 1
      this.w= this.img.width;             //Define the width and height of the class and set the width and height values to both 1.5 times the width and height of its image
      this.h= this.img.height;           
       this.x= width;                          
       this.y= random(2*height/3,5*height/6);  
      this.score =0;    //Define the class score, setting the initial value to 0, to record whether the walkingeye passed the eyeball
      this.speed=(level-1)*3+9;
     }

     move(){               
        this.x -=this.speed;        //So that the eyeball has a horizontal displacement, always moving to the left at a fixed speed
     }

     show(){                                                  
        image(imgEyeball[index%2+1],this.x,this.y,this.w,this.h); //Displays a picture of the current eyeballs
     }

     update(){                         
        this.img = imgEyeball[index%2+1]; //Make the eyeball picture alternate between image 3 and image 4
     } 
}