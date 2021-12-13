function CreateComponentDetailesRow({component}) {
    return (
        <ul>
            <li>{component.name}</li>
            <li>{component.selected.TYPE}</li>
            <li>{component.selected.PRICE}</li>
            <li><img width="100px" src={component.selected.IMG} alt="selected_component_image"></img></li>
        </ul>
    )
}

export default CreateComponentDetailesRow