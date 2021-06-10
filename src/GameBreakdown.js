import React from "react";
import {VictoryPie, VictoryTooltip, VictoryLabel} from "victory"

class CustomLabel extends React.Component {
    render() {
        let datum = this.props.datum;
        let props = this.props;
        let copy = { ...this.props };
        copy.text = datum.x + "\nHours: " + parseFloat(datum.y / 60).toFixed(2);
        return (
            <g>
                <image
                    x={props.x-15}
                    y={props.y-10}
                    width="10.5%"
                    height="4%"
                    href={datum.logo}
                    textAnchor="middle"
                />
                {/* <VictoryLabel {...this.props} dx={30} dy={0}/> */}
                <VictoryTooltip
                    {...copy}
                    x={200} y={250}
                    orientation="top"
                    pointerLength={0}
                    cornerRadius={50}
                    flyoutWidth={100}
                    flyoutHeight={100}
                    flyoutStyle={{ fill: "#282c34", stroke: "#282c34"}}
                     style={{ fontSize: 12, fill: "white"}}
                />
            </g>
        );
    }
}

CustomLabel.defaultEvents = VictoryTooltip.defaultEvents;


class GameBreakdown extends React.Component {
    constructor(props) {
        super(props);
        this.pieData = [];
        this.startData = [];
        let games = this.props.games;
        this.total_mins = 0;
        this.fillData(games);
        this.state = {data: this.startData};
    }

    fillData(games) {
        this.pieData = [];
        this.startData = [];
        this.total_mins = 0;
        games.forEach(game => {
            this.pieData.push({
                x: game.name,
                y: game.playtime_2weeks,
                logo: "http://media.steampowered.com/steamcommunity/public/images/apps/" + game.appid + "/" + game.img_logo_url + ".jpg"
            });
            this.total_mins += game.playtime_2weeks;

            this.startData.push({
                x: game.name,
                y: 0
            });
        });
        this.startData[0].y = 100;
    }

    componentDidMount() {
        this.setState({data: this.pieData});
    }
    
    componentDidUpdate(prevProps) {
        if (this.props.date !== prevProps.date) {
            this.fillData(this.props.games);
            this.setState({data: this.pieData});
        }
    }

    render() {
        let date = new Date(this.props.date);
        let formatted_date = date.toDateString().slice(4);


        return (
            <svg viewBox="0 0 400 400">
            <VictoryPie
                animate={{ easing: 'exp' }}
                standalone={false}
                //style={{ labels: { fill: "white", }, parent: { maxWidth: "75%", maxHeight: "75%", margin: "auto" } }}
                innerRadius={100}
                // labelRadius={120}
                labels={({ datum }) => `# ${datum.y}`}
                labelComponent={<CustomLabel />}
                data={this.state.data}
            />
            <VictoryLabel
                textAnchor="middle"
                x={200} y={170}
                text={formatted_date + "\nLast 2 Week Hours: " + parseFloat(this.total_mins / 60).toFixed(1)}
                style={{fill: "white", fontSize: 14}}
            />
            </svg>
        );
    }
}

export default GameBreakdown;