/* import { useState } from "react"; */
import DateCounter from "./DateCounter";
import Header from "./Header";
import MainContent from "./MainContent";

function App() {
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
