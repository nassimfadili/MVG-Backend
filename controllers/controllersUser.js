const { User } = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function signupUser(req, res) {
  if (!req.body.email || !req.body.password) {
    res.status(400).send({ message: "Il manque un mail ou un mot de passe" });
    return;
  }
  const { email, password } = req.body;

  try {
    const hash = await bcrypt.hash(password, 10);
    const user = new User({
      email: email,
      password: hash,
    });
    await user.save();
    res.send({ userId: user._id });
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: "Erreur de creation de l'utilisateur" });
  }
}

async function logUser(req, res) {
  const requestBody = req.body;
  if (!requestBody.email || !requestBody.password) {
    res.status(400).send({ message: "Il manque un mail ou un mot de passe" });
    return;
  }
  const user = await User.findOne({ email: requestBody.email });
  if (user == null) {
    res.status(401).send({ message: "Mauvaises Informations" });
    return;
  }
  const isPasswordCorrect = await bcrypt.compare(
    requestBody.password,
    user.password
  );
  if (!isPasswordCorrect) {
    res.status(401).send({ message: "Mauvaises Informations" });
    return;
  }
  res.send({ userId: user._id, token: makeToken(user) });
}

function makeToken(user) {
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
  return token;
}

module.exports = { logUser, signupUser };
