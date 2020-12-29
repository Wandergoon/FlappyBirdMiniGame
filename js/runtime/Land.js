import {Sprite} from '../base/Sprite.js';
import { Director } from '../Director.js';
import {DataStore} from '../base/DataStore.js';
export class Land extends Sprite {
//我们直接从sprite中继承一个基类,然后在构造方法中传一些参数就已经把我们初始化的数据独立出来了

    constructor(){
      const image = Sprite.getImage('land');
      super(image,0,0,
        image.width,image.height,
        0,DataStore.getInstance().canvas.height - image.height,
        image.width,image.height);
        //地板的水平变化坐标
        this.landX = 0;
        //地板的移动速度
        this.landSpeed = 2;
        this.landSpeed = Director.getInstance().moveSpeed;
          }
    draw(){
      this.landX = this.landX + this.landSpeed;
      if(this.landX > (this.img.width -DataStore.getInstance().canvas.width)){
        this.landX = 0;//避免穿帮,
      }
      super.draw(this.img,
        this.srcX,
        this.srcY,
        this.srcW,
        this.srcH,
        -this.landX,
        this.y,
        this.width,
        this.height
        )
    }
}
