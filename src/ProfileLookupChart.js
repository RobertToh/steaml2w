import React from 'react';
import ReactDOM from "react-dom";
import ProfileURLForm from "./ProfileURLForm";
import { fetchProfileHours, fetchProfileInfo } from "./callAPI.js";
import ProfileChart from "./ProfileChart";
import ProfileInfo from "./ProfileInfo";
import GameBreakdown from "./GameBreakdown";

function validate_URL(URL) {
    //let regex = /(?:https?:\/\/)?steamcommunity\.com\/(?:profiles|id)\/[a-zA-Z0-9]+/;
    let regex = /^(?:https?:\/\/)?steamcommunity\.com\/(?:profiles\/[0-9]{17}|id\/[a-zA-Z0-9].*)/;
    let n = URL.search(regex);
    
    if (n === -1) {
        //No match found
        return null;
    }
    else if (n === 0) {
        //Match found correctly at start of url
        let split = URL.split("/");
        if (split[3] === "profiles") {
            return {id: split[4], vanity: "0"};
        }
        else {
            return {id: split[4], vanity: "1"};
        }
    }
    else {
        //invalid url
        return null;
    }
}


class ProfileLookupChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = { url: "", data: [], render: false, profile: [], clicked: -1};

        this.handleURLChange = this.handleURLChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.displayGameBreakdown = this.displayGameBreakdown.bind(this);
    }

    handleURLChange(URL) {
        this.setState({url: URL});
    }

    async handleSubmit(e) {
        e.preventDefault();
        let valid = validate_URL(this.state.url)
        if (valid === null) {
            this.setState({data: -1, render: true, profile: [], clicked: -1})
        }
        else {
            let res = await fetchProfileHours(valid.id, valid.vanity);
            let profile = await fetchProfileInfo(valid.id, valid.vanity);
            this.setState({ data: res, render: true, profile: profile, clicked: -1});
        }
        
    }

    displayGameBreakdown(props) {
        this.setState({clicked: props.index});
    }

    render() {
        let chart;
        let profile;
        
        //Defining chart
        if (this.state.data.length === 0) {
            chart = <p>No user data</p>
        }
        else if (this.state.data === null) {
            chart = <p>Server Error, try again</p>
        }
        else if (this.state.data === -1) {
            chart = <p>Invalid Profile URL</p>
        }
        else {
            chart = <ProfileChart data={this.state.data} onClick={this.displayGameBreakdown}/>
        }

        //Defining profile
        if (this.state.profile.length === 0) {
            profile = <p>Unable to get Steam profile</p>
        }
        else {
            profile = <ProfileInfo profile={this.state.profile} />
        }

        return (
            <div className="ProfileLookupChart">
                <ProfileURLForm 
                    url={this.state.url}
                    onURLChange={this.handleURLChange}
                    onSubmit={this.handleSubmit}
                />
                {this.state.render && 
                    <div> 
                        {profile}
                        {chart}
                    </div>
                }
                <div id="game-breakdown">
                    {this.state.clicked >= 0 && this.state.data[this.state.clicked].games.length != 0 && <GameBreakdown games={this.state.data[this.state.clicked].games}/>}
                </div>
            </div>
            
        );
    }
}

export default ProfileLookupChart;