import React from 'react'
import Slider from 'react-slick'
import ReactDOM from 'react-dom';
import Link from 'next/link'
import { Row, Col, Select} from 'antd'
import Item from 'antd/lib/list/Item'

export default class extends React.PureComponent<any>{
    state = {
        contents: this.props.data,
        dropDownData: this.props.ddlData
    }

    render(){
        function NextArrow(props) {
            const { className, onClick } = props;
            return (
                <span id="next" className={className}
                onClick={onClick}>
                </span>
            )
        }

        function PrevArrow(props) {
            const { className, onClick } = props;
            return (
                <span id="prev" className={className}
                onClick={onClick}>
                </span>
            )
        }
        var settings = {
            dots: false,
            infinite: false,
            arrows: true,
            speed: 2000,
            slidesToShow: 1,
            slidesToScroll: 1,
            fade: true,
            nextArrow: <NextArrow />,
            prevArrow: <PrevArrow />,
            autoplay: true,
            autoplaySpeed: 10000,
            afterChange: (props) => {
                let img = document.getElementsByClassName('home_slider_img_'+props)[0]
                img.classList.add('slick-zoom')
            },
            beforeChange: (props) => {
                let img = document.getElementsByClassName('home_slider_img_'+props)[0]
                img.classList.remove('slick-zoom')
            }
        }
        return(
            <section>
                <Slider {...settings}>
                {
                    this.state.contents.photos.map((item,index)=>{
                        return(
                            <Row id={"main_slider"} key={index} className={"c_item bannerC_item"}>
                                <Col className={"b_imgBlk"}>
                                    <Link href={item.desc}>
                                        <a>
                                            <img className={`home_slider_img_${index} slick-zoom`} src={item.url.replace('.jpg','_o.jpg')} />
                                        </a>
                                    </Link>
                                    <Row className={"caption"}>
                                        <Col className={"tour"}>
                                            <h3>{item.title.split('[')[0]}</h3>
                                        </Col>
                                        <Col className={"price"}>
                                            <h4>{item.title.split('[')[1].replace(']','')}</h4>
                                        </Col>
                                    </Row>                                    
                                </Col>
                            </Row>
                        )
                    })
                }
                </Slider>
                <Row id="slide-dest">
                    <Col className={"selectric-wrapper"}>                        
                        <Select defaultValue="VIEW OTHER DESTINATION" className={"selectric"} style={{width:'100%',margin:'6px 0 24px'}} >                            
                        {                            
                            this.state.dropDownData.map((item,index)=>{
                                return(
                                    <option key={index} value={item.id}>{item.name}</option>
                                )                                
                            })
                        }
                        </Select>
                    </Col>
                </Row>
            </section>
        )
    }
}