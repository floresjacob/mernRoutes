var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var teamSchema = new Schema({
  teamName: { type: String, required: true },
  numPlayers: { type: Number, required: true}      
});

module.exports = mongoose.model('team', teamSchema);
