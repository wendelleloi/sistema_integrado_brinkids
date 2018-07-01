/** Schema para usuarios do sistema */

var mongoose = require('mongoose')
var config = require('../config')
var Schema = mongoose.Schema

var ChildSchema = new Schema({
  number: {
    type: String,
    required: true
  },
  name: {
    type: Map,
    of: String,
    required: true
  },
  birthday: {
    type: Date,
    required: true
  },
  sexuality: {
    type: String,
    required: true
  },
  restrictions: String,
  observations: String,
  photo: {
    type: String,
    required: true,
    unique: true
  }
})

mongoose.connect('mongodb://localhost/' + config.database_name)
var Child = mongoose.model('Child', ChildSchema)

module.exports = Child
