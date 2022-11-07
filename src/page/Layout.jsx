import { Outlet } from "react-router-dom";
import NavbarComp from "../Components/NavbarComp";

const Layout = () => {
    return (
        <>
            {/* nav바 */}
            <NavbarComp></NavbarComp>
            {/* Outlet을 통한 화면 구성
            공용으로 들어갈 패딩, 마진의 경우 Layout 컴포넌트에서 해도 되며,
            컨테이너 요소에 정의할 수 있다. */}
            <div className="mt-3">
                <Outlet></Outlet>
            </div>
        </>
    );
}

export default Layout;