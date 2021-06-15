import React from 'react';
import ProfileLookupChart from "./ProfileLookupChart";
import {CSSTransition, TransitionGroup} from "react-transition-group";



class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {renderInstructions: true}
        this.hideInstructions = this.hideInstructions.bind(this);
    }

    hideInstructions() {
        this.setState({renderInstructions: false});
    }

    render() {    
        return (
            <div className="container-fluid px-0">
                <nav className="navbar navbar-expand-lg navbar-dark">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/">Steam L2W</a>

                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav navbar-right">
                                <li className="nav-item">
                                    <a className="nav-link" data-bs-toggle="modal" data-bs-target="#aboutModal" href="#">About</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" data-bs-toggle="modal" data-bs-target ="#privacyModal" href="#">Privacy</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <div className="modal fade" id="aboutModal" tabIndex="-1" aria-labelledby="aboutModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                        <div className="modal-content ">
                            <div className="modal-header text-center">
                                <h5 className="modal-title w-100" id="aboutModalLabel">About</h5>
                            </div>
                            <div className="modal-body">
                                <p className="text-center">
                                    Steam L2W tracks a Steam user's recent (last two weeks) activities, including the total amount of hours and individual game breakdown. 
                                    All of this is done using Steam's Web API and a MongoDB backend.
                                    <br/><br/>
                                    Steam L2W is not affiliated with Valve. All trademarks and registered trademarks are the property of their respective owners
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade" id="privacyModal" tabIndex="-1" aria-labelledby="privacyModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                        <div className="modal-content ">
                            <div className="modal-header text-center">
                                <h5 className="modal-title w-100" id="privacyModalLabel">Privacy</h5>
                            </div>
                            <div className="modal-body">
                                <p className="text-center">
                                    Steam L2W collects all its data through Steam's Web API. In order to collect data, the steam user's profile must be public. All requests
                                    through the Steam Web API only retrieve public data, no private data is read nor stored. 
                                </p>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="App container">
                    <ProfileLookupChart hideInstructions={this.hideInstructions}/>

                    {this.state.renderInstructions &&
                        
                        <TransitionGroup appear={true} exit={true}>
                            <CSSTransition key="instructions" classNames="fade" timeout={{ appear: 500, exit: 300 }}>
                                <div className="container w-50 px-0">
                                    <div className="card">
                                        <div className="modal-header text-center">
                                            <h5 className="modal-title w-100">Instructions</h5>
                                        </div>
                                        <div className="card-body">
                                            <p className="card-text">
                                                Enter into the search bar a valid Steam profile URL. 
                                                <br/><br/>
                                                A valid Steam profile URL is either in the form
                                                <br/>
                                                <i>https://steamcommunity.com/profiles/#################/</i>
                                                <br/>
                                                or
                                                <br/>
                                                <i>https://steamcommunity.com/id/XXXXXXXXXXXXXXXXX/</i>
                                            </p>
                                        </div>
                                    </div>
                                </div> 
                            </CSSTransition>
                        </TransitionGroup>
                        
                    }
                </div>
            </div>

        );
    }
}

export default App;
