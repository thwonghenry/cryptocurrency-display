const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PriceSchema = new Schema({
    base: String,
    target: String,
    price: Number,
    volume: Number,
    change: Number,
    timestamp: Number
});

PriceSchema.index( { base: 1, target: 1, timestamp: 1 }, { unique: true } );

module.exports = mongoose.model('Price', PriceSchema);
