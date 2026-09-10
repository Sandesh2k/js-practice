// 1. sum of squares of even numbers

console.log("---------------------------");
console.log("1:");


let arr = [1,2,3,4,5,6,7,8,9]


let even = arr.filter(n => n%2===0);

let squares = even.map(n => n*n)

let sum = squares.reduce((sum,n) => sum+n)

console.log(`Sum of sq of even: ${sum}`); // 120


// 2. { name, age, city }
console.log("---------------------------");
console.log("2:");
const users = [
  {
    name: "Om",
    age: 25,
    city: "Pune"
  },
  {
    name: "Tejas",
    age: 30,
    city: "Mumbai"
  },
  {
    name: "Umesh",
    age: 22,
    city: "Bengaluru"
  }
];


const grp = users.reduce((result, user) => {
  if(!result[user.city]){
    result[user.city] = [];
  }
  result[user.city].push(user)
  return result
}, {})

console.log(grp);


// 3. Recursion + reduce
console.log("---------------------------");
console.log("3:");

const arr3 = [1, [2, [3, 4]], [5, [6, [7]]]]

function flat(arr){
  return arr.reduce((result3, item)=>{
    if(Array.isArray(item)){
      return result3.concat(flat(item))
    }
    return result3.concat(item)
  }, [])
}

console.log(flat(arr3));


// 4. Given two arrays, return the intersection.

console.log("---------------------------");
console.log("4:");

const class1 = [98,56,89,76,78,65,67]
const class2 = [86,75,67,56,78,56,78]

const intersection = class1.filter(e => class2.includes(e))

console.log(intersection);


// 5. Given an array of transactions { amount, type: "credit" | "debit" }
// compute the running balance.


console.log("---------------------------");
console.log("5:");
const transactions = [
  {
    amount: 150050,
    type: "credit"
  },
  {
    amount: 35000,
    type: "debit"
  },
  {
    amount: 12025,
    type: "debit"
  },
  {
    amount: 500000,
    type: "credit"
  }
];

const balance = transactions.reduce((bal, transaction) =>{
  return transaction.type === "credit"
  ? bal + transaction.amount
  : bal - transaction.amount
}, 0)

console.log(balance)
