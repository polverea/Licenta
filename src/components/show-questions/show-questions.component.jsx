import "./show-questions.styles.scss";

const ShowQuestions = ({ question }) => {
  return (
    <div className="questions-container">
      <table>
        <tr>
          <th>Question: {question.question}</th>
        </tr>
        <div className="questions">
          <tr>
            <td>a: {question.ans1}</td>
          </tr>
          <tr>
            <td>b: {question.ans2}</td>
          </tr>
          <tr>
            <td>c: {question.ans3}</td>
          </tr>
          <tr>
            <td>d: {question.ans4}</td>
          </tr>
          <div className="points-correct">
            <tr>
              <td>
                <b> Points: {question.points} </b>
              </td>
            </tr>
            <tr>
              <td>
                <b>Correct answer: {question.rightAns}</b>
              </td>
            </tr>
          </div>
        </div>
      </table>
    </div>
  );
};

export default ShowQuestions;
