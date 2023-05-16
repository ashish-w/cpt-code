import Navbar from "components/Navbar/Navbar";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Footer from "components/Footer/Footer";
import api from "hooks/api/api";

export default function Cancellation({ slugsData, footerData }) {

    return (
        <div>
            <Navbar title="Cancellation Policy - Central Park Tours - The Official Central Park Tour Company" slugsData={slugsData} />

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
                                <h1 className="h1-title">Cancellation Policy</h1>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            {/* end image background */}

            <div className="container py-5">

                <div className="row justify-content-center px-3">
                    <div className="col-xs-12 col-md-8 text-center">

                        <p>
                            If a reservation for any of the services, provided on the website, is canceled due to bad weather conditions
                            such as heavy rain or snowfall, the customer can choose to postpone the tour for another day and time or receive a full refund.
                            In order to receive a full refund the customer has to notify Central Park Tours, at least 24hrs prior to the scheduled time
                            of the service booked.
                        </p>

                        <p >
                            If the customer fails to inform Central Park Tours, regarding his intend to cancel the reservation,
                            at least 24hrs in advance a partial refund will be issued and 10% service fee will be withheld from the refund.
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