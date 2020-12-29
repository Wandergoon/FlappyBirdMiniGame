import {Pencil} from "./Pencil.js"
import { Sprite } from "../base/Sprite.js"
//extends就是继承一下我们的父类Pencil，pencil是父类
export class UpPencil extends Pencil{
   constructor(top){
      const image = Sprite.getImage('pencilUp');
      super(image,top)
   }
   draw(){
     this.y = this.top - this.height;
     super.draw();
   }
}