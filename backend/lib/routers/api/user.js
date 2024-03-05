import express from 'express';
import auth from '../../service/auth.js';
import userService from '../../service/api/user.js';

const router = express.Router();

router.use(auth);

router.get("/" , userService.getAllUsers);

router.get("/:id" , userService.getUserById);

router.post("/" , userService.addUser);

router.put("/:id" , userService.updateUser);

router.delete("/:id" , userService.deleteUser);

export default router;