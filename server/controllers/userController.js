const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userSchema")
const userController = {}


userController.register = async(req, res) => {
    const {name, email, contact, age, gender, password} = req.body

  if(!name ||  !email || !contact || !age || !gender || !password ){
    return res.status(400).json("All fields are required")
  }

    const user = await User.findOne({email})

    if(user){
        return res.status(400).json("User already exist")
    }
    try{
    const saltValue = await  bcryptjs.genSalt(10)

  const hashedPassword = await  bcryptjs.hash(password, saltValue)

  const newUser = new User({
    name, 
    age, 
    gender,
    email,
    contact,
    password: hashedPassword,
  });

  

 const savedUser = await newUser.save()

 console.log("newUser, salt", saltValue, hashedPassword, newUser)

   
        return res.status(200).json("User registered successfully")
    }catch(err){
        return res.status(500).json("Internal server error")
    }
}

userController.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "User does not exist", status: false });
    }

    const validatePassword = await bcryptjs.compare(password, user.password);

    if (!validatePassword) {
      return res.status(400).json({ message: "Invalid email or password", status: false });
    }

    const tokenData = {
      id: user._id,
      email: user.email,
      // You can include additional user-related data here if needed
    };

    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    return res.status(200).json({ message: "Login successfully", status: true, token: token });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error", error: err });
  }
};


module.exports = userController;