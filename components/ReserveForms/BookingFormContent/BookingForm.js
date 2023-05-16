import DatePicker from "react-datepicker";
import { CustomInput } from "utils/utils";
import ModalForm from "../ModalForm/ModalForm";
import QuantitySelectors from "../QuantitySelectors/QuantitySelectors";

const BookingFormContent = (props) => {

    const {
        setHours,
        setMinutes,
        startDate,
        setStartDate,
        count,
        setCount,
        tourData,
        maxDuration,
        findStartingPrice
    } = props;

    return (<div>
        <form>
            <div className="container d-flex justify-content-center">
                <div className="row">
                    <div className="col text-center">
                        <p className="book-title">Book Now</p>
                        <div className="form-group datepicker">
                            <DatePicker
                                className="form-control"
                                selected={startDate}
                                onChange={(date) => (setStartDate(date), setCount({ ...count, tourDate: date }))}
                                showTimeSelect
                                minDate={new Date()}
                                minTime={setHours(setMinutes(new Date(), 0), 9)}
                                maxTime={setHours(setMinutes(new Date(), 30), 17)}
                                dateFormat="MMMM d, yyyy h:mm aa"
                                customInput={<CustomInput />} />
                        </div>

                        <QuantitySelectors count={count} setCount={setCount} tourData={tourData} maxDuration={maxDuration} />

                        <p className="text-uppercase"
                            style={{ fontSize: 14 }}
                        >Price from {''}
                            <b style={{ fontSize: 24, color: '#313030' }}>
                                ${findStartingPrice}
                            </b> usd
                        </p>
                        <ModalForm
                            count={count}
                            setCount={setCount}
                            tourData={tourData}
                            startDate={startDate}
                        />

                    </div>
                </div>
            </div>
        </form>
    </div>);
}

export default BookingFormContent;