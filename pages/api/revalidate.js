import api from "hooks/api/api"

export default async function handler(req, res) {
  // Check for secret to confirm this is a valid request
  if (req.query.key !== process.env.REVALIDATION_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  try {

    switch (req.body.model) {

      case 'tour':
      case 'top-attraction':
      case 'reviewer':
      case 'faq':

        await res.revalidate(`/`)
        await res.revalidate(`/tours`)
        await res.revalidate(`/bike-rentals`)
        await res.revalidate(`/faq`)

        api.getToursSlug().then(({ data, error }) => {

          Promise.all(data.filter(el => el.attributes.display_name).map(async (slug) => {
            await res.revalidate(`/tours/${slug.attributes.slug}`);
          }))

        });
        break;

      case 'slug':
      case 'about':

        await res.revalidate(`/`)
        await res.revalidate(`/tours`)
        await res.revalidate(`/bike-rentals`)
        await res.revalidate(`/faq`)
        await res.revalidate(`/attractions`)

        api.getToursSlug().then(({ data }) => {

          Promise.all(data.filter(el => el.attributes.display_name).map(async (slug) => {
            await res.revalidate(`/tours/${slug.attributes.slug}`);
          }))

        });

        api.getAttractions().then(({ data }) => {

          Promise.all(data.map(async (attraction) => {
            await res.revalidate(`/attractions/${attraction.attributes.attraction_url}`);
          }))

        });

        break;

      case 'attraction':

        await res.revalidate(`/attractions`)
        await res.revalidate(`/attractions/${req.body.entry.attraction_url}`)
        break;
    }

    return res.json({ revalidated: true })

  } catch (err) {

    return res.status(500).send('Error revalidating')
  }
}