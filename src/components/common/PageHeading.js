import React from 'react';
import {Row, Col} from 'react-bootstrap';

function PageHeading(props) {
    return (
        <Row>
            <Col>
            <h3 style={{ "textAlign": "left", 'margin': '10px 0px 30px 40px' }}> {props.title}</h3>
          </Col>
        </Row>
    )

}

export default PageHeading;