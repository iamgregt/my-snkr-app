import {Tween, Power3} from 'gsap'
import {useRef} from 'react'

function Shopping({user}){

  let logoItem

    return(
        <div class="card">
  {/* <img class="card-img-top" src="https://1000logos.net/wp-content/uploads/2020/10/Finish-Line-Logo-1976.png" alt="Card image cap" /> */}
  <div class="card-body"><div>
    <h2>Welcome back, {user.username}! </h2>
    </div>
    <h5 class="card-title">You're now viewing your closet</h5>
    <p class="card-text">Which pair are you feeling for today???</p>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item"><h2>Jordan</h2></li>
    <li class="list-group-item"><h2>Nike</h2></li>
    <li class="list-group-item"><h2>Puma</h2></li>
    <li class="list-group-item"><h2>Reebok</h2></li>
  </ul>
  {/* <div class="card-body">
    <a href="#" class="card-link">Card link</a>
    <a href="#" class="card-link">Another link</a>
  </div> */}
</div>
    )
}

export default Shopping