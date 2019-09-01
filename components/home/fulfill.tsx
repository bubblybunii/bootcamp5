import React from 'react'
import { Row, Col} from 'antd'

export default class extends React.PureComponent<any>{
    render(){
        return(
            <Row className={"bg-white"} type="flex">
                <Col xs={{span: 24}} sm={{span: 24}} md={{span: 24}} lg={{span: 14}} xl={{span: 14}} className={"fullfill_con"}>                    
                    <h1><em>“To fulfill everyone’s travel dreams and expand your horizon of the world”</em></h1>
                    <p className="justify fullfill-para">With more than 20 years of experience in travel planning in Asia, we provide and plan quality travel products to countries in the Asian region. As such, we provide tour planning and tour arrangements (flight tickets, hotels, transport and tours) for many countries all over Asia. Our leisure tours selection shows our available of the shelf products which also allows for customization to personalize travels to your needs. This will ensure the flexibility and exclusivity you need for your tours.</p>
                </Col>
                <Col xs={{span: 24}} sm={{span: 24}} md={{span: 24}} lg={{span: 10}} xl={{span: 10}}></Col>
            </Row>
        )
    }
}