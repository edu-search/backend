const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


function mustBeLoggedIn(req, res, next) {
    jwt.verify(req.cookies.cookieToken, process.env.SECRET, function (err, decoded) {
      if (err) {
        console.log(err);
        res.redirect("../")
      } else {
        next()
      }
    })
}


function generateAccessToken(username) {
    const expiration_time = 60;
    let token = jwt.sign({user: username}, process.env.SECRET, { expiresIn: expiration_time.toString() + 's' });
    return token;
}

async function authenticateUser(user) {
    
    const found_user = await User.findOne({ where: { name: user.username } });
    if (!found_user || !(await bcrypt.compare(user.password, found_user.hash))) { 
      throw 'Username or password is incorrect'; 
    } else {
      console.log("successful authentication");
    }
    return found_user.get();
}

async function isDuplicateUser(newUser) {
  const existingUser =  await User.findOne({where: {name: newUser.username}});
  if(existingUser != null) {
    throw "This username already exists"
  } else {
    return newUser;
  }
}

async function isDuplicateEmail(newUser) {
  const existingEmail =  await User.findOne({where: {email: newUser.email}});
  if(existingEmail != null) {
    throw "The email address is already used"
  } else {
    return newUser;
  }
}

module.exports =  {
    generateAccessToken,
    authenticateUser,
    mustBeLoggedIn,
    isDuplicateUser,
    isDuplicateEmail
}
