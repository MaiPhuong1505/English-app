import { getDataAPI, postDataAPI, putDataAPI } from '../utils/fetchData';

export const quizServices = {
  createQuiz: async (data, token) => {
    return await postDataAPI('quiz/create', data, token);
  },
  getQuizzes: async (userId, token) => {
    return await getDataAPI(`quiz/all/${userId}`, token);
  },
  getQuizById: async (quizId, token) => {
    return await getDataAPI(`quiz/${quizId}`, token);
  },
  updateQuiz: async (quizId, data, token) => {
    return await putDataAPI(`quiz/${quizId}`, data, token);
  },
  createQuestion: async (data, token) => {
    return await postDataAPI('question/create', data, token);
  },
  getQuestionById: async (questionId, token) => {
    return await getDataAPI(`question/${questionId}`, token);
  },
  updateQuestion: async (questionId, data, token) => {
    return await putDataAPI(`quiz/${questionId}`, data, token);
  },
};
