const express = require('express');
const joiValidation = require('../middlewares/joiValidation');
const auth = require('../middlewares/auth');
const { } = require('../schemas');
const router = express.Router();
const colorService = require('../services/color');
// auth.ensureSignedIn,

router.post('/create',  async (req, res) => {
  const { product, color } = req.body;
  const result = await colorService.create({ product, color })
  res.json(result);
})

// all itens
router.get('/all',async (req, res) => {
  // to do
    const result = await colorService.findAll();
    res.json(result);
})

router.get('/:id', async(req,res) => {
  const { id } = req.params;
  const result = await colorService.findById(id)
  res.json(result);
})

router.post('/update/:id', async( req,res) => {
  const { color,  product } = req.body
  const { id } = req.params
  const result = await colorService.update(id, { color, product })
  res.json(result);
})

router.post('/delete/:id', async (req, res) => {
  const { id } = req.params
  const result = await colorService.remove(id)
  res.json(result);
})

module.exports = router