import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useRouter } from "next/router";
import Drawer from "./Drawer/Drawer";
import DropdownTours from "./DropdownTours/DropdownTours";
import {
  addCorporationJsonLd,
  addFaqJsonLd,
  addTourJsonLd,
  dynamicMetaData,
} from "utils/utils";
import dynamic from "next/dynamic";
import Script from "next/script";
import WeatherBar from "components/WeatherBar/WeatherBar";

const NoSsr = ({ children }) => <>{children}</>;

const NavBar = (props) => {
  const { title, slugsData, tour } = props;

  const [slugs, setSlugs] = useState([]);
  const router = useRouter();
  const currentRoute = router.asPath;
  const [navbarClass, setNavbarClass] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const subMenuLinks = slugs.map((slug) => slug.route);
  const relativeMetaData = dynamicMetaData(currentRoute);

  useEffect(() => {
    const setSubmenuObjects = (slugs) => {
      const items = slugs
        .filter((el) => el.attributes.display_name)
        .map((el) => {
          const {
            attributes: { slug, display_name },
          } = el;
          return {
            name: display_name,
            route: `/tours/${slug}`,
            isSubMenu: true,
          };
        });

      setSlugs(items);
    };
    if (slugsData?.length) {
      setSubmenuObjects(slugsData);
    }
  }, [slugsData]);

  useEffect(() => {
    scrollToTop();

    let prevScrollY = 10;

    const controlDirection = () => {
      if (
        currentRoute === "/" ||
        currentRoute === "/tours" ||
        currentRoute === "/attractions" ||
        currentRoute.includes("/attraction")
      ) {
        if (window.scrollY > 10) {
          setNavbarClass(true);
        } else {
          setNavbarClass(false);
        }
      } else {
        setNavbarClass(true);
      }
      prevScrollY = window.scrollY;
    };

    window.innerWidth > 991 &&
      window.addEventListener("scroll", controlDirection);
    return () => {
      window.removeEventListener("scroll", controlDirection);
    };
  }, [currentRoute]);

  const scrollToTop = () => {
    document.documentElement.scrollTop = 1;
  };

  const isActiveRoute = (routes) => {
    if (routes.some((route) => route === currentRoute)) {
      return `nav-link activeRoute`;
    }
    return "nav-link";
  };

  const navRoutes = [
    { name: "Home", route: "/" },
    { name: "About Us", route: "/#about" },
    { name: "Bike rentals", route: "/bike-rentals" },
    { name: "Attractions", route: "/attractions" },
    { name: "FAQ", route: "/faq" },
    { name: "Blog", route: "/blog" },
    { name: "Contact", route: "/#contact" },
    ...slugs,
  ];

  const subMenuItems = navRoutes
    .filter((item) => item.isSubMenu)
    .map((item) => ({
      key: item.name,
      label: (
        <Link
          href={item.route}
          style={{ fontSize: 16, fontFamily: "Poppins", color: "black" }}
        >
          {item.name}
        </Link>
      ),
    }));

  return (
    <>
      <WeatherBar />
      <NoSsr>
        <Head>
          <title>{title}</title>
          {relativeMetaData}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={addCorporationJsonLd()}
            key="corporation-jsonld"
          />
          {tour && (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={addTourJsonLd(tour)}
              key="tour-jsonld"
            />
          )}
          {currentRoute === "/faq" && (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={addFaqJsonLd()}
              key="faq-jsonld"
            />
          )}
        </Head>

        <header className="header">
          <nav
            className={`${navbarClass ? "navbar active" : "navbar"} 
                    navbar-expand-lg fixed-top py-1 
                    `}
          >
            <div className="container">
              <span className="navbar-brand text-uppercase font-weight-bold">
                <Link href="/">
                  {navbarClass ? (
                    <LazyLoadImage
                      id="cpt-logo"
                      alt="logo"
                      style={{ width: 90, height: "100%" }}
                      src="/images/logo-green.webp"
                    />
                  ) : (
                    <LazyLoadImage
                      id="cpt-logo-white"
                      alt="logo"
                      style={{ width: 125, height: "100%" }}
                      src="/images/logo-white-full.webp"
                    />
                  )}
                </Link>
              </span>

              <Drawer
                isExpanded={isExpanded}
                setIsExpanded={setIsExpanded}
                navRoutes={navRoutes}
                currentRoute={currentRoute}
              />

              <div
                id="navbarSupportedContent"
                className={`collapse navbar-collapse justify-content-center`}
              >
                <ul className="navbar-nav align-items-center text-nowrap">
                  <li className="nav-item">
                    <span
                      className={isActiveRoute(["/"])}
                      onClick={scrollToTop}
                    >
                      <Link href="/">Home</Link>
                    </span>
                  </li>
                  <li className="nav-item pl-4">
                    <span className={isActiveRoute(["/#about"])}>
                      <Link scroll={false} href="/#about">
                        About Us
                      </Link>
                    </span>
                  </li>

                  {/* <li className="dropdown nav-item pl-4">
                    <DropdownTours subMenuItems={subMensuItems}>
                      <span
                        className={`tours ${isActiveRoute([
                          "/tours",
                          ...subMenuLinks,
                        ])}`}
                      >
                        <Link href="/tours">Tours</Link>
                      </span>
                    </DropdownTours>
                  </li> */}

                  <li className="nav-item pl-4">
                    <span className={isActiveRoute(["/bike-rentals"])}>
                      <Link href="/tours/central-park-bike-tour">
                        Bike Tours
                      </Link>
                    </span>
                  </li>

                  <li className="nav-item pl-4">
                    <span className={isActiveRoute(["/bike-rentals"])}>
                      <Link href="/tours/central-park-pedicab-tour">
                        Pedicab Tours
                      </Link>
                    </span>
                  </li>

                  {/* <li className="nav-item pl-4">
                    <span className={isActiveRoute(["/bike-rentals"])}>
                      <Link href="/bike-rentals">Bike Rentals</Link>
                    </span>
                  </li> */}
                  <li className="nav-item pl-4">
                    <span className={isActiveRoute(["/attractions"])}>
                      <Link href="/attractions">Attractions</Link>
                    </span>
                  </li>
                  <li className="nav-item pl-4">
                    <span className={isActiveRoute(["/faq"])}>
                      <Link href="/faq">FAQ</Link>
                    </span>
                  </li>
                  <li className="nav-item pl-4">
                    <span className={isActiveRoute(["/blog"])}>
                      <Link href="https://www.centralparktours.com/blog">
                        Blog
                      </Link>
                    </span>
                  </li>
                  <li className="nav-item btn-cpt">
                    <span className="nav-link text-light">
                      <Link
                        scroll={false}
                        className="nav-contact-btn"
                        href="/#contact"
                      >
                        Contact
                      </Link>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </header>
      </NoSsr>
    </>
  );
};

export default dynamic(() => Promise.resolve(NavBar), { ssr: false });
