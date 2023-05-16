import Navbar from "components/Navbar/Navbar";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Footer from "components/Footer/Footer";
import api from "hooks/api/api";

export default function TermsAndConditions({ slugsData, footerData }) {

    return (
        <div>
            <Navbar title="Terms and Conditions - Central Park Tours - The Official Central Park Tour Company" slugsData={slugsData} />

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
                                <h1 className="h1-title">Terms and Conditions</h1>
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
                            I agree to release, discharge and hold harmless &quot;Central Park Tours Inc.&quot;, any tour guide or other type of independent contractor or employee working with Central Park Tours Inc. from any and all liability for damages of any kind or character that may result from participating in this rickshaw tour, bike rental or bike tour.
                        </p>
                        <p>
                            If I am supervising any minors (children under 18) I agree to take full responsibility for the participating minor/s. By doing so I agree to release, discharge and hold harmless Central Park Tours Inc., any tour guide or other type of independent contractor or employee working with Central Park Tours Inc., from any and all liability for damages of any kinds or character that may result from the minor/s participating in this rickshaw tour, bike rental or bike tour.
                        </p>
                        <p>
                            Minors under 12 old may ride their bike on the sidewalk and Central Park Tours requires that the supervising adult make sure the child/children use/s the sidewalk in areas of the park or greenway that are open to traffic.
                        </p>
                        <b className="pt-3">
                            The parent or guardian understands and agrees to the following conditions.
                        </b>

                        <h3 className="pt-5">Minor must:</h3>

                        <ul>
                            <li>Always be accompanied by parent or guarding</li>
                            <li>Stay in and walk the bike to and from the park or greenway</li>
                            <li>Wear a helmet if they are under 14 years of age</li>
                            <li>Be at least 5 years old</li>
                            <li>Stay in the bike lane on any park roadway that is open</li>
                        </ul>

                        <p>
                            All customers are responsible for their bikes. Lost, stolen or missing bikes will result in a charge of $220 (US Dollars) per bike. The bikes are not designed for off road use or for jumping under any circumstances! Please be careful.
                        </p>

                        <div>
                            <p>Important</p>
                            <b>Helmets are lent outfor free and available for all customers regardless of age. If you refuse the helmet you must sign a separate refusal form that will be provided to you when you pick up the bike.</b>
                        </div>

                        <div className="pt-3">
                            <p>Important</p>
                            The right brake is the rear brake and the left brake is the front brake. in many countries like England and Australia it is the other way around so be aware of which so you don&apos;t throw yourself over the handlebars, serious injuries can be avoided understand the brakes before you depart
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