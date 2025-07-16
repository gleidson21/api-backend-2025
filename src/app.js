import express from 'express'

class App{
    constructor(){
        this.app = express()
        this.middlewares()
    }
    middlewares(){
        this.app.use(express.json())
    }

}

export default new App().app