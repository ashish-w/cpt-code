import Navbar from "components/Navbar/Navbar";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { replaceNewLines } from "utils/utils";
import FeaturedTours from "components/FeaturedTours/FeaturedTours";
import api from "hooks/api/api";
import Footer from "components/Footer/Footer";

const Tours = ({ slugsData, toursData, footerData }) => {

    const tours = toursData?.map(tour => tour.attributes);

    return (
        <div>
            <Navbar title="Tours - Central Park Tours - The Official Central Park Tour Company" slugsData={slugsData} />

            {/* image background */}
            <div className="image-background-holder">

                <LazyLoadImage
                    src='/images/cpt1-dark.webp'
                    alt='about us circle'
                    sizes="100vw"
                    // className="pt-5"
                    style={{
                        width: '100%',
                        height: 'auto'
                    }}
                />


                <div className="image-background-content container h-100">
                    <div className="d-flex h-100 text-center align-items-center">
                        <div className="w-100 text-white pt-3">

                            <div className="py-5">
                                <h1 className="h1-title">Tours</h1>

                                <p className="lead mb-0 pt-4">
                                    <b className="subtitle-4">
                                        {replaceNewLines("We are the leader in providing bike rentals and various tours in New York.\nReserve your tour now and explore the oasis in the middle of Manhattan.")}
                                    </b>
                                </p>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
            {/* end image background */}

            <div className="container-fluid py-5 pl-0 pr-0">
                <div className="row justify-content-center pt-4">
                    <div className="col-xs-12 col-md-6 col-lg-8">

                        {/* cards */}

                        <div className="container pl-0 pr-0 grid">
                            <FeaturedTours className="card card-v mx-4" tours={tours} />
                        </div>

                    </div>
                </div>
            </div>



            <LazyLoadImage
                src='/images/cpt-cbck.webp'
                alt='about us circle'
                sizes="100vw"
                style={{
                    width: '100%',
                    height: 'auto'
                }}
            />

            <Footer slugsData={slugsData} footerData={footerData} />
        </div>
    )
}

export default Tours;


export async function getStaticProps(context) {
    try {
        const { data: toursData } = await api.getTourPageData();
        const { data: footerData } = await api.getFeaturedToursData();
        const { data: slugsData } = await api.getToursSlug();

        return {
            props: {
                toursData,
                slugsData,
                footerData: footerData.attributes
            }
        }
    } catch (error) {
        throw new Error(`Failed to fetch tours, ${error}`)
    }
}