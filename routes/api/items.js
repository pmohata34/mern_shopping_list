const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth'); // Import auth middleware if needed

// Item Model
const Item = require('../../models/Item');

// @route   GET api/items
// @desc    Get All Items
// @access  Public
router.get('/', (req, res) => {
    Item.find()
        .sort({ date: -1 })
        .then(items => res.json(items))
});

// @route   Post api/items
// @desc    Create An Item
// @access  Private
router.post('/', auth, (req, res) => {
  const { name } = req.body;

  if (!name || typeof name !== 'string' || !name.trim()) {
    return res.status(400).json({ error: 'Item name is required' });
  }
  console.log('Incoming data:', req.body);

  const newItem = new Item({ name: name.trim() });

  newItem.save()
    .then(item => res.json(item))
    .catch(err => {
      console.error('Save error:', err.message);
      res.status(500).json({ success: false, error: err.message });
    });
});

// @route   DELETE api/items/:id
// @desc    Delete An Item
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Item not found' });

    res.json({ success: true, id: req.params.id });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
