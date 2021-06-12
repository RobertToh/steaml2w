import React from "react";
import {VictoryPie, VictoryTooltip, VictoryLabel} from "victory"

const colors = [
    "#525252",
    "#737373",
    "#969696",
    "#bdbdbd",
    "#d9d9d9",
    "#f0f0f0"
];

class CustomLabel extends React.Component {
    render() {
        let datum = this.props.datum;
        return (
            <g>
                <VictoryLabel {...this.props} 
                    backgroundComponent={<image
                    width="61"
                    height="23"
                    transform="translate(-30, -11.5)"
                    href={datum.logo}
                    textAnchor="middle"
                    style={{opacity: 1}}
                    />}

                    text="-"
                    style={{display: "none"}}
                    backgroundStyle={{fill: "white"}}
                />

                <VictoryTooltip
                    {...this.props}
                    text={(datum) => datum.datum.x + "\nHours: " + parseFloat(datum.datum.y / 60).toFixed(2)}
                    x={247} y={270}
                    orientation="top"
                    pointerLength={0}
                    cornerRadius={50}
                    flyoutWidth={100}
                    flyoutHeight={100}
                    flyoutStyle={{ fill: "#1f2833", stroke: "#1f2833"}}
                    style={{ fontSize: 16, fill: "white"}}
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
                //logo: "http://media.steampowered.com/steamcommunity/public/images/apps/" + game.appid + "/" + game.img_icon_url + ".jpg"
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
            <div className="card">
                <svg viewBox="0 0 494 450">
                <VictoryPie
                    colorScale={colors}
                    animate={{ easing: 'exp' }}
                    standalone={false}
                    //style={{ labels: { fill: "white", }, parent: { maxWidth: "75%", maxHeight: "75%", margin: "auto" } }}
                    innerRadius={120}
                    //labelRadius={145}
                    labels={({ datum }) => `# ${datum.y}`}
                    labelComponent={<CustomLabel />}
                    data={this.state.data}
                    padding={40}
                    width={494}
                    height={450}
                />
                <VictoryLabel
                    textAnchor="middle"
                    x={247} y={160}
                    text={formatted_date + "\nLast 2 Week Hours: " + parseFloat(this.total_mins / 60).toFixed(1)}
                    style={{fill: "white", fontSize: 16}}
                />
                </svg>
            </div>
        );
    }
}

export default GameBreakdown;