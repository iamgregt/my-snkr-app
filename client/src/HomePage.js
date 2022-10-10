import './HomePage.css'
import {motion} from "framer-motion/dist/framer-motion"
import { useState } from 'react'


function HomePage(){


    const [rotate, setRotate] = useState(false)

    const container2 = {
        hidden: { opacity: 1, scale: 0 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: {
            delayChildren: 0.3,
            staggerChildren: 0.2
          }
        }
      }

      const item = {
        hidden: { y: 20, opacity: 0 },
        visible: {
          y: 0,
          opacity: 1
        }
      };

    return(
        <div className='homepage'>
            <motion.h1 animate={{rotate: rotate ? 360 : 0}} transition={{type: "tween", duration: 5}} onClick={() => setRotate(!rotate)}>Welome to MySneakers</motion.h1>
            <motion.ul
    className="container2"
    variants={container2}
    initial="hidden"
    animate="visible"
  >
    {[0, 1, 2, 3].map((index) => (
      <motion.li key={index} className="item" variants={item} />
    ))}
  </motion.ul>
        </div>
    )
}

export default HomePage