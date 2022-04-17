import Router from 'express'
import TagController from "./controllers/TagController.js";
import UserController from "./controllers/UserController.js";

import {authMiddleware} from "./middleware/authMiddleware.js";

const routes = new Router()

// tags
routes.get('/tags', TagController.getAll.bind(TagController))
routes.get('/tags/:id', TagController.getOne.bind(TagController))
routes.post('/tags', authMiddleware, TagController.create.bind(TagController))
routes.put('/tags/:id', authMiddleware, TagController.update.bind(TagController))
routes.delete('/tags/:id', authMiddleware, TagController.delete.bind(TagController))

// user
routes.post('/signup', UserController.signup)
routes.post('/login', UserController.login)

export default routes;
