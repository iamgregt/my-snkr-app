import { useState } from "react"
import { storage } from "./firebase"
import { getDownloadURL, ref, uploadBytes, updateMetadata } from "firebase/storage"
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
                <Form onSubmit={handleSubmit}>
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
                  <Form.Label>What Size?</Form.Label>
                  <Form.Control type="number" placeholder="enter shoe size" />
                </Form.Group>
                <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Default file input example</Form.Label>
        <Form.Control type="file" onChange={e => setImageUpload(e.target.files[0])} />
      </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Want to resell?" />
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
        console.log(imageUpload)

        
        if(imageUpload) {
        const metaData = 
        { 
            customMetadata : {"user_id": user.id}
        }

        
        const imageRef = ref(storage, `SneakerImages/${imageUpload.name + uuidv4()}`)
         uploadBytes(imageRef, imageUpload).then((snapshot) => {
            alert("Image Uploaded")
            getDownloadURL(snapshot.ref).then((url) => {
                setImageList((prev) => [...prev, url])
            })
        })

        setTimeout(() => {
            updateMetadata(imageRef, metaData)
            .then((metadata) => {
                console.log(metadata)
            }).catch((error) => {
                console.log(error)
            })
        }, 3000)

    }


        const shoe = {
            brand: `${e.target[0].value} ${e.target[1].value}`,
            size: e.target[2].value,
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