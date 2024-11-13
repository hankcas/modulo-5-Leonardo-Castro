// generator.js
import fs from 'fs';

const generarNumeros = () => {
  let numeros = '';

  for (let i = 1; i <= 1000; i++) {
    numeros += `${i}\n`; 
  }

  fs.writeFileSync('numeros.txt', numeros);
  console.log('Archivo numeros.txt creado con éxito.');
};

generarNumeros();
