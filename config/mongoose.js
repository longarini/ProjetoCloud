const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://longarini:admin@cluster0.jvvjt2m.mongodb.net/Gamificacao')
.then(() => {
    console.log('MongoDB Connected…')
  })
  .catch(err => console.log(err))