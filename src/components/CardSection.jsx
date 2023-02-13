import {updateEntry} from '@/api/manageContentful'

const CardSection = ({section, onUpdate}) => {

    console.log("Card section", section)

    return (
        <div>
            {
                section.fields.cards.map(card => (
                    <div key={card.sys.id}>
                        <img src={'https:' + card.fields.image.fields.file.url} />
                        <h3 contentEditable suppressContentEditableWarning onBlur={async (e)=>{
                            console.log(section)
                            await updateEntry(card.sys.id, "title", e.target.textContent)
                            onUpdate(card.sys.id)
                        }}>{card.fields.title}</h3>
                        <h4>{card.fields.subheading}</h4>
                        {
                            card.fields.url && <a href={card.fields.url}>Go to</a>
                        }
                    </div>
                ))
            }
        </div>
    )

}

export default CardSection