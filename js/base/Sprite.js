//精灵的基类,负责初始化精灵加载的资源和大小以及位置
import {DataStore} from './DataStore.js';
export class Sprite {
  //es6里面有一个特性----可以给我们的参数赋一个默认值,也就是说当我们传参的时候忘记把这个参数赋值的时候,没有关系,es6会把等号右侧的参数值作为默认值赋值给我们的参数.
  //这个特性可以让我们给特别长的参数后面先赋一个默认值,保证我们的程序不崩溃
  constructor(
              img = null,
              srcX = 0,//我们要剪裁的X坐标
              srcY = 0,//我们要剪裁的Y坐标
              srcW = 0,//我们要剪裁的宽度
              srcH = 0,//我们要剪裁的高度
              x = 0, y = 0,//我们的图形资源在canvas上的摆放位置,以图形的左上角位置为零点坐标
              width = 0,//剪裁完要使用的宽度和高度
              height = 0,
    ){
      //我们把这些值都赋到类的原型链上
      this.dataStore = DataStore.getInstance();
      this.ctx = this.dataStore.ctx;
      this.img = img;
      this.srcX = srcX;
      this.srcY = srcY;
      this.srcW = srcW;
      this.srcH = srcH;
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;    
  }

  static getImage(key){
    return DataStore.getInstance().res.get(key);
  }

  draw (img = this.img,
        srcX = this.srcX,
        srcY = this.srcY,
        srcW = this.srcW,
        srcH = this.srcH,
        x = this.x,
        y= this.y,
        width = this.width,
        height = this.height
        ){
    this.ctx.drawImage(
      img,
      srcX,
      srcY,
      srcW,
      srcH,
      x,
      y,
      width,
      height
    )
  }
}