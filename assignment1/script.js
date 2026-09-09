
function createCounter() {
    let cnt = 0;
    return {
        increment(){
            cnt++
        }, 
        decrement(){
            cnt--            
        },
        getValue(){
            return cnt
        }
    }
}

const counter = createCounter()
console.log("1. Counter ");


console.log(counter.getValue()); // 0

counter.increment()
counter.increment()
counter.increment()
counter.increment()
counter.decrement()

console.log(counter.getValue()); // 3 

console.log(counter.console); // undefined
//------------------------------------------------------


console.log('---------------------------------------');
console.log("2. Once fn - single call");


function once(inp){
    let called = false; 
    let result;
    return function fin (a){
        if(!called){
            called = true
            result = inp(a)
        }
        return result
    }
}

const final = once(name => {
    console.log(`Hello ${name}`);
})

final("Sandesh")    // Hello Sandesh
final("Rahul")      // No Output


//-----------------------------------------------

console.log('---------------------------------------');
console.log("3. Memoize");

function memoize(fn){
    const cache = new Map()

    return function(...args){
        const key = JSON.stringify(args)

        if(cache.has(key)){
            console.log("Result from cache");
            return cache.get(key)
        }

        console.log("calculating result");

        const result = fn(...args)

        cache.set(key, result)

        return result
        
    }
}

const multiply = memoize((a, b)=>{
    return a*b;
})

console.log(multiply(2,3));
console.log(multiply(2,3));
console.log(multiply(4,5));

// calculating result
// 6
// Result from cache
// 6
// calculating result
// 20



//-------------------------------------------

console.log('---------------------------------------');
console.log("4. closure trap");


// problem:
for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i);
  }, 0);
}
// 3
// 3
// 3

// 1st way - let
for (let i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i);
  }, 0);
}
// 0
// 1
// 2

// 2nd way - IIFE
for (var i = 0; i < 3; i++) {
  (function (currentValue) {
    setTimeout(() => {
      console.log(currentValue);
    }, 0);
  })(i);
}
// 0
// 1
// 2

// 3rd way - setTimeout
for (let i = 0; i < 3; i++) {
  setTimeout(
    function (currentValue) {
      console.log(currentValue);
    },
    100,
    i,
  );
}
// 0
// 1
// 2





