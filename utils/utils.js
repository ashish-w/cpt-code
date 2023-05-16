import React, { forwardRef } from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
// import bikeRental1 from "../public/images/bike-rental-1.webp";

export const imgPlaceholder = 'data:image/webp;base64,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'

// @ts-ignore
export const CustomInput = forwardRef(({ value, onClick }, ref) => {
  return (
    <div style={{ width: 'max-content' }}>
      <LazyLoadImage src='/calendar.svg' alt="calendar" width="25" className="mr-1" />
      <label onClick={onClick} ref={ref}>
        {value}
      </label>
    </div>
  );
});
CustomInput.displayName = 'CustomInput';


export function findMinNumber(args) {
  if (args.every(num => num === 0)) return 0;
  return args.filter(Number || null).reduce((a, b) => Math.min(a, b));
}

export const extractNumber = (string) => {
  return Number(string.replace(/\D+/g, ""))
};

export const replaceNewLines = (data) => {
  if (!data) return;

  return data.split('\n')
    .map((item, idx) => {
      return (
        <React.Fragment key={idx}>
          {item}
          <br />
        </React.Fragment>
      )
    })
}

export const calculateTotalPrice = (props) => {

  const { count, tourData, setCount } = props;

  const {
    duration,
    baskets: basketsQty,
    locks: locksQty,
    adults,
    kids,
    discount
  } = count;

  const {
    price_adult,
    price_adult_2h,
    price_adult_3h,
    price_adult_all_day,
    price_kid,
    price_kid_2h,
    price_kid_3h,
    price_kid_all_day,
    locks: price_locks,
    baskets: price_baskets,
    tax_rate
  } = tourData;

  let subtotalPrice;
  let totalPrice;
  let taxPrice;
  let pricePerDuration = [];
  const taxRate = tax_rate ?? 8.875 / 100;

  switch (duration) {
    case 1: pricePerDuration = [price_adult || 0, price_kid || 0]
      break;
    case 2: pricePerDuration = [price_adult_2h || 0, price_kid_2h || 0]
      break;
    case 3: pricePerDuration = [price_adult_3h || 0, price_kid_3h || 0]
      break;
    case 4: pricePerDuration = [price_adult_all_day || 0, price_kid_all_day || 0]
      break;
  }

  subtotalPrice = (adults * pricePerDuration[0]) +
    (kids * pricePerDuration[1]) +
    (basketsQty * price_baskets || 0) +
    (locksQty * price_locks || 0);

  totalPrice = subtotalPrice + (subtotalPrice * taxRate);
  taxPrice = subtotalPrice * taxRate;
  let discountedPrice = totalPrice - (totalPrice * discount / 100);
  // console.log(discountedPrice)
  setCount({ ...count, subtotal: subtotalPrice, total: discountedPrice, tax: taxPrice });
}

export function addCorporationJsonLd() {
  return {
    __html: `{
        "@context" : "https://schema.org",
        "@type" : "Corporation",
        "name" : "Central Park Tours",
        "alternateName" : "CPT New York",
        "url" : "https://centralparktours.com/" ,
        "logo" : "https://centralparktours.com/images/logo.webp",
        "sameAs" : [
        "https://www.facebook.com/CentralParkTours/",
        "https://www.instagram.com/centralparktours/",
        "https://twitter.com/centralparktour"
        ]
    }`,
  };
};

