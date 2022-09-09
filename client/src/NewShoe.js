import { useState } from "react"
import { storage } from "./firebase"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { uuidv4 } from "@firebase/util"


function NewShoe({user, setImageList}){
    const [imageUpload, setImageUpload] = useState(null)

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
    )
}

export default NewShoe