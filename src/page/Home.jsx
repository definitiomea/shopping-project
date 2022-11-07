/* Slick을 가져오기 */
import Slider from "react-slick";
import { Col, Row, Container } from "react-bootstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

import { useContext } from "react";

import ProductCard from "../Components/ProductCard";
import DataContext from "../Context/DataContext";

const Home = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };
    const { state } = useContext(DataContext);
    return (
        <div>
            <Container>
                <Row>
                    <Col className="px-3">
                        <Slider {...settings}>
                            { state.productList.map((product) => (
                                <div>
                                    <ProductCard key={product.productId} product={product}></ProductCard>
                                </div>
                            )) }
                        </Slider>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Home;

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <FontAwesomeIcon icon={ faChevronRight }
        className={className}
        onClick={onClick}
        style={{color:"#0d6efd"}}></FontAwesomeIcon>
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <FontAwesomeIcon icon={faChevronLeft}
        className={className}
        onClick={onClick}
        style={{color:"#0d6efd"}}/>
    );
}