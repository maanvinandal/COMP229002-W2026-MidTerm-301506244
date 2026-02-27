let BookModel = require('../models/books');

/**
 * GET ONE BOOK
 */
module.exports.getBook = async function (req, res, next) {
  try {
    let book = await BookModel.findById(req.params.bookId);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found."
      });
    }

    res.json({
      success: true,
      message: "Book retrieved successfully.",
      data: book
    });

  }
   catch (error) {
    next(error);
  }
};


/**
 * CREATE BOOK
 */
module.exports.create = async function (req, res, next) {
  try {
    
    let book = req.body;
    let result = await BookModel.create(book);
    res.status(200).json({
      success: true,
      message: "Book created successfully.",
      data: result
    });

  }
   catch (error) {
    next(error);
  }
};


/**
 * GET ALL BOOKS
 */
module.exports.getAll = async function (req, res, next) {
  try {
    let list = await BookModel.find();

    res.json({
      success: true,
      message: "Book list retrieved successfully.",
      data: list
    });

  } catch (error) {
    next(error);
  }
};


/**
 * UPDATE BOOK
 */
module.exports.update = async function (req, res, next) {
  try {

    let result = await BookModel.updateOne(
      { _id: req.params.bookId },   // FIXED
      req.body
    );

    if (result.modifiedCount > 0) {
      res.json({
        success: true,
        message: "Book updated successfully."
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Book not found or not updated."
      });
    }

  } catch (error) {
    next(error);
  }
};


/**
 * DELETE BOOK
 */
module.exports.remove = async function (req, res, next) {
  try {

    let result = await BookModel.deleteOne({ _id: req.params.bookId }); // FIXED

    if (result.deletedCount > 0) {
      res.json({
        success: true,
        message: "Book deleted successfully."
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Book not found."
      });
    }

  } catch (error) {
    next(error);
  }
};