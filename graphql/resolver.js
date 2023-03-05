const {User,Contact}  =require("../models/model")


const resolvers = {
  Query: {
    user: async (parent, args) => {
      const res=await User.findOne({email:args.email,password:args.password})
      console.log(res)
      if (res) {
        return res._id;
      }
      return "Invaid";
    },

    contact: async (parent, args) => {
      const res= await Contact.findById(args._id)
       return res;
    },

    contacts: async (parent, args) => {
      const res = await Contact.find({userId:args.userId});
      console.log(res);
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
      const res=await newUser.save()
      if (res) {
        return true;
      }
      return false;
    },

    createContact: async (parent, args) => {
      const newContact = new Contact({
        userId: args.userId,
        firstName: args.firstName,
        lastName: args.lastName,
        email: args.email,
        phone: args.phone,
      });
      
      const res = await newContact.save();
      if (res) {
        return true;
      }
      return false;
    },



    deleteContact: async(parent,args)=>{
        const res = (await Contact.deleteOne({ _id: args._id })).deletedCount;
        if (res) {
          return true;
        }
        return false;
    },

    updateContact:async(parent,args)=>{

        const res = await Contact.updateOne(
          { _id: args._id },
          {
            firstName: args.firstName,
            lastName: args.lastName,
            email: args.email,
            phone: args.phone,
          }
        )

        if (res.modifiedCount) {
          return true;
        }
        return false;

        
    }

  },
};


module.exports=resolvers