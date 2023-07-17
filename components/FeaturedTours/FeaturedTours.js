import Link from 'next/link';
import { extractNumber, findMinNumber } from "utils/utils";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import { useState } from "react";
import FeaturedToursGallery from "components/FeaturedToursGallery/FeaturedToursGallery";
import MobileModal from "components/ReserveForms/ModalForm/MobileModal";
import { Rate } from "antd";

const FeaturedTours = ({ tours, className }) => {

    const [startDate, setStartDate] = useState(
        setHours(setMinutes(new Date(), 30), 9));
    const [count, setCount] = useState({
        adults: 1,
        kids: 1,
        baskets: 0,
        locks: 0,
        duration: 1, //!!! initialDuration
        subtotal: 0,
        total: 0,
        tax: 0,
        discount: null,
        discountCode: '',
        tour: 'tour.route', //!!!
        tourDate: startDate,
        name: '',
        email: '',
        phone: ''
    })

    return (<>
        {tours && tours.map(tour => {

            const initialDuration = tour.fixedDuration ? extractNumber(tour.fixedDuration) : 1;

            const {
                title,
                description,
                gallery,
                price_adult,
                price_adult_2h,
                price_adult_3h,
                price_adult_all_day,
                fixedDuration,
                rating,
                slug,
                createdAt
            } = tour;

            const allPrices = [
                Number(price_adult),
                Number(price_adult_2h),
                Number(price_adult_3h),
                Number(price_adult_all_day)];

            const findStartingPrice = findMinNumber(allPrices);

            return (

                <div className={className} key={createdAt}>
                    <div className="carousel">
                        <FeaturedToursGallery key={createdAt} images={gallery} />
                    </div>

                    <div className="card-body" style={{ marginTop: -20 }}>
                        <h5 style={{ color: '#535150', fontSize: '18px' }}
                            className="card-title text-left text-uppercase font-weight-bold pt-3 pb-1"
                        >{title}
                        </h5>

                        <div className="row pb-4">
                            {findStartingPrice !== 0 && <div style={{ fontSize: 12 }} className="col text-left text-uppercase">
                                Price from {''}
                                <b style={{ fontSize: 18, color: '#88bc2c' }}>
                                    ${findStartingPrice}
                                </b> usd
                            </div>}

                            <div style={{ fontSize: 12 }} className="col text-right pt-1">
                                DURATION <b> {fixedDuration ? extractNumber(fixedDuration) : 1}h</b>
                            </div>

                        </div>

                        <p style={{ fontSize: 14, color: '#8b8b8b' }} className="text-left">
                            {description.slice(0, 214) + '...'}
                        </p>

                        <div className="row text-uppercase">
                            <div style={{ fontSize: 12 }} className="col text-left ">Intensity</div>
                            <div style={{ fontSize: 12 }} className="col text-right">Rating {rating.toFixed(1)}</div>
                        </div>

                        <div className="row text-uppercase pb-4">
                            <div style={{ fontSize: 12 }} className="col text-left "><b>Active</b></div>
                            <div style={{ fontSize: 16 }} className="col text-right">
                                <Rate allowHalf value={rating} disabled style={{ color: '#88bc2c', width: 'max-content' }} />
                            </div>
                        </div>

                        <div className="row text-uppercase pb-4 text-right">
                            <div style={{ fontSize: 12, color: 'silver', fontWeight: 'bold' }} className="col text-left pt-3">
                                <Link href={`${slug.data.attributes.slug.includes('bike-rentals')
                                    ? '/'
                                    : '/tours/'}${slug.data.attributes.slug}`}>View tour</Link>
                            </div>
                            <div style={{ fontSize: 12 }} className="col">
                                <MobileModal
                                    setHours={setHours}
                                    setMinutes={setMinutes}
                                    startDate={startDate}
                                    setStartDate={setStartDate}
                                    count={count}
                                    setCount={setCount}
                                    tourData={tour}
                                />
                            </div>
                        </div>


                    </div>
                </div >
            )
        })}
    </>)
}
export default FeaturedTours;