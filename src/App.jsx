import { useEffect, useReducer } from "react";

import DateCounter from "./DateCounter";
import Header from "./Header";
import MainContent from "./MainContent";
import Loader from "./Loader.jsx";
import Error from "./Error.jsx";
import StartScreen from "./StartScreen.jsx";
import Question from "./Question.jsx";

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };

    case "dataFailed":
      return { ...state, status: "error" };

    case "start":
      return { ...state, status: "active" };

    default:
      throw new Error("Unknown action type");
  }
}

function App() {
  const initialState = {
    questions: [],
    //loading, errror, ready, active, finished
    status: "loading",
  };

  const [{ questions, status }, dispatch] = useReducer(reducer, initialState);
  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: "dataReceived", payload: data });
      })
      .catch(() => dispatch({ type: "dataFailed" }));
  }, []);
  const numQuestions = questions.length;
  return (
    <div className='app'>
      <Header />

      <MainContent>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen
            numQuestions={numQuestions}
            dispatch={dispatch}
          />
        )}
        {status === "active" && <Question />}
      </MainContent>
    </div>
  );
}

export default App;
