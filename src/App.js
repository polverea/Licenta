import { Route, Routes } from "react-router-dom";

import "./App.css";
import Profile from "./routes/profile/profile.component";
import Authentication from "./routes/authentication/authentication.component";
import ContactPage from "./routes/contact/contact.component";
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route path="/home" element={<Home />} />
        <Route path="/auth" element={<Authentication />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
};

export default App;
