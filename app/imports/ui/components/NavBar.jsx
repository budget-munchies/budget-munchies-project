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
    const menuStyle = { marginBottom: '10px' };
    return (
      <Menu style={menuStyle} attached="top" borderless id='navbar'>
        <Menu.Item as={NavLink} activeClassName="" exact to="/">
          <Header as='h1' className='text'>Budget Munchies</Header>
        </Menu.Item>
        {this.props.currentUser ? (
          [<Menu.Item as={NavLink} activeClassName="active" exact to="/home" key='home' className='text'>Home</Menu.Item>,
            <Menu.Item as={NavLink} activeClassName="active" exact to="/add" key='add' className='text'>Add Recipes</Menu.Item>,
            <Menu.Item as={NavLink} activeClassName="active" exact to="/list" key='list' className='text'>Recipes List</Menu.Item>,
            <Menu.Item as={NavLink} activeClassName="active" exact to="/vendor" key='vendor' className='text'>Vendors</Menu.Item>,
            <Menu.Item>
              <Dropdown className='text' text='Browse Recipes'>
                <Dropdown.Menu>
                  <Dropdown.Item className='items' text='Breakfast' />
                  <Dropdown.Item className='items' text='Lunch' />
                  <Dropdown.Item className='items' text='Dinner' />
                  <Dropdown.Item className='items' text='Dessert' />
                  <Dropdown.Item className='items' text='Snacks' />
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Item>,
            <Menu.Item position="right" as={NavLink} activeClassName="active" exact to="/search" key='search' className='text'><Input icon='search' placeholder='Find a Recipe'/></Menu.Item>]
        ) : ''}
        {/*Change admin to vendors and have vendors see statistics on popular food items/ingredients maybe*/}
        {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
          <Menu.Item as={NavLink} activeClassName="active" exact to="/admin" key='admin' className='text'>Admin</Menu.Item>
        ) : ''}
        <Menu.Item>
          {this.props.currentUser === '' ? (
            <Dropdown id="login-dropdown" text="Login" pointing="top right" icon={'user'}>
              <Dropdown.Menu>
                <Dropdown.Item id="login-dropdown-sign-in" icon="user" text="Sign In" as={NavLink} exact to="/signin"/>
                <Dropdown.Item id="login-dropdown-sign-up" icon="add user" text="Sign Up" as={NavLink} exact to="/signup"/>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Dropdown id="navbar-current-user" text={this.props.currentUser} pointing="top right" className='text' icon={'user'}>
              <Dropdown.Menu>
                <Dropdown.Item id="navbar-sign-out" icon="sign out" text="Sign Out" as={NavLink} exact to="/signout"/>
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
