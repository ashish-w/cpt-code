import Navbar from "components/Navbar/Navbar";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Footer from "components/Footer/Footer";
import api from "hooks/api/api";

export default function Cancellation({ slugsData, footerData }) {

    return (
        <div>
            <Navbar title="Audio Tours - Central Park Tours - The Official Central Park Tour Company" slugsData={slugsData} />

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
                                <h1 className="h1-title">Central Park Audio Tours</h1>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            {/* end image background */}

            <div className="container py-5">

                <div className="row justify-content-center px-3">
                    <div className="col-xs-12 col-md-8 text-center">

                        <h3 className="h1">COMING SOON!</h3>

                        <p>
                            Welcome to the first, completely FREE, self-guided audio tour of Central Park. Inside you will find a live audio for all popular, as well as hidden, sights and attractions in Central Park. You can also explore the local area and get discounts for restaurants, bars and other venues in the area.
                        </p>


                    </div>
                </div>
            </div>



            <LazyLoadImage
                src='/images/cpt-cbck.webp'
                alt='about us circle'
                sizes="100vw"
                style={{
                    width: '100%',
                    height: 'auto',
                }}
            />

            <Footer slugsData={slugsData} footerData={footerData} />
        </div>
    )
}

export async function getStaticProps() {
    try {
        const { data: footerData } = await api.getFeaturedToursData();
        const { data: slugsData } = await api.getToursSlug();


        return {
            props: {
                slugsData,
                footerData: footerData.attributes,
            }
        }
    } catch (error) {
        throw new Error(`Could not fetch data: ${error}`);
    }
}