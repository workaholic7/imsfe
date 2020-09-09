import React, { useState } from 'react';
import { Row, Col, Form, Button, Container } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import FormHeader from './FormHeader';
import { BASE_URL, REST_API } from '../Constants';
import FormResult from './common/FormResult';
import FormInput from './common/FormInput';

function Login(props) {
    const [formData, setFormData] = useState({ userId: '', password: '' });
    const [isSuccess, setSuccess] = useState(false);
    const [result, setResult] = useState('');

    const history = useHistory();

    const onFieldChange = (e) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        });
    }

    const onSubmit = (e) => {

        e.preventDefault();
        var url = BASE_URL + REST_API.LOGIN;
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.status === 200) {
                sessionStorage.setItem('authenticated', true);
                history.push("/invoice");
                
            }  else{
                throw Error();
            }
            
        }).catch(err => {
            console.log(err);
            setSuccess(false);
            setResult(err.errorMessage);
        });

    }


    return (
        <Container fluid>
            <div className="custom-form">
                <FormHeader class="form-header" title='Sign in' />
                <FormResult isSuccess={isSuccess} result={result} span="12" />
                <Form onSubmit={onSubmit} style={{ margin: '20px 0px' }}>
                    <FormInput size="12" name="userId" placeholder="User ID" value={formData.userId} onChange={onFieldChange}
                        required />
                    <FormInput size="12" name="password" placeholder="Password" value={formData.password} onChange={onFieldChange} type="password"
                        required />

                    <Row>
                        <Col md={{ span: 3, offset: 9 }} >
                            <Button type="submit" className="login">
                                Login
                            </Button>
                        </Col>
                    </Row>

                </Form>
            </div>
        </Container>
    )
}
export default Login;