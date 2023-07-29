"use strict"
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sizesSchema = new mongoose.Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Products'
  },
  size: Number,
  
}, {
  timestamps: true,
});

const Sizes = mongoose.model('Sizes', sizesSchema);
module.exports = Sizes;