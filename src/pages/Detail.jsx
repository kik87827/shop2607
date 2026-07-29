import React from "react";
import { useParams } from "react-router-dom";

const Detail = ({ shoes }) => {
  let params = useParams();
  let paraId = parseFloat(params.id);
  
  if (!shoes[paraId]) {
    return <div>상품이 없습니다.</div>;
  }
  
  let filterItem = shoes.find((item) => item.id === paraId);
  let { title, price, content } = shoes[paraId];
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <img
            src={`https://codingapple1.github.io/shop/shoes${
              filterItem.id + 1
            }.jpg`}
            width="100%"
          />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{filterItem.title}</h4>
          <p>{filterItem.content}</p>
          <p>{filterItem.price}원</p>
          <button className="btn btn-danger">주문하기</button>
        </div>
      </div>
    </div>
  );
};

export default Detail;
