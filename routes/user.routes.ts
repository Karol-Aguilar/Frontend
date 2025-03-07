import { Router } from "express";
import {
  registerUserController,
  getUsersController,
  getUserController,
  updateUserController,
  deleteUserController,
  getUsersByRoleController, // Importar el controlador getUsersByRoleController
} from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/authMiddleware";
import { adminMiddleware } from "../middlewares/adminMiddleware";

const router = Router();

// Registro de usuario
router.post("/register", registerUserController);

// Obtener todos los usuarios (solo admin)
router.get("/", authMiddleware, adminMiddleware, getUsersController);

// Obtener un usuario por ID
router.get("/:id", authMiddleware, getUserController);

// Actualizar usuario
router.put("/:id", authMiddleware, adminMiddleware, updateUserController);

// Eliminar usuario (soft delete)
router.delete("/:id", authMiddleware, adminMiddleware, deleteUserController);

// Obtener usuarios por rol (solo admin)
router.get('/role/:role', authMiddleware, adminMiddleware, getUsersByRoleController);

export default router;