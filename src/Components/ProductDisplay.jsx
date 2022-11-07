/* 제품을 보여주는 컴포넌트, 제품 정보 페이지의 자식
레이아웃이 조금 들어갈 것이다.

좌측에 사진, 우측에 물건 이름, 설명, 색상, 구매 등등이 뜬다.
Container, Row, Col로 작업하려 한다. */

import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Button from 'react-bootstrap/Button';

const ProductDisplay = (props) => {
    const { product } = props;
    /* 여러 이미지를 사용하기 위한 index state, setter로 값을 바꾸면 되니까 */
    const [index, setIndex] = useState(0);

    return (
        <Container>
            <Row>
                <Col>
                    <div>
                        {/* 여러 장을 다루고 싶을 때 요소를 추가해줄 수 있고, 배열로 다룰 수 있다.
                        문자열에서 배열, 객체로 바꾸는 게 까다로울 수 있어 미리미리 정의하는 게 좋다. */}
                        <img src={require(`../img/${product.productPicture[index]}`)} alt="" />
                    </div>
                </Col>
                <Col>
                    <div>
                        <h1>{product.productName}</h1>
                        <p>{product.productDetail}</p>
                        <p>색상 설명</p>
                        <div>
                            {/* productColor에 있는 color 값을 백그라운드로 사용하려 함 */}
                            { product.productColor.map((color, i) => (
                                /* 요소 2개가 출력되다보니 붙어보였다. 양식은 잘 적용됐었다. */
                                <div style={{display:"inline-block", width: "20px", height: "20px",
                                backgroundColor: color, border: "3px solid lightgrey" }} className="m-2"
                                onMouseEnter={() => {setIndex(i)}}>
                                    {/* 인덱스에 해당하는 파라미터도 필수 */}
                                </div>
                                /* 파라미터 넣어야 하는 걸 주의 */
                            ))}
                        </div>
                        {/* 컨테이너 요소에 className으로 정의된 스타일 호출하기 */}
                        <div className="d-grid gap-2">
                            {/* variant도 마찬가지 */}
                            <Button variant="primary" size="lg">
                                구매하기
                            </Button>
                            <Button variant="light" size="lg">
                                장바구니
                            </Button>
                            <Button variant="light" size="lg">
                                찜
                            </Button>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default ProductDisplay;