/* 로그인 페이지를 이루는 컴포넌트, 부트스트랩 활용 */
import { useContext } from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import DataContext from '../Context/DataContext';

const Login = () => {
    const [name, setName] = useState("");
    const { action } = useContext(DataContext);
    const navigate = useNavigate();

    const loginUser = () => {
        action.setUser({name: name, profile: null, likelist : []});
        navigate('/');
    }

    return (
        <>
            <Form className="m-5" onSubmit={ loginUser }>
                {/* 여기에 추가할 수 있는 속성이 있다고..? 뭐지? */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    {/* 확인용으로 {name} 넣어보기 */}
                    <Form.Label>아이디</Form.Label>
                    {/* 실제로 작성하는 란은 이 컨트롤, type을 텍스트로 변경
                    아이디 작성에 적합하게 만든 다음 onChange와 이벤트 파라미터로 setter 작동해주기 */}
                    <Form.Control type="text" placeholder="아이디를 입력해주세요" onChange={(e) => {setName(e.target.value)}} />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>비밀번호</Form.Label>
                    <Form.Control type="password" placeholder="비밀번호를 입력해주세요" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                </Form.Group>
                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
        </>
    );
}

export default Login;