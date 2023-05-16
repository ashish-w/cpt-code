import { LazyLoadImage } from 'react-lazy-load-image-component';
// import belvedereCastle from '../../../public/images/belvedere-castle.webp';

const TopAttractions = ({ topAttractions }) => {

    return (
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-8">

            {
                topAttractions.map((attraction, i) => {

                    const { attributes: { title, description, img: { data: { attributes: { url, name, formats: { thumbnail: { url: placeholder } } } } } } } = attraction;

                    const isEven = num => ((num % 2) == 0);

                    if (isEven(i)) {
                        return (<div key={title} >
                            <div className="row align-items-center">

                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 text-center">
                                    <LazyLoadImage
                                        className="trip-img"
                                        alt={name}
                                        src={`https://strapi.centralparktours.com/${url}`}
                                        placeholderSrc={`https://strapi.centralparktours.com/${placeholder}`}
                                        effect="blur"
                                        sizes="100vw"
                                        style={{
                                            width: '300px',
                                            height: '300px',
                                            borderRadius: '50%',
                                            objectFit: 'cover'
                                        }}
                                    />
                                </div>
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 text-left tour-col1 mt-4">
                                    <h3><b style={{ color: '#535150' }}>{i + 1}. {title}</b></h3>
                                    <p>
                                        {description}
                                    </p>
                                </div>

                            </div>

                            <LazyLoadImage className="tour-circle-img" src='/images/dott-2.webp' alt={title} />
                        </div>)
                    }

                    return (
                        <div key={title}>
                            <div className="row align-items-center">
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 text-left tour-col1 mt-4">
                                    <h3><b style={{ color: '#535150' }}>{i + 1}. {title}</b></h3>
                                    <p>
                                        {description}
                                    </p>
                                </div>

                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 text-center tour-col2">
                                    <LazyLoadImage
                                        className="trip-img"
                                        alt={name}
                                        src={`https://strapi.centralparktours.com/${url}`}
                                        placeholderSrc={`https://strapi.centralparktours.com/${placeholder}`}
                                        effect="blur"
                                        sizes="100vw"
                                        style={{
                                            width: '300px',
                                            height: '300px',
                                            borderRadius: '50%',
                                            objectFit: 'cover'
                                        }}
                                    />
                                </div>

                            </div>

                            {i === 1 && <LazyLoadImage src='/images/dott.webp' alt={title} className="tour-circle-img" />}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default TopAttractions;