const db = require("../models");
const Friend = db.friends;

// Create and Save a new Friend
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Friend
  const friend = new Friend({
    title: req.body.title,
    description: req.body.description,
    status: req.body.status ? req.body.status : false
  });

  // Save Friend in the database
  friend
    .save(friend)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Friend."
      });
    });
};

// Retrieve all Friend from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Friend.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving friends."
      });
    });
};

// Find a single Friend with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Friend.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Friend with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Friend with id=" + id });
    });
};

// Update a Friend by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Friend.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Friend with id=${id}. Maybe Friend was not found!`
        });
      } else res.send({ message: "Friend was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Friend with id=" + id
      });
    });
};

// Delete a Friend with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Friend.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Friend with id=${id}. Maybe Friend was not found!`
        });
      } else {
        res.send({
          message: "Friend was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Friend with id=" + id
      });
    });
};

// Delete all Friend from the database.
exports.deleteAll = (req, res) => {
  Friend.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Friend were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all friends."
      });
    });
};

// Find all status Friend
exports.findAllStatus = (req, res) => {
  Friend.find({ status: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving friends."
      });
    });
};
