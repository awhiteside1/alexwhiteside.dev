export const filterDrafts =  ({ data }: {data:any}) => {
    return import.meta.env.PROD ? data.draft !== true : true;
}