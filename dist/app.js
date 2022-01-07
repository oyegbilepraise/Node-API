"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mysql_1 = __importDefault(require("mysql"));
var app = (0, express_1.default)();
var connectionString = process.env.DATABASE_URL || '';
var connection = mysql_1.default.createConnection(connectionString);
connection.connect();
app.get('/api/characters', function (req, res) {
    var query = 'select * from Characters';
    connection.query(query, function (err, rows) {
        if (err)
            throw err;
        var retVal = {
            data: rows,
            message: rows.length === 0 ? 'No Record Found' : null
        };
        return res.send(retVal);
    });
    // res.send('')
});
app.get('/api/characters/:id', function (req, res) {
    var id = req.params.id;
    var query = "select * from Characters WHERE ID = ".concat(id, " LIMIT 1");
    connection.query(query, function (err, rows) {
        if (err)
            throw err;
        var retVal = {
            data: rows.length > 0 ? rows[0] : null,
            message: rows.length === 0 ? 'No Record Found' : null
        };
        return res.send(retVal);
    });
    // res.send('  + id)
});
var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('App is listening on port ' + port);
});
//# sourceMappingURL=app.js.map