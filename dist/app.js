"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = (0, express_1.default)();
app.get('/api/characters', function (req, res) {
    res.send('');
});
app.get('/api/characters/:id', function (req, res) {
    var id = req.params.id;
    res.send('' + id);
});
var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('App is listening on port ' + port);
});
//# sourceMappingURL=app.js.map