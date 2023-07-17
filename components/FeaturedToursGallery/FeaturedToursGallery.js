
import { useRef } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import styled from "styled-components";
import { Carousel, Button } from "antd";

const CarouselWrapper = styled.div`
//   padding: 30px;
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
//   height: 70vh;

    > span {
        width: 100%;
    }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    max-height: 320px;
    border-radius: 4px;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    @media (max-width: 768px) {
        max-height: 257px;
    }
  }
`;

const ArrowWrapper = styled.div`
  bottom: 180px;
  display: flex;
  justify-content: space-between;
  position: relative;
  @media (max-width: 600px) {
    bottom: 150px;
  }
`;

const Gallery = ({ images }) => {


    const mediaRef = useRef(null);

    const handleNext = () => {
        mediaRef.current.next();
    };

    const handlePrev = () => {
        mediaRef.current.prev();
    };

    return (
        <CarouselWrapper>
            <Carousel
                touchMove={true}
                dots={false}
                ref={mediaRef}
                autoplay={true}
            >
                {images.data.map(image => {
                    const { attributes: { url, name, formats: { thumbnail: { url: placeholder } } } } = image;

                    return (
                        <ImageWrapper key={url}>
                            <LazyLoadImage
                                src={`https://strapi.centralparktours.com/${url}`}
                                visibleByDefault={false}
                                placeholderSrc={`https://strapi.centralparktours.com/${placeholder}`}
                                effect="blur"
                                alt={name}
                                sizes="100vw"
                            />
                        </ImageWrapper>
                    )
                })}
            </Carousel>
            <ArrowWrapper>
                <ArrowBtn
                    onClick={handlePrev}
                    shape="default"
                    type="link"
                >
                    <span className="carousel-control-prev-icon" />
                </ArrowBtn>
                <ArrowBtn
                    onClick={handleNext}
                    shape="default"
                    type="link"
                >
                    <span className="carousel-control-next-icon" />
                </ArrowBtn>
            </ArrowWrapper>
        </CarouselWrapper>);
}

export default Gallery;