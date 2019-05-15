import React from 'react';
import { Button, TextField } from 'plugin-api/beta/client/components/ui';
import { withMutation } from 'plugin-api/beta/client/hocs';
import { gql } from 'react-apollo';

const withSetAvatar = withMutation(
  gql`
    mutation SetAvatar($avatar: String!) {
      setAvatar(avatar: $avatar) {
        errors {translation_key}
      }
    }
  `,
  {
    props: ({ mutate }) => ({
      setAvatar: avatar => {
        return mutate({
          variables: {
            avatar,
          },
        });
      },
    }),
  }
);

class UserAvatarSet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: '', button: 'Set avatar'};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value, button: 'Set avatar'});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.setAvatar(this.state.value)
        .then(result => {this.setState({button: 'Set avatar ✓'});})
        .catch(result => {this.setState({button: 'Set avatar x'});});
    }

    render() {
        return <section className={'talk-plugin-avatar-section'}>
            <h3>Avatar</h3>
            <p>Set an avatar image here. It will need to be hosted elsewhere - we recommend <a href="https://imgur.com">Imgur</a>. Upload the image, then once it's done uploading, right click it and select "Copy image address", and paste that into the box. Please try and keep avatars small - you can use Imgur's resize tool (hover over the image, click the dropdown, click "Edit image", and resize to 100x100 or so, then "Apply" and "Save").</p>
            <form onSubmit={this.handleSubmit}>
            <TextField type="url" label="Avatar URL" value={this.state.value} onChange={this.handleChange} />
            <Button type="submit">{this.state.button}</Button>
            </form>
            </section>;
    }
}

export default withSetAvatar(UserAvatarSet);
