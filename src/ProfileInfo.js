import React from 'react';
//import "./ProfileInfo.css"

class ProfileInfo extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let profile = this.props.profile;
        return (
            <div className="card " style={{width: "14rem"}}>
                <img src={profile.avatar} alt="avatar" className="card-img-top border border-dark border-3 rounded" />
                <div className="card-body py-2">
                    <h5 className="card-subtitle">{profile.personaname}</h5>
                </div>
            </div>
        )
    }
}

export default ProfileInfo;