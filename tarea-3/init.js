// init.js
import { esperarSegundosCallback, esperarSegundosPromise, esperarSegundosAsync } from './async.js';

console.log("Iniciando prueba con Callback...");
esperarSegundosCallback(2, () => {
  console.log("Finalizó la prueba con Callback.");

  console.log("Iniciando prueba con Promise...");
  esperarSegundosPromise(3).then(() => {
    console.log("Finalizó la prueba con Promise.");

    console.log("Iniciando prueba con Async/Await...");
    (async () => {
      await esperarSegundosAsync(4);
      console.log("Finalizó la prueba con Async/Await.");
    })();
  });
});

