/* 상세 페이지를 이루는 컴포넌트, 영역은 3개의 컴포넌트들로 나뉨
이제 각 카드마다 페이지를 적용하려 함. Id 값으로 구분한다. */

import ProductDisplay from "../Components/ProductDisplay";
import CommentInput from "../Components/CommentInput";
import Comment from "../Components/Comment";
import { ListGroup } from "react-bootstrap";
import { useContext, useState } from "react";
import DataContext from "../Context/DataContext";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

/* 이 컴포넌트에서 prop을 받아 각 페이지를 렌더링할 수 있도록 함 */
const ProductDetail = () => {
    /* 혹은 data에 있는 값을 바로 쓰는 방법도 있긴 한데..... */
    const data = useContext(DataContext);
    /* const [product, setProduct] = useState(""); */
    const { id } = useParams();

    /* state를 통해 comment의 id 값을 다룬다..?
    어떤 구조고 왜 필요한지.. 중복을 피하기 위함일까?
    
    OK, 이미 있는 comment가 있으니까 덧붙여 일반적인 사이트에서는 댓글이 없는 상태부터 작성하게 될 것이다. */
    const [comments, setComments] = useState(
        data.state.allComments.filter((comment) => (comment.productId == id))
    );

    /* 갱신된 comment를 state.allComment 값이 바뀔 때마다 업데이트 */
    useEffect(() => {
        setComments(data.state.allComments.filter((comment) => (comment.productId == id)))
    },[data.state.allComments]);

    /* 길게 들어가는 게 싫다면 메서드로 만들어서 넣어보기(getter), 컴포넌트에 넣을 때는 메서드 형태로 넣어주기
    
    const getProduct = () => {
        return data.state.productList.find((product) => (product.id == id));
    }*/

    return (
        <>
            {/* data에 있는 값을 바로 쓰려면 이렇게 */}
            <ProductDisplay product={data.state.productList.find((product) => (product.productId == id))}></ProductDisplay>

            {/* <ProductDisplay></ProductDisplay> */}
            {/* 원한다면 마진과 패딩을 넣을 수도 있다. */}
            <br />
            <hr />
            <CommentInput id={id}></CommentInput>
            
            {/* className 혹은 style로 변경할 수 있다. */}
            
            {/* 출력될 컴포넌트 */}
            <ListGroup style={{textAlign: "left"}}>
                {/* state를 comment 개수만큼 반복하기 */}
                {comments.map((comment) => (<Comment comment={comment} key={comment.commentId}></Comment>))}
            </ListGroup>
        </>
    );
}

export default ProductDetail;