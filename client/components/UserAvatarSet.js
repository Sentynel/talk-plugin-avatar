import React from 'react';

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
            <label>
            Avatar URL:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
            </form>
            </section>;
    }
}

export default UserAvatarSet;
