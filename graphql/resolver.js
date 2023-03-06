const {User,Contact}  =require("../models/model")
const jwt = require("jsonwebtoken");
require("dotenv").config();

const resolvers = {

  Query: {
    contact: async (parent, args, { _id }) => {
      if (!_id) {
        throw new Error("You must be logged in.");
      }
      const res = await Contact.findById(args._id);
      return res;
    },

    contacts: async (parent, args, { _id }) => {
      if (!_id) {
        throw new Error("You must be logged in.");
      }
      const res = await Contact.find({ userId: _id });
  
      return res;
    },
  },

  Mutation: {
    createUser: async (parent, args) => {
      const newUser = new User({
        name: args.name,
        email: args.email,
        phone: args.phone,
        password: args.password,
      });
      const res = await newUser.save();
      if (res) {
        return "Created";
      }
      throw new Error("Something Wrong...");
    },

    user: async (parent, args) => {
      const res = await User.findOne({
        email: args.email,
        password: args.password,
      });

      if (res) {
        const token = jwt.sign(
          {_id: res._id},
          process.env.JWT_KEY,
          { expiresIn: "2d" }
        );
       
        return token;
      }
      throw new Error("Email or Password Wrong...");
    },

    createContact: async (parent, args, { _id }) => {
      if (!_id) {
        throw new Error("You must be logged in.");
      }

      const newContact = new Contact({
        userId: _id,
        firstName: args.firstName,
        lastName: args.lastName,
        email: args.email,
        phone: args.phone,
      });

      const res = await newContact.save();
      if (res) {
        return true;
      }
      throw new Error("Contact Not Created..");
    },

    deleteContact: async (parent, args, { _id }) => {
      if (!_id) {
        throw new Error("You must be logged in.");
      }

      const res = (await Contact.deleteOne({ _id: args._id })).deletedCount;
      if (res) {
        return true;
      }
      return false;
    },

    updateContact: async (parent, args, { _id }) => {
      if (!_id) {
        throw new Error("You must be logged in.");
      }
      const res = await Contact.updateOne(
        { _id: args._id },
        {
          firstName: args.firstName,
          lastName: args.lastName,
          email: args.email,
          phone: args.phone,
        }
      );

      if (res.modifiedCount) {
        return true;
      }
      return false;
    },
  },
};


module.exports=resolvers