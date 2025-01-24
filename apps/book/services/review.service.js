export const reviewService = {
    getEmptyReview,
}

function getEmptyReview(fullname='', rating='', readAt='') {
    return { fullname, rating, readAt }
}