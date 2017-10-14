const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PriceSchema = new Schema({
    pair: String,
    base: String,
    target: String,
    price: Number,
    volume: Number,
    change: Number,
    timestamp: Number
});

PriceSchema.index( { pair: 1, timestamp: 1 }, { unique: true } );

module.exports = mongoose.model('Price', PriceSchema);
