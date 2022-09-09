import { useState } from "react"
import { storage } from "./firebase"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { uuidv4 } from "@firebase/util"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';



function NewShoe({user, setImageList}){
    const [imageUpload, setImageUpload] = useState(null)
    const [isJordan, setIsJordan] = useState(false)


    function handleNewJordan(e){
        e.target.value == "Jordan" ? setIsJordan(true) : setIsJordan(false)
        
    }
    
    
    
    function newShoeForm() {
            return(
                <>
                <h2>Got a new pair?</h2>
                <h3>Go ahead and add them to your closet!</h3>
                <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Select aria-label="Default select example" onChange={handleNewJordan}>
      <option>Select a brand</option>
      <option value="Jordan">Jordan</option>
      <option value="Nike">Nike</option>
      <option value="Puma">Puma</option>
      <option value="Addidas">Addidas</option>
    </Form.Select>
    {isJordan ? <><Form.Control type="number" placeholder="Which Release?" /></>: null}
                  <Form.Text className="text-muted">
                    Jordan, Nike, Puma, Addidas...whatcha got?!
                  </Form.Text>
                </Form.Group>
          
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
              </>
            )
        }

    function handleSubmit(e){
        e.preventDefault()
        console.log(e)

        const imageRef = ref(storage, `SneakerImages/${imageUpload.name + uuidv4()}`)
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            alert("Image Uploaded")
            getDownloadURL(snapshot.ref).then((url) => {
                setImageList((prev) => [...prev, url])
            })
        })

        const shoe = {
            brand: e.target[0].value,
            size: e.target[1].value,
            user_id: 1
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
        <>
        {newShoeForm()}
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
  <input type="file" onChange={e => setImageUpload(e.target.files[0])} />
  <input type="submit" value="Submit" />
</form>
</>
    )
}

export default NewShoe