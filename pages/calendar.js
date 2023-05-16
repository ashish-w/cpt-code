import Navbar from "components/Navbar/Navbar";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { replaceNewLines } from "utils/utils";
import Footer from "components/Footer/Footer";
import { Badge, Calendar } from 'antd';
import api from "hooks/api/api";

const getListData = (value) => {
    let listData;
    switch (value.date()) {
        case 8:
            listData = [
                {
                    type: 'warning',
                    content: 'This is warning event.',
                },
                {
                    type: 'success',
                    content: 'This is usual event.',
                },
            ];
            break;
        case 10:
            listData = [
                {
                    type: 'warning',
                    content: 'This is warning event.',
                },
                {
                    type: 'success',
                    content: 'This is usual event.',
                },
                {
                    type: 'error',
                    content: 'This is error event.',
                },
            ];
            break;
        case 15:
            listData = [
                {
                    type: 'warning',
                    content: 'This is warning event',
                },
                {
                    type: 'success',
                    content: 'This is very long usual event。。....',
                },
                {
                    type: 'error',
                    content: 'This is error event 1.',
                },
                {
                    type: 'error',
                    content: 'This is error event 2.',
                },
                {
                    type: 'error',
                    content: 'This is error event 3.',
                },
                {
                    type: 'error',
                    content: 'This is error event 4.',
                },
            ];
            break;
        default:
    }
    return listData || [];
};
const getMonthData = (value) => {
    if (value.month() === 8) {
        return 1394;
    }
};

const monthCellRender = (value) => {
    const num = getMonthData(value);
    return num ? (
        <div className="notes-month">
            <section>{num}</section>
            <span>Backlog number</span>
        </div>
    ) : null;
};
const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
        <ul className="events">
            {listData.map((item) => (
                <li key={item.content}>
                    <Badge
                        // @ts-ignore
                        status={item.type} text={item.content} />
                </li>
            ))}
        </ul>
    );
};

export default function CalendarPage({ slugsData, footerData }) {

    return (
        <div>
            <Navbar title="Latest News and Current events in Central Park" slugsData={slugsData} />

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
                                <h1 className="h1-title">Events in Central Park</h1>

                                <p className="lead mb-0 pt-4">
                                    <b className="subtitle-4">
                                        {replaceNewLines("Below you will find a list of all major events located in Central Park. Each event is ranked by date and time. You will also find various interesting facts about Central Park and small tips and tricks.")}
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

                        <h2 className="text-center">COMING SOON!</h2>

                        {/* <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender} /> */}

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