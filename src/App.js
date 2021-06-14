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
                                <p className="text-center">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade" id="privacyModal" tabIndex="-1" aria-labelledby="privacyModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                        <div className="modal-content ">
                            <div className="modal-header text-center">
                                <h5 className="modal-title w-100" id="aboutModalLabel">Privacy</h5>
                            </div>
                            <div className="modal-body">
                                <p className="text-center">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
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
                                        <div className="card-body">
                                            <p className="card-text">Text</p>
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
