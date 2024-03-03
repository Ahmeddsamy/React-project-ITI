import React, { useState, useEffect } from "react";
import { Button, Card, Row, Col, Carousel } from "react-bootstrap";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0); // Index of the currently active slide

  // Number of categories to display per slide
  const categoriesPerSlide = 4;
  let slides = []; // This will hold arrays of categories for each slide

  useEffect(() => {
    fetch("https://ahmed-samy-node-project-iti.onrender.com/category")
      .then((response) => response.json())
      .then((data) => setCategories(data.categories))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  // Split categories into groups for each slide
  for (let i = 0; i < categories.length; i += categoriesPerSlide) {
    slides.push(categories.slice(i, i + categoriesPerSlide));
  }

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
    );
  };

  return (
    <div>
      {/* Carousel placeholder for other content */}
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://via.placeholder.com/800x400?text=First+Slide"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        {/* Add more Carousel.Item as needed */}
      </Carousel>
      <h2>Categories</h2>
      {slides.length > 0 && (
        <div>
          <Row>
            {slides[activeIndex].map((category) => (
              <Col key={category._id} xs={6} md={3}>
                <Card>
                  <Card.Img
                    variant="top"
                    src={category.imageURL}
                    alt={category.categoryName}
                  />
                  <Card.Body>
                    <Card.Title>{category.categoryName}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <Button variant="primary" onClick={prevSlide}>
            &lt;
          </Button>
          <Button variant="primary" onClick={nextSlide}>
            &gt;
          </Button>
        </div>
      )}
    </div>
  );
}
