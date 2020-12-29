//资源文件加载器,确保canvas在图片资源加载完成之后才进行渲染
import {Resources} from "./Resources.js";

export class ResourceLoader {
    constructor() {
        //我们直接把Resources 这个数组塞进map中,map就拥有了resources 的数据
        this.map = new Map(Resources);
        console.log(this.map)
        for (let [key,value] of this.map) {
            console.log(key);
            const image = wx.createImage();
            image.src = value;
            this.map.set(key,image);
        }
    }

    //写一个加载全部结束的方法,回调
    onLoaded(callback){
        let loadedCount = 0;
        for(let value of this.map.values()){
            //这样可以讲map的所有的value值都遍历出来,不用管key
            value.onload = () => {
                //注意这个es6中关于箭头函数的指向性的使用,不穿参的情况下this总是指向外部的实例对象的
                loadedCount++;
                if(loadedCount >= this.map.size){
                    callback(this.map);
                }
            }
        }
    }

    static create(){
        return new ResourceLoader();
    }
}