import React from 'react';
import { Segment } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SubmitField, TextField, HiddenField } from 'uniforms-semantic';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Comments } from '../../api/comment/Comments';

const bridge = new SimpleSchema2Bridge(Comments.schema);

/** Renders the Page for adding a document. */
class AddComment extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    const { comment, vendorId } = data;
    const owner = Meteor.user().username;
    Comments.collection.insert({ comment, owner, vendorId },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Thank you for leaving a comment!', 'success');
          formRef.reset();
        }
      });
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
    let fRef = null;
    return (
      <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
        <Segment>
          <TextField label="Comment on your experience with this vendor" name='comment'/>
          <SubmitField value='Submit'/>
          <ErrorsField/>
          <HiddenField name='owner' value={this.props.owner}/>
          <HiddenField name='vendorId' value={this.props.vendorId}/>
        </Segment>
      </AutoForm>
    );
  }
}

AddComment.propTypes = {
  owner: PropTypes.string.isRequired,
  vendorId: PropTypes.string.isRequired,
};

export default AddComment;
