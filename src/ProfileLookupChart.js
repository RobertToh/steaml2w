import React from 'react';
//import "./ProfileLookupChart.css"
import ProfileURLForm from "./ProfileURLForm";
import { fetchProfileHours, fetchProfileInfo } from "./callAPI.js";
import ProfileChart from "./ProfileChart";
import ProfileInfo from "./ProfileInfo";
import GameBreakdown from "./GameBreakdown";
import {trackPromise} from "react-promise-tracker";
import LoadingIndicator from './LoadingIndicator';

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

    // async handleSubmit(e) {
    //     e.preventDefault();
    //     let valid = validate_URL(this.state.url)
    //     if (valid === null) {
    //         this.setState({data: -1, render: true, profile: [], clicked: -1})
    //     }
    //     else {
    //         let res = await fetchProfileHours(valid.id, valid.vanity);
    //         let profile = await fetchProfileInfo(valid.id, valid.vanity);
    //         this.setState({ data: res, render: true, profile: profile, clicked: -1});
    //     }
        
    // }

    handleSubmit(e) {
        e.preventDefault();
        let valid = validate_URL(this.state.url)
        if (valid === null) {
            this.setState({ data: -1, render: true, profile: [], clicked: -1 })
        }
        else {
            trackPromise(
                fetchProfileHours(valid.id, valid.vanity).then(res => {
                    fetchProfileInfo(valid.id, valid.vanity).then(profile => {
                        this.setState({ data: res, render: true, profile: profile, clicked: -1 });
                        this.props.hideInstructions();
                    });
                })
            );
        }

    }

    displayGameBreakdown(props) {
        this.setState({clicked: props.index});
    }

    render() {
        let chart;
        let profile;
        let error;
        
        //Defining chart
        if (this.state.data.length === 0) {
            error = <p>No user data</p>
        }
        else if (this.state.data === null) {
            error = <p>Server Error, try again</p>
        }
        else if (this.state.data === -1) {
            error = <p>Invalid Profile URL</p>
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
            <div className="profile-lookup-chart container">
                <div className="row pt-4 pb-3" name="profile-search">
                    <ProfileURLForm 
                        url={this.state.url}
                        onURLChange={this.handleURLChange}
                        onSubmit={this.handleSubmit}
                    />
                    <LoadingIndicator />
                </div>

                {this.state.render && 
                <div className="row profile-display py-2 justify-content-center" name="profile-display"> 
                        {profile}
                        {error !== undefined && error}
                </div>
                }


                <div className="row align-items-center" name="profile-charts">
                    <div className="col-xl-7 col-md-12">
                        {(this.state.render && error === undefined) &&
                            <div className="chart my-3">
                                {chart}
                            </div>
                        }
                    </div>
                    <div className="col-xl-5 col-md-12">
                        <div className="game-breakdown h-100 my-3">
                            {this.state.clicked >= 0 && this.state.data[this.state.clicked].games.length != 0 &&
                                <GameBreakdown
                                    games={this.state.data[this.state.clicked].games}
                                    date={this.state.data[this.state.clicked].log_date}
                                />
                            }
                        </div>
                    </div>                  
                </div>

            </div>
            
        );
    }
}

export default ProfileLookupChart;