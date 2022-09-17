
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';




function DonateShoe({users, shoe}){

    function handleUpdate(e){
        e.preventDefault()
        console.log(e)
        console.log(shoe)
        console.log(users)
        const updatedShoe = {
            user_id: e.target[0].value
        }
        fetch(`/shoes/${shoe.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedShoe)
        })
        .then(r => r.json())
        .then(data => console.log(data))
    }
    

    return(
        <>
        <Form onSubmit={handleUpdate}>
                    <Form.Group className="mb-3">
                      <Form.Select aria-label="Default select example">
          <option>Choose a user</option>

          {users.map((u) => <option value={u.id}>{u.username}</option>)}
        </Form.Select>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                  </Form>
        </>
      )


}

export default DonateShoe