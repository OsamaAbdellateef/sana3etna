import React from 'react';
import './App.css';
import Header from './components/header/header.component';
import Carousel from './components/carousel/carousel.component';
import { Router, Route, Switch, Link, BrowserRouter , Redirect } from 'react-router-dom';
import Home from './pages/homePage/Home';
import SignIn from './components/sign-in/sign-in.component';
import SignPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import About from './pages/about/about';
import Footer from './components/footer/footer.component';
import IconButton from './components/icon-button/icon-button.component'
import { auth, createUserProfileDocument } from './../src/firebase/firebase.utils';
import IctonButotn from './components/icon-button/icon-button.component';
import Signup from './components/signup/signup.component';
import CraftPreview from './components/craft-preview/craft-preview.component';
import { setCurrentUser } from './redux/user/user.actions';
import { connect } from 'react-redux';

class App extends React.Component {


  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapshot => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          })
        })
      }

      setCurrentUser(userAuth
      );
      createUserProfileDocument(userAuth);
    });
  }

  render() {
    return (
      <div className="App">
        <Header />
        <BrowserRouter>
          <Route exact path="/" component={Home} />

          <Route 
          exact
           path="/signin"
             render = {() => this.props.currentUser ? 
             (<Redirect to='/' />) 
             : (<SignIn />)} />

          <Route path="/about" component={About} />
          <Route path="/crafts" component={CraftPreview} />
          <Route exact
           path="/signup" 
           render={() => this.props.currentUser ? 
          (<Redirect to='/' />):
          (<Signup />)} />
        </BrowserRouter>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => {
  return {
    currentUser: user.currentUser,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentUser: (user) => dispatch(setCurrentUser(user),
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
