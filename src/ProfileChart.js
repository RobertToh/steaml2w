import React from 'react';
import { VictoryChart, VictoryLine, VictoryAxis, VictoryScatter, VictoryGroup, createContainer, VictoryZoomContainer, VictoryTooltip} from 'victory';

const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi")

class ProfileChart extends React.Component {

    constructor(props) {
        super(props);

        let today = new Date();
        let l2w = new Date(today);
        l2w.setDate(today.getDate()-7);
        let x_range = [l2w, today];
        this.state = { zoomDomain: {x: x_range}, pan: true};
    }

    handleZoom(domain) {
        this.setState({ zoomDomain: domain });
    }

    setZoomDomain(num) {
        let today = new Date();
        let l2w = new Date(today);
        l2w.setDate(today.getDate() - num);
        let x_range = [l2w, today];

        
        let pan = this.props.data.length < num ? false : true;
        this.setState({zoomDomain: {x: x_range}, pan: pan});
    }

    zoomMonths() {
        this.setZoomDomain(31);
    }

    zoomWeeks() {
        this.setZoomDomain(7)
    }

    render() {
        let data = this.props.data;
        let plotPoints = [];
        for (let i = 0; i < data.length; i++) {
            let x = new Date(data[i].log_date.split("T")[0] + "T00:00:00");
            let y = data[i].l2w;
            let label = ` Date: ${x.toDateString()}\n L2W Hours: ${y}`;
            plotPoints.push({ x: x, y: y, label: label });
            //plotPoints.push({ x: new Date(data[i].log_date), y: data[i].l2w });

        }

        return (
            <div className="card">
                <VictoryChart
                    name="chart"
                    width={750}
                    height={450}
                    domainPadding={50}
                    scale={{x: "time"}}
                    domain={{ y: [0, 100] }}
                    padding={{top: 15, bottom: 30, right: 50, left: 50}}
                    containerComponent={
                        <VictoryZoomContainer 
                            zoomDimension={"x"} 
                            minimumZoom={{ x: 500000000, y: 0 }} 
                            zoomDomain={this.state.zoomDomain}
                            onZoomDomainChange={this.handleZoom.bind(this)}
                            //labels={({datum}) => ` Date: ${datum.x.toDateString()}\n L2W Hours: ${datum.y}`}
                            //voronoiBlacklist={["scatter"]}
                            // responsive={false}
                            radius={3}
                            allowZoom={false}
                            allowPan={this.state.pan}
                        />
                    }
                    //style={{parent: {maxWidth: "50%", maxHeight:"80%", margin: "auto"}}}
                >
                    <VictoryAxis 
                        style={{
                            axis: { stroke: "white" },
                            ticks: { stroke: "white" },
                            axisLabel: { fill: "white" },
                            tickLabels: { fill: "white" }
                        }}
                    />
                    <VictoryAxis 
                        label={"Last Two Week Hours"}
                        dependentAxis 
                        style={{
                            axis: { stroke: "white" },
                            ticks: { stroke: "white" },
                            axisLabel: {fill: "white", padding: 35},
                            tickLabels: { fill: "white" },
                            grid: {stroke: "gray"}
                        }}
                    />
                    <VictoryGroup
                        data={plotPoints}
                        color={"white"}
                        // animate={{
                        //     onLoad: {
                        //         delay: 0,
                        //         before: () => ({ _x: 0 }),
                        //         after: datum => ({ _x: datum._x })
                        //     },
                        //     duration: 1000,
                        //     easing: "expIn",
                        //     delay: 0
                        // }}
                    >
                        <VictoryLine name="line" labelComponent={<VictoryTooltip active={false}/>}/>
                        <VictoryScatter 
                            name="scatter"
                            events={[{
                                target: "data",
                                eventHandlers: {
                                    onClick: () => {
                                        return [
                                            {
                                                target: "data",
                                                mutation: (props) => this.props.onClick(props)
                                            }
                                        ]
                                    }
                                }
                            }]}
                            labelComponent={<VictoryTooltip flyoutPadding={10}/>}
                        />
                    </VictoryGroup>
                </VictoryChart>
                <div className="btn-group-sm justify-content-center" role="group">
                    <button onClick={this.zoomMonths.bind(this)} className="btn btn-outline-light">
                        Month
                    </button>
                    <button onClick={this.zoomWeeks.bind(this)} className="btn btn-outline-light">
                        Week
                    </button>
                    {/* <input type="radio" className="btn-check" name="btnradio" id="btnradio1"  onClick={this.zoomMonths.bind(this)}/>
                    <label className="btn btn-outline-primary" for="btnradio1">Month</label>

                    <input type="radio" className="btn-check" name="btnradio" id="btnradio2"  onClick={this.zoomWeeks.bind(this)} checked/>
                    <label className="btn btn-outline-primary" for="btnradio2">Week</label> */}
                </div>
            </div>
        );
    }
}

export default ProfileChart;