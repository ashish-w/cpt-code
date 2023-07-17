import { useEffect, useRef } from "react";
import Link from "next/link";
import emailjs from "emailjs-com";
import { notification } from "antd";
import Navbar from "components/Navbar/Navbar";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleDown,
  faMapMarkerAlt,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { replaceNewLines } from "utils/utils";
import TabsComponent from "components/LatestPosts/Tabs/TabsComponent";
import api from "hooks/api/api";
import Footer from "components/Footer/Footer";
import FeaturedTours from "components/FeaturedTours/FeaturedTours";

export default function Home({ slugsData, toursData }) {
  const router = useRouter();
  const currentRoute = router.asPath;
  const videoRef = useRef();

  const featuredTours = toursData?.tours?.data?.map((tour) => tour.attributes);

  const openNotification = (placement) => {
    notification.info({
      message: "Successfully sent!",
      description: "Your message was successfully sent!",
      placement,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_3gzu6qr",
        "template_mphucge",
        e.target,
        "zFBTiAiqmidwgYGAd"
      )
      .then(
        (result) => {
          openNotification("topRight");
          e.target.reset();
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  useEffect(() => {
    videoRef &&
      // @ts-ignore
      videoRef.current
        .play()
        .then(() => {})
        .catch((err) => {
          console.log(err);
        });
  }, []);

  useEffect(() => {
    const scrollToAnchor = () => {
      location.replace(location.hash);
    };
    if (currentRoute.includes("#")) {
      const timeout = setTimeout(() => scrollToAnchor(), 1000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [currentRoute]);

  return (
    <div>
      <Navbar
        title="Central Park Tours - The Official Central Park Tour Company"
        slugsData={slugsData}
      />

      {/* video background */}

      <div className="video-background-holder">
        <div className="video-background-overlay"></div>

        <video ref={videoRef} autoPlay={true} muted playsInline={true} loop>
          {/* <source src="/intro.webm" type="video/webm" /> */}
          <source src="/intro.mp4" type="video/mp4" />
        </video>

        <div className="video-background-content container h-100">
          <div className="d-flex h-100 text-center align-items-center">
            <div className="w-100 text-white pt-70">
              <div className="py-5">
                <h2 className="display-4 pt-3">Welcome to</h2>
                <h1 className="h1-title">Central Park Tours</h1>
                <div className="horizontalLineXl" />

                <p className="lead mb-0">
                  <b className="subtitle-4">
                    {replaceNewLines(toursData.header_subtitle)}
                  </b>
                </p>

                <section className="pt-60">
                  <span className="btn-explore mx-auto">
                    <Link scroll={false} href="#explore">
                      EXPLORE THE TOURS
                    </Link>
                    <FontAwesomeIcon
                      style={{ color: "#9bd230" }}
                      icon={faArrowCircleDown}
                      className="pl-2"
                    />
                  </span>
                  <div className="pt-4 mx-auto">
                    <FontAwesomeIcon icon={faPhone} aria-hidden="true" />
                    <span className="pl-2">
                      Book over the phone: {toursData.phone?.split(" ")[2]}
                    </span>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* sections */}

      <div className="container-fluid  pl-0 pr-0">
        <section className="container text-dark pt-70 pb-300">
          <div className="row justify-content-center">
            <div className="col-5 text-left">
              <div className="font-20">Check out our</div>

              <div className="">
                <h2 className="h2-title">
                  <b style={{ color: "#88bc2c" }}>Featured </b>tours
                </h2>
              </div>
            </div>

            <div className="px-4"></div>

            <div className="col-5 text-right">
              <br></br>
              <div
                id="explore"
                className="font-weight-bold text-uppercase underlined pt-3"
              >
                <Link href="/tours">View All</Link>
              </div>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-xs-12 col-md-9 col-lg-12">
              {/* cards */}
              <div className="card-group pt-5">
                <FeaturedTours
                  className="card card-v mx-70"
                  tours={featuredTours}
                />

                <div className="container pt-5">
                  <div
                    className="row justify-content-center px-3 pt-4"
                    style={{ color: "#535150" }}
                  >
                    <div className="col-11 text-left">
                      <p style={{ fontSize: 20 }}>
                        Our tours are top rated on Tripadvisor!
                      </p>

                      <a
                        href="https://www.tripadvisor.com/Attraction_Review-g60763-d1544922-Reviews-Central_Park_Tours-New_York_City_New_York.html"
                        className="see-testimonials text-uppercase"
                      >
                        <b>SEE TESTIMONIALS</b>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="about" id="about">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#f9f9f8"
              fillOpacity="1"
              d="M0,96L80,96C160,96,320,96,480,117.3C640,139,800,181,960,192C1120,203,1280,181,1360,170.7L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
            ></path>
          </svg>

          <div className="aboutContainer container-fluid">
            <div className="row justify-content-center">
              <div className="col-xs-12 col-md-4 text-left">
                <small
                  className="h4 font-weight-normal"
                  style={{ color: "#535150" }}
                >
                  Learn more
                </small>
                <h3
                  className="pt-2 pb-4 h1"
                  style={{
                    fontFamily: "Arial Black",
                    fontWeight: 900,
                    color: "#3d3d3c",
                    fontSize: 45,
                  }}
                >
                  About us
                </h3>

                <p>
                  <b>{replaceNewLines(toursData.subtitle)}</b>
                </p>

                <p>{replaceNewLines(toursData.main_content)}</p>

                <br></br>
                <i>{replaceNewLines(toursData.italic)}</i>
              </div>

              <div className="col-xs-12 col-md-4 d-flex justify-content-center align-items-center">
                <LazyLoadImage
                  src={`https://strapi.centralparktours.com/${toursData?.img?.data?.attributes.url}`}
                  alt="about us circle"
                  effect="blur"
                  placeholderSrc={`https://strapi.centralparktours.com/${toursData?.img?.data?.attributes.formats.thumbnail.url}`}
                  sizes="100vw"
                  className="pt-5 img-circle"
                  style={{
                    width: "100%",
                    maxWidth: "400px",
                    height: "auto",
                  }}
                />
              </div>
            </div>
          </div>

          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#f9f9f8"
              fillOpacity="1"
              d="M0,288L80,256C160,224,320,160,480,154.7C640,149,800,203,960,224C1120,245,1280,235,1360,229.3L1440,224L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
            ></path>
          </svg>
        </section>

        {/* tabs section*/}
        <section>
          <div className="container text-dark text-center">
            <h3
              className="pb-1 h1"
              style={{ fontFamily: "Arial Black", fontWeight: 900 }}
            >
              Latest posts
            </h3>
            <p>
              Learn more about upcoming events in Central Park, news,
              <br></br>
              concerts in the Summerstage, yoga in the park and many more.
            </p>
            <TabsComponent />
          </div>
        </section>

        {/* contact section */}
        <section
          id="contact"
          className="contact-section container text-dark pb-5"
        >
          <div className="row justify-content-center">
            <div className="col-xs-12 col-md-6 text-left pl-md-6">
              <small
                className="h4 font-weight-normal"
                style={{ color: "#535150" }}
              >
                Get in touch
              </small>
              <h3
                className="pt-2 pb-4 h1"
                style={{
                  fontFamily: "Arial Black",
                  fontWeight: 900,
                  color: "#3d3d3c",
                }}
              >
                Contact Us
              </h3>

              <p>{replaceNewLines(toursData.contact_info)}</p>
              <br></br>

              <div className="d-flex align-items-center">
                <div className="col-sm-1">
                  <FontAwesomeIcon
                    icon={faMapMarkerAlt}
                    size="lg"
                    style={{
                      paddingLeft: "35%",
                      paddingBottom: 70,
                      color: "#3d3d3c",
                    }}
                  />
                  <br></br>
                  <FontAwesomeIcon
                    icon={faPhone}
                    size="lg"
                    style={{ paddingLeft: "35%", color: "#3d3d3c" }}
                  />
                </div>

                <div className="col-xs-12 col-sm-11">
                  <p className="font-bold">
                    {replaceNewLines(toursData.address)}
                    <a
                      style={{
                        color: "#01bdd4",
                        fontWeight: 600,
                        textTransform: "uppercase",
                      }}
                      target="_blank"
                      href={toursData.get_directions}
                      rel="noreferrer"
                    >
                      Get Directions
                    </a>
                  </p>
                  <p>
                    {toursData.phone}
                    <br></br>
                    <a
                      style={{
                        color: "#01bdd4",
                        fontWeight: 600,
                        textTransform: "uppercase",
                      }}
                      target="_blank"
                      href={`tel:${toursData.phone}`}
                      rel="noreferrer"
                    >
                      Call Now
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className="col-xs-12 col-md-6">
              <form onSubmit={handleSubmit} className="contact-form">
                <LazyLoadImage
                  src="/images/cpt-circle.webp"
                  alt="contact us circle"
                  sizes="100vw"
                  className="cpt-circle"
                  style={{ width: "180px", height: "auto" }}
                />

                <div className="d-flex pb-4">
                  <input
                    required
                    type="text"
                    className="form-control mr-3"
                    name="user_name"
                    placeholder="First name"
                  />
                  <input
                    type="text"
                    className="form-control"
                    name="user_lastname"
                    placeholder="Last name"
                  />
                </div>

                <div className="d-flex pb-4">
                  <input
                    type="email"
                    required
                    className="form-control mr-3"
                    name="contact_email"
                    placeholder="Email"
                  />
                  <input
                    type="number"
                    className="form-control"
                    name="contact_number"
                    placeholder="Phone"
                  />
                </div>

                <textarea
                  required
                  className="form-control"
                  name="message"
                  placeholder="Message"
                ></textarea>

                <button className="btn-contact text-uppercase mt-5">
                  Submit Request
                </button>
              </form>
            </div>
          </div>
        </section>

        <LazyLoadImage
          src="/images/cpt-cbck.webp"
          alt="about us circle"
          sizes="100vw"
          style={{
            width: "100%",
            height: "auto",
          }}
        />

        <Footer slugsData={slugsData} footerData={toursData} />
      </div>
    </div>
  );
}

export async function getStaticProps(context) {
  const { data: toursData } = await api.getFeaturedToursData();
  const { data: slugsData } = await api.getToursSlug();

  return {
    props: {
      toursData: toursData.attributes,
      slugsData: slugsData,
    },
  };
}
