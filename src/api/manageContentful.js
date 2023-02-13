import {createClient} from 'contentful-management'

const getEnvironment = async () => {

    const client = createClient({
        accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_MANAGEMENT_KEY
    })

    console.log("client: ", client)

    const space = await client.getSpace(process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID)

    const environment = await space.getEnvironment(process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT)

    return environment

}

export const updateEntry = async (entryId, field, newContent) => {

    const environment = await getEnvironment()

    const entry = await environment.getEntry(entryId)

    console.log("entry: ", entry)

    const newEntry = await entry.patch([
        {
            op: 'replace',
            path: `/fields/${field}/en-US`,
            value: newContent
        }
    ])

}

export const publishEntries = async (arrOfEntries) => {

    if(!arrOfEntries.length) {
        return
    }

    const environment = await getEnvironment()

    arrOfEntries.forEach(async (entryId) => {

        const entryTarget = await environment.getEntry(entryId)

        await entryTarget.publish()

    })

}

// export const getOneEntry = async (entryId) => {

//     const client = createClient({
//         accessToken: process.env.CONTENTFUL_MANAGEMENT_KEY
//     })

//     const environment = await (await client.getSpace(process.env.CONTENTFUL_SPACE_ID)).getEnvironment(process.env.CONTENTFUL_ENVIRONMENT)

//     return await environment.getEntry(entryId, {
//         include: 10
//     })
// }