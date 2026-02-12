const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    feedback: {
      type: String,
      required: true,
      trim: true,
    },
    suggestions: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
    },
    meal: {
      type: String,
      required: true,
      enum: ["Breakfast", "Lunch", "Dinner"],
    },
    rating: {
      type: Number,
      enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      required: true,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    submissionDate:{
        type:Date,
        required:true,
    }
  },
  { timestamps: true },
);
const Feedback = mongoose.model("Feedback", feedbackSchema);
module.exports = Feedback;
