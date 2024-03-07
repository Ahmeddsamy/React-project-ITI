import React, { useState, useEffect } from "react";
import { Button, Card, Row, Col, Carousel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const categoriesPerSlide = 4;
  let slides = [];
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://ahmed-samy-node-project-iti.onrender.com/category")
      .then((response) => response.json())
      .then((data) => setCategories(data.categories))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const onCategoryClick = (categoryName) => {
    navigate(`/category/${encodeURIComponent(categoryName)}`);
  };

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
      <Carousel className="d-flex justify-content-center">
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
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://via.placeholder.com/800x400?text=Second+Slide"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://via.placeholder.com/800x400?text=Third+Slide"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <h2>Categories</h2>
      {slides.length > 0 && (
        <div>
          <Row>
            {slides[activeIndex].map((category) => (
              <Col key={category._id} xs={6} md={3}>
                <Card onClick={() => onCategoryClick(category.categoryName)}>
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
          <div className="text-center my-5">
            <Button variant="primary" onClick={prevSlide} className="mx-2">
              &lt;
            </Button>
            <Button variant="primary" onClick={nextSlide} className="mx-2">
              &gt;
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
