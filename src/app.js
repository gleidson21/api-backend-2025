import express from 'express'
import cors from 'cors';
class App{
    constructor(){
        this.app = express()
        this.middlewares()
    }
    middlewares(){
        this.app.use(express.json())
        this.app.use(cors());
    }

}

export default new App().app