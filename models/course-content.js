const mongoose = require('mongoose');

const courseContentSchema = new mongoose.Schema({
});

module.exports = mongoose.model('CourseContent', courseContentSchema);