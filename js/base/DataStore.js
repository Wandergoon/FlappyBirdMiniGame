//这是一个变量缓存器,为方便我们在不同的类中访问和修改变量
export class DataStore {
 //DataStore全局只有一个,所以我们创建一个单例
 static getInstance(){
   if(!DataStore.instance){
     DataStore.instance = new DataStore();
   }
   return DataStore.instance;
  //  console.log(DataStore.instance)
 }
 //创建一个存储变量的东西
 constructor(){
   this.map = new Map();
 }
 //写几个方法
 put(key,value){
   if(typeof value == 'function'){
     value = new value();
   }
   this.map.set(key,value);
   return this;
 }
 get(key){
   return this.map.get(key);
 }
 //在方法结束的时候要把已有的图形资源全部置空
 destroy(){
   for(let value of this.map.values()){
     value = null;//置空一下
   }
 }
}