import { Sprite } from '../base/Sprite.js';
import { DataStore } from "../base/DataStore.js";
// import { Director } from '../Director.js';
//铅笔的基类
export class Pencil extends Sprite {

   constructor(image,top){
      
        super(image,
         0,0,
         image.width,image.height,
         //刚好在右侧看不到的位置
         // window.innerWidth,0,
         DataStore.getInstance().canvas.width,0,
         image.width,image.height);
         this.top = top;
         this.moveSpeed = 2;
        }
         draw(){
            //在这里我们定义一个速度，让x不断减2,这样就和地板的移动速度统一了，因为地板每次是向左移动2的速度，那铅笔就要和地板的移动速度一致
            this.x = this.x - this.moveSpeed;
            // this.x = this.x - Director.getInstance().landSpeed;
            //重写一下父类的draw方法
            super.draw(this.img,
               0,0,
               this.width,this.height,
               this.x,this.y,
               this.width,this.height);
         }
     }
   
