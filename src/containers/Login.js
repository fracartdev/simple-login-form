import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import "./Login.css";
import React, { useState } from "react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        var query = `query{users{id}}`;
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            mode: 'no-cors',
            body: JSON.stringify({query})
        };

        fetch('http://localhost:8080/', requestOptions)
        .then(res => res.json())
        .then(json => console.log(json))
        .catch(console.error);
    }

    return (
        <div className="Login">
            <Form onSubmit={handleSubmit()}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter email" 
                        autoFocus 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Button block size="lg" type="submit" disabled={!validateForm()}>
                    Login
                </Button>
            </Form>
        </div>
    );
}