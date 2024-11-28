const validationMiddleware = (req, res, next) => {
    const { name, age, major } = req.body;
  
    if (!name || typeof name !== 'string' || name.trim() === '') {
      return res.status(400).json({ error: 'Nombre no válido. El nombre debe ser una cadena no vacía.' });
    }
  
    if (typeof age !== 'number' || age < 0) {
      return res.status(400).json({ error: 'Edad inválida. La edad debe ser un número no negativo.' });
    }
  
    if (!major || typeof major !== 'string' || major.trim() === '') {
      return res.status(400).json({ error: 'Mayor no válido. El mayor debe ser una cadena no vacía.' });
    }
  
    next();
  };
  
  export default validationMiddleware;
  