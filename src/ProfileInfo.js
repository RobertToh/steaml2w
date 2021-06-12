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
                <div className="card-body py-2">
                    {/* <span><h5>{profile.personaname}</h5></span> */}
                    <h5 className="card-subtitle">{profile.personaname}</h5>
                </div>
            </div>
        )
    }
}

export default ProfileInfo;