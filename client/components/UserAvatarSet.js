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
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.setAvatar(this.state.value);
    }

    render() {
        return <section className={'talk-plugin-avatar-section'}>
            <h3>Avatar</h3>
            <form onSubmit={this.handleSubmit}>
            <TextField type="url" label="Avatar URL" value={this.state.value} onChange={this.handleChange} />
            <Button type="submit">Set avatar</Button>
            </form>
            </section>;
    }
}

export default withSetAvatar(UserAvatarSet);
