import { Route, Routes, Navigate } from "react-router-dom";

import "./App.css";
import Profile from "./routes/profile/profile.component";
import ContactPage from "./routes/contact/contact.component";
import Navigation from "./routes/navigation/navigation.component";
import { useContext } from "react";
import { UserContext } from "./contexts/user.context";
import { SignInAndSignUpPage } from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import Groups from "./routes/groups/groups.component";
import GroupMenu from "./components/group-menu/group-menu.component";
import QuizMenu from "./routes/quiz-menu/quiz-menu.component";
const App = () => {
  const { currentUser } = useContext(UserContext);
  console.log(currentUser);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
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

        <Route exact path={`/groups/:code`} element={<GroupMenu />} />
        <Route exact path={`/groups/:code/quiz/:id`} element={<QuizMenu />} />
      </Route>
    </Routes>
  );
};

export default App;
