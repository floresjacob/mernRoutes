var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  userName: { type: String, required: true },
  passWord: { type: String, required: true },
  ign: String,
  rank: String,
  role: String,
  // captain: Boolean,
  teamName: String,
  server: String,
  // schedule: {
  //   monday: [],
  //   tuesday: [],
  //   wednesday: [],
  //   thursday: [],
  //   friday: [],
  //   saturday: [],
  //   sunday: [],
  // }
});

module.exports = mongoose.model('User', userSchema);
