import React from 'react'
import { Row, Col} from 'antd'
import { TravelCloudClient } from 'travelcloud-antd'
import config from '../customize/config'
import Router from 'next/router'
import { NoResult } from 'travelcloud-antd/components/no-result'
import ArticleTourSlide from '../components/tours/article-tours-slide'

export default class extends React.PureComponent<any>{
    private client = new TravelCloudClient(config.tcUser)

    static async getInitialProps(context){
        const client = new TravelCloudClient(config.tcUser)
        const query = context.query
        let tours = {}
        const document = await client.document({ id: query.id , categories:{name: "Articles"}})
        if(query.tour_name)
        {
            tours = await client.tours(Object.assign({'categories.name/and': query.tour_name}, query))
        }       
        
        return{ query, document, tours} 
    }

    state ={
        article: this.props.document.result,
        tour_item: this.props.tours.result
    }

    onTourClick(tour) {
		const str = tour.name;
		const remove = str.replace(/[|&;$%@"<>()+,-]/g, "").toLowerCase();
		const replaced = remove.replace(/\s/g, "-");
	
		Router.push({
		  pathname: "/tour",
		  query: { id: tour.id, n: replaced }
		});
    }

    componentDidMount() {
        if (document.getElementsByClassName('pic').length > 0){
            let pics = document.getElementsByClassName('pic')

            for (let i = 0; i < pics.length; i++) {
                let pic = pics[i]
                let img = pic.firstChild as HTMLImageElement
                let alt = img.getAttribute('alt')

                if (alt != '') {
                    let span = document.createElement('SPAN')
                    span.innerText = alt
                    pic.append(span)
                }
            }
        }
    }

    render(){
        
        const articleData = this.state.article
        const bannerImage = articleData.photos.length > 0 ? articleData.photos[0].url.replace('.jpg','_o.jpg') : ''
        const Banner = () => {
            return <Col span={24}>
                <div className="article_banner">
                    <img src={bannerImage} />
                </div>
            </Col>
        }
        
        return(
            <Row>
                {
                    bannerImage !== '' ? <Banner /> : <></>
                }
                <Col span={24}>
                    <div className="middle-container eachArticle-container">
                        <Row>
                            <Col span={24} className={'title'}>
                                <h1 className={'h1-title'}>{articleData.name}</h1>
                            </Col>
                            <Col span={24}>
                                <div dangerouslySetInnerHTML={{ __html: articleData.content }} />
                            </Col>
                            {
                                this.props.tours.result ?
                                    <Col span={24} style={{ marginTop: 50, marginBottom: 55 }}>
                                        <div className={"featured_tour_main_container middle-container"}>
                                            <div className={"featured_tour_title"}>
                                                <h1>Suggestion For You</h1>
                                            </div>
                                            {this.props.tours.loading || this.props.tours.result == null || this.props.tours.result.length === 0
                                                ? <NoResult
                                                    response={this.props.tours}
                                                    loading={this.props.tours.loading}
                                                    type="tours" />
                                                :
                                                <ArticleTourSlide
                                                    toursResult={this.state.tour_item}
                                                    cart={this.props.cart}
                                                    onTourClick={this.onTourClick} />
                                            }
                                        </div>
                                    </Col> : ''
                            }
                        </Row>
                    </div>
                </Col>
            </Row>
        )
    }
}