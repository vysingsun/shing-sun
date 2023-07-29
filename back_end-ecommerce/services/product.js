const Products = require("../models/products")
const mongoose = require('mongoose')

// const findAllProduct = async ()=>{
//   try {
//     const products = await Products.find()
//     return {
//       success: true,
//       data: products
//     };
//   } catch (err) {
//     return {
//       success: false,
//       error: err.message
//     }
//   }
// }

const findById = async (id) => {
  try {
    const product = await Products.findById(id).populate(['color','size', 'category', 'item'])
    return {
      success: true,
      data: product
    };
  } catch (err) {
    return {
      success: false,
      error: err.message
    }
  }
}
// ['color','size']

// const findAll = async (category = '', item = '') => {
//   let matchCond = {};
//   if(category) matchCond['category'] = mongoose.Types.ObjectId(category)
//   if(item) matchCond['item'] = mongoose.Types.ObjectId(item)

//   const products = await Products.aggregate([
//     {
//       "$match": matchCond
//     },
//     {
//       $lookup: {
//         from: "sizes",
//         localField: "_id",
//         foreignField: "product",
//         as: "sizes"
//       },

//     },
//     {
//       $lookup: {
//         from: "colors",
//         localField: "_id",
//         foreignField: "product",
//         as: "colors"
//       },

//     },
//     {
//       $lookup: {
//         from: "categories",
//         localField: "category",
//         foreignField: "_id",
//         as: "category"
//       },
//     },
//     {

//       $lookup: {
//         from: "items",
//         localField: "item",
//         foreignField: "_id",
//         as: "item"
//       }
//     },
//     { "$unwind": "$category" },
//     { "$unwind": "$item" },
//     // { "$unwind": "$colors" },
//     // { "$unwind": "$sizes" }
//   ])

//   if (!products?.length)
//     return []

//   return products
// }
const findAll = async (req,res) => {
  try{
    const product = await Products.find().populate(['color','size', 'category', 'item'])
    return {
      success: true,
      data: product
    };
  }catch(error){
    throw new Error(error)
  }
}

const create = async (newProduct,file) => {
  try {
    const { title, price, category, item, desc, color, size } = newProduct
    var images = ''
    if(file){
      images = file;
    }else{
      images = ''
    }
    const newData = {
      title: title,
      price: price,
      category: category,
      item: item,
      image: images,
      desc: desc,
      size: size,
      color: color
    }
    const product = await Products.create(newData)
    return {
      success: true,
      data: product
    };
  } catch (err) {
    return {
      success: false,
      error: err.message
    }
  }
}

const update = async (id, newProduct) => {
  try {
    const product = await Products.findById(id)
    product.title = newProduct.title
    product.price = newProduct.price
    product.category = newProduct.category
    product.item = newProduct.item
    product.user = newProduct.user
    product.imageUrl = newProduct.imageUrl
    await product.save()
    return {
      success: true,
      data: product
    };
  } catch (err) {
    return {
      success: false,
      error: err.message
    }
  }
}

const remove = async (id) => {
  try{
    await Products.deleteOne({_id:id})
    return {
      success : true,
      data : "product deleted"
    }
  }catch(err){
    return {
      success : false,
      err : err.message
    }
  }
}

module.exports = {
  findById,
  update,
  remove,
  findAll,
  create
}