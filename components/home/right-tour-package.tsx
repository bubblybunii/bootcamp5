import React from 'react'
import { Row, Col} from 'antd'
import Link from 'next/link'
import AOS from 'aos'
import { Parallax, Background } from 'react-parallax';

export default class extends React.PureComponent<any>{
    componentDidMount(){
        AOS.init({
            duration : 500
        })
    }

    render(){        
        return(
            <section className={'parallax-window'}>                
                <Row className={'wrap'} id={'tour-categories'}>
                    <h1 data-aos="fade-right">Find the right tour package for you</h1>
                    <p data-aos="fade-left">Come browse our selection of ready-made Asia tours packages designed to give you a well-balanced experience of culture, history and natural scenery. You can also choose to have your own private tour. Send us a request and we will tailor make one to provide you with a comfortable, personalised holiday.</p>
                    <Row type="flex" justify='center'>
                        <Col xs={{span: 24}} sm={{span: 24}} md={{span: 6}} lg={{span: 6}} xl={{span: 6}}>
                            <Link href="/tours?category=Leisure">
                                <a className={"hvr-grow"}>
                                    <img data-aos="fade-up" className="w-100 aos-init aos-animate" src="../static/img/icon-leisure.png" />
                                    <h3>LEISURE TOUR</h3>
                                </a>
                            </Link>
                        </Col>
                        <Col xs={{span: 24}} sm={{span: 24}} md={{span: 6}} lg={{span: 6}} xl={{span: 6}}>
                            <Link href="/tours?category=Cruise">
                                <a className={"hvr-grow"}>
                                    <img data-aos="fade-down" className="w-100 aos-init aos-animate" src="../static/img/icon-cruise.png" />
                                    <h3>CRUISE</h3>
                                </a>
                            </Link>
                        </Col>
                        <Col xs={{span: 24}} sm={{span: 24}} md={{span: 6}} lg={{span: 6}} xl={{span: 6}}>
                            <Link href="/tours?category=Exotic">
                                <a className={"hvr-grow"}>
                                    <img data-aos="fade-up" className="w-100 aos-init aos-animate" src="../static/img/icon-exotic.png" />
                                    <h3>EXOTIC</h3>
                                </a>
                            </Link>
                        </Col>
                        <Col xs={{span: 24}} sm={{span: 24}} md={{span: 6}} lg={{span: 6}} xl={{span: 6}}>
                            <Link href="/tours?category=Pilgrimage%20and%20Buddhist%20tours">
                                <a className={"hvr-grow"}>
                                    <img data-aos="fade-down" className="w-100 aos-init aos-animate" src="../static/img/icon-pilgrimage.png" />
                                    <h3>PILGRIMAGE</h3>
                                </a>
                            </Link>
                        </Col>
                    </Row>
                </Row>   
            </section>
        )
    }
}