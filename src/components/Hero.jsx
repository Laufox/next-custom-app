import {updateEntry} from '@/api/manageContentful'

const Hero = ({section, onUpdate}) => {

    console.log("Hero section: ", section)

    return (
        <div>
            <img src={'https:' + section.fields.image.fields.file.url} />
            <h1 className=' bg-slate-500 text-7xl' contentEditable suppressContentEditableWarning onBlur={async (e)=>{
                console.log(section)
                await updateEntry(section.sys.id, "title", e.target.textContent)
                onUpdate(section.sys.id)
            }}>{section.fields.title}</h1>
            <h2>{section.fields.subheading}</h2>
            <button>{section.fields.cta}</button>
        </div>
    )

}

export default Hero