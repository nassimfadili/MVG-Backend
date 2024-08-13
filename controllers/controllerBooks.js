const { Book } = require("../models/Book");
const average = require("../utils/average");
const fs = require("fs");

async function postRating(req, res, next) {
  if (0 <= req.body.rating <= 5) {
    const ratingObject = { ...req.body, grade: req.body.rating };
    delete ratingObject._id;
    Book.findOne({ _id: req.params.id })
      .then((book) => {
        const newRatings = book.ratings;
        const userIdArray = newRatings.map((rating) => rating.userId);
        if (userIdArray.includes(req.auth.userId)) {
          res.status(403).json({ message: "Not authorized" });
        } else {
          newRatings.push(ratingObject);
          const grades = newRatings.map((rating) => rating.grade);
          const averageGrades = average.average(grades);
          book.averageRating = averageGrades;
          Book.updateOne(
            { _id: req.params.id },
            {
              ratings: newRatings,
              averageRating: averageGrades,
              _id: req.params.id,
            }
          )
            .then(() => {
              res.status(201).json();
            })
            .catch((error) => {
              res.status(400).json({ error });
            });
          res.status(200).json(book);
        }
      })
      .catch((error) => {
        res.status(404).json({ error });
      });
  } else {
    res
      .status(400)
      .json({ message: "La note doit être comprise entre 1 et 5" });
  }
}

async function getBooksWithBestRating(req, res, next) {
  Book.find()
    .sort({ averageRating: -1 })
    .limit(3)
    .then((books) => res.status(200).json(books))
    .catch((error) => res.status(404).json({ error }));
}

async function putBook(req, res, next) {
  if (!req.body) {
    return res
      .status(400)
      .json({ message: "Les données du livre sont manquantes" });
  }
  const bookObject = req.file
    ? {
        ...JSON.parse(req.body.book),
        imageUrl: `${req.protocol}://${req.get("host")}/images/resized_${
          req.file.filename
        }`,
      }
    : { ...req.body };
  delete bookObject._userId;
  Book.findOne({ _id: req.params.id })
    .then((book) => {
      if (book.userId != req.auth.userId) {
        res.status(403).json({ message: "403: unauthorized request" });
      } else {
        const filename = book.imageUrl.split("/images/")[1];
        req.file &&
          fs.unlink(`images/${filename}`, (err) => {
            if (err) console.log(err);
          });
        Book.updateOne(
          { _id: req.params.id },
          { ...bookObject, _id: req.params.id }
        )
          .then(() => res.status(200).json({ message: "Objet modifié !" }))
          .catch((error) => res.status(400).json({ error }));
      }
    })
    .catch((error) => {
      res.status(404).json({ error });
    });
}

async function deleteBook(req, res, next) {
  Book.findOne({ _id: req.params.id })
    .then((book) => {
      if (book.userId != req.auth.userId) {
        res.status(403).json({ message: "403: unauthorized request" });
      } else {
        const filename = book.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          Book.deleteOne({ _id: req.params.id })
            .then(() => {
              res.status(200).json({ message: "Objet supprimé !" });
            })
            .catch((error) => res.status(400).json({ error }));
        });
      }
    })
    .catch((error) => {
      res.status(404).json({ error });
    });
}

async function getBook(req, res, next) {
  Book.findOne({ _id: req.params.id })
    .then((book) => res.status(200).json(book))
    .catch((error) => res.status(404).json({ error }));
}

function postBooks(req, res, next) {
  if (!req.auth || !req.auth.userId) {
    return res.status(401).json({ error: "Utilisateur non authentifié" });
  }

  if (!req.body.book || !req.file) {
    return res
      .status(400)
      .json({ message: "Données du livre manquantes ou incomplètes" });
  }

  let bookObject;
  try {
    bookObject = JSON.parse(req.body.book);
  } catch (error) {
    return res.status(400).json({ error });
  }

  if (
    !bookObject.title ||
    !bookObject.author ||
    !bookObject.year ||
    !bookObject.genre
  ) {
    return res
      .status(400)
      .json({ message: "Informations du livre incomplètes" });
  }

  delete bookObject._id;
  delete bookObject._userId;

  const book = new Book({
    ...bookObject,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get("host")}/images/resized_${
      req.file.filename
    }`,
    averageRating:
      bookObject.ratings && bookObject.ratings[0]
        ? bookObject.ratings[0].grade
        : 0,
  });

  book
    .save()
    .then(() => {
      res.status(201).json({ message: "Livre enregistré !" });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
}

async function getBooks(req, res, next) {
  Book.find()
    .then((books) => res.status(200).json(books))
    .catch((error) => res.status(404).json({ error }));
}

module.exports = {
  postRating,
  getBooksWithBestRating,
  putBook,
  deleteBook,
  getBook,
  postBooks,
  getBooks,
};
