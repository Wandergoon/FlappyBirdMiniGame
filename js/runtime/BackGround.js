import {Sprite} from '../base/Sprite.js';
import {DataStore} from '../base/DataStore.js';
//我们直接从sprite中继承一个基类,然后在构造方法中传一些参数就已经把我们初始化的数据独立出来了
export class BackGround extends Sprite{
    constructor(){
      const image = Sprite.getImage('background');
      super(image,
        0,0,
        image.width,image.height,
        0,0,
        DataStore.getInstance().canvas.width,DataStore.getInstance().canvas.height);
    }
}