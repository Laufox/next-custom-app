import {createClient} from 'contentful'

const getClient = () => {

    return createClient({
        space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
        environment: process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT,
        accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN
    })

}

export const getOnePage = async (slug) => {

    const client = getClient()

    const page = await client.getEntries({
        content_type: 'page2',
        'fields.slug': slug,
        include: 10
    })

    return page.items[0]

}

export const getAllContentTypes = async () => {

    const client = getClient()

    return await client.getContentTypes()

}

export const getAllAssets = async () => {

    const client = getClient()

    return await client.getAssets()

}