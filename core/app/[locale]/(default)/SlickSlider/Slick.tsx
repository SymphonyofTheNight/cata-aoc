'use client';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Slick = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <Slider {...settings}>
            <div>
                <img src='https://csm-performance.myshopify.com/cdn/shop/files/54077071584_41a4df22d3_h.jpg?v=1733195436&width=1600'
                    className='' />
            </div>
            <div>
                <img src='https://csm-performance.myshopify.com/cdn/shop/files/54075874982_b607f59275_h.jpg?v=1733195474&width=1600'
                    className='' />
            </div>
            <div>
                <img src='https://csm-performance.myshopify.com/cdn/shop/files/54077213455_7a71bbd71c_h.jpg?v=1733195817&width=1600'
                    className='' />
            </div>
            <div>
                <img src='https://csm-performance.myshopify.com/cdn/shop/files/54077004753_59ff94721a_h.jpg?v=1733195821&width=1600'
                    className='' />
            </div>
            <div>
                <img src='https://csm-performance.myshopify.com/cdn/shop/files/54077004598_e6e98e9d52_h.jpg?v=1733195811&width=1600'
                    className='' />
            </div>
            <div>
                <img src='https://csm-performance.myshopify.com/cdn/shop/files/54077004753_59ff94721a_h.jpg?v=1733195821&width=1600'
                    className='' />
            </div>
        </Slider>
    );
};

export default Slick;
