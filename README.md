# Simple Client Management System
## Project Outline
Using an SQL based database (using a container instance of your choice), create a database to store the following information:
- Basic client information - includes client name, date of birth, main/secondary languages as well as primary “funding source”.
- Funding sources - options are NDIS, HCP, CHSP, DVA, HACC

Using node.js and express.js, create a REST API with basic CRUD endpoints to create and manage clients which utilises the above SQL database.

Finally, create a simple React and TypeScript front end to list and create clients using the above API.

## Project Architecture

## Requirements

- Node.js v18+ with Corepack ($ corepack enable)
- VS Code editor with recommended extensions
- Optionally React Developer Tools and Reactime browser extensions

**Tested Environment**
- Node.js v22.8.0
- NPM v10.8.2
- MacOS 14.5 (Sonoma) M2

## Installation

```bash
# Clone the repository
git clone https://github.com/everdeep/turnpoint_challenge.git
```

```bash
# Install dependencies
./setup.sh
```

## Usage

```
npm start
```
OR
```bash
# Start the frontend
cd frontend
yarn workspace app start
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

[Frontend](https://github.com/kriasoft/react-starter-kit)  
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