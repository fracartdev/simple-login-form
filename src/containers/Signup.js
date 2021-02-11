import { Form } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import "./Signup.css";
import React, { useState } from "react";

export default function Signup() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const [c_password, setConfPassword] = useState("");

    function validateForm() {
        return email.length > 0 && password.length > 0 && vPassword();
    }

    function vPassword() {
        return (password == c_password);
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log(email, password, c_password);
    }

    return (
        <div className="Signup">
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formSignupEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter email" 
                        autoFocus 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                </Form.Group>

                <Form.Group controlId="formSignupPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Form.Text className="text-muted">
                        Password must be at least 8 characters long.
                    </Form.Text>

                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Password" 
                        value={c_password}
                        onChange={(e) => setConfPassword(e.target.value)}
                    />
                </Form.Group>
                <Button block size="lg" type="submit" disabled={!validateForm()}>
                    Login
                </Button>
            </Form>
        </div>
    );
}