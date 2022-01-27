const mongoose = require('mongoose');
const { SourceMapDevToolPlugin } = require('webpack');

const HomeSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    descricao: String
});

const HomeModel = mongoose.model('Home', HomeSchema);

module.exports = HomeModel;