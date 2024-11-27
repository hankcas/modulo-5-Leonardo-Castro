import express from 'express';

const app = express();

app.use(express.json()); 
const PORT = 3002;

// Lista de estudiantes
let students = [
  { id: 1, name: 'Alice', age: 20, major: 'Computer Science' },
  { id: 2, name: 'Bob', age: 22, major: 'Mathematics' },
  { id: 3, name: 'Charlie', age: 21, major: 'Physics' }
];

// GET /students: Retorna todos los estudiantes
app.get('/students', (req, res) => {
    res.json({ message: 'let students' });
  });

// GET /students/:id: Retorna un estudiante específico por ID
app.get('/students/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `Detalles del estudiante con ID ${id}` });
  });

// DELETE /students/:id: Elimina un estudiante por ID
app.delete('/students/:id', (req, res) => {
  const studentIndex = students.findIndex((s) => s.id === parseInt(req.params.id));
  if (studentIndex === -1) {
    return res.status(404).json({ error: 'Estudiante no encontrado' });
  }
  const removedStudent = students.splice(studentIndex, 1);
  res.json({ message: 'Estudiante eliminado', removedStudent });
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