export function addFaqJsonLd() {
  return {
    __html: `{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [{
              "@type": "Question",
              "name": "How big is Central Park?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Central Park is 843 acres! It spans from 59th street in Midtown all the way to 110 street in Uptown and from 5th Ave on the east all the way to Central Park West. It is a very large public park and people visiting often forget how large the park is. If you want to walk around the entire park, make sure you plan for the entire day."
              }
            },{
              "@type": "Question",
              "name": "Who designed Central Park?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Who designed Central Park? The park was designed by Calvert Vaux and Frederick Olmsted. After years of debate over the exact location of this newly proposed park, construction began in 1857. The 2 architects named their plan “The Greensward Plan” and they won the park design contest. The topography of Manhattan island and the widespread Manhattan Schist, made it extremely difficult for Vaux and Olmstead. In addition, the land where Central Park is located was a rocky and swampy land. As a matter of fact, more gunpowder was used to blast the rock in Central Park, than all the gunpowder used at the Gettysburg battle."
              }
            },{
              "@type": "Question",
              "name": "What to do and see in Central Park?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "The park has a lot to offer to people from all walks of life! From the tourist attractions in the south and the most filmed sights in the world, to the extremely secluded areas in the north. Central Park is one of the most famous bird watching places in New York State, with over 270 species of birds. For people who love to exercise, there are many hiking trails in the Ramble and the Ravine. For picnic lovers, Sheep Meadow offers a stunning view of Midtown Manhattan. Of course, motor traffic is not allowed in certain areas of the park, which makes it perfect for biking and rollerblading."
              }
            },{
              "@type": "Question",
              "name": "Best way to explore Central Park?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "In our opinion, the best way to see Central Park is by renting a bike and covering the entire park. You can take advantage of our free self-guided audio tour and explore at your own pace. We also recommend not precisely following the directions and maps throughout the park. There is a great pleasure in getting lost in Central Park and discovering some new secluded places . Vaux and Olmsted were aware of the need for nature in the midst of the hustle and bustle of New York and accordingly designed many hidden spots in the park (such as the waterfall located at the north)"
              }
            },{
              "@type": "Question",
              "name": "Where does the pedicab tour start from and can I be picked up from my hotel?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "There are 2 options available for the pedicab tour. If you are reserving the tour for a future date and you are currently not in New York, coming to our store on the day of the tour will be the most convenient option. Since we are just 2 blocks away from the entrance of the park. However, if you are already in the park and would like to take the pedicab tour, then we can send the guide directly to the park and provide you with his/her information as well as GPS coordinates. There is also an option to be picked up from your hotel. However, for that you will need to contact us with more information."
              }
            },{
              "@type": "Question",
              "name": "How hard is it to bike around Central Park?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Generally speaking Central Park is easy to bike. There are only 2-3 major uphills located in the north part of the park. You don’t necessarily need to be a professional biker to make those uphills without stopping. Of course, we often walk the bikes in order to keep the group together."
              }
            },{
              "@type": "Question",
              "name": "What is the most romantic spot in Central Park?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "There are many beautiful spots in Central Park. In our opinion, Wagner Cove is on the top of the list of most romantic spots in the park. Located right next to Cherry Hill, Wagner Cover is a conveniently hidden gazebo with a stunning view of Central Park West. It is also often referred to as The Ladies’ Pavilion. This nickname comes from the fact that ladies used to change their ice skates there."
              }
            },{
              "@type": "Question",
              "name": "Is Central Park safe at night?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "New York has been through different stages. From being one of the most dangerous cities in the 80s, it is now probably the safest big metropolitan cities in the US. Central Park also remains a very safe and peaceful place. In 2019, there were only a few reported disturbances."
              }
            },{
              "@type": "Question",
              "name": "What time does Central Park open/close?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Central Park closes at 1pm and reopens again at 5pm. Keep in mind that during those 4 hours, no one is allowed in the park. You will see a few posted signs but tourists often want to check out the park at night and disregard those signs. Please try not to access the park during those hours. The police and park rangers could give you a ticket or if you are lucky just a verbal warning."
              }
            },{
              "@type": "Question",
              "name": "Do you need a permit to shoot in Central Park?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Visitors are free to film and take pictures in Central Park with any handheld equipment and there is no need for obtaining a license. However, if you are bringing equipment and/or would like to inquire about specific locations, you will need to contact the Central Park Conservancy."
              }
            }]
          }`,
  };
};

