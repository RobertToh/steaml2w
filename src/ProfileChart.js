import React from 'react';
import { VictoryChart, VictoryLine, VictoryAxis, VictoryScatter, VictoryGroup, createContainer} from 'victory';

const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi")

// let plotPoints = []
// let data = [
//     {
//         "l2w": 24.1,
//         "log_date": "2021-11-04T06:01:49.861Z"
//     },
//     {
//         "l2w": 27.3,
//         "log_date": "2021-10-03T06:01:20.090Z"
//     },
//     {
//         "l2w": 27.3,
//         "log_date": "2021-09-02T06:01:02.536Z"
//     },
//     {
//         "l2w": 27.6,
//         "log_date": "2021-08-01T06:00:42.073Z"
//     },
//     {
//         "l2w": 28.4,
//         "log_date": "2021-07-31T16:13:39.936Z"
//     },
//     {
//         "l2w": 26.1,
//         "log_date": "2021-06-30T19:03:31.050Z"
//     },
//     {
//         "l2w": 24.1,
//         "log_date": "2021-06-04T06:01:49.861Z"
//     },
//     {
//         "l2w": 27.3,
//         "log_date": "2021-06-03T06:01:20.090Z"
//     },
//     {
//         "l2w": 27.3,
//         "log_date": "2021-06-02T06:01:02.536Z"
//     },
//     {
//         "l2w": 27.6,
//         "log_date": "2021-06-01T06:00:42.073Z"
//     },
//     {
//         "l2w": 28.4,
//         "log_date": "2021-05-31T16:13:39.936Z"
//     },
//     {
//         "l2w": 26.1,
//         "log_date": "2021-05-30T19:03:31.050Z"
//     }
// ];
// for (let i = 0; i < data.length; i++) {
//     plotPoints.push({ x: new Date(data[i].log_date.split("T")[0] + "T00:00:00"), y: data[i].l2w });
//     //plotPoints.push({ x: new Date(data[i].log_date), y: data[i].l2w });
// }

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
                containerComponent={
                    <VictoryZoomVoronoiContainer 
                        zoomDimension={"x"} 
                        minimumZoom={{ x: 500000000, y: 0 }} 
                        zoomDomain={{x: x_range}}
                        labels={({datum}) => ` Date: ${datum.x.toDateString()}\n Hours: ${datum.y}`}
                        voronoiBlacklist={["scatter"]}
                        // responsive={false}
                        radius={5}
                    />
                }
                //style={{parent: {maxWidth: "60%", maxHeight:"30%"}}}
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
                    <VictoryScatter name="scatter"/>
                </VictoryGroup>
                
            </VictoryChart>
        );
    }
}

export default ProfileChart;