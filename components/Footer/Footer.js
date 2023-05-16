// @ts-nocheck
import { faHeart, faMapMarkerAlt, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from 'next/link';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { replaceNewLines } from "utils/utils";

// import dynamic from 'next/dynamic'
// const NoSsr = ({ children }) => <>{children}</>

const Footer = ({ slugsData, footerData }) => {
    return (
        // <NoSsr>
        <footer className="text-left text-lg-start text-muted" style={{ background: '#f8f8f8' }}>

            <section className="">
                <div className="container text-left text-md-start mt-5">
                    <div className="row mt-3">
                        <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                            <h6 className="text-uppercase mb-4 col-title">
                                INFORMATION
                            </h6>
                            <p><Link href="/scholarship">Apply for a scholarship</Link></p>
                            <p><Link href="/central-park-audio-tours">Audio Tours</Link></p>
                            <p>Calendar - Soon!</p>
                        </div>

                        <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                            <h6 className="text-uppercase mb-4 col-title">
                                Tours
                            </h6>

                            {slugsData?.length && (slugsData).filter(el => el.attributes.display_name).map(el => {
                                const { attributes: { slug, display_name } } = el

                                return (<p key={slug}><Link href={`/tours/${slug}`}>{display_name}</Link></p>)
                            })}

                        </div>

                        <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                            <h6 className="text-uppercase mb-4">
                                Legal
                            </h6>

                            <p><Link href="/cancellation-policy">Cancellation policy</Link></p>
                            <p><Link href="/terms-and-conditions">Terms and conditions</Link></p>
                        </div>

                        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                            <h6 className="text-uppercase mb-4">Contact</h6>

                            <p>
                                <FontAwesomeIcon icon={faMapMarkerAlt} style={{ color: '#888888' }} />
                            </p>
                            <p style={{ paddingLeft: '20px', marginTop: '-33px' }}>
                                {replaceNewLines(footerData?.address)}
                            </p>


                            <p>
                                <FontAwesomeIcon icon={faPhone} className="mr-2" style={{ color: '#888888' }} />{footerData?.phone}
                            </p>

                            <div className="d-flex p-3">
                                <p>
                                    <Link className="m-1" href="http://fb.com/centralparktours">
                                        <LazyLoadImage src='/fb.svg' alt='fb' />
                                    </Link>
                                </p>
                                <p>
                                    <Link className="m-1" href="http://twitter.com/centralparktour">
                                        <LazyLoadImage src='/twitter.svg' alt='twitter' />
                                    </Link>
                                </p>
                                <p>
                                    <Link className="m-1" href="http://instagram.com/centralparktours">
                                        <LazyLoadImage src='/instagram.svg' alt='instagram' />
                                    </Link>
                                </p>
                            </div>

                        </div>
                    </div>
                    <div className="text-center p-4">
                        <LazyLoadImage
                            src="/images/logo-silver.webp"
                            alt="central park logo"
                            style={{ width: '150px', height: 'auto' }}
                        />
                        <p className="pt-4 border-top">
                            ©2023 Central Park Tours Inc. Created with {' '}
                            <FontAwesomeIcon icon={faHeart} style={{ color: 'red' }} />
                            {' '}
                            in NYC.
                        </p>

                    </div>
                </div>

            </section>
        </footer>
        // </NoSsr>
    )
}

export default Footer;