export function addTourJsonLd(tour) {
  const tourPath = tour?.slug.data.attributes.slug === 'bike-rentals' ?
    `https://centralparktours.com/${tour.slug.data.attributes.slug}` :
    `https://centralparktours.com/tours/${tour.slug.data.attributes.slug}`;

  const allPrices = [
    Number(tour.price_adult),
    Number(tour.price_adult_2h),
    Number(tour.price_adult_3h),
    Number(tour.price_adult_all_day)];

  const findStartingPrice = findMinNumber(allPrices);

  return {
    __html: `{
            "@context": "https://schema.org/", 
            "@graph": [{
            "@type": "Product", 
            "name": "${tour.slug.data.attributes.title}",
            "image": "${tour.gallery.data[0].attributes.url}",
            "description": "${tour.description}",
            "brand": {
              "@type": "Brand",
              "name": "Central Park Tours"
            },
            "offers": {
              "@type": "Offer",
              "url": "${tourPath}",
              "priceCurrency": "USD",
              "price": "${findStartingPrice}"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "${tour.rating}",
              "bestRating": "5",
              "worstRating": "1",
              "ratingCount": "${tour.reviews_count || 450}"
            },
            "review": {
              "@type": "Review",
              "name": "Johny BM",
              "reviewBody": "Me and my fiancee decided to take the pedicab tour. It was amazing experience. We had really good time around central park and our driver was so funny and knowledgeable about the park. The…",
              "reviewRating": {
                "@type": "Rating",
                "ratingValue": "5"
              },
              "author": {"@type": "Person", "name": "Johny BM"},
              "publisher": {"@type": "Organization", "name": "TripAdvisor"}
            }
        },
          {
            "@type": "BreadcrumbList", 
            "itemListElement": [{
              "@type": "ListItem", 
              "position": 1, 
              "name": "tours",
              "item": "https://centralparktours.com/tours"  
            },{
              "@type": "ListItem", 
              "position": 2, 
              "name": "pedicab-tour",
              "item": "${tourPath}"
            }]
        }
    ]
          }`,
  };
};

