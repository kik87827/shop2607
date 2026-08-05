import React, { useContext, useEffect, useRef, useState } from "react";
import { Nav } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

import styled from "styled-components"

import { Context1 } from "../App";
import { pushProduct } from "../store/userCart";
import { useDispatch } from "react-redux";
import { useQuery, useQueryClient } from "@tanstack/react-query";


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

/* let a = 0; */


const Detail = ({ shoes }) => {
  let params = useParams();
  let paraId = parseFloat(params.id);

  let [count,setCount] = useState(0);
  let [boxAlert,setBoxAlert] = useState(true);
  let [input,setInput] = useState("");
  let [warn,setWarn] = useState(false);
  let alertBox = useRef(null);

  let [detail, setDetail] = useState("");
  let loadTimer = 0;

  let { storage } = useContext(Context1);

  let dispatch = useDispatch();
  let navigate = useNavigate();

  // console.log(storage, shoes);

  /* for(var i=0; i < 1e9; i++){
    a = 1;
  } */

  useEffect(() => {
    setDetail("tran-end");
    return () => {
      setDetail("")
    }
  },[])

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
     // console.log("숫자");
        setWarn(false);
    } else {
      //console.log("숫자가 아님");
        setWarn(true);
    }
  },[input])
  
  if (!shoes[paraId]) {
    return <div>상품이 없습니다.</div>;
  }
  
  let filterItem = shoes.find((item) => item.id === paraId);
  let { title, price, content } = shoes[paraId];
  let [tabActive, setTabActive] = useState(0);

  useEffect(() => {
    let watchedArray = JSON.parse(localStorage.getItem("watched"));
    watchedArray.push(filterItem.id);
    localStorage.setItem(
      "watched",
      JSON.stringify([...new Set(watchedArray)])
    );
  }, [])

  /* 
    == 코드부터 짜는게 아니라 한글 먼저 쓰고 코드로 옮김 ==
    누가 Detail 페이지 접속하면
    그 페이지에 보이는 상품 id 가져와서
    localStorage에 wached 항목에 추가

    == 위 한글을 JS로 번역하면 코딩 끝임 ==
  */

    let queryResult = useQuery({
      queryKey: ['getName'],
      refetchOnWindowFocus: false,
      retry : 10, // default 3~4
      queryFn: () => axios.get('https://codingapple1.github.io/userdata.json').then(result => result.data)
    });
  /* 
    장점1. ajax 상태체크 쉬움
    result.isPending
    result.isSucces
    result.error
    장점2. 실패시 3~4번 재시도
    장점3. 캐싱 알아서 해줌
  */

  // 캐싱된 데이터만 빼서 쓸 수도 있음
  let q =  useQueryClient();
  let qresult = q.getQueryData(['getName'])

  console.log(qresult)
  
  return (
    <div className={["container","tran-start", detail].filter(Boolean).join(" ")}>
      <div>
        <input
          value={input}
          onChange={(e) => {
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
          }}
        />
        {warn ? <p style={{ color: "red" }}>숫자만 입력하세요</p> : null}
      </div>
      <Box>
        {count}
        <YellowBtn
          bg="blue"
          onClick={() => {
            setCount((prev) => prev + 1);
          }}
        >
          버튼
        </YellowBtn>
        <YellowBtn bg="orange">버튼</YellowBtn>
        <NewBtn bg="orange">버튼</NewBtn>
      </Box>
      <div className="alert alert-warning" ref={alertBox}>
        2초 이내 구매시 할인
      </div>
      {boxAlert ? (
        <div className="alert alert-warning">2초 이내 구매시 할인2</div>
      ) : null}

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
          <button className="btn btn-danger" onClick={() => {
            dispatch(pushProduct(filterItem));
            navigate('/cart')
          }}>주문하기</button>
        </div>
      </div>

      <Nav variant="tabs" defaultActiveKey={`link` + tabActive}>
        <Nav.Item>
          <Nav.Link onClick={() => setTabActive(0)} eventKey="link0">
            탭1
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => setTabActive(1)} eventKey="link1">
            탭2
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent tabActive={tabActive} shoes={shoes} />
    </div>
  );
};


function TabContent({ tabActive, shoes }) {
  let [tabModi, setTabModi] = useState("");
  let timer = 0;
  let { storage } = useContext(Context1);
  useEffect(() => {
    timer = setTimeout(() => {
      setTabModi("tran-end");
    }, 50);
    return () => {
      clearTimeout(timer);
      setTabModi("");
    };
  }, [tabActive]);
  return (
    <div className={["tran-start", tabModi].filter(Boolean).join(" ")}>
      {[<div>탭1 {storage}</div>, <div>탭2 내용</div>][tabActive]}
    </div>
  );
}

export default Detail;
