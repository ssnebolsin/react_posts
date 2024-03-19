function AppButton({value, clickHandler}){
    return(
        <button onClick={()=>{clickHandler()}}>
            {value}
      </button>
    )
}

export default AppButton