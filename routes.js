import Router from 'express'
import TagController from "./controllers/TagController.js";

const routes = new Router()

routes.get('/tags', TagController.getAll)
routes.get('/tags/:id', TagController.getOne)
routes.post('/tags', TagController.create)
routes.put('/posts', TagController.update)
routes.delete('/posts/:id', TagController.delete)

export default routes;
