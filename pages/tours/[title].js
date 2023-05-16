import { useState, useEffect } from 'react'

import api from "hooks/api/api";
import Footer from 'components/Footer/Footer'
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import "react-datepicker/dist/react-datepicker.css";

import NavBar from "components/Navbar/Navbar";
import Gallery from "components/CarouselGallery/CarouselGallery";
import { extractNumber, replaceNewLines } from "utils/utils";

import TopAttractions from "components/TopAttractions/TopAttractions";
import ReviewersCarousel from "components/ReviewersCarousel/ReviewersCarousel";
import Faq from "components/Faq/Faq";
import Sidebar from "components/ReserveForms/SidebarForm/Sidebar";
import MobileModal from "components/ReserveForms/ModalForm/MobileModal";

export default function TourPage({ tour, slugsData, footerData }) {

    const [isVisible, setVisible] = useState(true);

    const tourData = tour?.attributes;
    const topAttractions = tourData?.top_attractions?.data;
    const reviewers = tourData?.reviewers?.data;
    const faqs = tourData?.faqs?.data;

    const initialDuration = tourData?.fixedDuration ? extractNumber(tourData.fixedDuration) : 1;

    const [startDate, setStartDate] = useState(
        setHours(setMinutes(new Date(), 30), 9));
    const [count, setCount] = useState({
        adults: 1,
        kids: 1,
        baskets: 0,
        locks: 0,
        duration: initialDuration,
        subtotal: 0,
        total: 0,
        tax: 0,
        discount: null,
        discountCode: '',
        tour: tourData?.title,
        tourDate: startDate,
        name: '',
        email: '',
        phone: ''
    })

    useEffect(() => {
        const resetTourSelection = () => {
            setCount({
                ...count,
                adults: 1,
                kids: 1,
                baskets: 0,
                locks: 0,
                duration: initialDuration,
                discount: null,
                discountCode: '',
                tour: tourData?.title,
                tourDate: setHours(setMinutes(new Date(), 30), 9),
                name: '',
                email: '',
                phone: ''
            });
        }
        resetTourSelection();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tourData?.title, tourData?.fixedDuration]);



    useEffect(() => {
        const handleScroll = event => {
            if (window.scrollY > 2600) {
                setVisible(false);
            } else {
                setVisible(true);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div>
            {tourData?.title ? <>
                <NavBar title={tourData.slug.data.attributes.title} slugsData={slugsData} tour={tourData} />

                <div className="container-fluid bg-single-tour pl-0 pr-0">

                    <div className="container gallerySection">
                        <div className="row">
                            <Gallery tourData={tourData} />

                            <Sidebar
                                isVisible={isVisible}
                                startDate={startDate}
                                setStartDate={setStartDate}
                                setHours={setHours}
                                setMinutes={setMinutes}
                                setCount={setCount}
                                count={count}
                                tourData={tourData}
                            />

                            <div className="m-res text-center">
                                <MobileModal
                                    setHours={setHours}
                                    setMinutes={setMinutes}
                                    startDate={startDate}
                                    setStartDate={setStartDate}
                                    count={count}
                                    setCount={setCount}
                                    tourData={tourData}
                                />
                            </div>


                        </div>
                    </div>

                    <div className="container py-5">
                        <div className="row">
                            <div className="col-md-12 col-lg-8"
                            >
                                {replaceNewLines(tourData.description)}

                            </div>
                        </div>
                    </div>

                    <div className="container py-5">
                        <div className="row">
                            <div className="col-md-12 col-lg-8 text-center">
                                <h2>Top attractions</h2>
                                <h6>covered on this tour</h6>
                                <div className="horizontalLine" />
                            </div>

                            <TopAttractions topAttractions={topAttractions} />

                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-8">
                                <ReviewersCarousel reviewers={reviewers} />
                                <Faq faqs={faqs} />
                            </div>
                        </div>
                    </div>

                </div>
                <Footer slugsData={slugsData} footerData={footerData} />
            </> :
                <></>}
        </div>
    )
}



export async function getStaticPaths() {
    //example json data ->  updatedStrapiData
    const { data } = await api.getTourPageData();

    const paths = data.map(tour => {
        return {
            params: {
                title: tour.attributes.slug.data.attributes.slug
            }
        }
    });

    return {
        paths,
        fallback: true
    }
}

export async function getStaticProps({ params }) {
    try {
        //example json data ->  updatedStrapiData
        const { data: toursPageData } = await api.getTourPageData();
        const { data: footerData } = await api.getFeaturedToursData();
        const { data: slugsData } = await api.getToursSlug();
        const tour = toursPageData.find(tour => tour.attributes.slug.data.attributes.slug === params?.title);

        return {
            props: {
                tour,
                slugsData,
                footerData: footerData.attributes,
            }
        }
    } catch (error) {
        throw new Error(`Could not fetch data: ${error}`)
    }
}