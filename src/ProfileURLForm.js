import React from 'react';


class ProfileURLForm extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.props.onURLChange(event.target.value);
    }

    handleSubmit(event) {
        this.props.onSubmit(event);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="px-0">
                <label className="w-50">
                    <input type="text" className="form-control" value={this.props.url} onChange={this.handleChange} placeholder="Enter Steam Profile URL" />
                </label>
            </form>
        );
    }
}

export default ProfileURLForm;
