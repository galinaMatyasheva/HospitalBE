const Patient = require("../../db/models/model/patients");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.logInPatient = (req, res, next) => {
  const { login, password } = req.body;
  Patient.findOne({ login: login })
    .then((result) => {
      if (!result) {
        return res.status(401).send({message: 'patient does not exist!'});
      }
      const passwordHash = result.password;
      bcrypt.compare(password, passwordHash).then((result) => {
        if (!result) {
          return res.status(401).send({message: "invalid login or password"});
        }
        const payload = {
          userId: req.body._id,
        };
        const token = jwt.sign(payload, "superSecret", {
          expiresIn: 60 * 60 * 24, // expires in 24 hours
        });
        return res
          .status(200)
          .json({ success: true, userId: req.body._id, token: token });
      }).catch((error) => {
           return res.status(401).send("invalid credentials" + error);
      });
    })
    .catch((error) => {
      return res.status(401).send(error);
    });
};

module.exports.getAllPatients = (req, res, next) => {
  Patient.find()
    .then((result) => {
      res.send({ data: result });
    })
    .catch((error) => {
      return res.status(400).send(error, "error during getting patients");
    });
};

module.exports.createPatient = (req, res, next) => {
  const body = req.body;
  const patient = new Patient(body);
  const { login, password } = patient;
  const check = !patient.login || !patient.password;
  const candidateLogin = Patient.findOne({ login: login }).then((result) => {
    if (result && candidateLogin) {
      res.status(409).send({message: "This login is occupied"});
    } else {
      if (check) {
        return res.status(422).json({
          success: false,
          error: "invalid data during creating patient",
        });
      }
      const salt = bcrypt.genSaltSync(10);
      const patient = new Patient({
        login: login,
        password: bcrypt.hashSync(password, salt),
      });
      patient.save().then(() => {
        res.status(201).send({message: "user was added", success: true});
      });
    }
  });
};
