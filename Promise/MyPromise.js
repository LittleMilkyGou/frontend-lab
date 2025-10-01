const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

//es6 Class method
class MyPromise{
  #state = PENDING; //default state
  #result = undefined; //default result

  constructor(executor){
    try{
      executor(
        (data) => this.resolve(data), //The first parameter of Promise executor: resolve function
        (reason) => this.reject(reason)  // The second parameter of Promise executor: reject function 
      );
    }catch(err){
      this.reject(err);
    }
  }

  resolve(data){
    this.#changeState(FULFILLED, data);
  }
  reject(reason){
    this.#changeState(REJECTED, reason);
  }

  #changeState(state, result){
    //Once the state has changed, it cannot be changed again
    if (this.#state !== PENDING) return;

    this.#state = state;
    this.#result = result;

    console.log(this.#state,this.#result)
  }
}


//Usage Example
const pResolved = new MyPromise((resolve, reject)=>{
  resolve(1);
  reject(2);
});

const pRejected = new MyPromise((resolve, reject)=>{
  reject(2);
  resolve(1);
});

const pThrowError = new MyPromise((resolve, reject)=>{
  throw 3;
})
