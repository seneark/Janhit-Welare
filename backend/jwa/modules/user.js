var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
	usernmae: String,
	house: String,
	phone: Number,
	floor: Number,
	admin: Boolean,
	notfication: Boolean,
	amount: Number,
	paid: Number,
	password: String,
	userNotification: {
		items: [
			{
				itemId: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'Notification'
				}
			}
		]
	}
});
UserSchema.methods.addNotification = function(notification){
	const updatedNotification = [...this.userNotification.items];
	updatedNotification.push({
		itemId: notification._id
	});
	const updatedNotification_saved = {
		items: updatedNotification
	};
	this.userNotification = updatedNotification_saved;
	return this.save();

}
UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User",UserSchema);

