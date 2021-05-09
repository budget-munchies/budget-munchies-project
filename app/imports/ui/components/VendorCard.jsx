import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single vendor. See pages/ListVendors.jsx. */
class Vendor extends React.Component {
  render() {
    const vend = this.props.vendor;
    return (
      <Card centered>
        <Card.Content>
          <Image
            floated='right'
            size='mini'
            src= {vend.image}
          />
          <Card.Header> {vend.name} </Card.Header>
          <Card.Meta>
            <Icon color='red' name='map pin'/>
            {vend.address}
          </Card.Meta>
          <Card.Description>
            {vend.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <a href={vend.link}> Visit them here! </a>
        </Card.Content>
        {/*
        <Card.vendent extra>
          <Link to={`/edit/${this.props.vendact._id}`}>Edit</Link>
        </Card.vendent>
        */}
      </Card>
    );
  }
}

// Require a document to be passed to this component.
Vendor.propTypes = {
  vendor: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Vendor);
