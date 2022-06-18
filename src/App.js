import { Route, Routes, Navigate } from "react-router-dom";

import "./App.css";
import Profile from "./routes/profile/profile.component";
import ContactPage from "./routes/contact/contact.component";
import Navigation from "./routes/navigation/navigation.component";
import { useContext } from "react";
import { UserContext } from "./contexts/user.context";
import { SignInAndSignUpPage } from "./routes/sign-in-and-sign-up/sign-in-and-sign-up.component";
import Groups from "./routes/groups/groups.component";
import GroupMenu from "./components/group-menu/group-menu.component";
import QuizMenu from "./routes/quiz-menu/quiz-menu.component";
import JoinedGroupMenu from "./components/joinedGroupMenu/joinedGroupMenu.component";
import StartQuiz from "./routes/startQuiz/startQuiz.component";
import Home from "./routes/home/home.component";

const App = () => {
  const { currentUser } = useContext(UserContext);
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route path="/" element={<Home />} />
        <Route path="/groups" element={<Groups />} />
        <Route
          path="/auth"
          element={
            currentUser ? (
              <Navigate replace to="/groups" />
            ) : (
              <SignInAndSignUpPage />
            )
          }
        />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          exact
          path={`/group/:GroupTitle`}
          element={<JoinedGroupMenu />}
        />
        <Route
          exact
          path={`/group/:GroupTitle/:QuizTitle`}
          element={<StartQuiz />}
        />
        <Route exact path={`/groups/:code`} element={<GroupMenu />} />
        <Route exact path={`/groups/:code/quiz/:id`} element={<QuizMenu />} />
      </Route>
    </Routes>
  );
};

export default App;
