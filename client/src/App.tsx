import React from 'react';
import './App.css';
import Header from "./components/header/Header";
import MainContent from "./components/main-content/Main-content";
import Footer from "./components/footer/Footer";

function App() {
  return (
      <div className="App">
        <Header></Header>
        <MainContent></MainContent>
        <Footer></Footer>
      </div>
  );
}

export default App;