export function dynamicMetaData(route) {

  switch (route) {
    case '/':
      return (
        <>
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <meta name="description" content="Central Park Tours is the biggest company for guided tours in New York's Central Park. We offer bicycle tours, pedicab rides, walking tours and bicycle rentals" />
          <meta name="keywords" content="central park, bike tours, bike rentals, pedicab tours, walking tours, ny attractions, new york" />
          <meta name="geo.region" content="US-NY" />
          <meta name="geo.placename" content="New York" />
          <meta name="geo.position" content="40.7646452;-73.9822423" />
          <meta name="ICBM" content="40.7646452, -73.9822423" />
          <meta name="p:domain_verify" content="fa2b3e0c33fb4e013e4f9e6136c96a11" />
          <meta name="msvalidate.01" content="98DFA2586746E84DE25C0DD44D07B94D" />
          <meta name="ahrefs-site-verification" content="019f632f4e1c94b1e60de37e5d9b620541a7c80e2f7fcec42e21eba4b8d5dbf6" />

          <meta property="og:title" content="Central Park Tours – Bike Rentals, Bike Tours, Pedicab Tours & More" />
          <meta property="og:description" content="Central Park Tours is the biggest company for guided tours in New York's Central Park. We offer bicycle tours, pedicab rides, walking tours and bicycle rentals" />
          <meta property="og:image" content="https://strapi.centralparktours.com/uploads/bike_tour_3_eaf4c57293.webp" />
          <meta property="og:url" content="https://www.centralparktours.com/" />
          <meta name="twitter:title" content="Central Park Tours – Bike Rentals, Bike Tours, Pedicab Tours & More " />
          <meta name="twitter:description" content="Central Park Tours is the biggest company for guided tours in New York's Central Park. We offer bicycle tours, pedicab rides, walking tours and bicycle rentals " />
          <meta name="twitter:url" content="https://www.centralparktours.com" />
          <meta name="twitter:card" content="Central Park Tours is the biggest company for guided tours in New York's Central Park. We offer bicycle tours, pedicab rides, walking tours and bicycle rentals " />
        </>
      )
    case '/tours/central-park-bike-tour':
    case '/bike-rentals':
      return (
        <>
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <meta name="description" content="Central Park Tours is the biggest company for guided tours in New York's Central Park. We offer bicycle tours, pedicab rides, walking tours and bicycle rentals" />
          <meta name="keywords" content="central park, bike tours, bike rentals, pedicab tours, walking tours, ny attractions, new york" />
          <meta name="geo.region" content="US-NY" />
          <meta name="geo.placename" content="New York" />
          <meta name="geo.position" content="40.7646452;-73.9822423" />
          <meta name="ICBM" content="40.7646452, -73.9822423" />
          <meta name="p:domain_verify" content="fa2b3e0c33fb4e013e4f9e6136c96a11" />
          <meta name="msvalidate.01" content="98DFA2586746E84DE25C0DD44D07B94D" />
          <meta name="ahrefs-site-verification" content="019f632f4e1c94b1e60de37e5d9b620541a7c80e2f7fcec42e21eba4b8d5dbf6" />

          <meta property="og:title" content="Bike Tour/Rental Across Central Park – Central Park Tours" />
          <meta property="og:description" content="Our bicycle tour has been ranked as one the top 5 things to do in Central Park by TripAdvisor. It is the only tour that covers the entire length of Central Park and it provides an excellent overview of the whole park." />
          <meta property="og:image" content="https://strapi.centralparktours.com/uploads/bike_tour_1_d4287ab467.webp" />
          <meta property="og:url" content="https://www.centralparktours.com/tours/central-park-bike-tour" />
          <meta name="twitter:title" content="Bike Tour/Rental Across Central Park – Central Park Tours " />
          <meta name="twitter:description" content="Allow one of our experienced tour guides to show you the beauty of the park from the back of a pedicab. Sit down and relax while your tour guide tells you about the history of the park, architecture and interesting trivia" />
          <meta name="twitter:url" content="https://www.centralparktours.com/tours/central-park-bike-tour" />
          <meta name="twitter:card" content="https://strapi.centralparktours.com/uploads/bike_tour_1_d4287ab467.webp" />
        </>

      )
    case '/tours/central-park-pedicab-tour':
      return (
        <>
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <meta name="description" content="Central Park Tours is the biggest company for guided tours in New York's Central Park. We offer bicycle tours, pedicab rides, walking tours and bicycle rentals" />
          <meta name="keywords" content="central park, bike tours, bike rentals, pedicab tours, walking tours, ny attractions, new york" />
          <meta name="geo.region" content="US-NY" />
          <meta name="geo.placename" content="New York" />
          <meta name="geo.position" content="40.7646452;-73.9822423" />
          <meta name="ICBM" content="40.7646452, -73.9822423" />
          <meta name="p:domain_verify" content="fa2b3e0c33fb4e013e4f9e6136c96a11" />
          <meta name="msvalidate.01" content="98DFA2586746E84DE25C0DD44D07B94D" />
          <meta name="ahrefs-site-verification" content="019f632f4e1c94b1e60de37e5d9b620541a7c80e2f7fcec42e21eba4b8d5dbf6" />

          <meta property="og:title" content="Pedicab Tour Across Central Park – Central Park Tours" />
          <meta property="og:description" content="Central Park Tours is the biggest company for guided tours in New York's Central Park. We offer bicycle tours, pedicab rides, walking tours and bicycle rentals." />
          <meta property="og:image" content="https://strapi.centralparktours.com/uploads/pedicab_tour_4_d98745dc82.webp" />
          <meta property="og:url" content="https://www.centralparktours.com/tours/central-park-pedicab-tour" />
          <meta name="twitter:title" content=" Pedicab Tour Across Central Park – Central Park Tours " />
          <meta name="twitter:description" content=" Central Park Tours is the biggest company for guided tours in New York's Central Park. We offer bicycle tours, pedicab rides, walking tours and bicycle rentals " />
          <meta name="twitter:url" content=" https://www.centralparktours.com/tours/central-park-pedicab-tour" />
          <meta name="twitter:card" content=" https://strapi.centralparktours.com/uploads/pedicab_tour_4_d98745dc82.webp" />

        </>

      )

    case '/tours':
      return (
        <>
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <meta name="description" content="Central Park Tours is the biggest company for guided tours in New York's Central Park. We offer bicycle tours, pedicab rides, walking tours and bicycle rentals" />
          <meta name="keywords" content="central park, bike tours, bike rentals, pedicab tours, walking tours, ny attractions, new york" />
          <meta name="geo.region" content="US-NY" />
          <meta name="geo.placename" content="New York" />
          <meta name="geo.position" content="40.7646452;-73.9822423" />
          <meta name="ICBM" content="40.7646452, -73.9822423" />
          <meta name="p:domain_verify" content="fa2b3e0c33fb4e013e4f9e6136c96a11" />
          <meta name="msvalidate.01" content="98DFA2586746E84DE25C0DD44D07B94D" />
          <meta name="ahrefs-site-verification" content="019f632f4e1c94b1e60de37e5d9b620541a7c80e2f7fcec42e21eba4b8d5dbf6" />

          <meta property="og:title" content="All Tours Available – Central Park Tours" />
          <meta property="og:description" content="We are the leader in providing bike rentals and various tours in New York. Reserve your tour now and explore the oasis in the middle of Manhattan." />
          <meta property="og:image" content="https://strapi.centralparktours.com/uploads/pedicab_tour_1_efd89c6afa.webp" />
          <meta property="og:url" content="https://www.centralparktours.com/tours" />
          <meta name="twitter:title" content="All Tours Available – Central Park Tours" />
          <meta name="twitter:description" content=" We are the leader in providing bike rentals and various tours in New York. Reserve your tour now and explore the oasis in the middle of Manhattan." />
          <meta name="twitter:url" content="https://www.centralparktours.com/tours" />
          <meta name="twitter:card" content="https://strapi.centralparktours.com/uploads/pedicab_tour_1_efd89c6afa.webp" />
        </>

      )

    case '/attractions':
      return (
        <>
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <meta name="description" content="Central Park Tours is the biggest company for guided tours in New York's Central Park. We offer bicycle tours, pedicab rides, walking tours and bicycle rentals" />
          <meta name="keywords" content="central park, bike tours, bike rentals, pedicab tours, walking tours, ny attractions, new york" />
          <meta name="geo.region" content="US-NY" />
          <meta name="geo.placename" content="New York" />
          <meta name="geo.position" content="40.7646452;-73.9822423" />
          <meta name="ICBM" content="40.7646452, -73.9822423" />
          <meta name="p:domain_verify" content="fa2b3e0c33fb4e013e4f9e6136c96a11" />
          <meta name="msvalidate.01" content="98DFA2586746E84DE25C0DD44D07B94D" />
          <meta name="ahrefs-site-verification" content="019f632f4e1c94b1e60de37e5d9b620541a7c80e2f7fcec42e21eba4b8d5dbf6" />

          <meta property="og:title" content="Attractions – Central Park Tours" />
          <meta property="og:description" content="Below you will find a list of all major attractions located in Central Park. Each attractions is ranked by popularity and accessibility. You will also find various interesting facts about Central Park and small tips and tricks." />
          <meta property="og:image" content="https://strapi.centralparktours.com/uploads/alice_in_wonderland_2_4f21f20214.jpg" />
          <meta property="og:url" content="https://www.centralparktours.com/attractions" />
          <meta name="twitter:title" content="Attractions – Central Park Tours" />
          <meta name="twitter:description" content="Below you will find a list of all major attractions located in Central Park. Each attractions is ranked by popularity and accessibility. You will also find various interesting facts about Central Park and small tips and tricks." />
          <meta name="twitter:url" content="https://www.centralparktours.com/attractions" />
          <meta name="twitter:card" content="https://strapi.centralparktours.com/uploads/alice_in_wonderland_2_4f21f20214.jpg" />

        </>

      )

    default:
      return (
        <>
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <meta property="og:title" content="Central Park Tours – Bike Rentals, Bike Tours, Pedicab Tours & More" />
          <meta name="description" content="Central Park Tours is the biggest company for guided tours in New York's Central Park. We offer bicycle tours, pedicab rides, walking tours and bicycle rentals" />
          <meta name="keywords" content="central park, bike tours, bike rentals, pedicab tours, walking tours, ny attractions, new york" />
          <meta name="geo.region" content="US-NY" />
          <meta name="geo.placename" content="New York" />
          <meta name="geo.position" content="40.7646452;-73.9822423" />
          <meta name="ICBM" content="40.7646452, -73.9822423" />
          <meta name="p:domain_verify" content="fa2b3e0c33fb4e013e4f9e6136c96a11" />
          <meta name="msvalidate.01" content="98DFA2586746E84DE25C0DD44D07B94D" />
          <meta name="ahrefs-site-verification" content="019f632f4e1c94b1e60de37e5d9b620541a7c80e2f7fcec42e21eba4b8d5dbf6" />
        </>
      )

  }
}

