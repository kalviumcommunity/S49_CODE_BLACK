const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
const mongodbUri = process.env.mongoURi;
const client = new MongoClient(mongodbUri, { useNewUrlParser: true, useUnifiedTopology: true });


 // CRUD routes and handlers.


// Delete
router.delete('/delete', async (req, res) => {
    try {
      await client.connect();
      res.json({ message: 'Data deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Unable to delete data' });
    } finally {
      await client.close();
    }
  });

//Read
router.get('/create', async (req, res) => {
  try {
    await client.connect();
    res.json({ message: 'Data read successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Unable to read data' });
  } finally {
    await client.close();
  }
});

//Post
router.post('/post', async (req, res) => {
    try {
      await client.connect();
      res.json({ message: 'Data created successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Unable to create data' });
    } finally {
      await client.close();
    }
  });

//Update
router.put('/update', async (req, res) => {
  try {
    await client.connect();
    res.json({ message: 'Data updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Unable to update data' });
  } finally {
    await client.close();
  }
});

module.exports = router;