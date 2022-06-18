import { ReactComponent as Logo } from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import CustomButton from "../../components/custom-button/custom-button.component";
import "./home.styles.scss";
const Home = () => {
  return (
    <div className="homepage">
      <div className="logo-container">
        <Logo className="logo" />
      </div>
      <div className="text-presentation">
        <h1>Welcome to Quiz App</h1>
        <p>
          A quiz is a form of game or mind sport in which players attempt to
          answer questions correctly about a certain or variety of subjects.
          Quizzes can be used as a brief assessment in education and similar
          fields to measure growth in knowledge, abilities, or skills.
        </p>
        <p>
          Here at Quiz App we take the fun and efficiency of the quizzes a step
          further, join us and let's start quizzing.
        </p>
        <Link to="/auth">
          <CustomButton type="button">Join</CustomButton>
        </Link>
      </div>
    </div>
  );
};

export default Home;
