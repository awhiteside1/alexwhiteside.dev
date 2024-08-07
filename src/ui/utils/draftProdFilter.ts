export const filterDrafts = ({
    data,
}: {
    data: { draft: boolean | unknown }
}) => {
    return import.meta.env.PROD ? data.draft !== true : true
}



export const filterFeatured = ({
    data,
}: {
    data: { featured: boolean | unknown }
}) => {
    return data.featured === true
}