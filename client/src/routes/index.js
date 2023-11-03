import CreateQuiz from '../pages/quiz/CreateQuiz';
import Home from '../pages/home';
import Login from '../pages/login';
import Playing from '../pages/playing';
import Profile from '../pages/profile';
import QuizPage from '../pages/quiz';
import CreateQuestion from '../components/question/CreateQuestion';
import UpdateQuiz from '../pages/quiz/UpdateQuiz';
import UpdateQuestion from '../components/question/UpdateQuestion';
import NotFound from '../pages/error/NotFound';
import ViewHistory from '../pages/view-history';
import ViewHistoryDetail from '../pages/view-history-detail';
import Reading from '../pages/reading';
import GrammarCheck from '../pages/grammar-check';

const publicRoutes = [
  { path: '/', component: Home },
  { path: '/login', component: Login, layout: null },
  { path: '/404', component: NotFound, layout: null },
  { path: '/profile', component: Profile },
  { path: '/quiz/:id', component: QuizPage },
  { path: '/createQuiz', component: CreateQuiz },
  { path: '/updateQuiz/:id', component: UpdateQuiz },
  { path: '/playing', component: Playing, layout: null },
  { path: '/playing/:id', component: Playing, layout: null },
  { path: '/createQuestion', component: CreateQuestion },
  { path: '/updateQuestion/:id', component: UpdateQuestion },
  { path: '/viewHistory', component: ViewHistory },
  { path: '/historyDetail/:id', component: ViewHistoryDetail },
  { path: '/speaking', component: Reading },
  { path: '/grammar', component: GrammarCheck },
];

const privateRoutes = [];

export { publicRoutes };
