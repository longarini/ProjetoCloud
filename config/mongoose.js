const mongoose = require('mongoose');

//mongoose.connect('mongodb+srv://longarini:admin@cluster0.jvvjt2m.mongodb.net/Gamificacao')
mongoose.connect('mongodb+srv://longarini:admin@cluster0.jvvjt2m.mongodb.net/Gamificacao?retryWrites=true&w=majority')

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
    console.log("MongoDB conectado.");
});