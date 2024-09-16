# Simple Client Management System (SCMS)
## Project Outline
Using an SQL based database (using a container instance of your choice), create a database to store the following information:
- Basic client information - includes client name, date of birth, main/secondary languages as well as primary “funding source”.
- Funding sources - options are NDIS, HCP, CHSP, DVA, HACC

Using node.js and express.js, create a REST API with basic CRUD endpoints to create and manage clients which utilises the above SQL database.

Finally, create a simple React and TypeScript front end to list and create clients using the above API.

## Requirements

- Docker Desktop with Docker Compose ([Instructions](#installing-docker-compose))
- Node.js v18+ with Corepack ($ corepack enable)
- VS Code editor with recommended extensions
- Optionally React Developer Tools and Reactime browser extensions

**Tested Environment**
- Node.js v22.8.0
- NPM v10.8.2
- MacOS 14.5 (Sonoma) M2

## Installation
### Project code

```bash
# Clone the repository
git clone https://github.com/everdeep/turnpoint_challenge.git
```

```bash
# Install dependencies
./setup.sh
```

### Database
The `docker-compose.yml` file used in this project is set up to use a MySQL database due to using a Mac environment.

```bash
# Start the database
docker-compose up -d
```

## Usage

```
npm start
```
OR
```bash
# Start the frontend
cd frontend
yarn start
```

```bash
# Start the backend
cd backend
npm run dev
```


## Building

```bash
./build.sh
```
OR
```bash
# Build the frontend
cd frontend
yarn build
```
    
```bash
# Build the backend
cd backend
npm run build
```

## References
This project utilises boilerplate repositories for both the frontend and backend in order to ensure high quality code and standards.

[Frontend](https://github.com/codesbiome/react-webpack-typescript-2023)  
[Backend](https://github.com/edwinhern/express-typescript-2024)

## Issues

If you receive an error such as:
```
npm warn EBADENGINE Unsupported engine {
npm warn EBADENGINE   package: 'path-scurry@2.0.0',
npm warn EBADENGINE   required: { node: '20 || >=22' },
npm warn EBADENGINE   current: { node: 'v21.7.2', npm: '10.8.2' }
npm warn EBADENGINE }
```

Please update your Node.js version to the latest stable version.

## Installing Docker Compose
1. **Download Docker Desktop**: Go to the official Docker website and download Docker Desktop:
   - [Docker Desktop for Mac](https://docs.docker.com/desktop/install/mac-install/)
   - [Docker Desktop for Windows](https://docs.docker.com/desktop/install/windows-install/)


2. **Install Docker Desktop**
3. **Run Docker Desktop**
4. **Check Docker and Docker Compose Installation**: Open your terminal and check that both Docker and Docker Compose are installed by running the following commands:

    ```bash
    docker --version
    ```
    This should show you the Docker version, something like:

    ```bash
    Docker version 20.10.xx, build xxxx
    ```

    Now check Docker Compose:
    ```bash
    docker-compose --version
    ```

    This should show the Docker Compose version:
    ```bash
    Docker Compose version 1.29.x, build xxxx
    ```

    Note: Docker Desktop includes Docker Compose by default, so installing Docker Desktop also installs Docker Compose.

## Future improvements
- Add validation to the client creation form
- Add better language handling for the client creation form
- Add alerts, confirmations and more user feedback for actions
- Add loading states for API calls
- Fix styling for page and form dialogs
- Add delete client functionality
- Add update client functionality
- Add search functionality
- Add client dialog view
- Add consistent testing