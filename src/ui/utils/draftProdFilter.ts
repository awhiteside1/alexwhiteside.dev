export const filterDrafts = ({
    data,
}: {
    data: { draft: boolean | unknown }
}) => {
    return import.meta.env.PROD ? data.draft !== true : true
}
