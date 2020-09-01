import React from 'react';
import {Row, Col} from 'react-bootstrap';
import {Styles} from '../css/Styles'

function PageHeading(props) {
    return (
        <Row>
            <Col>
            <h3 style={Styles.pageHeading}> {props.title}</h3>
          </Col>
        </Row>
    )

}

export default PageHeading;