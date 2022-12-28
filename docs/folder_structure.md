# Folder structure

The folder structure follows the MVVM-Pattern (Model - View - View Model).
These pattern separates the code into a presentation, business and data layer.

Everything that belongs to the <b>view</b> directly will be placed into the presentation layer. Mainly it is JSX code
and respective styles. The code will be placed in the .component file

The business layer handles actions invoked by user interactions. Here are mainly handlers that are getting invoked by
actions e.g. "onPress()". They also contain state selectors. The handlers will be placed nearby the component in the .controller file

The <b>ViewModel</b> contains all business logic. The viewModel communicates with the data model and manipulates their
state. The viewModel contains all reducers their respective actions.

A <b>model</b> is a representation of information. E.g a User model contains information about name, age, and height. The model
is wrapped in a store.

Click [here](https://tech.groww.in/apply-mvvm-in-react-native-app-ad77fa0f851b) for a good example to this mvvm pattern in react native.

Generally the folder structure looks like the following:

````
Melibo
├── learning
├── docs
└── src
    ├── __tests__
    ├── app
    ├── assets
    ├── stores
    ├── android
    ├── ios
    ├── services
    │   └── websocket
    ├── common
    │   ├── viewModel
    │   │   └── Example.viewmodel.tsx
    │   └── modles
    │       └── Example.model.tsx
    ├── components
    │   └── example
    │       ├── Example.component.tsx
    │       ├── Example.controller.tsx
    │       └── Example.spec.tsx
    └── screens
        └── Home.screen.tsx
````

- learning: contains files that do not belong to the project directly. They are practical examples for generic problems
- docs: contains documentation e.g. coding guidelines
- src: everything that belongs to the code itself contains in this folder
    - __ test __: contains every test that doesn't belong to a unit
    - app: global files like entrypoint, hooks, store
    - assets: images, videos, gifs etc.
    - android: android specific code
    - ios: ios specific code
    - services: services doesn't belong to a specific component or screen. Rather more they run in the background
      asynchronously. The main focus relies on the websocket connection.
    - common: holds generic files that are going to be used several times on different places
        - viewModel: contains all view models
        - models: contains all model files
    - components: contains all components. Each component has its own folder with a `.component`, `.controller`
      and `.spec` file
    - screens: screens containing screen components

