import express, { Request, Response } from 'express';

import mysql from 'mysql';

const app = express();

const connectionString = process.env.DATABASE_URL || '';

const connection = mysql.createConnection(connectionString);

connection.connect()

app.get('/api/characters', (req: Request, res: Response) => {
    const query = 'select * from Characters'; 
    connection.query(query, (err, rows) => {
        if(err) throw err;

        const retVal = {
            data: rows,
            message: rows.length === 0 ? 'No Record Found' : null
        }
        
        return res.send(retVal);
    })
    // res.send('')
})

app.get('/api/characters/:id', (req: Request, res: Response) => {
    const id = req.params.id;

    const query = `select * from Characters WHERE ID = ${id} LIMIT 1`; 
    connection.query(query, (err, rows) => {
        if(err) throw err;

        const retVal = {
            data: rows.length > 0 ? rows[0] : null,
            message: rows.length === 0 ? 'No Record Found' : null
        }
        
        return res.send(retVal);
    })
    // res.send('  + id)
})

const port =process.env.PORT ||3000;

app.listen(port, () => {
    console.log('App is listening on port ' + port);
    
});  