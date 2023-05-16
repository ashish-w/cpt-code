import { useRef, useEffect, useState } from 'react';
import Link from "next/link"
import { LazyLoadImage } from 'react-lazy-load-image-component'
import styled from "styled-components";
import { Button, Carousel, Spin } from "antd";
import dynamic from 'next/dynamic';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 24, color: '#88bc2c' }} spin />;

const NoSsr = ({ children }) => <>{children}</>

const CarouselContainer = styled.div`
background: none;
padding-top: 20px; 
// padding-bottom: 150px;
// @media (max-width: 768px) {
// padding-bottom: 0;
// }
`;

const CarouselWrapper = styled.div`
//   padding: 30px;
    height:355px;
`;

const ArrowBtn = styled(Button)`
    justify-content: center;
    background:white;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    align-items: center;
    display: flex;
    width: 50px;
    height: 50px;
    `;

const CustomCarousel = styled(Carousel)`
> .slick-dots li button {
    margin-top: 50px;
    width: 12px;
    height: 12px;
    border-radius: 100%;
    background: silver;
  }
  > .slick-dots li.slick-active button {
    background: #80bf2f;
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  padding-inline: 15px;
  @media (max-width: 991px) {
    padding-inline: 5px;
  }
  img {
    width: 100%;
    height: 100%;
    border-radius: 20px;
  }
`;

const ArrowWrapper = styled.div`
  padding-left: 8px;
  padding-right: 8px;
  bottom: 230px;
  display: flex;
  justify-content: space-between;
  position: relative;
  @media (max-width: 991px) {
    bottom: 250px;
  }
  @media (max-width: 768px) {
    bottom: 210px;
  }
  @media (max-width: 600px) {
    bottom: 230px;
  }
`;

const Events = ({ category }) => {

    const [loading, setLoading] = useState(false);
    const mediaRef = useRef(null);

    const handleNext = () => {
        mediaRef.current.next();
    };

    const handlePrev = () => {
        mediaRef.current.prev();
    };

    const [data, setData] = useState([]);

    useEffect(() => {

        setLoading(true);

        async function lastPosts() {
            let URL = `https://www.centralparktours.com/blog/ghost/api/v3/content/posts/?key=d0f43d7dd165f96b5a288cd583&filter=tags:${category}&limit=5`;
            await fetch(URL)
                .then((response) => response.json())
                .then(data => setData(data.posts))
                .then(() => setLoading(false));
        }

        lastPosts();

    }, [category])

    return (
        <NoSsr>
            <CarouselContainer>

                {!loading ? <CarouselWrapper>
                    <CustomCarousel
                        touchMove={false}
                        dots={false}
                        ref={mediaRef}
                        slidesToShow={window.innerWidth > 768 ? 3 : 1}
                    >
                        {data?.map((el, id) => {

                            const { url, title, feature_image, twitter_image } = el;

                            return (
                                <ImageWrapper key={id}>
                                    <LazyLoadImage
                                        src={twitter_image || feature_image}
                                        visibleByDefault={false}
                                        placeholderSrc={twitter_image || feature_image}
                                        effect="blur"
                                        alt={title}
                                        sizes="100vw"
                                        style={{
                                            width: '100%',
                                            height: '230px',
                                            objectFit: 'cover'
                                        }}
                                    />
                                    <h5 className="text-left pt-3"><Link href={url}>{title}</Link></h5>

                                </ImageWrapper>
                            )
                        })}
                    </CustomCarousel>
                    <ArrowWrapper>
                        <ArrowBtn
                            onClick={handlePrev}
                            shape="circle"
                            type="link"
                        >
                            <span className="carousel-control-prev-icon" />
                        </ArrowBtn>
                        <ArrowBtn
                            onClick={handleNext}
                            shape="circle"
                            type="link"
                        >
                            <span className="carousel-control-next-icon" />
                        </ArrowBtn>
                    </ArrowWrapper>
                </CarouselWrapper>
                    : <div style={{ width: '100%', height: 355 }}>
                        <Spin indicator={antIcon} style={{ color: '#88bc2c' }} />
                        <p>Loading...</p>
                    </div>
                }
            </CarouselContainer>
        </NoSsr>
    );
}

export default dynamic(() => Promise.resolve(Events), { ssr: false })



// const Events = ({ postsData }) => {

//     const mediaRef = useRef(null);

//     const handleNext = () => {
//         mediaRef.current.next();
//     };

//     const handlePrev = () => {
//         mediaRef.current.prev();
//     };

//     return (
//         <NoSsr>
//             <CarouselContainer>

//                 <CarouselWrapper>
//                     <CustomCarousel
//                         touchMove={false}
//                         dots={false}
//                         ref={mediaRef}
//                         slidesToShow={window.innerWidth > 768 ? 3 : 1}
//                     >
//                         {postsData.map(el => {

//                             const { url, title, feature_image } = el;

//                             return (
//                                 <ImageWrapper key={title}>
//                                     <LazyLoadImage
//                                         src={feature_image}
//                                         visibleByDefault={true}
//                                         placeholderSrc={feature_image}
//                                         effect="blur"
//                                         alt={title}
//                                         sizes="100vw"
//                                         style={{
//                                             width: '100%',
//                                             height: '230px',
//                                             objectFit: 'cover'
//                                         }}
//                                     />
//                                     <h5 className="text-left pt-3"><Link href={url}>{title}</Link></h5>

//                                 </ImageWrapper>
//                             )
//                         })}
//                     </CustomCarousel>
//                     <ArrowWrapper>
//                         <ArrowBtn
//                             onClick={handlePrev}
//                             shape="circle"
//                             type="link"
//                         >
//                             <span className="carousel-control-prev-icon" />
//                         </ArrowBtn>
//                         <ArrowBtn
//                             onClick={handleNext}
//                             shape="circle"
//                             type="link"
//                         >
//                             <span className="carousel-control-next-icon" />
//                         </ArrowBtn>
//                     </ArrowWrapper>
//                 </CarouselWrapper>

//             </CarouselContainer>
//         </NoSsr>
//     );
// }
