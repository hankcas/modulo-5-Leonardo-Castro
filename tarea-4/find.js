// find.js
import fs from 'fs';

const encontrarNumerosPares = () => {
  try {
    const data = fs.readFileSync('numeros.txt', 'utf-8');
    const numeros = data.split('\n'); 
    const numerosPares = [];

    numeros.forEach((numero) => {
      const num = parseInt(numero);
      if (num % 2 === 0) {
        numerosPares.push(num);
      }
    });

    console.log('Números pares encontrados:', numerosPares.join(', '));

    fs.writeFileSync('numeros-pares.txt', numerosPares.join('\n'));
    console.log('Archivo numeros-pares.txt creado con los números pares.');
  } catch (error) {
    console.error('Error al leer el archivo:', error.message);
  }
};

encontrarNumerosPares();
