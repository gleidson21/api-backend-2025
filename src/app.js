import express from 'express'
import router from './routes.js'

class App{
    constructor(){
        this.app = express()
        this.middlewares()
        this.router()
    }
    middlewares(){
        this.app.use(express.json())
    }
    router(){
        this.app.use(router)
    }
}

export default new App().app