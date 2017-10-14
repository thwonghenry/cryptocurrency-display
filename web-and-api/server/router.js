const express = require('express');

const getData = require('./handlers/getData');
const router = new express.Router();

router.get('/data', async (req, res) => {
    const data = await getData();
    res.send(data);
});

module.exports = router;