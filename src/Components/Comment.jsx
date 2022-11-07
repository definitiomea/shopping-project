import ListGroup from 'react-bootstrap/ListGroup';
/* 중앙 정렬이 되어있는데..? */

/* CommentInput 컴포넌트를 호출할 때 props를 받아와서 적어준다. */
const Comment = (props) => {
    const { comment } = props;

    return (
        <>
            <ListGroup.Item>
                <h3>{comment.name}</h3>
                <p>{comment.text}</p>
            </ListGroup.Item>
        </>
    );
}

export default Comment;