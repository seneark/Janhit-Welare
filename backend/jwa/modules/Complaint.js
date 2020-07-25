const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema({
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
    admin_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
});


module.exports = mongoose.model("Complaint", ComplaintSchema);

