import React from 'react'
import { Row, Col, List} from 'antd'
import { TravelCloudClient } from 'travelcloud-antd'
import config from '../customize/config'
import Link from 'next/link'
import Router from 'next/router'
import BingingPage from '../components/home/bringing-page'

export default class extends React.PureComponent<any>{
    private client = new TravelCloudClient(config.tcUser)

    static async getInitialProps(context){
        const client = new TravelCloudClient(config.tcUser)
        const query = context.query
        const articles = await fetch( `https://${ config.tcUser }.travelcloud.app/api/documents?categories.name=Articles` ); 
        const allArticles = await articles.json(); 
        return{ query, allArticles}       
    }

    changedate(date)
    {
        let month = ['Jan','Feb','Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        let articleDate = new Date(date)
        let getDate = articleDate.getDate()
        let getYear = articleDate.getFullYear()
        let getMonth = articleDate.getMonth()
        let strMonth = month[getMonth]
        let year = getYear.toString().substr(2,4)
        let day = getDate.toString().length > 1 ? getDate : '0' + getDate
        let article_date = (day + ' ' + strMonth + ' ' + year) 
        return article_date;
    }

    changeDesc(desc)
    {
        let strippedDesc = desc.replace(/(<([^>]+)>)/ig,"");
        let articleDesc = strippedDesc.substr(0,40) + ' ...';
        return articleDesc
    }

    isImage(img)
    {
        const image = img ? img.replace('.jpg','_o.jpg') : "/static/card-tw-560x300.png"
        return image
    }

    onArticleClickWithName(article_id,name) {
		Router.push({
            pathname: '/article',            
			query: {id: article_id, tour_name: name}
        })
    }
    
    onArticleClick(article_id) {
		Router.push({
            pathname: '/article',            
			query: {id: article_id}
        })
	}

    render(){
        const allArticlesData = this.props.allArticles.result
        return(
            <Row className={'pad-top article-container'}>
                <Col className={'middle-container'}>
                    <h1 className={'h1-title'}>Articles</h1>
                </Col>
                <Col className={'middle-container'}>
                    <List
                        grid={{ gutter: 16, xs: 1, sm: 1, md: 1, lg: 2, xl: 2, xxl: 2, column: 2 }}
                        dataSource={allArticlesData}
                        renderItem={(item:any) => (
                        <List.Item>
                            <div className={'article-item'}>
                                <div className="box hvr-float" onClick={() => {item.attributes.Tours ? this.onArticleClickWithName(item.id,item.attributes.Tours) : this.onArticleClick(item.id)}}>
                                    <Row>
                                        <Col xs={{span: 24}} sm={{span: 24}} md={{span: 12}} lg={{span: 12}} xl={{span: 12}} className={'article_img_container'}>
                                            <img className="niceimg" src={this.isImage(item.photo_url)}/> 
                                        </Col>
                                        <Col xs={{span: 24}} sm={{span: 24}} md={{span: 12}} lg={{span: 12}} xl={{span: 12}}>
                                            <div className="box-text">
                                                <h3>{item.name}</h3>
                                                <p>{this.changedate(item.date)}</p>
                                                <p dangerouslySetInnerHTML={{__html: this.changeDesc(item.content)}} />
                                                <p className="theme">Read more</p>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </List.Item>
                        )}
                    />
                </Col>
                <Col span={24} id="subscribe">
                    <div className={'middle-container'}>
                        <BingingPage />
                    </div>
                </Col>
            </Row>
        )
    }
}