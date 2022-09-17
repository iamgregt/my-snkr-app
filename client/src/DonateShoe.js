
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';




function DonateShoe({users, handleUpdate }){

    

    return(
        <>
        <Form onSubmit={handleUpdate}>
                    <Form.Group className="mb-3">
                      <Form.Select aria-label="Default select example">
          <option>Choose a user</option>

          {users.map((u) => <option value={u.username}>{u.username}</option>)}
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