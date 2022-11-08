const express = require('express');

const app = express();

const port = process.env.PORT || '3030';

app.get('/teste', (req, res) => {

res.send('Your Express API is up and running!');

});

app.listen(port, () => {

console.log(`listening at http://localhost:${port}`);

});