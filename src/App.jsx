import { useState, useEffect, useReducer } from "react";
import DateCounter from "./DateCounter";
import Header from "./Header";
import MainContent from "./MainContent";

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };

    case "dataFailed":
      return { ...state, status: "error" };

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

  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: "dataReceived", payload: data });
      })
      .catch((error) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className='app'>
      <Header />

      <MainContent>
        <p>1/15</p>
        <p>Question?</p>
      </MainContent>
    </div>
  );
}

export default App;
