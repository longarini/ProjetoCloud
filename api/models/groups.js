const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var GroupSchema = new Schema({
    user: { type: mongoose.ObjectId, required: true, },
    nomeGrupo: { type: String, required: true },
    nameUsers: [{type: String}],
    comunUsers: [{type: String}],
    tasks : { type: Array, },
    ativo: { type: Boolean, default: true, required: true, },
},
    {
        timestamps: true,
    },
);
module.exports = mongoose.model('Groups', GroupSchema);