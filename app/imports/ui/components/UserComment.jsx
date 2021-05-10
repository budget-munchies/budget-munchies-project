import React from 'react';
import { Feed } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class UserComment extends React.Component {
  render() {
    return (
      <Feed.Event >
        <Feed.Content>
          <Feed.User> Posted by: {this.props.comment.owner}</Feed.User>
          <Feed.Summary>
            {this.props.comment.comment}
          </Feed.Summary>
        </Feed.Content>
      </Feed.Event>
    );
  }
}

// Require a document to be passed to this component.
UserComment.propTypes = {
  comment: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(UserComment);
