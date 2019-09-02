import React, { Fragment } from "react";
import Router from "next/router";
import { Row, Col, Button } from "antd";
import moment from "moment";
import { Table } from "antd";

export default class extends React.PureComponent<any> {
  state = {
    result: [],
    loading: false,
    filteredInfo: null,
    sortedInfo: null
  };

  componentDidMount() {
    let today = moment(new Date()).format("YYYY-MM-DD");

     fetch(`https://api.data.gov.sg/v1/environment/4-day-weather-forecast?date=${today}`)
    .then(response => response.json())
    .then(response => this.setState({
	  result: response.items,
      loading: false
    }))
    .catch(error => this.setState({
      loading: false,
      error: true
    }));
  }
  weatherIcon(forecast){
	let icon = forecast
	if(forecast.includes('thundery')){
		return icon = 'icon-thunder.png'
	}
	else return icon = 'icon-cloud.png'

  }
  render() {
    let {result } = this.state;
 
	const forecast = result.map((forecast, index)=>  <tr key={`d${index}`}>
		<td>{moment(forecast['forecasts'][index]['date']).format(`D MMM YYYY (ddd)`)}</td>
		<td>
		{<img src={`../static/img/${this.weatherIcon(forecast['forecasts'][index]['forecast'])}`} />}
		<span className="temp max"><sup>Max </sup>{forecast['forecasts'][index]['temperature']['high']}°C</span>
		<span className="temp"><sup>Low </sup>{forecast['forecasts'][index]['temperature']['low']}°C</span>
		</td>
		<td>
		{<img src={`../static/img/icon-humid.png`} /> }
		<span className="temp max"><sup>High </sup>{forecast['forecasts'][index]['relative_humidity']['high']}%</span>
		<span className="temp"><sup>Low </sup>{forecast['forecasts'][index]['relative_humidity']['low']}%</span>
		</td>
		<td>
		{<img src={`../static/img/icon-wind.png`} />} {forecast['forecasts'][index]['wind']['direction']}
		<span className="temp max">{forecast['forecasts'][index]['wind']['speed']['high']} <sup>km/h</sup></span>
		<span className="temp">{forecast['forecasts'][index]['wind']['speed']['low']} <sup>km/h</sup></span>
		</td>
	</tr>)

    return (
      <section id="home">
		  <br /><br />
		  <article className="wrap">
       
		<table className="info-table">
			<tbody>{forecast}</tbody>
		</table>
		</article>
      </section>
    );
  }
}
