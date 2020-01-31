// a fetch returns a promise object

// create a function that takes this or any promise object, 
// and waits to return it after a set amount of time

import fetch from "node-fetch";


const wait = waitMs => timedPromise => {
  return new Promise(resolve => {
    console.log('waiting for ', waitMs, ' milliseconds...');
    setTimeout(() => {
      resolve(timedPromise);
    }, waitMs);
    });
}


const timedFetch = timeoutMs => timedPromise => {
  return new Promise((resolve,reject) => {
    const timer = setTimeout(() => reject(`timeout after ${timeoutMs} milliseconds`), timeoutMs);

    timedPromise.then(resolve)
    .finally(() => {
      console.log('clearing timeout timer');
      clearTimeout(timer);
    });
    console.log('starting ', timeoutMs, ' millisecond timer...');
  })
}

const testAPI = "https://jsonplaceholder.typicode.com/todos/1";

timedFetch(2000)(wait(1500)(fetch(testAPI)))
.then(response => response.json())
.then(console.log)
.catch(console.error);
