import {Pencil} from "./Pencil.js"
import { Sprite } from '../base/Sprite.js';
import {DataStore} from '../base/DataStore.js';
//extends就是继承一下我们的父类Pencil，pencil是父类
export class DownPencil extends Pencil{
   constructor(top){
    const image = Sprite.getImage('pencilDown');
    super(image,top);
   }
   draw(){
     //两个铅笔在中间的距点给个死值，给定一个屏幕高度的五分之一
     let gap = DataStore.getInstance().canvas.height / 5;
     this.y = this.top + gap;
     super.draw()
   }
}