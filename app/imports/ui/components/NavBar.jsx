import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Header } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {
  render() {
    const midColor = { backgroundColor: '#7f9ab5' };
    return (
      <Menu attached="top" borderless id='navbar'>
        <Menu.Item as={NavLink} activeClassName="" exact to="/">
          <Header as='h1' className='text'>Budget Munchies</Header>
        </Menu.Item>
        {this.props.currentUser ? (
          [
            <Menu.Item key='dropdown'>
              <Dropdown id="navbar-user-dropdown" pointing text='Browse Recipes' className='text'>
                <Dropdown.Menu id='dropdown'>
                  <Dropdown.Item id="navbar-dropdown-breakfast" as={NavLink} activeClassName="active" exact to="/breakfast" key='breakfast' text='Breakfast' />
                  <Dropdown.Item id="navbar-dropdown-lunch" as={NavLink} activeClassName="active" exact to="/lunch" key='lunch' text='Lunch' />
                  <Dropdown.Item id="navbar-dropdown-dinner" as={NavLink} activeClassName="active" exact to="/dinner" key='dinner' text='Dinner' />
                  <Dropdown.Item id="navbar-dropdown-dessert" as={NavLink} activeClassName="active" exact to="/dessert" key='dessert' text='Dessert' />
                  <Dropdown.Item id="navbar-dropdown-snacks" as={NavLink} activeClassName="active" exact to="/snacks" key='snacks' text='Snacks' />
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Item>,
            <Menu.Item id='navbar-add-recipe' as={NavLink} activeClassName="active" exact to="/add" key='add' className='text'>Add Recipes</Menu.Item>,
            <Menu.Item id= 'navbar-list-recipes' as={NavLink} activeClassName="active" exact to="/list" key='list' className='text'>My Recipes</Menu.Item>,
            <Menu.Item id= 'navbar-list-vendors' as={NavLink} activeClassName="active" exact to="/vendors" key='vendors' className='text'>Vendors</Menu.Item>,
          ]
        ) : ''}
        {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
          <Menu.Item key='dropdown'>
            <Dropdown id="navbar-admin-dropdown" pointing text='Admin Features'>
              <Dropdown.Menu id='dropdown'>
                <Dropdown.Item id="navbar-admin-dropdown-all-recipes" as={NavLink} activeClassName="active" exact to="/allrecipes" key='allrecipes' text='All Recipes' />
                <Dropdown.Item id="navbar-admin-dropdown-add-vendor" as={NavLink} activeClassName="active" exact to="/addvendor" key='addvendor' text='Add Vendor' />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        ) : ''}
        <Menu.Item className='text' position='right'>
          {this.props.currentUser === '' ? (
            <Dropdown id="login-dropdown" text="Login" pointing="top right" icon={'user'}>
              <Dropdown.Menu style={midColor}>
                <Dropdown.Item id="login-dropdown-sign-in" icon="user" text="Sign In" as={NavLink} exact to="/signin"/>
                <Dropdown.Item id="login-dropdown-sign-up" icon="add user" text="Sign Up" as={NavLink} exact to="/signup"/>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Dropdown id="navbar-current-user" text={this.props.currentUser} pointing="top right" className='text' icon={'user'}>
              <Dropdown.Menu style={midColor}>
                <Dropdown.Item icon="user outline" text="My Profile" className='text' id="login-dropdown-profile" as={NavLink} exact to="/userpage"/>
                <Dropdown.Item icon="heart outline" text="My Favorites" className='text' id="login-dropdown-favorites" as={NavLink} exact to="/favorite"/>
                <Dropdown.Item icon="sign out" text="Sign Out" className='text' id="navbar-sign-out" as={NavLink} exact to="/signout"/>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Menu.Item>
      </Menu>
    );
  }
}

// Declare the types of all properties.
NavBar.propTypes = {
  currentUser: PropTypes.string,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
const NavBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(NavBar);

// Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter
export default withRouter(NavBarContainer);
