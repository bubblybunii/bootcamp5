import React from 'react'
import { Row, Col} from 'antd'
import Link from 'next/link'
import AOS from 'aos'

export default class extends React.PureComponent<any>{
    componentDidMount(){
        AOS.init({
            duration : 500
        })
    }
    render(){
        const aboutus_img = '../static/img/bg-vision.jpg'
        return(
            <div>
                <Row className={'aboutus_container'}>
                    <Col span={24} className={'mobile-vision'}>                    
                        <div className={'mobile-bg'}>                   
                            <Row className={'middle-container'} id={'vision'}>
                                <Col className="wrap">
                                    <h1 data-aos="fade-up" className="aos-init aos-animate">Vision: <i>“To fulfill everyone’s travel dreams and expand your horizon of the world.”</i></h1>
                                    <p data-aos="fade-in" className="aos-init aos-animate">In the internet age where information overload may cause a problem with tour planning, we at Ik Chin will provide our experience to help travelers make the better choice. Every journey is special and unique in its experience thus we at IkChin make it our mission “ To offer unique, quality and memorable travel experiences. Ensuring safety of our customers is always our top priority”.</p>
                                </Col>
                            </Row>                        
                        </div>  
                    </Col>
                    <Col span={24} className={'destop-vision'}>                    
                        <section className="parallax">            
                            <Row className={'middle-container'} id={'vision'}>
                                <Col className="wrap">
                                    <h1 data-aos="fade-up" className="aos-init aos-animate">Vision: <i>“To fulfill everyone’s travel dreams and expand your horizon of the world.”</i></h1>
                                    <p data-aos="fade-in" className="aos-init aos-animate">In the internet age where information overload may cause a problem with tour planning, we at Ik Chin will provide our experience to help travelers make the better choice. Every journey is special and unique in its experience thus we at IkChin make it our mission “ To offer unique, quality and memorable travel experiences. Ensuring safety of our customers is always our top priority”.</p>
                                </Col>
                            </Row>                        
                        </section>
                    </Col>
                    <Col span={24}>
                        <Row className={'middle-container'}>
                            <Col className="pad-y">
                                <Row>
                                    <div className={'pagewrapper'}>
                                        <Col className={'pagecontent'}>
                                            <h1 className={'h1-title'}>Our Products</h1>
                                            <p>With more than 20 years of experience in travel planning in Asia, we provide and plan quality travel products to countries in the Asian region. As such, we provide tour planning and tour arrangements (flight tickets, hotels, transport and tours) for many countries all over Asia.</p>
                                            <p>Our <strong className="theme">leisure tours</strong> selection shows our available of the shelf products which also allows for customization to personalize travels to your needs. This will ensure the flexibility and exclusivity you need for your tours.</p>
                                            <p>Over the years, we also had the privilege to join in pilgrimage to Buddhist sites around Asia. Our <strong className="theme">pilgrimage tours</strong> section displays a list of tours you can look at to fulfill your interest in Buddhism and its history.</p>        
                                        </Col>
                                    </div>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        )
    }
}