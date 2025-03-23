# Sprunk Empty Project - With Quick Start Setup

## Description
This is an empty [sprunk](https://sprunk-engine.com) project that use [Vite](https://vitejs.dev/).
This project is a starting point for any game project that use the sprunk engine with TypeScript.
This comme pre-configured with the sprunk engine, Vite configuration, standard shaders and font, class diagram and site generation (published on GitHub pages).
All of this ready to run in a pre-configured CI/CD pipeline!

## Getting Started

### Prerequisites
* IDE used PhpStorm 2024.2 or Webstorm 2024.2
* npm 10.2+ [official doc](https://docs.npmjs.com/try-the-latest-stable-version-of-npm)
* node v21+ [official doc](https://nodejs.org/en/download)
* git version 2.39 [official doc](https://git-scm.com/)
* git-lfs/3.5 + [official doc](https://git-lfs.github.com/)
* Google Chrome 130+ (or any other browser that runs WebGPU)

### Run the project
Install packages
```shell
npm install
```
Run vite dev server
```shell
npm run dev 
```

## Deployment
### Build the project
```shell
  npm run build
```
This will generate static files in the `dist` folder.
You can then deploy these files to an any web server.

### Generate documentation
#### Class diagrams
```shell
  npm run generate-uml
```
#### Website documentation
```shell
  npm run generate-doc
```
This will generate a `/doc/site/build` folder containing the documentation (static website).

## Collaborate
### Directory structure
```shell
├───doc                     # Documentation (site folder is automatically generated)
├───src                     # TypeScript Source code
│   ├───behaviors           # Behaviors-related code
│   ├───gameobjects         # Custom Game objects (like prefabs, glue behavior and model)
│   │   └───scenes          # Game scenes (root game objects, setting the environment)
│   ├───models              # Models (structures, interfaces, enums)
│   ├───services            # Services used across the application (processing)
│   └───shaders             # Shader files (GLSL)
├───public                  # Web files / assets files
│   └───assets              # Sprunk Engine Asset files (fonts, 3d models, textures)
│       └───fonts           # Font files
```
### Class syntax
Describe your coding guidelines and style here

### Workflow
Describe your workflow here (branching model, commit message convention, etc.)

## License
Add your license here

## Contact
Add how can you be contacted here