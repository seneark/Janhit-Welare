const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
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
    isComplaint: {
        type: Boolean,
        required: true
    },
    feed_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Feed"
    },
    house_no: {
        type: String,
        required: true
    }

});


module.exports = mongoose.model("Notification", NotificationSchema);

