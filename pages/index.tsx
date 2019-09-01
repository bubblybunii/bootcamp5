import React from 'react'
import Router from 'next/router'
import { Row, Col} from 'antd'
import moment from 'moment'
export default class extends React.PureComponent<any> {

	state = {
		data: [],
		loading: false,
		error: false
	}

	 componentDidMount(){
		let today = moment(new Date()).format('YYYY-MM-DD');

		 fetch(`https://api.data.gov.sg/v1/environment/4-day-weather-forecast?date=${today}`)
		.then(response => response.json())
		.then(response => this.setState({ 
		  data: response.items,
		  loading: false
		}))
		.catch(error => this.setState({ 
		  loading: false, 
		  error: true 
		}));
	}
	render() {
		const right_img = 'https://cdn.net.in/lkchin/images/bg-categories.jpg'
		console.log(this.state.data)
		return (
			<section>
				<Row>
					<Col span={24} className={'home-slider-mobile'} style={{background: '#fff'}}>
					
					</Col>
					<Col className={'flex bg-white'} span={24}>
						
					</Col>
					
					
				</Row>
			</section>			
		)
	}
}