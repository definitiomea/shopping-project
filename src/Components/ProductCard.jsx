import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as activeHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as disaciveHeart } from '@fortawesome/free-regular-svg-icons';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useContext } from 'react';
import DataContext from '../Context/DataContext';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ProductCard (props) {
    const {product} = props;
    const data = useContext(DataContext);
    const [likeCheck, setLikeCheck] = useState(false);
    const navigate = useNavigate();

    /* 로그아웃 되었을 때 likeCheck를 false로 만들기, useEffect Hook
    data.state.user의 값을 확인해서 업데이트 해준다. */
    useEffect(() => {
        if(!data.state.user) {
            setLikeCheck(false);
        }
    }, [data.state.user]);

    const toggleLike = () => {
        /* like가 선택이 되어있는지를 확인해야 하고,
        data.state.user.likelist[인덱스].productId
        에 접근하여 상품 아이디가 있다면 선택된 것을 알 수 있다.
        
        find() 메서드로 조건이 참일 때 값을 반환하려 한다. 없을 때는 undefined
        값이 있다면 값을 제거하고(filter, 즉 제외하고 새로운 배열을 만들겠다는 것)
        값이 없다면 값을 추가한다. (concat) */

        /* user의 값이 없을 때 */
        if(!data.state.user) {
            return ; // 함수를 끝낸다.
        }

        /* 또 다른 문제가 생겼는데.. 그러니까 처음에는 likelist가 추가되지 않고
        다음에 클릭해야 바뀐게 보인다고?
        
        게다가 likelist 삭제가 안되는데..? 뭔가 이상해.....

        -> filter 메서드를 쓸 때 like 파라미터를 넣고, 괄호 안에서 조절해야 됐다. 해결 */

        const likes = data.state.user.likelist;

        /* 같은 값이 있을 때 제거하는 로직 */

        /* find 메서드를 조건 값으로 다루는데..? 생소하다.

        여기에서 뭔가 에러가 생겼는데... 왜?
        -> user.likelist 조건을 맞추지 않았기 때문,
        대소문자 구별도 context 컴포넌트 기준으로 잘해야 한다. */
        if(likes.find((like) => (like.productId == product.productId))) {
            const newLikeList = likes.filter((like) => (like.productId != product.productId));
            data.action.setUser({
                /* 스프레드 연산자를 통해 user에는 변화가 없게 해준다. */
                ...data.state.user,
                likelist : newLikeList
            });
            setLikeCheck(false);
        }

        /* 값이 없을 때 찜(LikeList)을 추가하는 로직
        like 객체를 만들어서 물건 id와 물건 이름을 추가하려 한다. */
        else {
            const like = {
                productId : product.productId,
                productName : product.productName
            };
            /* like가 추가된 새로운 배열 생성 */
            const newLikeList = likes.concat(like);
            data.action.setUser({
                ...data.state.user,
                likelist: newLikeList
            });
            setLikeCheck(true);
        }

        /* 확인용 log */
        console.log(data.state.user);
    }

    return (
        <>
            {/* 링크를 통해 해당 product로 넘어갈 수 있도록 하기 */}
            <Card style={{ width: '13rem' }}>
                <Card.Img variant="top" src={require(`../img/${product.productPicture[0]}`)}
                onClick={() => {navigate("/product/" + product.productId)}} />
                <Card.Body>
                    <Card.Title>{product.productName}</Card.Title>
                    {/* 사용 X
                    <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                    </Card.Text> */}

                    {/* 로그인이 되어있다면 버튼을 클릭했을 때 유저의 likeList에 추가하거나 제거하기
                    활성 - 비활성을 오가는 것들을 토글이라고 표현한다. */}
                    <Button variant="outline-primary" onClick={ toggleLike }>
                        {/* 체크 값을 받아와 삼항 연산자로 아이콘 고르기 */}
                        <FontAwesomeIcon icon={ likeCheck ? activeHeart : disaciveHeart }></FontAwesomeIcon>
                    </Button>
                </Card.Body>
            </Card>
        </>
    );
}

export default ProductCard;