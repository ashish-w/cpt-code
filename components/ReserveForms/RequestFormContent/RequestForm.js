import { notification } from "antd";
import DatePicker from "react-datepicker";
import emailjs from 'emailjs-com';
import { CustomInput } from "utils/utils";

const RequestFormContent = (props) => {

    const {
        setHours,
        setMinutes,
        startDate,
        setStartDate,
        count,
        setCount,
        showReserveBtn
    } = props;

    const openNotification = placement => {
        notification.info({
            message: 'Successfully sent!',
            description:
                'Your message was successfully sent!',
            placement,
        });
    };

    function sendEmail(e) {
        e.preventDefault();

        emailjs.sendForm('service_3gzu6qr', 'template_hak67qi', e.target, 'zFBTiAiqmidwgYGAd')
            .then((result) => {
                console.log(result.text);
                openNotification('topRight')
                e.target.reset()

            }, (error) => {
                console.log(error.text);
            });
        if (showReserveBtn) showReserveBtn();

    }

    return (
        <div>
            <form onSubmit={sendEmail}>
                <div className="container d-flex justify-content-center">
                    <div className="row">
                        <div className="col text-center">
                            <p className="book-title">Request Form</p>
                            <div className="form-group">

                            </div>
                            <div className="checkout-form">
                                <div className="form-group centered-row">
                                    <input required className="form-control" name="user_name" placeholder="First & Last Name" type="text" />
                                </div>
                                <div className="form-group centered-row">
                                    <input className="form-control" name="contact_number" placeholder="Phone" type="number" />
                                </div>
                                <div className="form-group centered-row">
                                    <input className="form-control" name="contact_email" placeholder="Email" type="email" />
                                </div>

                                <div className="form-group centered-row">
                                    <p className="t-title" style={{ fontSize: 12 }}>Number Of Guests</p>
                                    <br></br>
                                    <div className="btn-counter" onClick={(e) => setCount({ ...count, kids: count.kids > 1 ? count.kids - 1 : 0 })}>-</div>
                                    <input className="counter-field" name="number_of_guests" type="number" value={count.kids} readOnly />
                                    <div className="btn-counter" onClick={(e) => setCount({ ...count, kids: count.kids + 1 })}>+</div>
                                </div>
                                <div className="form-group datepicker">
                                    <DatePicker
                                        className="form-control"
                                        name="date_and_time"
                                        selected={startDate}
                                        onChange={(date) => (setStartDate(date), setCount({ ...count, tourDate: date }))}
                                        showTimeSelect
                                        minDate={new Date()}
                                        minTime={setHours(setMinutes(new Date(), 0), 9)}
                                        maxTime={setHours(setMinutes(new Date(), 30), 17)}
                                        dateFormat="MMMM d, yyyy h:mm aa"
                                        customInput={<CustomInput />}

                                    />
                                    <input type="hidden" value={count.tourDate} name="datetime" />
                                </div>
                                <div className="form-group centered-row">
                                    <textarea className="form-control" name="message" placeholder="Your Notes" >
                                    </textarea>

                                </div>
                            </div>
                            <button className="btn-reserve">Request Now</button>

                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default RequestFormContent;