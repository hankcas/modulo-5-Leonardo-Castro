const authMiddleware = (req, res, next) => {
    
    const authHeader = req.headers['authorization'];
    
    if (!authHeader) {
      return res.status(403).json({ error: 'Token de autorización requerido' });
    }
  
    const token = authHeader.split(' ')[1];  
    if (token !== 'mysecrettoken') {
      return res.status(403).json({ error: 'Token de autorización incorrecto' });
    }
  
    next();
  };
  
  export default authMiddleware;
  