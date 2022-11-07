/* 프로필 페이지 */

import { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProfileUpdateModal from "../Components/ProfileUpdateModal";
import DataContext from "../Context/DataContext";

/* mypage에서 호출할 Profile 컴포넌트 */
const Profile = () => {
    const { state } = useContext(DataContext);
    return (
        <>
            <Container>
                <Row>
                    {/* 프로필 사진과 사진을 수정할 모달 창(!!)
                    모달 창은 리액트 부트스트랩에서 참조하기 */}

                    {/* 프로필 사진을 업데이트 해보기 */}
                    <Col>
                        {state.user.profile ?
                        <div style={{width: "150px", height: "150px", backgroundImage: `url(${state.user.profile})`, backgroundSize: "cover"}}></div> :
                        <div style={{width: "150px", height: "150px", backgroundColor: "lightgray"}}>이미지가 없습니다</div>}
                        {/* 직접 만든 모달 컴포넌트 */}
                        <ProfileUpdateModal></ProfileUpdateModal>
                    </Col>

                    {/* 이름과 찜 목록을 출력 */}
                    <Col>
                        <h2>{state.name}</h2>
                        <h2>찜 목록</h2>
                        <ul>
                            { state.user.likelist.map((like) => (<li>{like.productName}</li>)) }
                        </ul>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Profile;