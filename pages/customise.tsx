import React from 'react'
import config from '../customize/config'
import Head from 'next/head'
import { TravelCloudClient } from 'travelcloud-antd/travelcloud'
import { Button,Icon } from 'antd';
import { ContactForm } from '../components/contact-customise'
import { Row, Col } from 'antd'
import { Parallax } from 'react-parallax';
import BringingPage from '../components/home/bringing-page'
  
export default class Contact extends React.PureComponent<any> {
      formRef
      state = {
        formState: '',
        showForm: true
      };
      private client = new TravelCloudClient(config.tcUser);

      componentDidMount() {
        window.scrollTo(0, 0);
    }
      onSubmit = () => {
        this.formRef.props.form.validateFieldsAndScroll(async (error, values) => {
          if (!error) {
            this.setState({
              formState: 'submitting'
            })
    
            const result = await this.client.submitContactForm({
              referral_site: config.domain,
              subject: 'Customized Holidays',
              customer_name: values.name,
              customer_email: values.email
            }, values)
    
            if (result.result == null) {
              this.setState({
                formState: 'error'
              })
            } else {
              this.setState({
                formState: 'submitted',
                showForm:false
              })
            }
          } else {
            //console.log('error', error, values);
          }
        })
      }
    
  render() {

    let parallaxImg = "../static/img/bg-customise.jpg"
  
    return (
      <section id="custom">
        <Head>
          <title>Customized Holidays | {config.defaultTitle} </title>
        </Head>
        <article id="contact" className="text">
          <Row>
            <Col span={24} className="destop-vision">
              <Parallax
                bgImage={parallaxImg}
                bgImageAlt="right-tour-package"
                strength={500}
              >
                <div className={'middle-container'}>
                  <div className={'content_blk'}>
                    <div className={'content_header'}>
                      <h1>Customised Tours</h1>
                      <h2>Tailored For Your Needs</h2>
                    </div>
                    <div className={'content_txt'}>
                      <p>
                        Do you have a destination in mind but you are not able to find a tour for? Do you require special arrangements for your upcoming holiday? Or, would you like to arrange a special tour with your friends and family? Let us know about it and we will do our utmost to provide. It is always our pleasure to fulfil your travel dreams.
                      </p>
                      <p>
                        If you would like to get a customized tour arranged, write to us and we will contact you for follow up. If you would like to get some ideas for your trip, you can check out our itineraries in Leisure tours and Pilgrimage tours or go to articles for some information on places to visit and make the necessary adjustments.
                      </p>
                    </div>
                  </div>
                </div>
              </Parallax>
            </Col>
            <Col span={24} className="mobile-vision">
              <div className="customised-bg">
                <div className={'middle-container'}>
                  <div className={'content_blk'}>
                    <div className={'content_header'}>
                      <h1>Customised Tours</h1>
                      <h2>Tailored For Your Needs</h2>
                    </div>
                    <div className={'content_txt'}>
                      <p>
                        Do you have a destination in mind but you are not able to find a tour for? Do you require special arrangements for your upcoming holiday? Or, would you like to arrange a special tour with your friends and family? Let us know about it and we will do our utmost to provide. It is always our pleasure to fulfil your travel dreams.
                      </p>
                      <p>
                        If you would like to get a customized tour arranged, write to us and we will contact you for follow up. If you would like to get some ideas for your trip, you can check out our itineraries in Leisure tours and Pilgrimage tours or go to articles for some information on places to visit and make the necessary adjustments.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <div className="middle-container">
            {
              this.state.formState === 'submitted'
              ? 
              <div className="center-block success">
                <Icon type="smile" theme="outlined" />
                <p>We have received your enquiry and will get back to you as soon as possible.</p>
              </div>
              :  <>
              <section className="y-padding" style={{display: this.state.showForm ? 'block' : 'none'}}>
                <Row>
                  <Col span={24} className=" customise_form form_blk">
                    <ContactForm
                      wrappedComponentRef={(formRef) => {
                        this.formRef = formRef;
                      }} 
                    />
                  </Col>
                  <Col gutter={16} span={8} offset={16}>
                    <Button
                          className="form_submit_btn"
                      type="primary"
                      disabled={this.state.formState !== '' && this.state.formState !== 'error'}
                      onClick={this.onSubmit}>
                        {
                          this.state.formState !== '' && this.state.formState !== 'error' ? "Sending..." : "Submit"}
                    </Button>
                  </Col>
                  
                </Row>
              </section>
            </>   
            }

            {
              this.state.formState === 'error' 
              && <div className="center-block error">
                  <Icon type="meh" theme="outlined" />
                  <p>There was a problem submitting the form. Please try again later.</p></div>}
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
          </article>
      </section>
    )
  }
}