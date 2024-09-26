const User = require('../../models/UserModel');

const userResolvers = {
  Query: {
    getUser: async (_, { id }) => {
      return await User.findById(id);
    },
  },
  Mutation: {
    createUser: async (_, { username, email, password }) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error('User with this email already exists');
      }
      const newUser = new User({ username, email, password });
      return await newUser.save();
    },
  },
};

module.exports = userResolvers;
