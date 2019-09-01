import React from 'react'
import { Row, Col, Input} from 'antd'

export default class extends React.PureComponent<any>{
    render(){
        return(
            <Row>
                <Col className="parallax-window" >
                    <Row className="wrap">
                        <h1 data-aos="fade-right" className="aos-init aos-animate bring-title">BRINGING YOU MORE THAN JUST A HOLIDAY</h1>
                        <p data-aos="fade-left" className="aos-init aos-animate">Travel with us on a group tour or a private tour and we will provide you with new experiences to create great lasting memories.</p>
                        <Col span={24} data-aos="fade-up" className="row-fluid aos-int aos-animate">
                            <Row className={'bringing-email-box'}>
                                <Col className={'box-text bg-dark'}>
                                    <p>Travel with us on a group tour or a private tour and we will provide you with new experiences to create great lasting memories.</p>
                                    <div className={'box-text bg-white borderless'}>
                                        <Input size="large" placeholder="Enter your email" />
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        )
    }
}
