import React, { Fragment } from "react";
import Router from "next/router";
import { Row, Col, Button, Tooltip, Tabs } from "antd";
import moment from "moment";

const { TabPane } = Tabs;

export default class extends React.PureComponent<any> {
  state = {
    greeting: "",
    result24: [],
    resultTwoHours: [],
    resultFourDays: [],
    loading: false
  };

  componentDidMount() {
    const d = new Date();
    const time = d.getHours();
    if (time < 12) {
      this.setState({ greeting: "Good morning!" });
    }
    if (time == 12 || time < 18) {
      this.setState({ greeting: "Good Afternoon!" });
    } else {
      this.setState({ greeting: "Good Evening!" });
    }
    Promise.all([
      fetch(
        `https://api.data.gov.sg/v1/environment/24-hour-weather-forecast`
      ).then(value => value.json()),
      fetch(
        `https://api.data.gov.sg/v1/environment/2-hour-weather-forecast`
      ).then(value => value.json()),
      fetch(
        `https://api.data.gov.sg/v1/environment/4-day-weather-forecast`
      ).then(value => value.json())
    ])
      .then(value => {
        this.setState({
          result24: value[0].items,
          resultTwoHours: value[1],
          resultFourDays: value[2].items
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  weatherIcon(forecast) {
    let icon = forecast;
    if (!!forecast && forecast.toLowerCase().includes("thundery")) {
      return (icon = "icon-thunder.png");
    } else if (!!forecast && forecast.toLowerCase().includes("windy")) {
      return (icon = "icon-windy.png");
    } else if (!!forecast && forecast.toLowerCase().includes("cloudy")) {
      return (icon = "icon-cloudy.png");
    } else return (icon = "icon-cloud.png");
  }
  formatDateTime(date) {
    const formatted = moment(date).format(`D MMM YYYY (ddd) H:MM A`);
    return formatted;
  }
  render() {
    const { greeting, result24, resultTwoHours, resultFourDays } = this.state;
    const listPeriod =
      !!result24 &&
      result24[0] &&
      result24[0]["periods"].map((period, index) => (
        <tr key={`period${index}`}>
          <td>
            {this.formatDateTime(period["time"]["start"])}<br /> to<br />
            {this.formatDateTime(period["time"]["end"])}
          </td>
          <td>
            <Tooltip
              placement="bottom"
              title={period["regions"]["central"]}
              className="tooltip"
            >
              {
                <img
                  src={`../static/img/${this.weatherIcon(
                    period["regions"]["central"]
                  )}`}
                />
              }
            </Tooltip>
          </td>
          <td>
            <Tooltip
              placement="bottom"
              title={period["regions"]["east"]}
              className="tooltip"
            >
              {
                <img
                  src={`../static/img/${this.weatherIcon(
                    period["regions"]["east"]
                  )}`}
                />
              }
            </Tooltip>
          </td>
          <td>
            <Tooltip
              placement="bottom"
              title={period["regions"]["north"]}
              className="tooltip"
            >
              {
                <img
                  src={`../static/img/${this.weatherIcon(
                    period["regions"]["north"]
                  )}`}
                />
              }
            </Tooltip>
          </td>
          <td>
            <Tooltip
              placement="bottom"
              title={period["regions"]["south"]}
              className="tooltip"
            >
              {
                <img
                  src={`../static/img/${this.weatherIcon(
                    period["regions"]["south"]
                  )}`}
                />
              }
            </Tooltip>
          </td>
          <td>
            <Tooltip
              placement="bottom"
              title={period["regions"]["central"]}
              className="tooltip"
            >
              {
                <img
                  src={`../static/img/${this.weatherIcon(
                    period["regions"]["west"]
                  )}`}
                />
              }
            </Tooltip>
          </td>
        </tr>
      ));

    const listTwoHours =
      !!resultTwoHours["area_metadata"] &&
      resultTwoHours["items"].map((areas, index) => (
        <Fragment key={`area${index}`}>
          {areas["forecasts"].map((area, index) => (
            <tr key={`areadetails${index}`}>
              <td>{<b>{area["area"]}</b>}</td>
              <td>
                <Tooltip
                  placement="bottom"
                  title={area["forecast"]}
                  className="tooltip"
                >
                  <img
                    src={`../static/img/${this.weatherIcon(area["forecast"])}`}
                  />
                </Tooltip>
              </td>
            </tr>
          ))}
        </Fragment>
      ));

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
                  <sup>High </sup>
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
      </Fragment>
    ));

    return (
      <section id="home">
        <article className="wrap">
          <Tabs type="card">
            <TabPane tab="24 HOUR FORECAST" key="0">
              <div className="center-block">
                <section id="intro">
                  <h1>
                    {greeting}
                  </h1>
                  <article className="bg-border">
                  <img className="big"
                      src={`../static/img/${this.weatherIcon(
                        (((!!result24 && result24[0]) || {}).general || {})
                          .forecast
                      )}`}
                    />
                  <h4>
                    <span>
                    <sup className="max">High </sup>
                    {
                      (((result24[0] || {}).general || {}).temperature || {})
                        .high
                    }
                    °C
                    </span>
                    <span>
                    <sup>Low</sup>
                    {
                      (((result24[0] || {}).general || {}).temperature || {})
                        .low
                    }
                    °C
                    </span>
                  </h4>
                  </article>
                  <div className="small">
                    <span>
                  {<img src={`../static/img/icon-humid.png`} />}
                  <sup className="temp max">High </sup>
                  {
                    (
                      ((result24[0] || {}).general || {}).relative_humidity ||
                      {}
                    ).high
                  }
                  % <sup className="temp">Low </sup>
                  {
                    (
                      ((result24[0] || {}).general || {}).relative_humidity ||
                      {}
                    ).low
                  }
                  %
                  </span>
                  <span>
                  {<img src={`../static/img/icon-wind.png`} />}&nbsp;
                  {
                    (
                      (((result24[0] || {}).general || {}).wind || {}).speed ||
                      {}
                    ).high
                  }
                  <sup className="temp max"> km/h</sup>
                  {
                    (
                      (((result24[0] || {}).general || {}).wind || {}).speed ||
                      {}
                    ).low
                  }
                  <sup className="temp"> km/h</sup>
                  </span>
                  </div>
                  </section>
                  <table className="info-table">
                    <tbody>
                      <tr>
                        <th rowSpan={2}>PERIOD</th>
                        <th colSpan={5}>WEATHER</th>
                      </tr>
                      <tr>
                        <th>Central</th>
                         <th>North</th>
                         <th>South</th>
                         <th>East</th>
                         <th>West</th>
                      </tr>

                      {listPeriod}
                      <tr>
                        <td colSpan={6}>
                          Last updated:{" "}
                          {this.formatDateTime(
                            !!result24 && result24["update_timestamp"]
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
              </div>
            </TabPane>
            <TabPane tab="2 HOUR FORECAST" key="1">
              <table className="info-table">
                <tbody>
                  <tr>
                    <th>AREA</th>
                    <th>WEATHER</th>
                  </tr>
                  {listTwoHours}
                  {!!resultTwoHours["area_metadata"] &&
                    resultTwoHours["items"].map((areas, index) => (
                      <tr key={`update2${index}`}>
                        <td colSpan={4}>
                          Last updated:{" "}
                          {this.formatDateTime(areas["updated_timestamp"])}
                        </td>
                      </tr>
                    ))}
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
                  {resultFourDays.map((forecast, index) => (
                    <tr key={`update4${index}`}>
                      <td colSpan={4}>
                        Last updated:{" "}
                        {this.formatDateTime(forecast["updated_timestamp"])}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TabPane>
          </Tabs>
        </article>
      </section>
    );
  }
}
