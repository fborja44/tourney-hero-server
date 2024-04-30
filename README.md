# Tourney Hero Stream Overlay and Server
The companion overlay and server to be used with the Tourney Hero app.

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