const express = require('express');
const joiValidation = require('../middlewares/joiValidation');
const auth = require('../middlewares/auth');
const { } = require('../schemas');
const router = express.Router();
const sizeService = require('../services/size');
// auth.ensureSignedIn,

router.post('/create',  async (req, res) => {
  const { product, size } = req.body;
  const result = await sizeService.create({ product, size })
  res.json(result);
})

// all itens
router.get('/all',async (req, res) => {
  // to do
    const result = await sizeService.findAll();
    res.json(result);
})

router.get('/:id', async(req,res) => {
  const { id } = req.params;
  const result = await sizeService.findById(id)
  res.json(result);
})

router.post('/update/:id', async( req,res) => {
  const { size,  product } = req.body
  const { id } = req.params
  const result = await sizeService.update(id, { size, product })
  res.json(result);
})

router.post('/delete/:id', async (req, res) => {
  const { id } = req.params
  const result = await sizeService.remove(id)
  res.json(result);
})

module.exports = router