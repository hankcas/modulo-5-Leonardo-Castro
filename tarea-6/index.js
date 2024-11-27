import http from "http";

// Base de datos inicial de productos
const products = [
  { id: 1, name: "Laptop", price: 999.99, category: "Electronics" },
  { id: 2, name: "Chair", price: 49.99, category: "Furniture" },
  { id: 3, name: "Pen", price: 1.99, category: "Stationery" },
];

const port = 3002;

const server = http.createServer((req, res) => {
  const { url, method } = req;

  
  if (method === "GET" && url === "/products") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(products)); 
  } else {
    // Ruta no encontrada
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Ruta no encontrada" }));
  }
});




// Iniciar el servidor
server.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
