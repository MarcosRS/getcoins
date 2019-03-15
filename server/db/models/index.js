// Require our models. Running each module registers the model into sequelize
// so any other part of the application could call sequelize.model('Song')
// to get access to the Song model.

const User = require('./user');
const Task = require('./task');

// Form the associations
Task.belongsTo(User);
User.hasMany(Task);

module.exports = {
  User,
  Task
};
