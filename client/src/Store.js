function Store({stores}){



    return(
        <>
        {stores.map((s) => {
            return(<>
                <h2>{s.name}</h2>
                <ul>
                    {s.shoes.filter((i => i.for_sale === true)).map((k) => {
                        return(
                            <div>
                        <li>{k.brand}</li>
                        <img src={k.firebase} />
                        </div>
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