import Router from 'express'
import TagController from "./controllers/TagController.js";
import UserController from "./controllers/UserController.js";

const routes = new Router()

// tags
routes.get('/tags', TagController.getAll)
routes.get('/tags/:id', TagController.getOne)
routes.post('/tags', TagController.create)
routes.put('/tags/:id', TagController.update)
routes.delete('/tags/:id', TagController.delete)
// user
routes.post('/signup', UserController.signup)
routes.post('/login', UserController.login)

export default routes;
