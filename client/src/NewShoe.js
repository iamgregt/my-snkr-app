import { useState } from "react"
import { storage } from "./firebase"
import { getDownloadURL, ref, uploadBytes, updateMetadata } from "firebase/storage"
import { uuidv4 } from "@firebase/util"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';



function NewShoe({user, setImageList, shoeList, setShoeList, renderShoe}){
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
          console.log(snapshot)

          // const newObj = {
          //   url: getDownloadURL(snapshot.ref).then(r => r),
          //   path: snapshot.ref._location.path_,
          //   name: snapshot.metadata.name
          // }          // console.log(newObj)

            // setTestObj(current => [...current, newObj ])

            alert("Image Uploaded")
            getDownloadURL(snapshot.ref).then((url) => {
               
                setImageList((prev) => [...prev, url])
                
                
                const shoe = {
                  brand: `${e.target[0].value} ${e.target[1].value}`,
                  size: isJordan ? e.target[2].value : e.target[1].value,
                  user_id: user.id,
                  image: snapshot.ref._location.path_,
                  firebase: url
                  
              }

              // setShoeList((prev) => [...prev, shoe])
              

             

              

                fetch('/shoes', {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json"
                  },
                  body: JSON.stringify(shoe)
              })
              .then(r => r.json()).then(newShoe => {
                shoe.id = newShoe.id
                console.log(newShoe)
                renderShoe(shoe)
              

              })
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






    

        
    }


    return(
        <>
        {newShoeForm()}
</>
    )
}

export default NewShoe