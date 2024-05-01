![title-server](https://github.com/fborja44/tourney-hero-server/assets/49008508/844fb4d3-e9f3-41b2-88dd-9987531e6724)
# Tourney Hero Stream Overlay and Server
The companion overlay and server to be used with the Tourney Hero app.

Connects to the companion [**Tourney Hero App**](https://github.com/fborja44/tourney-hero) to control overlay elements and to automate tasks.

If you are a local Tournament Organizer with any requests, please feel free to send me a message.

For an example tournament produced using this application, see: [Full House 2024](https://www.youtube.com/playlist?list=PLAa8C1sfSQUr8HkWqylXqtX1Ui28yVpDf)

## Preview
Below is a preview of several overlays:

### Gameplay (Online)
![gameplay_online](https://github.com/fborja44/tourney-hero-server/assets/49008508/340fac98-a008-40c4-b3e4-3fcd8bd953b0)

### Gameplay (LAN)
![gameplay_LAN](https://github.com/fborja44/tourney-hero-server/assets/49008508/b2171e4f-ef06-4986-a368-4813449891b3)

### Top 8 Bracket
![bracket](https://github.com/fborja44/tourney-hero-server/assets/49008508/ba66cc91-9404-4103-a3b6-4f6aa930f9b8)

## Usage
### Requirements
- [Node 20+](https://nodejs.org/en)

### Instructions
1. `cd` to root folder
2. `npm i` to install dependencies
3. `npm start` to run the overlay app
4. Add browser sources based on the URLs below, or copy & paste from the client app

## Browser Source URLs
### Overlay Scenes
#### Gameplay
`/`

#### Gameplay (LAN)
`/LAN`

#### Commentators
`/commentators`

#### Bracket
`/bracket`

#### Player Card
`/player`

### Widgets
#### Ticker
`/ticker`

## Development Instructions
### Server Development
1. Navigate to root folder in the command line

2. `npm run dev` to start the development server

### Overlay Development
1. Navigate to the overlay folder using `cd overlay`

2. Start the development server using `npm run dev`

3. Build to serve on the production server using `npm build`

## Custom Overlays and Graphics
WIP
