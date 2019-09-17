import React from "react";
import { Row, Col, Icon, Button } from "antd";
import Link from "next/link";
import AOS from "aos";
import Router from "next/router";

export default class extends React.PureComponent<any> {
  componentDidMount() {
    AOS.init({
      duration: 800
    });
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <div>
        <Row className={"aboutus_container"}>
          <Col span={24}>
            <section className="parallax">
              <div className="bg-over">
                &nbsp;
              </div>

              <Row className={"middle-container"} id={"vision"}>
                <Col className="wrap">
                  <h1 data-aos="flip-left">
                    Welcome!
                  </h1>
                  <p data-aos="fade" data-aos-delay="200">
                    Shine a light on people & technology making our world
                    better, lets code for good.
                  </p>
                </Col>
              </Row>
            </section>
          </Col>
          <Col span={24}>
            <Row className={"middle-container"}>
              <Col className="pad-y">
                <Row gutter={24} type="flex" justify="space-between">
                  <div className={"pagewrapper"}>
                    <Col className={"pagecontent"} sm={24} lg={16} data-aos="fade-up" data-aos-delay="300">
                      <h1 className={"h1-title"}>About Me</h1>
                      <p>
                        Li Yan is currently a Digital Evangelist in a local
                        travel technology startup helping travel agencies
                        transform and grow their business on the eCommerce
                        space. She love to see good design come to life and
                        believe that with people at its heart, technology can
                        create great social impact to help others and make this
                        world a better place. She hopes for an opportunity to be
                        part of this meaningful project to learn from fellow
                        mentors & coaches, and at the same time level up her
                        technical skills to contribute to a greater good.
                      </p>
                      <p>
                        Beside being passionate about front end web development
                        + UI/UX, she also enjoys dancing & a zen yoga stretch
                        after a long day of staring at the screen.
                      </p>
                     
                      <p><b>Why choose Li Yan?</b></p>
                      <ul>
                        <li> <Icon type="caret-right" /> Good knowledge in HTML & CSS</li>

                        <li>
                        <Icon type="caret-right" /> Completed Modern Javascript course on Udemy,
                          self-learnt ReactJS
                        </li>

                        <li><Icon type="caret-right" /> Committed & Responsible team player </li>

                        <li><Icon type="caret-right" /> If you want to practice Yoga with Li Yan 😛 </li>
                      </ul>
                      Just kidding, time to check out{" "}
                      <a
                        onClick={() => {
                          Router.push("/");
                        }}
                      >
                        my technical task
                      </a>
                      ...
                      <p> <a href="mailto:babyxbunii@hotmail.com"><Button shape="round">Connect with Li Yan today!</Button></a> </p>
                    
                    </Col>
                    <Col className={"pagecontent"} sm={24} lg={8}>
                        <div id="pic-wrap">
                        <div id="pic" data-aos="flip-down" data-aos-delay="500">
                      <img src="../static/img/liyan.jpg" />
                      </div>
                      </div>
                    </Col>
                  </div>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}
