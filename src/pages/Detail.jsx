import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import styled from "styled-components"

let YellowBtn = styled.button`
  background : ${ props => props.bg };
  color : ${ props => props.bg === 'blue' ? 'white' : 'black'};
  padding : 10px;
`
let NewBtn = styled(YellowBtn)`
  border-radius : 10px;
  border:0;
`

let Box = styled.div`
  background : grey;
  padding : 20px;
`

class Detail2 extends React.Component {
  componentDidMount(){

  }
  componentDidUpdate(){

  }
  componentWillUnmount(){

  }
}


const Detail = ({ shoes }) => {
  let params = useParams();
  let paraId = parseFloat(params.id);

  let [count,setCount] = useState(0);
  let [boxAlert,setBoxAlert] = useState(true);
  let [input,setInput] = useState("");
  let [warn,setWarn] = useState(false);
  let alertBox = useRef(null);

  useEffect(()=>{
    console.log('안녕')
    /* for (var i =0; i < 10000; i++){
      console.log(1)
    } */
   let timerId = setTimeout(()=>{
     if(!alertBox.current){return}
     alertBox.current.style.display = "none"
     setBoxAlert(false)
   },2000)

    // clean up function
    return () => {
      timerId = 0;
      clearTimeout(timerId);
    }
  },[])

  useEffect(() =>{
    if (!isNaN(input)) {
      console.log("숫자");
        setWarn(false);
    } else {
      console.log("숫자가 아님");
        setWarn(true);
    }
  },[input])
  
  if (!shoes[paraId]) {
    return <div>상품이 없습니다.</div>;
  }
  
  let filterItem = shoes.find((item) => item.id === paraId);
  let { title, price, content } = shoes[paraId];
  return (
    <div className="container">
      <div>
        <input value={input} onChange={(e)=>{
          const value = e.target.value;
          setInput(e.target.value);
          /* if(typeof etvalue !== "number"){
            setWarn(true);
          } */
          /* let etvalue = parseFloat(e.target.value);
          console.log(typeof etvalue)
          if(typeof etvalue !== "number"){
            setWarn(true);
          } */
        }} />
        {
          warn ? (<p style={{color : "red"}}>숫자만 입력하세요</p>) : null
        }
        
      </div>
      <Box>
        {count}
        <YellowBtn bg="blue" onClick={()=>{setCount(prev => prev + 1)}}>버튼</YellowBtn>
        <YellowBtn bg="orange">버튼</YellowBtn>
        <NewBtn bg="orange">버튼</NewBtn>
      </Box>
      <div className="alert alert-warning" ref={alertBox}>
        2초 이내 구매시 할인
      </div>
      {
        boxAlert ? (
          <div className="alert alert-warning">
            2초 이내 구매시 할인2
          </div>
        ) : null
      }
      
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
