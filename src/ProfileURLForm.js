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
            <form onSubmit={this.handleSubmit}>
                <label>
                    <input type="text" value={this.props.url} onChange={this.handleChange} placeholder="Enter Steam Profile URL" size="60" />
                </label>
            </form>
        );
    }
}

export default ProfileURLForm;

// class ProfileURLForm extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = { value: '' };

//         this.handleChange = this.handleChange.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this);
//     }

//     handleChange(event) {
//         this.setState({ value: event.target.value });
//     }

//     handleSubmit(event) {
//         fetchProfileHours("76561198057982541").then(res => console.log(res));
//         event.preventDefault();
//     }

//     render() {
//         return (
//             <form onSubmit={this.handleSubmit}>
//                 <label>
//                     <input type="text" value={this.state.value} onChange={this.handleChange} placeholder="https://steamcommunity.com/profiles/XXXXXXXXXXXXXXXXX" size="60" />
//                 </label>
//             </form>
//         );
//     }
// }