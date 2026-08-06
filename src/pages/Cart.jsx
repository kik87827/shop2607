import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changeAge, userModify } from "../store/userSlice";
import { changeCount, deleteProduct } from "../store/userCart";
import { memo, useMemo, useState } from "react";


const LoopHard = () => {
  return 
}

// memo의 원리 => props가 변할 때만 재렌더링 해줌
const Child = memo(({count}) => {
  console.log('child 재렌더링됨')
  return (
    <>
      Child
    </>
  )
})

/* Cart가 재렌더링 되면 Child도 재렌더링됨  */
const Cart = () => {
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  let [count, setCount] = useState(0);
  let dispatch = useDispatch();

  // Cart 컴포넌트가 실행 될때 딱 1번만 실행 
  // useEffect는 실행이 끝나고, useMemo는 실행될때 같이
  // 계산이 오래 걸릴 때 useMemo 씀
  let loopResult = useMemo(()=>{return LoopHard()},[])

  return (
    <div>
      <Child count={count} /><br /><button onClick={() => {setCount(prev => prev + 1)}}>Cart control</button><br /><br />
      {user.name} {user.age}의 장바구니
      <div>
        <button
          onClick={() => {
            dispatch(changeAge(5));
          }}
        >
          나이 변경
        </button>
      </div>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
          </tr>
        </thead>
        <tbody>
          {cart.map(({ id, name, count }, index) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{name}</td>
              <td>{count}</td>
              <td>
                <button
                  onClick={() => {
                    dispatch(changeCount(id));
                  }}
                >
                  +
                </button>
                <button onClick={() => {
                  dispatch(deleteProduct(id));
                }}>삭제</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Cart
