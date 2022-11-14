const app = require('./config/express')();
require('./config/mongoose');
const port = app.get('port');
require("dotenv-safe").config();

app.listen(port, () => {
    console.log('Servidor Online (' + port + ')')
});