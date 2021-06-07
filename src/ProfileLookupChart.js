import React from 'react';
import ProfileURLForm from "./ProfileURLForm"
import { fetchProfileHours } from "./callAPI.js";
import ProfileChart from "./ProfileChart"

function validate_URL(URL) {
    //let regex = /(?:https?:\/\/)?steamcommunity\.com\/(?:profiles|id)\/[a-zA-Z0-9]+/;
    let regex = /^(?:https?:\/\/)?steamcommunity\.com\/(?:profiles\/[0-9]{17}|id\/[a-zA-Z0-9].*)/;
    let n = URL.search(regex);
    
    if (n === -1) {
        //No match found
        console.log("invalid url");
        return null;
    }
    else if (n === 0) {
        //Match found correctly at start of url
        console.log("valid url");
        let split = URL.split("/");
        if (split[3] =="profiles") {
            return {id: split[4], vanity: "0"};
        }
        else {
            return {id: split[4], vanity: "1"};
        }
    }
    else {
        //invalid url
        console.log("invalid url");
        return null;
    }
}


class ProfileLookupChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = { url: "", data: [], render: false};

        this.handleURLChange = this.handleURLChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleURLChange(URL) {
        this.setState({url: URL});
    }

    async handleSubmit(e) {
        e.preventDefault();
        let valid = validate_URL(this.state.url)
        if (valid === null) {
            this.setState({data: -1, render: true})
        }
        else {
            let res = await fetchProfileHours(valid.id, valid.vanity);
            this.setState({ data: res, render: true });
        }

        
    }

    render() {
        let chart;
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
            chart = <ProfileChart data={this.state.data}/>
        }
        return (
            <div className="ProfileLookupChart">
                <ProfileURLForm 
                    url={this.state.url}
                    onURLChange={this.handleURLChange}
                    onSubmit={this.handleSubmit}
                />
                {this.state.render && chart}
            </div>
        );
    }
}

export default ProfileLookupChart;