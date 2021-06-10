import React from 'react';
import "./ProfileInfo.css"

class ProfileInfo extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let profile = this.props.profile;
        return (
        <div className="profile-info">
            <img src={profile.avatar} alt="avatar"/>
            <span><h3>{profile.personaname}</h3></span>
        </div>
        )
    }
}

export default ProfileInfo;