const Sizes = require("../models/sizes");

const findAll = async () => {
  // to do
  // try {
  //   const sizes = await Sizes.find()
  //   return {
  //     success : true,
  //     data : sizes
  //   }
  // } catch (error) {
  //   return {
  //     success : false,
  //     error : error.message
  //   }
  // }
  let matchCond = {};
  const sizes = await Sizes.aggregate([
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
  if(!sizes?.length){
    return []
  }
  return sizes;
}

const create = async (newSize) => {
  // to do
  try {
    const createdSize = await Sizes.create(newSize);
    // return createdSize;
    return {
      success: true,
      data: createdSize
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
    const size = await Sizes.findById(id);
    return{
      success: true,
      data: size
    }
  } catch (error) {
    return {
      success : false,
      err : error.message
    }
  }
}

const update = async (id, newSize) => {
  // to doF
  try {
    const size = await Sizes.findById(id)
    size.size = newSize.size
    size.product = newSize.product
    await size.save()
    return{
      success: true,
      data: size
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
    await Sizes.findByIdAndDelete(id)
    return {
      success : true,
      data : "Sizes deleted"
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