const mongoose = require('mongoose');

const FeedSchema = new mongoose.Schema({
    ///NAME OF CATEGORY
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    img: {
        data: Buffer,
        contentType: String
    },
    admin_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
});


module.exports = mongoose.model("Feed", FeedSchema);

