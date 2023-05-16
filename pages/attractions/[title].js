import Navbar from "components/Navbar/Navbar";
import Footer from "components/Footer/Footer";
import FeaturedTours from "components/FeaturedTours/FeaturedTours";
import api from "hooks/api/api";
import { replaceNewLines } from "utils/utils";
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function Attraction({ attraction, slugsData, toursData, footerData }) {

    const attrData = attraction?.attributes;
    const image = attrData?.image?.data?.attributes;

    return (
        <div>
            {attrData?.title ? <>

                <Navbar title={`${attrData.title} - Central Park Tours - The Official Central Park Tour Company`} slugsData={slugsData} />

                {/* image background */}
                <div className="image-background-holder" style={{ height: '45vh' }}>

                    <LazyLoadImage
                        src='/images/cpt1-dark.webp'
                        alt='attractions'
                        sizes="100vw"
                        style={{
                            width: '100%',
                            height: 'auto'
                        }}
                    />


                    <div className="image-background-content container h-100">
                        <div className="d-flex h-100 text-center align-items-center">
                            <div className="w-100 text-white pt-3">

                                <div className="py-5">
                                    <h1 className="h1-title">{attrData.title}</h1>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                {/* end image background */}


                <div className="container-fluid pl-0 pr-0">
                    <section className="container text-dark py-5">
                        <div className="row justify-content-center text-left">
                            <div className="col-md-7 py-2">
                                {replaceNewLines(attrData.description)}
                            </div>
                        </div>

                        <div className="row justify-content-center pt-5">
                            <div className="col-md-9">
                                <LazyLoadImage
                                    src={`https://strapi.centralparktours.com/${image.url}`}
                                    alt={image.name}
                                    sizes="100vw"
                                    style={{
                                        height: 'auto',
                                        width: '100%',
                                        objectFit: 'cover'
                                    }}
                                />
                            </div>
                        </div>

                        <div className="row justify-content-center pt-5">

                            <h2 className="text-uppercase py-4" style={{ color: '#4c4a4b', fontWeight: 800 }}>You&apos;ll see on</h2>

                            <div className="col-md-11">

                                <div className="card-group pt-3">
                                    <FeaturedTours tours={toursData} className="card card-v mx-70" />
                                </div>
                            </div>
                        </div>
                    </section>

                    <Footer slugsData={slugsData} footerData={footerData} />

                </div>
            </> : <></>}

        </div>
    )
}


export async function getStaticPaths(context) {
    try {
        const { data: attractionData } = await api.getAttractions();
        const paths = attractionData.map(attraction => {
            return {
                params: {
                    title: attraction.attributes.attraction_url
                }
            }
        });

        return {
            paths,
            fallback: true
        }
    } catch (error) {
        throw new Error(`Could not get data: ${error}`)
    }
}

export async function getStaticProps({ params }) {
    try {
        const { data: attractionData } = await api.getAttractions();
        const { data: toursData } = await api.getFeaturedToursData();
        const { data: slugsData } = await api.getToursSlug();

        const attraction = attractionData.find(attraction => attraction.attributes.attraction_url === params?.title);

        return {
            props: {
                attraction,
                slugsData,
                toursData: toursData.attributes.tours.data.map(tour => tour.attributes),
                footerData: toursData.attributes
            }
        }
    } catch (error) {
        throw new Error(`Could not fetch data: ${error}`)
    }
}
