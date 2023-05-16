import Navbar from "components/Navbar/Navbar";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { replaceNewLines } from "utils/utils";
import api from "hooks/api/api";
import Footer from "components/Footer/Footer";

const Scholarship = ({ slugsData, footerData }) => {

    return (
        <div>
            <Navbar title="Scholarship - Central Park Tours - The Official Central Park Tour Company" slugsData={slugsData} />

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
                                <h1 className="h1-title">Scholarship</h1>

                                <p className="lead mb-0 pt-4">
                                    <b className="subtitle-4">
                                        {replaceNewLines("Apply Now For A $1,000 Award Toward Your Education.")}
                                    </b>
                                </p>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
            {/* end image background */}

            <div className="container py-5 pl-0 pr-0">
                <div className="row justify-content-center px-3">
                    <div className="col-xs-12 col-md-6 pt-5 text-left order-2 order-md-1">
                        <h1>Central Park’s Scavenger Hunt Scholarship</h1>
                        <p>
                            We are aware of the constantly increasing costs of college education in the United States. That is why Central Park Tours is committed to helping students alleviate some of the costs, by providing a $1,000 scholarship award.
                        </p>
                        <p>
                            Central Park Tours is currently designing a FREE scavenger hunt in Central Park. Eligible students should submit their ideas and suggestions in a written format explaining and elaborating on different tasks, puzzles, games and so on, all within Central Park.
                        </p>
                        <p>
                            The scavenger hunt will be available in a web format on our website. Try to incorporate creative ways to include history, sights, attractions and architecture of the park. Students are encouraged to improvise and unleash their creativity.
                        </p>
                    </div>

                    <div className="col-xs-12 col-md-6 text-center order-1 order-md-2">
                        <LazyLoadImage src="/images/scholarship.svg" />
                    </div>

                </div>

                <div className="row justify-content-center px-3">

                    <div className="col-xs-12 col-md-6 text-center">
                        <LazyLoadImage src="/images/school-materials.svg" />
                    </div>

                    <div className="col-xs-12 col-md-6 text-left pt-5">
                        <h2 className="h1">Eiligibility</h2>

                        <div className="py-3">
                            <b>Who Can Apply ?</b>
                        </div>

                        <p>● Enrolled full-time in high school as a senior or be a part-time or full-time student in a college, graduate school, trade school, or coding bootcamp.</p>
                        <p>● Have an overall average GPA of at least 3.0.</p>
                        <p>● Citizens, permanent residents and international students are all welcome to participate in the scholarship.</p>
                        <p>● Submit a 1000 word essay on the prompt specified below.</p>

                    </div>

                </div>

                <div className="row justify-content-center px-3">
                    <div className="col-xs-12 col-md-6 text-center">
                        <LazyLoadImage width={200} src="/images/application.svg" />
                        <h4>Application</h4>

                        <h4>
                            <b>Apply now for a $1,000 award toward your education.</b>
                        </h4>


                        <div>
                            <p>Please submit your essays to:</p>
                            <a href="mailto:scholarships@centralparktours.com"><b>scholarships@centralparktours.com</b></a>
                        </div>

                        <div className="pt-3">
                            Please submit your application for the Fall semester no later than May 1, or for the
                            Spring semester no later than November 1. The winning student for the Fall semester
                            award will be notified on May 31, and the winning student for the Spring semester
                            award will be notified on November 30. Payment will be made out directly to the
                            winning student.
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

export default Scholarship;


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