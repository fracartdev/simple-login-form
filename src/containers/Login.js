import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import "./Login.css";
import React, { useState } from "react";
import { loginUser, useAuthState, useAuthDispatch } from "../context";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
        fetch("https://graphqlzero.almansi.me/api", {
            "method": "POST",
            "headers": { "content-type": "application/json" },
            "body": JSON.stringify({
                query: `{
                    user(id: 1) {
                        id
                        name
                    }
                }`
            })
        }).then(res => res.json()).then(console.log)
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        let payload = {name, email}
        try {
            let response = await loginUser(dispatch, payload) //loginUser action makes the request and handles all the neccessary state changes
            if (!response.user) return
            props.history.push('/') //navigate to dashboard on success
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="Login">
            <Form onSubmit={handleLogin}>
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