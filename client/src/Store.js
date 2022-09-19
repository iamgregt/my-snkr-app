function Store({stores}){
    return(
        <>
        {stores.map((s) => {
            return(<>
                <h2>{s.name}</h2>
                <ul>
                    {s.shoes.map((k) => {
                        return(
                        <li>{k.brand}</li>
                        )
                    })}
                </ul>
                </>
            )
        })}
        </>
    )
}
export default Store