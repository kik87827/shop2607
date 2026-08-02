/* 리액트에서 자주쓰는 if문 작성패턴 5개 */
/* if문 코딩 스타일 */

/* 1. 컴포넌트 안에서 쓰는 if/else */
function Component() {
  if (true) {
    return <p>참이면 보여줄 HTML</p>;
  } else {
    return null;
  }
}

function Component2() {
  if (true) {
    return <p>참이면 보여줄 HTML</p>;
  }
  return null;
}

/* 2. JSX안에서 쓰는 삼항연산자 */
/* ternary oparator */
function Component3() {
  return <div>{1 === 1 ? <p>참이면 보여줄 HTML</p> : null}</div>;
}
/* 중첩사용 가능 */
function Component4() {
    return (
			<div>
				{
					1 === 1 ? <p>참이면 보여줄 HTML</p> : ( 2 === 2 ? <p>안녕</p> : <p>반갑</p>)
				}
			</div>
    )
}

/* 3. && 연산자로 if 역할 대신하기 */
/* 
	왼쪽 조건식이 true면 오른쪽 JSX가 그 자리에 남습니다.
	왼쪽 조건식이 false면 false가 남습니다.(false가 남으면 HTML로 렌더링하지 않습니다.)
*/
function Component5() {
	return (
		<div>
			{ 1 === 1 && <p>참이면 보여줄 HTML</p>}
		</div>
	)
}

/* 4. switch / case 조건문 */
/* if문 중첩해서 여러개 달려있는 경우에 가끔 씁니다. */
function Component6IF() {
	var user = 'seller';
	if (user === 'seller') {
		return <h4>판매자 로그인</h4>
	} else if (user === 'customer') {
		return <h4>구매자 로그인</h4>
	} else {
		return <h4>그냥 로그인</h4>
	}
}

/* 
	switch 문법
	1. switch(검사할변수){} 이것부터 작성하고
	2. 그 안에 case 검사할변수가 이거랑 일치하냐 : 를 넣어준다
	3. 그래서 이게 일치하면 case : 밑에 있는 코드를 실행해준다.
	4. default:는 그냥 맨 마지막에 쓰는 else문과 동일하다.

	장점은 if문 연달아쓸때 코드가 약간 줄어들 수 있는데
	조건식란에서 변수하나만 검사할 수 있다는게 단점이다.
*/
function ComponentSwitch() {
	var user = 'seller';
	switch (user) {
		case 'seller' : return <h4>판매자 로그인</h4>
		case 'customer': return <h4>구매자 로그인</h4>
		default : return <h4>그냥 로그인</h4>
	}
}


/* 5. object/array 자료형 응용 */
/* 경우에 따라서 다른 HTML 태그들을 보여주고 싶은 경우 */
/* object{} 뒤에 []대괄호를 붙여서 "key값이 현재상태인 자료를 뽑겠습니다"라고 써놓는거 */
function ComponentObject() {
	var current = 'info';
	return (
		<div>
			{
				{
					info: <p>상품정보</p>,
					shipping: <p>배송관련</p>,
					refund : <p>환불약관</p>
				}[current]
			}
		</div>
	)
}

var tabUI = {
	info : <p>상품정보</p>,
	shipping : <p>배송관련</p>,
	refund : <p>환불약관</p> 
}

function ComponentObject2() {
	var current = 'info';
	return (
		<div>
			{
				tabUI[current]
			}
		</div>
	)
}