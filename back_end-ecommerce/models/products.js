"use strict"
var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var productSchema = new mongoose.Schema({
  title: String,
  price: Number,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categories'
  },
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Items'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  },
  color: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Colors'
  },
  size: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sizes'
  },
  image: String,
  desc: String,
}, {
  timestamps: true,
});

productSchema.index({ title: 'text' });
var Posts = mongoose.model('Products', productSchema);
module.exports = Posts;
