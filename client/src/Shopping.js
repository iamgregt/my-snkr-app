import {Tween, Power3} from 'gsap'
import {useEffect, useRef} from 'react'

function Shopping({user, stores, setStores}){

    


    return(
        <div className="card">
  <img className="card-img-top" src="https://1000logos.net/wp-content/uploads/2020/10/Finish-Line-Logo-1976.png" alt="Card image cap" />
  <div className="card-body"><div>
    <h2>Welcome back, {user.username}! </h2>
    </div>
    <h5 className="card-title">You're now viewing your closet</h5>
    <p className="card-text">Which pair are you feeling for today???</p>
  </div>
  <ul className="list-group list-group-flush">
    <li className="list-group-item"><h2>Jordan</h2></li>
    <li className="list-group-item"><h2>Nike</h2></li>
    <li className="list-group-item"><h2>Puma</h2></li>
    <li className="list-group-item"><h2>Reebok</h2></li>
  </ul>
  {/* <div class="card-body">
    <a href="#" class="card-link">Card link</a>
    <a href="#" class="card-link">Another link</a>
  </div> */}
</div>
    )
}

export default Shopping