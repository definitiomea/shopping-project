/* Context에 대한 내용은 공홈에, Context를 사용해서 value 값도 현재 파일에서 저장하고 내보내기 */

import { useState } from "react";
import { createContext } from "react";

// 내보낸 DataContext에 value 값을 넣어주고 사용해본다.
const DataContext = createContext();

/* 미리 Provide를 작성하여 value 값을 가진 컴포넌트를 내보낸다. */
const DataProvider = ({children}) => {
    /* useState를 통해 값과 setter를 만들어줄 수 있다.
    1) 유저정보  {name: "고길동", profile: 사진, likelist : []}
    2) 상품정보 
    3) 댓글정보
    */
    
    const [user, setUser] = useState({name: "고길동", profile: null, likelist : []});
    /* 사용할 value 값을 state와 action으로 분리해서 넣어주려고 한다.
    reducer가 들어간다고..? */

    const [productList, setProductList] = useState([
        {
            productId: 1,
            productName: "책",
            productDetail: "리액트를 알려주는 책입니다",
            productColor: ["white", "black"],
            productPicture: ["XL.jpg", "K532730383_b.jpg"]
        },
        {
            productId : 2,
            productName : "책2",
            productDetail : "리액트를 알려주는 책입니다",
            productColor : ["white"],
            productPicture : ["XL.jpg"]
        }
    ]);

    const [allComments, setAllComments] = useState([
        {
            commentId: 1,
            productId: 1,
            name: "green",
            text: "Good Book, Good Luck"
        },
        {
            commentId: 2,
            productId: 1,
            name: "red",
            text: "Thumbs up"
        }
    ]);

    /* useState를 사용하지 않은 변수는 리액트 업데이트를 일으키지 않는다. */
    const [commentCount, setCommentCount] = useState(3);

    /* state와 setter 뒤에 value가 있어야 된다? OK */
    const value = {
        state: {user, productList, allComments, commentCount},
        action: {setUser, setProductList, setAllComments, setCommentCount}
    }
    
    /* Provider에 직접 속성을 넣거나, children을 넣어주는 것이 가능하다. */

    /* DataProvider를 사용할 때 DataContext.Provider를 사용할 수 있도록 한다.
    이때 children은 Provider를 쓸 때 데이터를 공용으로 쓰는 컴포넌트들 */
    return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

/* consumer 작성 -> 무슨 뜻이지?
어쨌든 DataConsumer 이름을 가지고 DataContext 객체의 반환 값을 가진다. */
const { Consumer: DataConsumer } = DataContext;

/* 컴포넌트로 사용하기 위해 export 해주기, 여러 객체를 내보낼 수 있다. */
/* .Provider 대신 사용 */
export { DataConsumer, DataProvider };
/* 값을 사용하기 위해 가져오는 컨텍스트 export > useContext로 가져올 것 */
export default DataContext;