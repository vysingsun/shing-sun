"use strict"
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const colorsSchema = new mongoose.Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Products'
  },
  color: String,
  
}, {
  timestamps: true,
});

const Colors = mongoose.model('Colors', colorsSchema);
module.exports = Colors;
