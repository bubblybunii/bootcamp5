import React, { Fragment } from "react";
import Router from "next/router";
import { Row, Col, Button, Tooltip, Tabs } from "antd";
import moment from "moment";

const { TabPane } = Tabs;

export default class extends React.PureComponent<any> {
  state = {
	greeting:'',
	result24: [],
	resultTwoHours:[],
    resultFourDays: [],
    loading: false
  };

  componentDidMount() {
	const d = new Date();
	const time = d.getHours();
		if (time < 12) {
		this.setState({greeting:'Good morning!'})
	  	}
	  	if (time == 12 || time <= 18 ) {
		this.setState({greeting:'Good Afternoon!'})
	  	}
	  	else {
		this.setState({greeting:'Good Evening!'})
	  	}
    let today = moment(new Date()).format("YYYY-MM-DD");
	Promise.all([
		fetch( `https://api.data.gov.sg/v1/environment/24-hour-weather-forecast`).then(value => value.json()),
		fetch( `https://api.data.gov.sg/v1/environment/2-hour-weather-forecast`).then(value => value.json()),
		fetch( `https://api.data.gov.sg/v1/environment/4-day-weather-forecast?date=${today}`).then(value => value.json())
		])
		.then((value) => {
			this.setState({
			result24: value[0].items,
			resultTwoHours: value[1],
			resultFourDays: value[2].items
			})
		})
		.catch((err) => {
			console.log(err);
		});
  }
  weatherIcon(forecast) {
    let icon = forecast
    if (!!forecast && forecast.toLowerCase().includes("thundery")) {
      return (icon = "icon-thunder.png");
	} 
	else return (icon = "icon-cloud.png");
  }

  render() {

	const { greeting,result24, resultTwoHours, resultFourDays } = this.state;
	const today = !!result24 && result24[0] && result24[0]['general']
	const listTwoHours = !!resultTwoHours['area_metadata'] && resultTwoHours['items'].map((areas, index) => <Fragment key={`area${index}`}>
		 {areas["forecasts"].map((area, index) => 
		 <tr key={`areadetails${index}`}>
		<td>{<b>{area['area']}</b>}</td>
		 <td>
		 <Tooltip
                placement="bottom"
                title={area["forecast"]}
                className="tooltip"
              >
			 <img src={`../static/img/${this.weatherIcon(area["forecast"])}`}/>
			 </Tooltip>
			 </td>
		 </tr>
		 )}
		  <tr>
          <td colSpan={4}>
            Last updated:{" "}
            {moment(areas["updated_timestamp"]).format(
              `D MMM YYYY (ddd) H:MM A`
            )}
          </td>
        </tr>
		</Fragment>
	)

    const listFourDays = resultFourDays.map((forecast, index) => (
      <Fragment key={`date${index}`}>
        {forecast["forecasts"].map((date, index) => (
          <tr key={`details${index}`}>
            <td>{moment(date["date"]).format(`D MMM YYYY (ddd)`)}</td>
            <td>
              <Tooltip
                placement="bottomLeft"
                title={date["forecast"]}
                className="tooltip"
              >
                {
                  <img
                    src={`../static/img/${this.weatherIcon(date["forecast"])}`}
                  />
                }
                <span className="temp max">
                  <sup>Max </sup>
                  {date["temperature"]["high"]}°C
                </span>
                <span className="temp">
                  <sup>Low </sup>
                  {date["temperature"]["low"]}°C
                </span>
              </Tooltip>
            </td>
            <td>
              {<img src={`../static/img/icon-humid.png`} />}
              <span className="temp max">
                <sup>High </sup>
                {date["relative_humidity"]["high"]}%
              </span>
              <span className="temp">
                <sup>Low </sup>
                {date["relative_humidity"]["low"]}%
              </span>
            </td>
            <td>
              {<img src={`../static/img/icon-wind.png`} />}{" "}
              {date["wind"]["direction"]}
              <span className="temp max">
                {date["wind"]["speed"]["high"]} <sup>km/h</sup>
              </span>
              <span className="temp">
                {date["wind"]["speed"]["low"]} <sup>km/h</sup>
              </span>
            </td>
          </tr>
        ))}
        <tr>
          <td colSpan={4}>
            Last updated:{" "}
            {moment(forecast["updated_timestamp"]).format(
              `D MMM YYYY (ddd) H:MM A`
            )}
          </td>
        </tr>
      </Fragment>
    ));

    console.log(!!result24 && result24[0] && result24[0]['general'] && result24[0]['general'] );
    return (
      <section id="home">
        <article className="wrap">
			
			
          <Tabs type="card">
		  <TabPane tab="24 HOUR FORECAST" key="0">
			<Row type="flex" justify="space-between" align="middle">
				<Col md={24} lg={12}>
				<div className="center-block">
				<section id="intro">
				<h1><img src={`../static/img/${this.weatherIcon(today && result24[0]['general']['forecast'])}`}/> {greeting}</h1>
			<h2>
		{today && result24[0]['general']['temperature'] && result24[0]['general']['temperature']['high']}°C
			</h2>
			
				</section>
		
			</div>
				</Col>
			</Row>
		 
		</TabPane>
            <TabPane tab="2 HOUR FORECAST" key="1">
			<table className="info-table">
                <tbody>
                  <tr>
                    <th>AREA</th>
                    <th>WEATHER</th>
                  </tr>
				  {listTwoHours}
                </tbody>
              </table>
            </TabPane>
            <TabPane tab="4 DAYS FORECAST" key="2">
              <table className="info-table">
                <tbody>
                  <tr>
                    <th>DATE</th>
                    <th>WEATHER</th>
                    <th>HUMIDITY</th>
                    <th>WIND SPEED</th>
                  </tr>
                  {listFourDays}
                </tbody>
              </table>
            </TabPane>
          </Tabs>
        </article>
      </section>
    );
  }
}
