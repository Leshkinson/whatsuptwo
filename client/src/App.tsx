import React from 'react';
import './App.scss';
import {AppRoutes} from './routes/app.routes';
import {BrowserRouter} from "react-router-dom";
//import Header from "./components/header/Header";
//import MainContent from "./components/main-content/Main-content";

//import Footer from "./components/footer/Footer";

function App() {
  return (
      <BrowserRouter>
          <AppRoutes />
      </BrowserRouter>
      // <div className="App">
      //   {/*<Header/>*/}
      //   <MainContent/>
      //   {/*<Footer/>*/}
      // </div>
  );
}

export default App;
