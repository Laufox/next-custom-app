import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import {getOneEntry, updateEntry, publishEntries} from '@/api/manageContentful'
import {getOnePage, getAllContentTypes, getAllAssets} from '@/api/deliverContentful'
import Hero from '@/components/Hero'
import CardSection from '@/components/CardSection'
import {createElement, useState, useEffect} from 'react'
import EditField from '@/components/EditField'
import EditHero from '@/components/EditHero'

const components = {
  hero: Hero,
  cardSection: CardSection
}

const editComponents = {
  hero: EditHero
}

export const getServerSideProps = async () => {

  const page = await getOnePage('/')
  const contentTypes = await getAllContentTypes()

  console.log("Here is the page: ", page)

  return {
    props: {
      page,
      contentTypes,
      assets: await getAllAssets()
    }
  }

}

export default function Home({page, contentTypes, assets}) {
  console.log(page)
  console.log('content types: ', contentTypes)
  console.log("assets: ", assets)
  const topSection = page.fields.topSection
  const mainSections = page.fields.mainSection
  const bottomSection = page.fields.bottomSection
  const assetImages = assets.items.filter(item => item.fields.file.contentType.includes('image'))
  console.log("images: ", assetImages)

  const [entriesToPublish, setEntriesToPublish] = useState([])

  const addEntryToPublish = (newId) => {
    if(entriesToPublish.includes(newId)) {
      return
    }
    setEntriesToPublish([...entriesToPublish, newId])
  }

  useEffect(() => {
    console.log(entriesToPublish)
  }, [entriesToPublish])

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='flex'>
        <aside className='basis-96 bg-zinc-500 shrink-0 p-2'>
          <h2>Page: {page.fields.slug}</h2>

          <h3>Top section: </h3>
          
          <h3>Main section: </h3>
          {
            !!mainSections.length && mainSections.map(section => (
              <>
              {
                section.sys.contentType.sys.id === "hero" && createElement(editComponents[section.sys.contentType.sys.id], {
                  hero: section,
                  contentType: contentTypes.items.find(item => item.sys.id === section.sys.contentType.sys.id),
                  key: section.sys.id,
                  onUpdate: addEntryToPublish
                })
              }
              <h4 key={section.sys.id}>{section.sys.contentType.sys.id}</h4>
              {/* <EditField 
                section={section} 
                contentType={contentTypes.items.find(item => item.sys.id === section.sys.contentType.sys.id)}
                onUpdate={addEntryToPublish}
              /> */}
              </>
            ))
          }

          <h3>Bottom section: </h3>
          <div>
            <button onClick={() => {
              if (!entriesToPublish.length) {
                return
              }
              publishEntries(entriesToPublish)
              setEntriesToPublish([])
            }}>Publish</button>
          </div>
        </aside>
        <main className="grow">
          
          <header className='bg-blue-600'>
            <img src={'https:' + topSection.fields.logo.fields.image.fields.file.url} />
            <nav>
              {
                topSection.fields.menu.fields.links.map(link => 
                  <Link href={link.fields.url} key={link.sys.id}>{link.fields.text}</Link>
                )
              }
            </nav>
          </header>

          <main>
              {
                mainSections.map((section) => {
                  return createElement(components[section.sys.contentType.sys.id], {
                    section,
                    key: section.sys.id,
                    onUpdate: addEntryToPublish
                  })
                })
              }
          </main>
          
          <footer>
            <p>{bottomSection.fields.text}</p>
            <div>
              {
                bottomSection.fields.socials.fields.medias.map(media => (
                  <Link href={media.fields.url} key={media.sys.id}>
                    <img src={'https:' + media.fields.logo.fields.file.url} />
                  </Link>
                ))
              }
            </div>
          </footer>
        </main>
      </div>
    </>
  )
}
