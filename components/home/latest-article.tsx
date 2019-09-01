import React from 'react'
import { Row, Col} from 'antd'
import Link from 'next/link'

export default class extends React.PureComponent<any>{
    state={
        articleData: this.props.data
    }
    render(){
        let data = this.state.articleData
        let article_title = data.name
        let article_link = '/articles/' + data.name
        let para_desc = this.state.articleData.content.substr(4,115) + '...'
        let month = ['Jan','Feb','Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        let date = new Date(data.date)
        let article_date = (date.getDate() + ' ' + month[date.getMonth()] + ' ' + date.getFullYear())        
        return(
            <section className="bg-grey pad-y articles" id="latest-articles">
                <Row className={''}>
                    <h1 data-aos="fade-right" className="aos-init aos-animate">Latest Article</h1>
                    <Row gutter={16}>
                        <Col span={15} xs={{span: 24}} sm={{span: 24}} md={{span: 15}} lg={{span: 15}} xl={{span: 15}}>
                            <Row className={'box'}>
                                <Col xs={{span: 24}} sm={{span: 24}} md={{span: 12}} lg={{span: 12}} xl={{span: 12}}>
                                    <Link href='/article/laos-its-a-magical-place'>
                                        <a>
                                            <Row className="pagewrapper">
                                                <Col className="pagecontent">
                                                    <img src="https://cdn.net.in/lkchin/uploads/Airplane_30262_o.jpg" style={{height: 326}} alt="" />        
                                                </Col>
                                            </Row>
                                        </a>
                                    </Link>        
                                </Col>                                        
                                <Col xs={{span: 24}} sm={{span: 24}} md={{span: 12}} lg={{span: 12}} xl={{span: 12}}>                                        
                                    <div className={'box-text'}>                                            
                                        <div className={'pagewrapper'}>
                                            <Row className={'pagecontent'}>
                                                <h3 className={'latest-article-title'}>
                                                    <Link href="/article/laos-its-a-magical-place">
                                                        <a>
                                                            <span style={{fontSize: 'medium'}}></span>
                                                        </a>
                                                    </Link>
                                                    <Link href={article_link}>
                                                        <a title={data.name} target="_self">{article_title}</a>
                                                    </Link>
                                                </h3>
                                                <p style={{fontSize: '0.9rem', fontWeight: 'normal'}}>
                                                    <Link href={article_link}>
                                                        <a title={data.name} target="_self">{article_date}</a>
                                                    </Link>
                                                </p>
                                                <p style={{color: '#9f2d94', margin:'1em 0px', fontSize: '0.9rem', fontWeight: 'normal' }}>
                                                    <Col style={{marginBottom: 20}}>
                                                        <Link href={article_link}>
                                                            <a title={data.name} target="_self" dangerouslySetInnerHTML={{__html: this.state.articleData.content.length > 115 ? this.state.articleData.content.substr(0,160) + ' ...' : this.state.articleData.content}}></a>
                                                        </Link>
                                                    </Col>
                                                    <Col>
                                                        <Link href={article_link}>
                                                            <a title={data.name} target="_self">Read More</a>
                                                        </Link>
                                                    </Col>
                                                </p> 
                                            </Row>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col className="viewAll_blk" xs={{span: 24}} sm={{span: 24}} md={{span: 9}} lg={{span: 8}} xl={{span: 8}}>
                            <Link href='/articles'>
                                <a className={'box box-more'}>
                                    <img src="https://cdn.net.in/lkchin/images/icon-exotic.png"/> View All Articles
                                </a>
                            </Link>
                        </Col>
                    </Row>
                </Row>
            </section>
        )
    }
}