# MySneakers
An application built to help users keep track of their shoe inventory. This includes determining which shoes are for sale, where they were bought, and donating them to other users.

[![Screen-Shot-2022-09-26-at-8-24-34-PM.png](https://i.postimg.cc/gjqPSpsZ/Screen-Shot-2022-09-26-at-8-24-34-PM.png)](https://postimg.cc/FkRqz22r)




## Demo

Check out the live demo by using the link below.

https://mysneaker-app.herokuapp.com/


## Features

- Add/Update/Delete Shoes
- Add Shoe Descriptions
- List Shoes as 'For Sale'
- Add Stores
- Keep track of Store<->Shoe relationships.
- View Users and count of owned shoes.


## Requirements

- Firebase Account
- Ruby 2.7.4
- NodeJS (v16), and npm
- Postgresql

## FAQ

#### How to link my firebase account?

Enter your firebase API information/keys in the firebase.js file. 

https://firebase.google.com/

[![Screen-Shot-2022-09-26-at-10-05-27-PM.png](https://i.postimg.cc/4xVBKTZD/Screen-Shot-2022-09-26-at-10-05-27-PM.png)](https://postimg.cc/WdpMKCd8)

- NOTE: THE API KEY USED IN THIS REPO IS NO LONGER VALID. YOU MUST CREATE YOUR OWN.

#### How to add shoe descriptions?

Add descriptions by creating JSON objects in the shoeDescriptions.js file. 

The application will check for a matching name before rendering the Shoe element. If there is no match, "no desc" is used as a placeholder.

[![Screen-Shot-2022-09-26-at-10-10-30-PM.png](https://i.postimg.cc/jS1nrDGK/Screen-Shot-2022-09-26-at-10-10-30-PM.png)](https://postimg.cc/68dprpW1)
