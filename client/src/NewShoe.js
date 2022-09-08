function NewShoe({user}){

    function handleSubmit(e){
        e.preventDefault()
        console.log(e)

        const shoe = {
            brand: e.target[0].value,
            size: e.target[1].value,
            user_id: user.id
        }

        fetch('/shoes', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(shoe)
        })
        .then(r => r.json()).then(newShoe => console.log(newShoe))
    }


    return(
        <form onSubmit={handleSubmit}>
  <label>Brand</label>
  <select>
    <option value={1}>Jordan</option>
    <option value={2}>Nike</option>
    <option value={3}>Puma</option>
    <option value={4}>Reebok</option>
  </select>
  <label>Size</label>
  <input type="number"></input>
  <input type="submit" value="Submit" />
</form>
    )
}

export default NewShoe