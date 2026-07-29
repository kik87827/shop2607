import React from 'react'
import { Col } from 'react-bootstrap';

const ProductItem = ({ id, title, content, navigate }) => {
  return (
    <Col sm onClick={() => navigate(`/detail/${id}`)}>
      {/* <img
        src={`${import.meta.env.BASE_URL}shoes${id + 1}.jpg`}
        style={{ width: "80%" }}
      /> */}
      <img
        src={`https://codingapple1.github.io/shop/shoes${id + 1}.jpg`}
        style={{ width: "80%" }}
      />
      <h4>{title}</h4>
      <p>{content}</p>
    </Col>
  );
};

export default ProductItem
