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
    notificationType: {
        type: String,
        required: true
    },
    feed_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Feed"
    },
    house_no: {
        type: String,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    sender_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

});


module.exports = mongoose.model("Notification", NotificationSchema);

