const User = require("../models/user");
const bcrypt= require('bcrypt')


const createAdmin = async () => {
  const user = await User.find();
  if (user) return;
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash("admin", salt);
  const newUser = new User({
    firstName: "Admin",
    lastName: "admin",
    email: "admin",
    password: hashPassword,
  });
  await newUser.save()
  return
};


module.exports = createAdmin