import mongoose from "mongoose";

const question = new mongoose.Schema({
  quizTitle: {
    type: String,
    required: true,
  },
  questions: [
    {
      questionType: {
        type: String,
        required: true,
      },
      question: {
        type: String,
        required: true,
      },
      answers: ["Mixed"],
      correctAnswer: {
        type: Number, 
      },
      point: {
        type: Number,
      },
    },
  ],
});

export default mongoose.model("question", question);
