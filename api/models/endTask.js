const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var EndTaskSchema = new Schema({
    task: { type: mongoose.ObjectId, required: true, },
    usuarios: [{type: String}],
    usuariosAprovados: [{type: String}],
},
    {
        timestamps: true,
    },
);
module.exports = mongoose.model('EndTask', EndTaskSchema);