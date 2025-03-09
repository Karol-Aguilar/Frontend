import express from 'express';
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const app = express();
const prisma = new PrismaClient();

// Middleware JSON
app.use(express.json());

// Definir tipos para los cuerpos de las solicitudes
interface LoginBody {
  email: string;
  password: string;
}

interface RegisterBody {
  email: string;
  password: string;
  name?: string;
}

// Ruta de prueba
app.get('/api', (req: Request, res: Response) => {
  res.json({ message: 'Hello from Express!' });
});

// Ruta para login
/*
app.post('/api/login', async (req: express.Request, res: express.Response) => {
  const { email, password } = req.body as LoginBody;


  try {
    // Buscar el usuario por email
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Validar la contraseña
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    res.json({ message: 'Login successful' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});*/

app.post('/api/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      console.log('❌ Usuario no encontrado:', email);
      return res.status(401).json({ error: 'Usuario no existe' });
    }

    console.log('✅ Usuario encontrado:', user);

    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      console.log('❌ Contraseña incorrecta');
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    res.json({ message: 'Login exitoso' });
  } catch (error) {
    console.error('❌ Error en el login:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});



// Ruta para registrar usuarios
/*
app.post('/api/register', async (req: express.Request, res: express.Response) => {
  const { email, password, name } = req.body as RegisterBody;


  try {
    // Verificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Crear un nuevo usuario con la contraseña encriptada
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        name: name || 'Default Name', // Si no se proporciona un nombre, usar un valor por defecto
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});*/

app.post('/api/register', async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  try {
    // Verificar si el usuario ya existe
    let user = await prisma.user.findUnique({ where: { email } });

    if (user) {
      return res.status(400).json({ error: 'El usuario ya existe' });
    }

    // Encriptar la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el usuario con la contraseña encriptada
    user = await prisma.user.create({
      data: {
        name: name || 'Default Name',
        email,
        password: hashedPassword, // Guardar la versión encriptada
      },
    });

    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error en el servidor');
  }
});


export default app;

