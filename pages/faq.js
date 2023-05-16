import Faq from "components/Faq/Faq";
import Footer from "components/Footer/Footer";
import Navbar from "components/Navbar/Navbar";
import api from "hooks/api/api";

const QuestionsPage = ({ slugsData, faqData, footerData }) => {

    return (
        <div>
            <Navbar title="FAQ - Central Park Tours - The Official Central Park Tour Company" slugsData={slugsData} />

            <div className="container">
                <div className="text-left py-5">

                    <Faq faqs={faqData} />

                </div>
            </div>
            <Footer slugsData={slugsData} footerData={footerData} />
        </div >
    )
}
export default QuestionsPage;

export async function getStaticProps(context) {
    try {
        const { data: faqData } = await api.getFaqs();
        const { data: footerData } = await api.getFeaturedToursData();
        const { data: slugsData } = await api.getToursSlug();

        return {
            props: {
                faqData,
                slugsData,
                footerData: footerData.attributes,
            }
        }
    } catch (error) {
        throw new Error(`Could not fetch data: ${error}`);
    }
}