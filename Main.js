//初始化整个游戏的精灵,作为游戏的入口
import {ResourceLoader} from "./js/base/ResourceLoader.js";
import {BackGround} from "./js/runtime/BackGround.js";
import {DataStore} from './js/base/DataStore.js';
import {Director} from './js/Director.js';
import {Land} from './js/runtime/Land.js';
import {Birds} from './js/player/Birds.js';
import {StartButton} from './js/player/StartButton.js';
import {Score} from './js/player/Score.js';
import { ApiExamples } from "./js/runtime/ApiExamples.js";



export class Main {
    constructor() {
        // console.log("START NOW!");
        // new ResourceLoader();
        this.canvas = wx.createCanvas();
        // this.canvas = document.getElementById('game_canvas');//不能使用BOM类的
        this.ctx = this.canvas.getContext('2d');
        //先在这里初始化dataStore
        this.dataStore =DataStore.getInstance();
        this.director = Director.getInstance();
        const loader = ResourceLoader.create();
        loader.onLoaded(map => this.onResourceFirstLoaded(map));
        // Director.getInstance();
        let image = wx.createImage();
        image.src = '../FlappyBirdWeb/res/background.png';
        let self = this;
        image.onload = () => {
            self.ctx.drawImage(
                image,
                0,
                0,
                image.width,
                image.height,
                0,
                0,
                image.width,
                image.height
            )
        }
       
    }
    //创建背景音乐
    createBackgroundMusic(){
        const bgm = wx.createInnerAudioContext()
        bgm.autoplay = true;
         bgm.loop = true;
         bgm.src = '../FlappyBirdWeb/audios/bgm.mp3';
    }
    onResourceFirstLoaded(map){
        //给DataStore附一个永远不变的值
        this.dataStore.canvas = this.canvas;
        this.dataStore.ctx = this.ctx;//
        this.dataStore.res= map;
        //游戏第一次结束的时候调用背景音乐
        this.createBackgroundMusic();
        //api测试
        const examples = new ApiExamples();
        // examples.getUserInfo();
        examples.login();
        examples.getSettings();
        examples.socketExample();
        examples.download();
        // console.log(map);
        //在这里初始化background
        //map.get()是es6特有的,通过get获取元素的值
        this.init();
       
    }
    init(){
        //首先重置游戏是没有结束的
        this.director.isGameover = false;//赋给了导演的单例变量
        this.dataStore
            // .put('background',
            // new BackGround(this.ctx,this.dataStore.res.get('background'))
            .put('pencils',[])
            .put('background',BackGround)
            .put('land',Land)
            .put('birds',Birds)
            .put('startButton',StartButton)
            .put('score',Score)
            
            
            // )
        // let background = new BackGround(this.ctx,
        //                      map.get('background'));
        // //背景的渲染工作
        // background.draw();
        //注册事件
        this.registerEvent();
        //创建铅笔要在游戏逻辑运行之前
        this.director.createPencil();
               //初始化以后只需要
        this.director.run();
    }
    registerEvent(){
        // //注册事件
        // this.canvas.addEventListener('touchstart',e => {
        //    //屏蔽掉JS的事件冒泡
        //     e.preventDefault();
        //     if(this.director.isGameover){
        //         console.log('重新开始')
        //         //如果游戏结束了，重新初始化一下
        //         this.init();
        //     }else{
        //         this.director.birdsEvent();
        //     }
        // })
        wx.onTouchStart(()=>{
            if(this.director.isGameover){
                            console.log('重新开始')
                            //如果游戏结束了，重新初始化一下
                            this.init();
                        }else{
                            this.director.birdsEvent();
                        }
        })
    }

   

}