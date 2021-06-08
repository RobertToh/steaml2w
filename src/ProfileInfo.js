import React from 'react';

class ProfileInfo extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let profile = this.props.profile;
        return (
        <div>
            <img src={profile.avatar} alt="avatar"/>
            <h3>{profile.personaname}</h3>
        </div>
        )
    }
}

export default ProfileInfo;