import React from 'react';
import { VictoryChart, VictoryLine, VictoryAxis, VictoryScatter, VictoryGroup, createContainer, VictoryTooltip} from 'victory';

const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi")

class ProfileChart extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let today = new Date();
        let l2w = new Date(today);
        l2w.setDate(today.getDate()-7);
        let x_range = [l2w, today];

        let data = this.props.data;
        let plotPoints = [];
        for (let i = 0; i < data.length; i++) {
            plotPoints.push({ x: new Date(data[i].log_date.split("T")[0] + "T00:00:00"), y: data[i].l2w });
            //plotPoints.push({ x: new Date(data[i].log_date), y: data[i].l2w });
        }

        return (
            <VictoryChart
                width={750}
                height={400}
                domainPadding={50}
                scale={{x: "time"}}
                domain={{ y: [0, 100] }}
                padding={{top: 15, bottom: 30, right: 50, left: 50}}
                containerComponent={
                    <VictoryZoomVoronoiContainer 
                        zoomDimension={"x"} 
                        minimumZoom={{ x: 500000000, y: 0 }} 
                        zoomDomain={{x: x_range}}
                        labels={({datum}) => ` Date: ${datum.x.toDateString()}\n L2W Hours: ${datum.y}`}
                        voronoiBlacklist={["scatter"]}
                        // responsive={false}
                        radius={3}
                    />
                }
                style={{parent: {maxWidth: "90%", maxHeight:"80%", margin: "auto"}}}
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
                        grid: {stroke: "grey"}
                    }}
                />
                <VictoryGroup
                    data={plotPoints}
                    color={"tomato"}
                >
                    <VictoryLine name="line"/>
                    <VictoryScatter 
                        name="scatter"
                        events={[{
                            target: "data",
                            eventHandlers: {
                                onClick: () => {
                                    return [{
                                        target: "data",
                                        mutation: (props) => this.props.onClick(props)
                                    }]
                                }
                            }
                        }]}
                    />
                </VictoryGroup>
                
            </VictoryChart>

        );
    }
}

export default ProfileChart;