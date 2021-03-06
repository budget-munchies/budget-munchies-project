import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import 'semantic-ui-css/semantic.css';
import { Roles } from 'meteor/alanning:roles';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Landing from '../pages/Landing';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import Admin from '../pages/Admin';
import AddRecipe from '../pages/AddRecipe';
import ListRecipes from '../pages/ListRecipes';
import NotFound from '../pages/NotFound';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import Signout from '../pages/Signout';
import Breakfast from '../pages/Breakfast';
import Lunch from '../pages/Lunch';
import Dinner from '../pages/Dinner';
import Dessert from '../pages/Dessert';
import Snack from '../pages/Snack';
import SingleRecipe from '../pages/SingleRecipe';
import EditRecipe from '../pages/EditRecipe';
import ListVendors from '../pages/ListVendors';
import AddVendor from '../pages/AddVendor';
import AllRecipes from '../pages/AllRecipes';
import EditVendor from '../pages/EditVendor';
import UserPage from '../pages/UserPage';

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar/>
          <Switch>
            <Route exact path="/" component={Landing}/>
            <Route path="/signin" component={Signin}/>
            <Route path="/signup" component={Signup}/>
            <Route path="/signout" component={Signout}/>
            <ProtectedRoute path="/list" component={ListRecipes}/>
            <ProtectedRoute path="/recipe/:_id" component={SingleRecipe}/>
            <ProtectedRoute path="/favorite" component={FavoriteRecipes}/>
            <ProtectedRoute path="/add" component={AddRecipe}/>
            <ProtectedRoute path="/vendors" component={ListVendors}/>
            <ProtectedRoute path="/dessert" component={Dessert}/>
            <ProtectedRoute path="/dinner" component={Dinner}/>
            <ProtectedRoute path="/snacks" component={Snack}/>
            <ProtectedRoute path="/breakfast" component={Breakfast}/>
            <ProtectedRoute path="/lunch" component={Lunch}/>
            <ProtectedRoute path="/editrecipe/:_id" component={EditRecipe}/>
            <ProtectedRoute path="/userpage" component={UserPage}/>
            <AdminProtectedRoute path="/admin" component={Admin}/>
            <AdminProtectedRoute path="/allrecipes" component={AllRecipes}/>
            <AdminProtectedRoute path="/addvendor" component={AddVendor}/>
            <AdminProtectedRoute path="/editvendor/:_id" component={EditVendor}/>
            <Route component={NotFound}/>
          </Switch>
          <Footer/>
        </div>
      </Router>
    );
  }
}

/**
 * ProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      return isLogged ?
        (<Component {...props} />) :
        (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
        );
    }}
  />
);

/**
 * AdminProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
      return (isLogged && isAdmin) ?
        (<Component {...props} />) :
        (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
        );
    }}
  />
);

// Require a component and location to be passed to each ProtectedRoute.
ProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  location: PropTypes.object,
};

// Require a component and location to be passed to each AdminProtectedRoute.
AdminProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  location: PropTypes.object,
};

export default App;
