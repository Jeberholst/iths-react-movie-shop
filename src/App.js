import './App.css';
import React from 'react';
import Navbar from './components/navbar/Navbar';
import  {
    Route,
    Switch,
    BrowserRouter as Router
} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import CommentPage from "./pages/CommentPage";
import LoginPage from "./pages/LoginPage";
import ShoppingCartPage from "./pages/ShoppingCartPage";
import SearchPage from "./pages/SearchPage";
import ProfilePage from "./pages/ProfilePage";
import GenrePage from "./pages/GenrePage";
import SingelMoviePage from "./pages/SingelMoviePage"
import firebase from "firebase/app";
import "firebase/firestore";
import {firebaseConfig} from "./util/firebase";
import "firebase/auth";
import SnackBarsRedux from './util/SnackBarsRedux';
//import Loading from './components/Loading/LoadingIcon';
import FetcherAPI from './util/FetcherAPI';

firebase.initializeApp(firebaseConfig);

function App() {
  return (
      <div className="App">

      <Router  basename={`${process.env.PUBLIC_URL}/`}>
        
        <header className="App-NavBar">
          <Navbar/>
        </header>
        {/*<Loading/>*/}
        <div className='App-Main'>
                <div>
                    <Switch>
                        <Route exact path="/" component={LandingPage} />
                        <Route exact path="/genre/:id" component={GenrePage} />
                        <Route exact path="/comment" component={CommentPage} />
                        <Route exact path="/login" component={LoginPage} />
                        <Route exact path="/profile" component={ProfilePage} />
                        <Route exact path="/search" component={SearchPage} />
                        <Route exact path="/shopping-cart" component={ShoppingCartPage} />
                        <Route exact path="/movie/:id" component={SingelMoviePage}/>

                    </Switch>
                </div>
            

        </div>
        
      </Router>


      <SnackBarsRedux/>

    </div>
  );
}




export default App;
