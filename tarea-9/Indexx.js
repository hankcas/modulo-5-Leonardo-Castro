import validationMiddleware from './middlewares/validationMiddleware.js';  

// POST /students: Crear un nuevo estudiante con validación y autorización
app.post('/students', authMiddleware, validationMiddleware, (req, res) => {
  const { name, age, major } = req.body;
  
  const students = readStudents();
  const newStudent = {
    id: uuidv4(),
    name,
    age,
    major,
  };

  students.push(newStudent);
  writeStudents(students);
  res.status(201).json(newStudent);
});

// PUT /students/:id: Actualizar un estudiante con validación y autorización
app.put('/students/:id', authMiddleware, validationMiddleware, (req, res) => {
  const { id } = req.params;
  const { name, age, major } = req.body;

  const students = readStudents();
  const student = students.find((s) => s.id === id);

  if (!student) {
    return res.status(404).json({ error: 'Estudiante no encontrado' });
  }

  if (name) student.name = name;
  if (age) student.age = age;
  if (major) student.major = major;

  writeStudents(students);
  res.json(student);
});
