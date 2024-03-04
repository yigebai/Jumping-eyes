class UI{
  constructor(_name){ 
    this.name= _name
    this.x
    this.y
  }
  name(_x,_y){
    this.x=_x;
    this.y=_y;
    text(_name,this.x, this.y)
  }
}
class Gravity extends UI{
  constructor(_name){
    super(_name)
  }
  show(){
    
  }
}