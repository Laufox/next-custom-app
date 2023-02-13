import {updateEntry} from '@/api/manageContentful'
import {getAllAssets} from '@/api/deliverContentful'
import {useState, useEffect} from 'react'

const EditHero = ({hero, contentType, onUpdate}) => {

    // const images = getAllAssets()

    const [images, setImages] = useState([])
    const [openModal, setOpenModal] = useState(false)

    console.log("first", images)

    console.log("hero section: ", hero)
    console.log("hero ct: ", contentType)

    useEffect(() => {

        const getAllIMages = async () => {
            const assets = await getAllAssets()
            setImages(assets.items.filter(item => item.fields.file.contentType.includes('image')))
        }
        getAllIMages()

    }, [])

    useEffect(()=>{

        console.log("images", images)

    }, [images])

    return (
        <>
            <p>Image</p>
            <img src={'https:' + hero.fields.image.fields.file.url} onClick={() => {setOpenModal(true)}} />
            <p>Title</p>
            <input 
                type='text'
                defaultValue={hero.fields.title}
                onChange={async (e) => {
                    console.log(e.target.value)
                    await updateEntry(hero.sys.id, 'title', e.target.value)
                    onUpdate(hero.sys.id)
                }}
            />
            <p>Subheading</p>
            <input 
                type='text'
                defaultValue={hero.fields.subheading}
                onChange={async (e) => {
                    console.log(e.target.value)
                    await updateEntry(hero.sys.id, 'subheading', e.target.value)
                    onUpdate(hero.sys.id)
                }}
            />
            <p>CTA</p>
            <input 
                type='text'
                defaultValue={hero.fields.cta}
                onChange={async (e) => {
                    console.log(e.target.value)
                    await updateEntry(hero.sys.id, 'cta', e.target.value)
                    onUpdate(hero.sys.id)
                }}
            />

            {
                openModal && (
                    <div 
                        className='absolute top-0 left-0 z-50 bg-white border border-amber-600 w-80 ml-8 mt-12 rounded p-2 flex flex-wrap gap-3' 
                        onClick={(e)=>{
                            e.stopPropagation()
                            setOpenModal(false)
                        }}
                    >
                        {
                            images.length && images.map(image => (
                                <div className='w-16 border'>
                                    <img src={'https:' + image.fields.file.url} onClick={(e) => {
                                        e.stopPropagation()
                                        console.log('Hello :)')
                                    }}
                                    />
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </>
    )
}

export default EditHero