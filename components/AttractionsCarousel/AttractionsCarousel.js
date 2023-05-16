import { useRef } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Link from "next/link";
import styled from "styled-components";
import { Button, Carousel } from "antd";

const Waves = styled.div`
display:none;
@media (max-width: 600px){
display: block;
    margin-left: 100px;
    margin-top: -140px;
}
`;

export const CarouselWrapper = styled.div`
  // padding: 30px;
`;

export const ArrowBtn = styled(Button)`
    justify-content: center;
    background:white;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    align-items: center;
    display: flex;
    width: 50px;
    height: 50px;
    `;

export const CustomCarousel = styled(Carousel)`
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
  > .slick-list {
    padding: 0 20px !important;
  }
`;

export const ImageWrapper = styled.div`
  padding: 30px 105px 30px 0px;
  max-width: 400px;
  .circle {
    position: relative;
    width: 100%;
    height: 0;
    padding: 100% 0 0;
    border-radius: 50%;
    overflow: hidden;
    border: 1px solid gray;
    > img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

export const ArrowWrapper = styled.div`
  padding-left: 0;
  padding-right: 0;
  bottom: 450px;
  display: flex;
  justify-content: space-between;
  position: relative;
  @media (max-width: 400px) {
    bottom: 500px;
  }
`;

export const AttractionsCarousel = ({ attractions }) => {

    const mediaRef = useRef(null);

    const handleNext = () => {
        mediaRef.current.next();
    };

    const handlePrev = () => {
        mediaRef.current.prev();
    };

    return (
        <CarouselWrapper>
            <CustomCarousel
                // afterChange={onChange}
                slidesPerRow={1}
                centerMode={true}
                infinite={false}
                arrows={true}
                dots={false}
                touchMove={true}
                swipeToSlide
                draggable
                ref={mediaRef}
            >
                {attractions.map((attraction, i) => {
                    const { attributes: { title, description, attraction_url, image: { data: { attributes: { url, formats: { thumbnail: { url: placeholder } } } } } } } = attraction;

                    return (
                        <ImageWrapper key={title} className={`${i % 2 && 'pt-5'}`}>
                            <div className="circle">
                                <LazyLoadImage
                                    src={`https://strapi.centralparktours.com/${url}`}
                                    alt={title}
                                    visibleByDefault={true}
                                    width='100%'
                                    sizes="100vw"
                                    effect="blur"
                                />
                            </div>
                            <Waves>
                                {i % 2 ?
                                    <LazyLoadImage visibleByDefault={true} src='/wave2.svg' alt="wave2" />
                                    : <LazyLoadImage visibleByDefault={true} src='/wave1.svg' alt="wave1" />
                                }
                            </Waves>
                            <div className="pt-2 text-center" style={{ marginTop: 50 }}>
                                <h6>{title}</h6>
                                {description.slice(0, 310) + '...'}
                                <div>
                                    <Link className="readmore" style={{ fontSize: 12 }} href={`/attractions/${attraction_url}`}>Read more</Link>
                                </div>
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
    );
};
