import React, { useState, useEffect } from "react";
import { Container, Row, Card, CardDeck } from "react-bootstrap";
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
    let items = [];
    for (let index = 0; index < data.data.posts.data.length; index++) {
      items.push(
        <Card style={{ width: '12rem' }}>
          <Card.Body>
            <Card.Title>{data.data.posts.data[index].title}</Card.Title>
            <Card.Text>
              {data.data.posts.data[index].body}
            </Card.Text>
          </Card.Body>
        </Card>        
      )
    }

    setPosts(items);
  }

  return (
    <Container>
      <Row>
          {posts}
      </Row>
    </Container>
  );
}