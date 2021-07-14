const Reception = require("../../db/models/model/receptions");

module.exports.getAllReceptions = (req, res, next) => {
  Reception.find()
    .then((result) => {
      res.send({ data: result });
    })
    .catch((error) => {
      return res.status(400).send(error, "error during getting receptions");
    });
};

module.exports.createReception = (req, res, next) => {
  const body = req.body;
  const reception = new Reception(body);
  const check =
    !reception.patient ||
    !reception.doctor ||
    !reception.data ||
    !reception.complaints;
  if (check) {
    return res.status(422).json({
      success: false,
      message: "invalid data during creating reception",
    });
  }
  reception
    .save(body)
    .then(() => {
      Reception.find().then((result) => {
        res.send({ data: result, success: true });
      });
    })
    .catch((error) => {
      return res.status(400).send(error, "error during creating reception");
    });
};

module.exports.updateReception = (req, res, next) => {
  const body = req.body;
  const reception = new Reception(body);
  Reception.updateOne({ _id: reception._id }, reception)
    .then(() => {
      Reception.find().then((result) => {
        res.send({ data: result });
      });
    })
    .catch((error) => {
      return res.status(400).send(error, "error during update reception");
    });
};

module.exports.deleteReception = (req, res, next) => {
  Reception.deleteOne({ _id: req.params.id })
    .then(() => {
      Reception.find().then((result) => {
        res.send(result);
      });
    })
    .catch((error) => {
      return res.status(400).send(error, "error during deleting reception");
    });
};