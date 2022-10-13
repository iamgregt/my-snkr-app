import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'
import './Store.css'


function Store({stores, setStores}){

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
    }).then(r => r.json())
    .then(data => {
      console.log(data)
      setStores(prev => [...prev, newStore])
    })
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
    <CardGroup>
        {stores.map((s) => {
            console.log(s)
            return(                   
            <div key={s.id} className="storeCard">
            
            <Card style={{ width: '18rem' }}>
            <Card.Img className='storepic' variant="top" src={s.logo ? s.logo : "https://i.postimg.cc/LsxDkVMd/logohere.png" } />
            <Card.Body>
                  <Card.Title>{s.name}</Card.Title>
                  </Card.Body>
                  <Card.Body>
                  <Card.Title>{s.summary}</Card.Title>
                  </Card.Body>
                  <Card.Body>
                  <Card.Title>{s.summary2}</Card.Title>
                  </Card.Body>
            </Card>
            
            </div>
              
            )
        })}
        </CardGroup>
        </>
    )
}
export default Store