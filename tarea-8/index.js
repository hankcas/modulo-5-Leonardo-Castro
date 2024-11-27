import express from 'express'; 
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid'; 

const app = express();
const PORT = 3002;
const DB_FILE = path.join(process.cwd(), 'students.json'); 

app.use(express.json()); 

function readStudents() {
  const data = fs.readFileSync(DB_FILE, 'utf8');
  return JSON.parse(data);
}

function writeStudents(students) {
  fs.writeFileSync(DB_FILE, JSON.stringify(students, null, 2), 'utf8');
}

// GET /students: Obtener todos los estudiantes
app.get('/students', (req, res) => {
  try {
    const students = readStudents();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: 'Error al leer los estudiantes' });
  }
});

// GET /students/:id: Obtener un estudiante por ID
app.get('/students/:id', (req, res) => {
  try {
    const students = readStudents();
    const student = students.find((s) => s.id === req.params.id);
    if (!student) {
      return res.status(404).json({ error: 'Estudiante no encontrado' });
    }
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener el estudiante' });
  }
});

// POST /students: Crear un nuevo estudiante
app.post('/students', (req, res) => {
  const { name, age, major } = req.body;

  // Validaciones
  if (!name || typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ error: 'El nombre es obligatorio y debe ser un string no vacío' });
  }
  if (typeof age !== 'number' || age <= 0) {
    return res.status(400).json({ error: 'La edad debe ser un número positivo' });
  }
  if (!major || typeof major !== 'string' || major.trim() === '') {
    return res.status(400).json({ error: 'El major es obligatorio y debe ser un string no vacío' });
  }

  // Crear un nuevo estudiante con un ID único usando uuid
  const students = readStudents();
  const newStudent = {
    id: uuidv4(), // Genera un ID único
    name,
    age,
    major
  };

  students.push(newStudent);
  writeStudents(students);

  res.status(201).json(newStudent); // Respuesta con el nuevo estudiante creado
});

// PUT /students/:id: Actualizar un estudiante
app.put('/students/:id', (req, res) => {
  const { id } = req.params;
  const { name, age, major } = req.body;

  const students = readStudents();
  const student = students.find((s) => s.id === id);

  if (!student) {
    return res.status(404).json({ error: 'Estudiante no encontrado' });
  }

  // Actualizar solo los campos proporcionados
  if (name) student.name = name;
  if (age) student.age = age;
  if (major) student.major = major;

  writeStudents(students);
  res.json(student);
});

// DELETE /students/:id: Eliminar un estudiante
app.delete('/students/:id', (req, res) => {
  const { id } = req.params;
  const students = readStudents();
  const index = students.findIndex((s) => s.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Estudiante no encontrado' });
  }

  const deletedStudent = students.splice(index, 1); // Eliminar del array
  writeStudents(students);

  res.json({ message: 'Estudiante eliminado', student: deletedStudent[0] });
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
