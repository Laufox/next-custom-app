import {updateEntry} from '@/api/manageContentful'

const EditField = ({section, contentType, onUpdate}) => {

    console.log('ct: ', contentType)

    return (
        <div>
            {
                contentType.fields.map(field => (
                    <div>
                        {
                            field.type === 'Link' && field.linkType === "Asset" && (
                                <div>
                                    <img src={'https:' + section.fields[field.id].fields.file.url} />
                                </div>
                            )
                        }
                        {
                            field.type === 'Symbol' && (
                                <div>
                                    <h5>{field.name}</h5>
                                    <input 
                                        type='text' 
                                        defaultValue={section.fields[field.id]}
                                        onChange={async (e) => {
                                            console.log(e.target.value)
                                            await updateEntry(section.sys.id, field.id, e.target.value)
                                            onUpdate(section.sys.id)
                                        }}
                                    />
                                </div>
                            )
                        }
                        {
                            field.type === "Array" && field.items.linkType === "Entry" && (
                                <div>
                                    <h5>{field.name}</h5>
                                    {
                                        section.fields[field.id].map(item => (
                                            <p>hej</p>
                                        ))
                                    }
                                </div>
                            )
                        }
                    </div>
                    
                ))
            }
            
        </div>
    )

}

export default EditField