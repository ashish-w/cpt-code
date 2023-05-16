const handleError = (error) => ({ error });

export const createApi = (baseUrl) => {
    const getJson = async (path) =>
        await fetch(`${baseUrl}${path}`).then((res) => res.json());

    // const getPostsJson = async () => {
    //     return Promise.all([
    //         await fetch(`https://www.centralparktours.net/blog/ghost/api/v3/content/posts/?key=d0f43d7dd165f96b5a288cd583&filter=tags:tours&limit=5`).then(res => res.json()),
    //         await fetch(`https://www.centralparktours.net/blog/ghost/api/v3/content/posts/?key=d0f43d7dd165f96b5a288cd583&filter=tags:events&limit=5`).then(res => res.json()),
    //         await fetch(`https://www.centralparktours.net/blog/ghost/api/v3/content/posts/?key=d0f43d7dd165f96b5a288cd583&filter=tags:things-to-do&limit=5`).then(res => res.json()),
    //     ]).then(data => ({ latestPosts: data }))
    // }

    return {
        getFeaturedToursData: () => getJson('/about?populate=img,tours.gallery,tours.slug')
            .catch(handleError),

        getTourPageData: () => getJson('/tours?populate=gallery,top_attractions.img,reviewers,faqs,slug')
            .catch(handleError),

        getAllToursData: () => getJson('/tours?populate=gallery,slug')
            .catch(handleError),

        getAboutData: () => getJson('/about')
            .catch(handleError),

        getAttractions: () => getJson('/attractions?populate=image&pagination[start]=1&pagination[limit]=33')
            .catch(handleError),

        getToursSlug: () => getJson('/slugs')
            .catch(handleError),

        getFaqs: () => getJson('/faqs')
            .catch(handleError),

        // getLatestPosts: () => getPostsJson()
        //     .catch(handleError)

        // getAllToursData: () => getJson('/api/about?populate=img,tours.gallery,tours.top_attractions.img,tours.reviewers.img,tours.faqs,tours.slug')
        //     .catch(handleError),

    };
};

export default createApi('https://strapi.centralparktours.com/api');