import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'


function Store({stores}){

  function handleSubmit(e){
    e.preventDefault()
    console.log(e)
    const newStore = {
      name: e.target[0].value
    }

    fetch('/stores', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newStore)
    }).then(r => r.json()).then(data => console.log(data))
  }



    return(
        <>
        <h2>Add A Store?</h2>
         <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicText">
        <Form.Label>Store Name</Form.Label>
        <Form.Control type="text" placeholder="Enter Store Name" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
        {stores.map((s) => {
            console.log(s)
            return(<>
                <h2>{s.name}</h2>
                <h3>Users That Have Shoes From Here</h3>
                <ul>
                  {s.users.map((u) => {return (
                    <li>{u.username}</li>
        )})}
                </ul>

                </>
            )
        })}
        </>
    )
}
export default Store