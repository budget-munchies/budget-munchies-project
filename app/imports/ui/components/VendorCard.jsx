import React from 'react';
import { Card, Icon, Image, Feed } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import UserComment from './UserComment';
import AddComment from '../pages/AddComment';

/** Renders a single vendor. See pages/ListVendors.jsx. */
class VendorCard extends React.Component {
  render() {
    return (
      <Card centered>
        <Card.Content extra>
          <Link to={`/editvendor/${this.props.vendor._id}`}>Edit</Link>
        </Card.Content>
        <Card.Content>
          <Image
            floated='right'
            size='mini'
            src= {this.props.vendor.image}
          />
          <Card.Header> {this.props.vendor.name} </Card.Header>
          <br/>
          <Card.Meta>
            <Icon color='red' name='map pin'/>
            {this.props.vendor.address}
          </Card.Meta>
          <Card.Description>
            {this.props.vendor.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          {/* eslint-disable-next-line react/jsx-no-target-blank */}
          <a href={this.props.vendor.link} target="_blank"> Visit them here! </a>
        </Card.Content>
        {/*
        <Card.Content extra>
          <Link to={`/edit/${this.props.contact._id}`}>Edit</Link>
        </Card.Content>
        */}
        <Card.Content extra>
          <Feed>
            {this.props.comment.map((comment, index) => <UserComment key={index} comment={comment}/>)}
          </Feed>
        </Card.Content>
        <Card.Content extra>
          <AddComment owner={this.props.vendor.owner} vendorId={this.props.vendor._id}/>
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
VendorCard.propTypes = {
  vendor: PropTypes.object.isRequired,
  comment: PropTypes.array.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(VendorCard);
