import React, { Fragment } from "react";
import config from "../customize/config";
import Head from "next/head";
import { Element, Events, scroller } from "react-scroll";
import { TravelCloudClient } from "travelcloud-antd/travelcloud";
import { Row, Input, Col, Button, Icon } from "antd";
import { ContactForm } from "../components/contact-form";
import Router from "next/router";
import BringingPage from '../components/home/bringing-page'

export default class Contact extends React.PureComponent<any> {
  formRef;
  state = {
    formState: "",
    showForm: true
  };
  private client = new TravelCloudClient(config.tcUser);

  getParameterByName(name, url) {
    if (!url) url = window.location.pathname;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  componentDidMount() {
    const url = window.location.href;
    const sub = this.getParameterByName("sub", url);
    this.setState({
      emailSubject: sub
    });

    Events.scrollEvent.register("begin", function() {
      console.log("begin", arguments);
    });

    Events.scrollEvent.register("end", function() {
      console.log("end", arguments);
    });
  }

  onSubmit = () => {
    this.formRef.props.form.validateFieldsAndScroll(async (error, values) => {
      if (!error) {
        this.setState({
          formState: "submitting"
        });

        const result = await this.client.submitContactForm(
          {
            referral_site: `${config.domain}`,
            subject: "Contact form",
            customer_name: values.name,
            customer_email: values.email
          },
          values
        );

        if (result.result == null) {
          this.setState({
            formState: "error"
          });
        } else {
          this.setState({
            formState: "submitted",
            showForm: false
          });
        }
      } else {
        //console.log('error', error, values);
      }
    });
  };

  render() {
    return (
      <Fragment className='contact-frag'>
        <section id="contactus">
          <div className="conteact-address">
              <iframe
              title="title"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8141582961366!2d103.84161131511256!3d1.285499999062412!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da1974bed7ff71%3A0xdf7be613dd93cdff!2sIK+Chin+Travel+Service+(s)+Pte+Ltd!5e0!3m2!1sen!2ssg!4v1503630147334"
              frameBorder="0"
              width="100%"
              height="400"
            />
          </div>
        </section>
        <section className="enquire-now">
          <div className="contactus-container">
            <div className={'middle-container contact-form'}>
              <h1 className='h1-title'>Contact Us</h1>
              <br/>
              {/* <p>We’d love to hear from you. We will endeavour to reply you in 2 working days. For urgent enquiries, please Whatsapp <a href={"https://api.whatsapp.com/send?phone=6593209793"} target="_blank">+65 9320 9793</a></p> */}
              <Row type="flex" justify="center">
                <Col lg={12} md={12} xs={24} className='officeAddress'>
                  <h3>Head Office</h3>
                  <span className='addressP'>
                    <p>
                      101 Upper Cross Street<br/>
                      #06-08 People’s Park Center<br/>
                      Singapore 058357
                    </p>
                    <p>
                      <a href="tel:+6562213727">T: (65) 6221 3727</a><br/>
                      F: (65) 6438 1170
                    </p>
                    <h3>Retail Office</h3>
                    <p>
                      101 Upper Cross Street<br/>
                      #03-11 People’s Park Center<br/>
                      Singapore 058357
                    </p>
                    <p>
                      <a href="tel:+6565354334">T: (65) 6535 4334</a><br/>
                      F: (65) 6535 5070
                    </p>
                    <p>
                      E: enquiry@ikchin.com.sg
                    </p>
                  </span>
                  
                </Col>
                <Col lg={12} md={12} xs={24} className='form_blk'>
                  <ContactForm 
                    wrappedComponentRef={formRef => {
                      this.formRef = formRef;
                    }}
                  />
                  <Button 
                    type="primary"
                    className="submitquery"
                    disabled={
                      this.state.formState !== "" &&
                      this.state.formState !== "error"
                    }
                    onClick={this.onSubmit}
                  >
                    {this.state.formState !== "" &&
                    this.state.formState !== "error"
                      ? "Sending..."
                      : "Submit"}
                  </Button>
                </Col>                
              </Row>
            </div>
            <Row>
              <Col span={24}>
                <div className="middle-container">
                  <h2 data-aos="fade-up" className="call-us aos-init aos-animate">Call us <a href="tel:6565354334">(65) 6535 4334</a></h2>
                </div>
              </Col>
              <Col span={24} id="subscribe">
                <div className={'middle-container'}>
                  <BringingPage />
                </div>
              </Col>
            </Row>
          </div>
        </section>
      </Fragment>
    );
  }
}
