import React from 'react';
import { Button, TextField } from 'plugin-api/beta/client/components/ui';

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
        console.log("submitted");
        event.preventDefault();
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

export default UserAvatarSet;
