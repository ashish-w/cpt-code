import { useRef, useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';

import styled from "styled-components";
import { Carousel, Button, Rate } from "antd";

const CarouselWrapper = styled.div`
//   padding: 15px 30px 0px;
`;

const ArrowBtn = styled(Button)`
    justify-content: center;
    background: rgb(54,52,44, .5);
    align-items: center;
    display: flex;
    height:50px;
    `;

const ImageWrapper = styled.div`
  width: 100%;
  height: '100%';
  position: 'relative';

  img {
    width: 100%;
    height: 100%;
    max-height: 350px;
    object-fit: cover;
    // object-position: top;
    border-radius: 4px;
  }
`;

const ThumbnailWrapper = styled.div`
  width: 95%;
  height: 10vh;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 4px;
    padding-inline: 10px;
  }
  cursor: pointer;
  @media (max-width: 990px) {
        height: 8vh; 
    }
    @media (max-width: 600px) {
        // height: 4vh; 
      img {
      padding-inline: 3px;
      }
    }
`;

const ArrowWrapper = styled.div`
  bottom: 200px;
  display: flex;
  justify-content: space-between;
  position: relative;
  @media (max-width: 600px) {
  bottom: 170px;
  }
  @media (max-width: 400px) {
    bottom: 160px;
  }
  @media (max-width: 370px) {
    bottom: 150px;
  }
`;

const ArrowWrapperThumbnail = styled.div`
  padding-left: 8px;
  padding-right: 8px;
  bottom: 10vh;
  display: flex;
  justify-content: space-between;
  position: relative;
  background:red;
`;


const Gallery = ({ tourData }) => {

    const mediaRef = useRef(null);
    const navRef = useRef(null);
    const [direction, setDirection] = useState(null);

    const onChange = (currentSlide) => {
        if (direction === "next") {
            mediaRef.current.goTo(currentSlide + 1, false);
        } if((direction === "prev")) {
            mediaRef.current.goTo(currentSlide - 1, false);
        }
    };

    const handleNext = () => {
        setDirection("next");
        navRef.current.next();
    };

    const handlePrev = () => {
        setDirection("prev");
        navRef.current.prev();
    };

    // const imageList = [
    //     bikeRental1, bikeRental2, bikeRental3, bikeRental4, bikeRental5
    // ];

    const thumbnailClicked = (id) => {
        mediaRef.current.goTo(id, false);
    };

    return (
        <div className="col-md-12 col-lg-8">
            <h1 style={{ color: '#4c4a4b', textShadow: '2px 0px currentColor' }}>
                {tourData.title || 'Central Park Bike Rental'}
            </h1>

            <div className="col d-flex align-items-center pb-4 pt-1">

                <Rate allowHalf value={tourData.rating} disabled style={{ color: '#88bc2c' }} />

                <span className="pl-2 pt-1">
                    {tourData.rating.toFixed(1)}
                </span>

                <div style={{ fontSize: 12 }} className="col pt-1">
                    <u>{tourData.reviews_count || 457} Reviews</u>
                </div>
            </div>


            <div className="carousel">

                <CarouselWrapper>
                    <Carousel
                        asNavFor={navRef.current}
                        touchMove={true}
                        dots={false}
                        ref={mediaRef}
                    >
                        {tourData?.gallery.data?.map((el, id) => {

                            const { attributes: { name, url, formats: { thumbnail: { url: placeholder } } } } = el;

                            return (
                                <ImageWrapper key={url} >
                                    <LazyLoadImage
                                        key={url}
                                        placeholderSrc={`https://strapi.centralparktours.com/${placeholder}`}
                                        effect="blur"
                                        src={`https://strapi.centralparktours.com/${url}`}
                                        alt={name}
                                        width="100%"
                                        style={{ width: '100%', height: 'auto' }} //it's optional
                                    />
                                </ImageWrapper>
                            )
                        }
                        )}
                    </Carousel>
                    {tourData?.gallery?.data?.length > 1 && (
                        <ArrowWrapper>
                            <ArrowBtn
                                onClick={handlePrev}
                                shape="default"
                                type="link"
                                style={{ background: 'rgb(15,29,12, .7)' }}>
                                <span className="carousel-control-prev-icon" />
                            </ArrowBtn>
                            <ArrowBtn
                                onClick={handleNext}
                                shape="default"
                                type="link"
                                style={{ background: 'rgb(15,29,12, .7)' }}>
                                <span className="carousel-control-next-icon" />
                            </ArrowBtn>
                        </ArrowWrapper>
                    )}
                </CarouselWrapper>

                {tourData.gallery?.data.length > 1 && (
                    <Carousel
                        slidesToShow={tourData.gallery?.data?.length === 4 ? 3 : 4}
                        dots={false}
                        centerMode={true}
                        asNavFor={mediaRef.current}
                        ref={(carousel) => (navRef.current = carousel)}
                        beforeChange={onChange}
                    >

                        {tourData?.gallery.data?.map((el, id) => {

                            const { attributes: { name, url, formats: { thumbnail: { url: placeholder } } } } = el;

                            return (
                                <ThumbnailWrapper key={id} onClick={() => thumbnailClicked(id)}>
                                    <LazyLoadImage
                                        src={`https://strapi.centralparktours.com/${url}`}
                                        placeholderSrc={`https://strapi.centralparktours.com/${placeholder}`}
                                        effect="blur"
                                        visibleByDefault={true}
                                        style={{ width: '100%', height: 'auto' }} //it's optional
                                        alt={name} />
                                </ThumbnailWrapper>
                            )
                        }
                        )}
                    </Carousel>
                )}

                {/* <ArrowWrapperThumbnail>
                    <Button onClick={handlePrev} radius={"50%"} type="slide">
                        <LeftOutlined />
                    </Button>
                    <Button onClick={handleNext} radius={"50%"} type="slide">
                        <RightOutlined />
                    </Button>
                </ArrowWrapperThumbnail> */}


            </div>

        </div>);
}

export default Gallery;