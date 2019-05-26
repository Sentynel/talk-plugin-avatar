import React from 'react';
import { Alert, Button, TextField } from 'plugin-api/beta/client/components/ui';
import { withMutation, withFragments } from 'plugin-api/beta/client/hocs';
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

const withGetAvatar = withFragments({
  root: gql`
    fragment GetMyAvatar on RootQuery {
      me {
        avatar
      }
    }`
});

class UserAvatarSet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: '', button: 'Set avatar', error: ''};
        if (props.root.me.avatar) {
            this.state.value = props.root.me.avatar;
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        var url = event.target.value;
        var error = '';
        if (!/\.(?:png|jpg|jpeg|gif)$/.test(url)) {
            error = 'Your URL should end with .png or .jpg - try right clicking the image you want and \'Copy image address\'.';
        } /*else if (/^http:\/\//.test(url)) {
            error = 'http:// images may not work in all browsers - use a host which supports https://';
        }*/
        this.setState({value: url, button: 'Set avatar', error: error});
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
            <p>Set an avatar image here. It will need to be hosted elsewhere - we recommend <a href="https://imgur.com" target="_blank">Imgur</a>. Upload the image, then once it's done uploading, right click it and select "Copy image address", and paste that into the box. Please try and keep avatars small - you can use Imgur's resize tool (hover over the image, click the dropdown, click "Edit image", and resize to 100x100 or so, then "Apply" and "Save").</p>
            <form onSubmit={this.handleSubmit}>
            <TextField type="url" label="Avatar URL" value={this.state.value} onChange={this.handleChange} />
            { this.state.error && <Alert>{this.state.error}</Alert> }
            <Button type="submit">{this.state.button}</Button>
            </form>
            </section>;
    }
}

export default withGetAvatar(withSetAvatar(UserAvatarSet));
