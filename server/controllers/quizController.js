import Question from '../models/questionModel.js';
import Quiz from '../models/quizModel.js';
import { QUIZ_TYPE } from '../utils/constants.js';

const quizController = {
  createQuiz: async (req, res) => {
    try {
      const { title, description, visibility, type, user, imageURL } = req.body;
      let newQuiz = { title, description, visibility, type, user };
      if (imageURL) {
        newQuiz = { ...newQuiz, imageURL };
      }
      const insertedQuiz = await Quiz.create(newQuiz);

      res.json({
        msg: 'Created quiz!',
        newQuiz: {
          ...newQuiz,
          quizId: insertedQuiz._id,
          user: req.user,
        },
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getQuizzes: async (req, res) => {
    try {
      const quizzes = await Quiz.find({
        user: req.params.userId,
        $or: [{ isDeleted: false }, { isDeleted: { $exists: false } }],
        type: { $in: [QUIZ_TYPE.QUIZ] },
      })
        .sort({ createdAt: 'desc' })
        .exec();
      res.json({
        msg: `All quizzes of userId ${req.body.user}`,
        quizzes,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getQuizById: async (req, res) => {
    try {
      const foundQuiz = await Quiz.findOne({ _id: req.params.quizId });
      const questionIdList = foundQuiz.questions;
      const questionList = await Question.find({ _id: { $in: questionIdList } }).exec();
      foundQuiz.questions = questionList;
      const sentData = { ...foundQuiz._doc };
      console.log('sentData in getQuizById', sentData);
      res.json({
        msg: `Get quiz with id ${req.params.quizId}`,
        quiz: sentData,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  updateQuiz: async (req, res) => {
    try {
      const { title, description, visibility, numberOfQuestions, imageURL } = req.body;
      const newQuiz = { title, description, visibility, numberOfQuestions, imageURL };
      const quiz = await Quiz.findOneAndUpdate({ _id: req.params.quizId }, newQuiz, { new: true });

      res.json({
        msg: `Updated Quiz`,
        quiz,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  deleteQuiz: async (req, res) => {
    try {
      const quiz = await Quiz.findOneAndUpdate(
        { _id: req.params.quizId },
        { $set: { isDeleted: true } },
        { new: true },
      );
      res.json({
        msg: `Deleted Quiz`,
        quiz,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};
export default quizController;
