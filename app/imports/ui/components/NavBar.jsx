import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Header, Input } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {
  render() {
    return (
      <Menu attached="top" borderless id='navbar'>
        <Menu.Item as={NavLink} activeClassName="" exact to="/">
          <Header as='h1' className='text'>Budget Munchies</Header>
        </Menu.Item>
        {this.props.currentUser ? (
          [<Menu.Item as={NavLink} activeClassName="" exact to="/" className='text' key='home'>Home</Menu.Item>,
            <Menu.Item as={NavLink} activeClassName="active" exact to="/add" key='add' className='text'>Add Recipes</Menu.Item>,
            <Menu.Item as={NavLink} activeClassName="active" exact to="/list" key='list' className='text'>My Recipes</Menu.Item>,
            <Menu.Item key='dropdown'>
              <Dropdown pointing text='Browse Recipes' className='text'>
                <Dropdown.Menu id='dropdown'>
                  <Dropdown.Item as={NavLink} activeClassName="active" exact to="/breakfast" key='breakfast' text='Breakfast' />
                  <Dropdown.Item as={NavLink} activeClassName="active" exact to="/lunch" key='lunch' text='Lunch' />
                  <Dropdown.Item as={NavLink} activeClassName="active" exact to="/dinner" key='dinner' text='Dinner' />
                  <Dropdown.Item as={NavLink} activeClassName="active" exact to="/dessert" key='dessert' text='Dessert' />
                  <Dropdown.Item as={NavLink} activeClassName="active" exact to="/snacks" key='snacks' text='Snacks' />
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Item>,
            <Menu.Item key='search' position="right"><Input icon='search' placeholder='Find a Recipe'/></Menu.Item>]
        ) : ''}
        {/* Change admin to vendors and have vendors see statistics on popular food items/ingredients maybe */}
        {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
          <Menu.Item as={NavLink} activeClassName="active" exact to="/admin" key='admin' className='text'>Admin</Menu.Item>
        ) : ''}
        <Menu.Item className='text'>
          {this.props.currentUser === '' ? (
            <Dropdown text="Login" pointing icon={'user'}>
              <Dropdown.Menu id='dropdown'>
                <Dropdown.Item id="login-dropdown-sign-in" icon="user" text="Sign In" className='text' as={NavLink} exact to="/signin"/>
                <Dropdown.Item id="login-dropdown-sign-up" icon="add user" text="Sign Up" className='text' as={NavLink} exact to="/signup"/>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Dropdown id="navbar-current-user" text={this.props.currentUser} pointing className='text' icon={'user'}>
              <Dropdown.Menu id='dropdown'>
                <Dropdown.Item icon="sign out" text="Sign Out" className='text' id="login-dropdown-sign-out" as={NavLink} exact to="/signout"/>
                <Dropdown.Item icon="heart outline" text="My Favorites" className='text' id="login-dropdown-favorites" as={NavLink} exact to="/favorite"/>
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
