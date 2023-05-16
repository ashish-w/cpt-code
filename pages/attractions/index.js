import Navbar from "components/Navbar/Navbar";
import Footer from "components/Footer/Footer";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { replaceNewLines } from "utils/utils";
import Link from "next/link";
import { AttractionsCarousel } from "../../components/AttractionsCarousel/AttractionsCarousel";
import api from "hooks/api/api";

export default function AttractionList({ slugsData, footerData, attractions }) {

  return (
    <div>

      <Navbar title="Attractions - Central Park Tours - The Official Central Park Tour Company" slugsData={slugsData} />

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
                <h1 className="h1-title">Attractions in Central Park</h1>

                <p className="lead mb-0 pt-4">
                  <b className="subtitle-4">
                    {replaceNewLines("Below you will find a list of all major attractions located in Central Park. Each attractions is ranked by popularity and accessibility. You will also find various interesting facts about Central Park and small tips and tricks.")}
                  </b>
                </p>

              </div>

            </div>
          </div>
        </div>
      </div>
      {/* end image background */}

      <div className="container text-dark attractions text-center">
        {attractions.map((attractions, i) => {

          const { attributes:
            {
              title,
              description,
              accessibility,
              popularity,
              attraction_url,
              image: {
                data:
                { attributes: { url, formats: { thumbnail: { url: placeholder } } } }
              }
            } } = attractions;

          if (i % 2) {

            return (
              <div key={title}>
                <div className="row justify-content-center align-items-center pt-1 pl-50">


                  <div className="col-sm-5 text-left col1">
                    <h2 className="pb-4" style={{ color: '#4c4a4b', fontWeight: 800 }}>{title}</h2>

                    <div>
                      {replaceNewLines(description.slice(0, 375) + '...')}
                      <div>
                        <Link href={`/attractions/${attraction_url}`} className="readmore"> Read More</Link>
                      </div>

                      <div className="row d-flex pt-3 align-items-center">
                        <div className="col-sm-5">
                          <b>Accessibility {accessibility}%</b>
                        </div>


                        <div className="col-sm-7">

                          <div className="slide_percentage">
                            <div className="slider_1" style={{ width: `${accessibility}%` }}></div>
                          </div>

                        </div>
                      </div>

                      <div className="row d-flex pt-3 align-items-center">
                        <div className="col-sm-5">
                          <b>Popularity {popularity}%</b>
                        </div>


                        <div className="col-sm-7">

                          <div className="slide_percentage">
                            <div className="slider_1" style={{ width: `${popularity}%` }}></div>
                          </div>

                        </div>
                      </div>

                      <div className="row d-flex pt-3 align-items-center">
                        <p className="col-sm-6 text-uppercase" style={{ fontWeight: '600' }}>You&apos;ll see on</p>
                        <p className="col-sm-6 text-uppercase" style={{ fontWeight: '700' }}>Bike tour, Pedicab tour</p>

                      </div>

                    </div>
                  </div>

                  <div className="col-sm-6 col2">

                    <div className="circle-left">{i + 1}</div>
                    <LazyLoadImage
                      src={`https://strapi.centralparktours.com/${url}`}
                      alt={title}
                      className="attr-image"
                      placeholderSrc={`https://strapi.centralparktours.com/${placeholder}`}
                      effect="blur"
                      sizes="100vw"
                      style={{
                        width: '80%',
                        height: '100%'
                      }}
                    />

                  </div>

                </div>

                <div className="curved-line-right">
                  <LazyLoadImage
                    src='/images/dott.webp'
                    alt='curved line'
                    style={{
                      width: '100%',
                      height: '7%'
                    }} />
                </div>
              </div>
            )
          }

          return (
            <div key={title}>

              <div className="row justify-content-center align-items-center py-5 pr-50">

                <div className="col-sm-6">
                  <div className="circle-right">{i + 1}</div>
                  <LazyLoadImage
                    src={`https://strapi.centralparktours.com/${url}`}
                    alt={title}
                    className="attr-image"
                    placeholderSrc={`https://strapi.centralparktours.com/${placeholder}`}
                    effect="blur"
                    sizes="100vw"
                    style={{
                      width: '80%',
                      height: '100%'
                    }}
                  />
                </div>

                <div className="col-sm-5 text-left">
                  <h2 className="pb-4" style={{ color: '#4c4a4b', fontWeight: 800 }}>{title}</h2>

                  <div>
                    {replaceNewLines(description.slice(0, 375) + '...')}
                    <div>
                      <Link href={`/attractions/${attraction_url}`} className="readmore"> Read More</Link>
                    </div>

                    <div className="row d-flex pt-3 align-items-center">
                      <div className="col-sm-5">
                        <b>Accessibility {accessibility}%</b>
                      </div>


                      <div className="col-sm-7">

                        <div className="slide_percentage">
                          <div className="slider_1" style={{ width: `${accessibility}%` }}></div>
                        </div>

                      </div>
                    </div>

                    <div className="row d-flex pt-3 align-items-center">
                      <div className="col-sm-5">
                        <b>Popularity {popularity}%</b>
                      </div>


                      <div className="col-sm-7">

                        <div className="slide_percentage">
                          <div className="slider_1" style={{ width: `${popularity}%` }}></div>
                        </div>

                      </div>
                    </div>

                    <div className="row d-flex pt-3 align-items-center">
                      <p className="col-sm-6 text-uppercase" style={{ fontWeight: '600' }}>You&apos;ll see on</p>
                      <p className="col-sm-6 text-uppercase" style={{ fontWeight: '700' }}>Bike tour, Pedicab tour</p>

                    </div>

                  </div>
                </div>

              </div>

              <div className="curved-line-left">
                <LazyLoadImage
                  src='/images/dott-2.webp'
                  alt='curved line'
                  style={{
                    width: '100%',
                    height: '7%'
                  }} />

              </div>



            </div>
          )

        })}

      </div>

      <div className="container-fluid text-dark attractions-m px-0">
        <AttractionsCarousel attractions={attractions} />
      </div>

      <Footer slugsData={slugsData} footerData={footerData} />

    </div>

  )
}

export async function getStaticProps(context) {
  try {
    const { data: footerData } = await api.getFeaturedToursData();
    const { data: attractionsData } = await api.getAttractions();
    const { data: slugsData } = await api.getToursSlug();

    return {
      props: {
        slugsData,
        attractions: attractionsData,
        footerData: footerData.attributes,
      }
    }
  } catch (error) {
    throw new Error(`Failed to fetch data: ${error}`);
  }
}