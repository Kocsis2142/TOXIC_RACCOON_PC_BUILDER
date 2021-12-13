Toxic Raccoon is a webshop where the customer can build their own custom gaming PC from components. The site will help the customer step by step building their own pc with warning and error alerts if some of the components are not compatible with each other. At the next step, the customer has options to order the PC or can save it for a later buying or just to share with the other customers who can also buy or redesign it. The site will also calculate gaming performance in some popular games from the past few years which is shown at the side of the pc builder panel. If someone just doesn't want to bother with the pc building options there can order a perfectly organised gaming pc which is made by the website administrators. After a completed order a confirmation email will be sent to the customer's mailbox.

React.js, Node.js, Express.js, MongoDB

## Project setup

## frontend
npm install
npm start

## backend
npm install
node start.js

## Run with docker

## backend
docker build . -t toxicraccoonbackend
docker run -p 4000:4000 toxicraccoonbackend

## frontend
docker build . -t toxicraccoonbackend
docker run -p 3000:3000 toxicraccoonbackend


Usage opportunities

Pc Builder -> 
- Building custom gaming PC
- Gaming performance calculation
- Add PC to bag (errors are not allowed)
- Save PC (errors are not allowed)

Raccoon Builds ->
- Add PC to bag
- Redesign PC 

Custom Builds ->
- Add PC to bag
- Redesign PC
- Delete PC (only the build creator)

Login -> 
- Google OAuth login

Profile(User name) ->
- Check existing builds
- Delete existing build
- Add PC to bag (errors are not allowed)
- Redesign PC

Bag -> 
- Check the builds that are added to the bag
- Check detailed bag
- Complete order