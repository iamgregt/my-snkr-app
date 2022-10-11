import './HomePage.css'
import {motion} from "framer-motion/dist/framer-motion"
import { useState } from 'react'
import shoepic from './assets/shoepic.png'
import Login from './Login';



function HomePage({user, setUser}){


    const [rotate, setRotate] = useState(false)

    const container2 = {
        hidden: { opacity: 1, scale: 0 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: {
            delayChildren: 1,
            staggerChildren: 0.35
          }
        }
      }

      const item = {
        hidden: { y: 20, opacity: 0 },
        visible: {
          y: 0,
          opacity: 1,
          transition: {
            duration: 0.6,
            ease: [0.43, 0.13, 0.23, 0.96]
          }
        }

      };
      const pageMotion = {
        initial: { opacity: 0, x: 0 },
        animate: { opacity: 1, x: 100, transition: { duration: 2 } },
        exit: { opacity: 0, x: 0, transition: { duration: 2 } }
      };
    

      const homepicContainer = {
        hidden: { opacity: 0, y: 400 },
        show: {
            y: 0,
          opacity: 1,
          transition: {
            delayChildren: 0
          }
        },
        exit: {opacity: 0, transition: {duration: 2}}
      }

      const homepic = {
        hidden: {opacity: 0, y: 200, scale: 0.25},
        show: {scale: 1, opacity: 1, y: 0, transition: {duration: 2.65}}
        
      }


      if(!user) return <Login onLogin={setUser} />

    return(
      <div className='homepage'>  
        <motion.div  initial="initial"
        animate="animate"
        exit="exit"
        variants={pageMotion}>
      {/* <motion.h1 animate={{rotate: rotate ? 360 : 0}} transition={{type: "tween", duration: 5}} onClick={() => setRotate(!rotate)}>Welome to MySneakers</motion.h1> */}
      {/* <motion.ul
className="container2"
variants={container2}
initial="hidden"
animate="visible"
>
{[0, 1, 2, 3].map((index) => (
<motion.li key={index} className="item" variants={item} />
))}
</motion.ul> */}
 <div className='container1'>
 <motion.ul variants={container2}
initial="hidden"
animate="visible">
 <a href='/shoepage'>
 <motion.img whileHover={{scale: 1.2}} variants={item}  src={"https://firebasestorage.googleapis.com/v0/b/mysnkrapp.appspot.com/o/SneakerImages%2Fjordan7.pngfd018d88-c466-4953-add0-0d8b05d218b2?alt=media&token=17cfad06-b3be-43fc-91cc-7ef951c49c54"} />
<motion.img whileHover={{scale: 1.2}} variants={item} src={"https://firebasestorage.googleapis.com/v0/b/mysnkrapp.appspot.com/o/SneakerImages%2Fpollen.pngad3c3f52-6f60-4e44-b158-ca3082c7103b?alt=media&token=2858b20e-4fb5-482a-8685-734b867aa454"} />
<motion.img whileHover={{scale: 1.2}} variants={item} src={"https://firebasestorage.googleapis.com/v0/b/mysnkrapp.appspot.com/o/SneakerImages%2Fflint.pngb6ce6f02-aff0-456d-b58c-382b44dafed8?alt=media&token=6081844f-7ecc-40b8-b9dc-eff227efc2fa"} />
<motion.img whileHover={{scale: 1.2}} variants={item} src={"https://firebasestorage.googleapis.com/v0/b/mysnkrapp.appspot.com/o/SneakerImages%2Fjordan_1_blacktoe.png4c20b559-73dd-4fdb-b285-a6f07267456b?alt=media&token=d45b5997-ee89-49e2-b8a6-ccef1733691e"} />
 </a>
  </motion.ul>
 </div>
  <motion.div variants={homepicContainer} initial="hidden" animate="show" className='homepic-container'>
  <motion.img variants={homepic} className='homepic' src={shoepic} />
  </motion.div>
  </motion.div></div>
    )
}

export default HomePage