import './HomePage.css'
import {motion} from "framer-motion/dist/framer-motion"
import { useState } from 'react'


function HomePage(){
    const [rotate, setRotate] = useState(false)

    return(
        <div className='homepage'>
            <motion.h1 animate={{rotate: rotate ? 360 : 0}} transition={{type: "tween", duration: 5}} onClick={() => setRotate(!rotate)}>Welome to MySneakers</motion.h1>
        </div>
    )
}

export default HomePage