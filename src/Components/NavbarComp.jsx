/* 여기에서 리액트 부트스트랩 들고 오기 */
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useNavigate } from 'react-router-dom';

/* ?? */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShop } from '@fortawesome/free-solid-svg-icons';

/* useContext와 컴포넌트 들고 오기 */
import { useContext } from 'react';
import DataContext from '../Context/DataContext';
import { useEffect } from 'react';

const NavbarComp = () => {
    /* 로그인 기능을 Hook으로 추가 */
    const [login, setLogin] = useState(null);

    /* 객체를 들고 오거나, 혹은 구조 분해 문법을 활용해서... */
    const data = useContext(DataContext);
    const { state } = useContext(DataContext);

    /* 기본 홈으로 돌아갈 수 있게 라우터를 만들어준다면....
    useNavigate는 리액트 라우터에 속한 API */
    const navigate = useNavigate();

    /* 컴포넌트가 마운트 되자마자 로그인 정보를 확인해보기
    
    -> 두번째 인수에 정보를 대입해주면 로그인 이후 정보를 알 수 있을 것이다. */
    useEffect(() => {
        /* setter와 삼항 연산자 활용, 혹은 if문도 OK */
        setLogin(data.state.user ? true : false);
    },[data.state.user]);

    /* Logout을 위한 이벤트 함수

    오류가 나게 됐는데.... user의 값이 null로 바뀌려고 했지만
    컴포넌트에 접근해주지는 못했었다. */

    const logOutAct = () => {
        /* setter를 먼저 써서 컴포넌트의 값을 바꾸고 user 정보를 비워주기 */
        setLogin(false);
        data.action.setUser(null);
        /* navigate의 인수에는 가려고 할 경로를 넣는다. */
        navigate("/");
    }

    const goMyPage = () => {
        navigate("/mypage");
    }

    return (
        <>
            <Navbar bg="primary" variant="dark">
                <Container>
                <Navbar.Brand href="#home">
                    <FontAwesomeIcon icon={faShop} />{" "}SHOP
                </Navbar.Brand>
                <Nav className="me-auto">
                    {/* 부트스트랩에서 사용하는 링크를 들고오기 */}
                    <NavLink to="/" className="nav-link">Home</NavLink>
                </Nav>
                
                {/* 여기에 버튼 들고 와보기 */}
                <Navbar.Collapse className='justify-content-end'>
                    {/* 로그인 여부에 따라 삼항 연산자로 작성하기 */}
                    { login ? (
                        <Nav>
                            {/* 로그인이 되었을 때 출력할 버튼 컴포넌트와 링크 */}
                            <NavLink className="nav-link" to={"/mypage"}>{data.state.user.name}님의 MyPage</NavLink>
                            <Button variant="outline-light" onClick={ logOutAct }>Logout</Button>{" "}
                        </Nav>
                    ) : (
                        <Nav>
                            {/* 로그인이 되지 않았을 때 출력할 버튼 컴포넌트도 하나 */}
                            <Button variant="outline-light" onClick={() => {navigate('/loginform')}}>Login</Button>{" "}
                        </Nav>
                    ) }
                </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default NavbarComp;
