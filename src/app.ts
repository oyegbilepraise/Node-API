import express, { Request, Response } from 'express';

import mysql from 'mysql';

const app = express();

const connectionString = process.env.DATABASE_URL || '';

const connection = mysql.createConnection(connectionString);

connection.connect()

app.get('/api/characters', (req: Request, res: Response) => {
    const query = 'SELECT * FROM Character'
    res.send('')
})

app.get('/api/characters/:id', (req: Request, res: Response) => {
    const id = req.params.id;
    res.send(''  + id)
})

const port =process.env.PORT ||3000;

app.listen(port, () => {
    console.log('App is listening on port ' + port);
    
}); 