export const aboutData = {
  data: {
    id: 1,
    attributes: {
      subtitle: "We are thrilled to introduce you to one of the world’s most beautiful parks - Central Park.",
      main_content: "Established in 2003, our company has been the leader in providing bike rentals and various tours in Central Park. We offer pedicab tours, bicycle tours, bike rentals, picnic arrangements and horse and carriage rides.\n\n Feel free to take advantage of our attractions page, where you can find a detailed Central Park map, top things to do in Central Park and of course get access to our award winning self-guided audio tour of Central Park.",
      italic: "Wondering exactly how big is Central Park? Where is the Central Park zoo located at? Or maybe just looking for interesting facts about the park? Please make sure you check out our blog!\n",
      contact_info: "Feel free to shoot us a message if you have any\n questions about the park or the services that we offer.\n We can also help with arrangements for picnic in\n Central Park, special events, weddings, boating in\n Central Park and many more!",
      address: "Fancy Apple Bike Store \n 870 7th Ave, New York, NY, 10019",
      phone: "Office - (347) 746 - 8687",
      get_directions: "https://goo.gl/maps/1QDYzUAbTWbSxe4e6",
      header_subtitle: "The leader in providing bike rentals and various tours in New York.\nReserve your tour now and explore the oasis in the middle of Manhattan.",
      createdAt: "2022-12-31T08:55:39.294Z",
      updatedAt: "2022-12-31T09:07:18.039Z",
      publishedAt: "2022-12-31T08:55:40.837Z",
      img: {
        data: {
          id: 9,
          attributes: {
            name: "strawberry-fields.webp",
            alternativeText: "strawberry-fields.webp",
            caption: "strawberry-fields.webp",
            width: 508,
            height: 508,
            formats: {
              thumbnail: {
                name: "thumbnail_strawberry-fields.webp",
                hash: "thumbnail_strawberry_fields_2cc50c28db",
                ext: ".webp",
                mime: "image/png",
                path: null,
                width: 156,
                height: 156,
                size: 64.93,
                url: "/uploads/thumbnail_strawberry_fields_2cc50c28db.webp"
              },
              small: {
                name: "small_strawberry-fields.webp",
                hash: "small_strawberry_fields_2cc50c28db",
                ext: ".webp",
                mime: "image/png",
                path: null,
                width: 500,
                height: 500,
                size: 554.03,
                url: "/uploads/small_strawberry_fields_2cc50c28db.webp"
              }
            },
            hash: "strawberry_fields_2cc50c28db",
            ext: ".webp",
            mime: "image/png",
            size: 134.42,
            url: "/uploads/strawberry_fields_2cc50c28db.webp",
            previewUrl: null,
            provider: "local",
            provider_metadata: null,
            createdAt: "2022-12-28T20:01:40.796Z",
            updatedAt: "2022-12-28T20:01:40.796Z"
          }
        }
      }
    }
  },
  meta: {}
}