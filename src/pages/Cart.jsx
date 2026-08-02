import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changeAge, userModify } from "../store/userSlice";
import { changeCount, deleteProduct } from "../store/userCart";

const Cart = () => {
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  let dispatch = useDispatch();

  return (
    <div>
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
