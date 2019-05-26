## Books Search app

It searches books by text or voice through openlibrary.org.

#### Software dependencies

* (development) install node
* (development) install yarn `npm install -g yarn`
* (testing) install java `https://www.java.com/en/download/`
* install dependencies in root directory: `yarn install`

#### Run application

* watch and compile & serve: `yarn dev` -> `http://127.0.0.1:8000`

#### Test the application

* run tests (retest on page reload) `yarn watch-and-test` -> `http://localhost:8081/components/dott/generated-index.html?cli_browser_id=0`
* run tests once `yarn test`

### Application architecture

* data access layer `./src/sdk`
* application state and state transitions layer `./state`
* view layer `./src/components`


### Features

  [x] As a user I want to search book through openlibrary.org by speech recognition
  [x] As a user I want to search books through openlibrary.org by entering a search query text
  [x] As a user I want to see the books results in a carousel that automatically loops infinitely
  [x] As a user I want carousel to stop when tab is in background mode
  [x] As a user I want to lazy load the next closest chunk of books cover images
  [x] As a user I want to render the books cover images in the best size for the device
  [x] As a user I want the user interface to be responsive
  [x] As a user I want to see the date and time that search was retrieved in the user's navigator locale