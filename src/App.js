/* 공용으로 쓸 데이터 컨텍스트 Provider만 추가해보기 */
import { DataProvider } from './Context/DataContext';

/* 필요한 라이브러리들 들고 오기 */
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

/* 필요한 컴포넌트 들고 오기 */
import { Routes, Route } from 'react-router-dom';
import Layout from './page/Layout';
import Home from './page/Home';
import Login from './page/Login';
import ProductDetail from './page/ProductDetail';
import Profile from './page/Profile';

function App() {
  return (
    <div className="App">
      <DataProvider>
        <Routes>
          <Route path='/' element={<Layout></Layout>}>
            <Route index element={<Home></Home>}></Route>
            <Route path='loginform' element={<Login></Login>}></Route>
            {/* 값에 따라서 페이지를 띄워주기 */}
            <Route path='product/:id' element={<ProductDetail></ProductDetail>}></Route>
            <Route path='mypage' element={<Profile></Profile>}></Route>
          </Route>
        </Routes>
      </DataProvider>
    </div>
  );
}

export default App;
