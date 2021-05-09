import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Vendors } from '../../api/vendor/Vendor';
import VendorCard from '../components/VendorCard';

/** Renders a table containing all of the Recipes documents. Use <StuffItem> to render each row. */
class ListVendors extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting Vendors</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    const headerStyle = { paddingTop: '15px', color: '#3E546A' };

    return (
      <Container id="list-vendors-page">
        <Header as="h2" textAlign="center" style={headerStyle}> Recommended Vendors </Header>
        <Card.Group itemsPerRow={4}>{
          this.props.vendors.map((vendor, index) => <VendorCard key={index} vendor={vendor}/>)}
        </Card.Group>
      </Container>
    );
  }
}

// Require an array of Recipes documents in the props.
ListVendors.propTypes = {
  vendors: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Recipes documents.
  const subscription = Meteor.subscribe(Vendors.adminPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Recipes documents
  const vendors = Vendors.collection.find({}).fetch();
  return {
    vendors,
    ready,
  };
})(ListVendors);
