//导演类.控制游戏的逻辑
import {DataStore} from './base/DataStore.js';
// import {Land} from '../js/runtime/Land.js';
import { UpPencil } from './runtime/UpPencil.js';
import { DownPencil} from './runtime/DownPencil.js';
import { Score } from './player/Score.js';
export class Director {
  
  static getInstance(){
    if(!Director.instance){
      Director.instance = new Director();
    }
    return Director.instance;
  }
      constructor (){
     //拿到DataStore,还是在本代码最上面直接import from引入就行
     this.dataStore = DataStore.getInstance();
     //在director里面把speed初始化进去
     this.moveSpeed = 2;

  }
  createPencil(){
    const minTop = DataStore.getInstance().canvas.height / 8;
    // const minTop = window.innerHeight / 8;
    const maxTop = DataStore.getInstance().canvas.height / 2;
    // const maxTop = window.innerHeight / 2;
    const top = minTop + Math.random() * (maxTop - minTop);
    this.dataStore.get('pencils').push(new UpPencil(top));
    this.dataStore.get('pencils').push(new DownPencil(top));
  }
  //
  birdsEvent(){
  for(let i = 0;i <=2;i++){
    this.dataStore.get('birds').y[i] = this.dataStore.get('birds').birdsY[i];

  }
  this.dataStore.get('birds').time = 0;
  }
  //
  static isStrike(bird,pencil){
let s = false;
if(bird.top > pencil.bottom || 
   bird.bottom < pencil.top ||
   bird.right < pencil.left ||
   bird.left > pencil.right
   ){
     s = true
   }
   return !s;
  }
//判断小鸟是否撞击地板和铅笔
check(){
  const birds = this.dataStore.get('birds');
  const land = this.dataStore.get('land');
  const pencils = this.dataStore.get('pencils');
  const score = this.dataStore.get('score');
  //地板的撞击判断
  if(birds.birdsY[0] + birds.birdsHeight[0] >= land.y){
    // console.log('撞击地板啦')
    this.isGameover = true;
  }
  //创建小鸟的边框模型
  const birdsBorder ={
top: birds.y[0],
bottom: birds.birdsY[0] + birds.birdsHeight[0],
left: birds.birdsX[0],
right: birds.birdsX[0] + birds.birdsWidth[0]
  }
  //
  const length = pencils.length;
  for(let i = 0; i < length; i++){
    //意味着我们要对每一只铅笔进行建模
    const pencil = pencils[i];
    const pencilBorder = {
      top: pencil.y,
      bottom: pencil.y + pencil.height,
      left: pencil.x,
      right: pencil.x + pencil.width
    };
    if(Director.isStrike(birdsBorder,pencilBorder)){
      console.log('撞到铅笔了');
      this.isGameover = true;
      return;
    }
  }
  //加分逻辑
  if(birds.birdsX[0] > pencils[0].x + pencils[0].width
    && score.isScore){
      //震动
      wx.vibrateShort({
        success:function(){
          console.log('震动成功')
        }
      })
    score.isScore = false;  
    score.scoreNumber++;
  }
}
  run(){
    this.check();
    if(!this.isGameover){
      this.dataStore.get('background').draw();
      const pencils = this.dataStore.get('pencils');
      //取第一组的第一个铅笔作为代表
      if(pencils[0].x + pencils[0].width <= 0 && pencils.length === 4){
       pencils.shift();//把数组的第一个元素推出数组，并把数组的个数减一
       pencils.shift();
       this.dataStore.get('score').isScore = true;
      }
      //创建下一组高度随机的铅笔，我们的pencils.1 9
      if(pencils[0].x <= (DataStore.getInstance().canvas.width
       - pencils[0].width) / 2 && pencils.length === 2){
        this.createPencil();
      }
      
      this.dataStore.get('pencils').forEach(function(value){
        value.draw();
      })
      // const backgroundSprite = this.dataStore.get('background');
     
      this.dataStore.get('land').draw();
      this.dataStore.get('score').draw();
      this.dataStore.get('birds').draw();
      
      //此处使用了箭头函数可以保证我们永远是指向外面这个类的,而避免出现this的指向性错误
     //requestAnimationFrame() (1) 一般是用于动画的,它的刷新的频率是由浏览器决定的,在每一次的浏览器的刷新帧率之前执行 (2)性能是远远高于setTimeout和setTimeInterval的
     let timer = requestAnimationFrame( ()=> this.run());
     this.dataStore.put('timer',timer);
      
      // cancelAnimationFrame(this.dataStore.get('timer'));//保证浏览器不占用额外的线程去进行无线的循环
    }else {
      this.dataStore.get('startButton').draw();
      cancelAnimationFrame(this.dataStore.get('timer'));
      this.dataStore.destroy();
      //触发微信小游戏垃圾回收机制
      wx.triggerGC();
    }

  }
}