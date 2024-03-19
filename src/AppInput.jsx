
function AppInput(
    {
        propsName,
        propsType,
        propsPlaceholder,
        inputHandler
    }
){
    return(
        <input type={propsType} onInput={inputHandler} placeholder={propsPlaceholder} name={propsName} />
    )
}

export default AppInput