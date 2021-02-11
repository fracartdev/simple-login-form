import React, { useState, useEffect } from "react";
import { Container, Row, Card } from "react-bootstrap";
import "./Home.css";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    renderPosts();
    
  }, []);

  async function fetchPosts() {
    try {
        const response = await fetch("https://graphqlzero.almansi.me/api", 
          {
            "method": "POST",
            "headers": { "content-type": "application/json" },
            "body": JSON.stringify({
              query: `query (
                $options: PageQueryOptions
              ) {
                posts(options: $options) {
                  data {
                    id
                    title
                    body
                  }
                  meta {
                    totalCount
                  }
                }
              }`,
              variables: {
                "options": {
                  "paginate": {
                    "page": 1,
                    "limit": 5
                  }
                }
              }
            })
          });
        const data = await response.json();
        return data;
    } catch (error) {
      console.error(error);
    }
  }

  async function renderPosts() {
    const data = await fetchPosts();
    setPosts(data);
  }

  return (
    console.log(posts.data.posts.data[1].title),
    <Container>
      <Row>
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>{posts.data.posts.data[1].title}</Card.Title>
            <Card.Text>
              {posts.data.posts.data[1].body}
            </Card.Text>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
}