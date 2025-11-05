import { Router } from "express";
import routerUser from "./users.routes.js";
import routerCompany from "./companies.routes.js";

const router = Router();

router.get('/', (req, res) => {
    res.json({
        message: 'API v1 is running',
        description: 'API para el proyecto BCP',
        author: 'Sergio Olivo',
        email: 'olivosergio09@gmail.com',
        website: 'https://sergiolivo.com',
        contact: 'https://sergiolivo.com/contact',
        license: 'MIT',
        repository: 'https://github.com/sergiolivo/backend-bcp',
        version: '1.0.0',
        timestamp: new Date().toISOString()
    })
})

router.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString()
    })
})

//Rutas de usuarios
router.use('/users', routerUser);
router.use('/companies', routerCompany);

export default router;