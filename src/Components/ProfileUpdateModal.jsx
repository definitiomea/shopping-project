/* 모달 컴포넌트 알아보기 */

import React, { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useContext } from 'react';
import DataContext from '../Context/DataContext';

const ProfileUpdateModal = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    /* 파일을 다룰 state */
    const [file, setFile] = useState("");

    /* 파일을 다룰 ref */
    const imgShow = useRef();

    /* Context 객체에서 action 받아오기 */
    const {action, state} = useContext(DataContext);

    /* 파일을 가져올 메서드, 이벤트 객체를 파라미터로 */
    const onLoadFile = (e) => {
        /* files는 파일을 포함한 리터럴 객체, 인덱스 0으로 접근 */
        console.log(e.target.files[0]);
        console.log(imgShow);
        setFile(e.target.files[0]);
        /* 이미지를 가능한 비율에 맞게 만들기 */
        imgShow.current.style.backgroundSize = "cover";
        /* setter로 파일이 바뀌는 걸 알긴 했지만, 한번 느리게 반응할 수 있어서 e.target.files[0]를 넣는 게 좋다. */
        imgShow.current.style.backgroundImage = `url(${URL.createObjectURL(e.target.files[0])})`;
    }

    /* 저장을 눌렀을 때 state에 사진을 저장하고 모달 창을 종료하기 */
    const updateProfile = () => {
        action.setUser({
            /* 이번에는 setter로 파일이 바뀐 것을 사용할 수 있다. */
            ...state.user, profile: URL.createObjectURL(file)
        });
        /* 모달 창을 닫는 메서드 호출 */
        handleClose();
    }

    return (
        <>
            <Button variant="light" onClick={handleShow}>
                {/* 버튼에 뜰 텍스트 */}
                프로필 사진 수정하기
            </Button>

            {/* state와 setter가 포함된 메서드로 작동하게 됨. show와 onHide 속성을 조작해줌. */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* 사진 파일을 받아올 input 태그 가져오기, 리액트 부트스트랩의 File Input */}

                    {/* 사진을 저장하는 방법: Object URL? createObjectURL
                    DOMString으로 반환해서 저장할 수 있다고...
                    지금은 DB가 없으니까 화면 상에서 출력한다. */}

                    {/* 썸네일 추가, Form에서 파일을 가져와야 함, backgroundImage로 */}
                    {/* ref 혹은 쿼리 셀렉터로 추가해야 한다..?
                    -> ref: {정의할 ref} */}

                    <div ref={imgShow} style={{width: "150px", height: "150px", backgroundColor: "lightgray"}}></div>

                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>추가할 이미지를 선택하세요</Form.Label>
                        {/* 파일이 바뀌는 것을 반영하는 메서드 */}
                        <Form.Control type="file" onChange={onLoadFile} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    취소
                </Button>
                <Button variant="primary" onClick={updateProfile}>
                    저장
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ProfileUpdateModal;