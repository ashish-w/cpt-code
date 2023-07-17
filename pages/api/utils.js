
export const calculateTotalPrice = (props) => {

    const { count, tourData } = props;

    const {
        duration, baskets, locks, adults, kids, discount, total
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
        price_locks,
        price_baskets,
        tax_rate
    } = tourData;

    let subtotalPrice;
    let totalPrice;
    let taxPrice;
    let pricePerDuration = [];
    const taxRate = tax_rate ?? 8.875 / 100;

    switch (duration) {
        case 1: pricePerDuration = [price_adult || 0, price_kid || 0];
            break;
        case 2: pricePerDuration = [price_adult_2h || 0, price_kid_2h || 0];
            break;
        case 3: pricePerDuration = [price_adult_3h || 0, price_kid_3h || 0];
            break;
        case 4: pricePerDuration = [price_adult_all_day || 0, price_kid_all_day || 0];
            break;
    }

    subtotalPrice = (adults * pricePerDuration[0]) +
        (kids * pricePerDuration[1]) +
        (baskets * price_baskets || 0) +
        (locks * price_locks || 0);

    totalPrice = subtotalPrice + (subtotalPrice * taxRate);
    taxPrice = subtotalPrice * taxRate;
    let discountedPrice = totalPrice - (totalPrice * discount / 100);

    if (discountedPrice === total) {
        return { isCorrectCalculation: true };
    } else {
        return { isCorrectCalculation: false };
    }
};
