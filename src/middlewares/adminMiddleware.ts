import { Request, Response, NextFunction } from 'express';

export const adminMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const user = (req as any).user;

  if (!user || user.role !== 'ADMIN') {
    res.status(403).json({ error: 'Acceso denegado. No tienes permisos de administrador.' });
    return;
  }

  next();
};