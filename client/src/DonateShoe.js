
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';




function DonateShoe({show, setShow, users, shoe, user, update, setUpdate, clearImageState, setShoeList, shoeList, shoes}){

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
        .then(data => {
            console.log(data)
            setUpdate(!update)
            setShoeList(shoes)
            setShow(!show)
            alert(`Look at how nice you are! You've donated your ${shoe.brand}`)
            const shoeImg = document.getElementById(shoe.id)
            shoeImg.remove()
        })
    }
    

    return(
        <>
        <Form onSubmit={handleUpdate}>
                    <Form.Group className="mb-3">
                      <Form.Select aria-label="Default select example">
          <option>Choose a user</option>

          {users.filter((usr => usr.id !== user.id)).map((u) => <option value={u.id}>{u.username}</option>)}
        </Form.Select>
                    </Form.Group>
                    <Button variant="secondary" onClick={() => setUpdate(!update)}>
                      Close
                    </Button>
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                  </Form>
        </>
      )


}

export default DonateShoe