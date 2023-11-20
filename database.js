const mongoose = require('mongoose');
var Schema=mongoose.Schema;
const ColorSchema = new Schema({
    name:{
        type:String
    },
    hex:{
        type:String,
        default:''
    },
    sat:{
        type:String,
        default:''
    },
    val:{
        type:String,
        default:''
    },
    url:{
        type: String
    }
})
const listColorSchema = new Schema({
    name:{
        type:String
    },
    image:{
        type: [ColorSchema]
    }
})

const listColor= mongoose.model('listColor',listColorSchema)
const Color= mongoose.model('Color',ColorSchema)


exports.listColor=listColor
exports.Color=Color