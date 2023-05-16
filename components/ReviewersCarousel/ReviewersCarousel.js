// @ts-nocheck

import { useRef } from 'react';
import styled from "styled-components";
import { Carousel, Button } from "antd";

const CarouselWrapper = styled.div`
  padding: 30px;
`;

const ArrowBtn = styled(Button)`
    justify-content: center;
    // background: rgba(128, 191, 47, 0.5);
    align-items: center;
    display: flex;
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
//   height: 70vh;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 4px;
  }
`;

const ArrowWrapper = styled.div`
  padding-left: 8px;
  padding-right: 8px;
  top: 0;
  display: flex;
  justify-content: space-between;
  position: relative;
`;

const ReviewersCarousel = ({ reviewers }) => {


    const mediaRef = useRef(null);

    const handleNext = () => {
        mediaRef.current.next();
    };

    const handlePrev = () => {
        mediaRef.current.prev();
    };

    return (
        <div className="text-center pt-5" style={{ color: '#535150' }}>
            <h2>What people say</h2>
            <h6>about this tour</h6>
            <div className="horizontalLine" />

            <CarouselWrapper>
                <CustomCarousel
                    touchMove={true}
                    swipeToSlide
                    draggable
                    dots={true}
                    ref={mediaRef}
                >
                    {reviewers.map(reviewer => {
                        const { attributes: { name, review } } = reviewer;

                        return (
                            <ImageWrapper key={name}>
                                <div>
                                    {review}
                                </div>
                                <div style={{ paddingTop: 15 }}>
                                    <b>{name}</b>
                                </div>
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

        </div>);
}

export default ReviewersCarousel;