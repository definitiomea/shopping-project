import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import { Col, Container, Row } from 'react-bootstrap';

import DataContext from '../Context/DataContext';

import { useContext, useState } from 'react';

import { useParams } from 'react-router-dom';

const CommentInput = () => {
    /* 입력 값을 지정하고 받아오기 */
    const [textInput, setTextInput] = useState("");
    /* Context에서 활용할 객체들 */
    const { action, state } = useContext(DataContext);
    /* 활용하려 하는 파라미터, 제품의 id에 해당 */
    const { id } = useParams();

    // 버튼을 눌렀을 때 코멘트 추가
    const addComment = () => {
        /* 새로운 코멘트 객체 생성 */
        const comment = {
            commentId: state.commentCount, // 계속 증가해야 하는 값
            productId: id, // 현재 id 값을 가져오기: param 값, 부모로부터 받아오기
            name: (state.user ? state.user.name : "게스트"), // user를 통해서 받아오기, 단 user의 값이 null일 경우 빈 값으로 들어가야 한다.
            text: textInput // textInput을 가져와서 넣어주기
        }
        /* 새로운 코멘트 객체를 state의 allComments에 연결 */
        action.setAllComments(state.allComments.concat(comment))
        action.setCommentCount(state.commentCount + 1);
    }

    return (
        <>
            <Container>
                {/* 중앙 정렬도 Row에서 className으로 적용하려 함 */}
                <Row>
                    <Col xs={10}>
                        <FloatingLabel
                            controlId="floatingTextarea"
                            label="Comments"
                            className="mb-3"
                        >
                            <Form.Control as="textarea" placeholder="Leave a comment here"
                                onChange={(e) => {setTextInput(e.target.value)}}
                            />
                        </FloatingLabel>
                    </Col>
                    {/* classname 넣기도 가능 */}
                    <Col xs={2}>
                        <Button variant='primary' onClick={addComment}>입력</Button>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default CommentInput;