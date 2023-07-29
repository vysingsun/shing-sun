const Colors = require("../models/colors");

const findAll = async () => {
  // to do
  // try {
  //   const colors = await Colors.find()
  //   return {
  //     success : true,
  //     data : colors
  //   }
  // } catch (error) {
  //   return {
  //     success : false,
  //     error : error.message
  //   }
  // }
  let matchCond = {};
  const colos = await Colors.aggregate([
    {
      "$match": matchCond
    },
    {
      $lookup: {
        from: "products",
        localField: "product",
        foreignField: "_id",
        as: "product"
      }
    },
    {
      "$unwind": "$product"
    }
  ])
  if(!colos?.length){
    return []
  }
  return colos;
}

const create = async (newColor) => {
  // to do
  try {
    const createdColor = await Colors.create(newColor);
    // return createdColor;
    return {
      success: true,
      data: createdColor
    }
  } catch (error) {
    return {
      success: false,
      error: error.message
    }
  }
}

const findById = async (id) => {
  // to do
  try {
    const color = await Colors.findById(id);
    return{
      success: true,
      data: color
    }
  } catch (error) {
    return {
      success : false,
      err : error.message
    }
  }
}

const update = async (id, newColor) => {
  // to doF
  try {
    const color = await Colors.findById(id)
    color.color = newColor.color
    color.product = newColor.product
    await color.save()
    return{
      success: true,
      data: color
    }
  } catch (error) {
    return{
      success : false,
      err : error.message
    }
  }
}

const remove = async (id) => {
  // to doF
  try {
    await Colors.findByIdAndDelete(id)
    return {
      success : true,
      data : "Color deleted"
    }
  } catch (error) {
    return {
      success : false,
      err : error.message
    }
  }
}

module.exports = {
  findAll,
  create,
  findById,
  update,
  remove
}