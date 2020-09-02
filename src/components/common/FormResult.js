import React from 'react';
import {Col} from 'react-bootstrap';

function FormResult({isSuccess, result, span, offset}){
return(
    <Col md={{ span:span, offset:offset}} className="form-result" style={{ 'color': isSuccess ? '#007bff' : 'red'}}>
          {result}
    </Col>
)
}

export default FormResult;