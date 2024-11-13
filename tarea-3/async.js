// async.js

// Callback
export const esperarSegundosCallback = (segundos, callback) => {
    setTimeout(() => {
      console.log(`Han pasado ${segundos} segundos (Callback)`);
      callback();
    }, segundos * 1000);
  };
  
  // Promise
  export const esperarSegundosPromise = (segundos) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Han pasado ${segundos} segundos (Promise)`);
        resolve();
      }, segundos * 1000);
    });
  };
  
  // Async/Await
  export const esperarSegundosAsync = async (segundos) => {
    await new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Han pasado ${segundos} segundos (Async/Await)`);
        resolve();
      }, segundos * 1000);
    });
  };
  
  