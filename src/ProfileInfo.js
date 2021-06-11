import React from 'react';
//import "./ProfileInfo.css"

class ProfileInfo extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let profile = this.props.profile;
        return (
        // <div className="justify-content-md-center">
        //     <div className="col-auto">
        //         <img src={profile.avatar} alt="avatar" className="border border-dark border-3 rounded"/>
        //     </div>
        //     <div className="col-auto">
        //         <span><h3>{profile.personaname}</h3></span>
        //     </div>
        // </div>
            <div className="card " style={{width: "14rem"}}>
                <img src={profile.avatar} alt="avatar" className="card-img-top border border-dark border-3 rounded" />
                <div className="card-body">
                    <span><h5>{profile.personaname}</h5></span>
                </div>
            </div>
        )
    }
}

export default ProfileInfo;