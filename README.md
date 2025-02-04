# Setup

This guide mainly focuses on running the app on Visual Studio Code.

## Nodejs

Welcome to this project, to start off, make sure you installed the latest nodejs.
You may check your Node.js existance by running the command on your terminal/CMD

> node -v

then

> npm -v

> [!TIP]
> If you haven't so, you may head to [their official website](https://nodejs.org/en/download/)

Navigate to folder same level as this `readme`, run the following

> npm install

The scripting uses nodemon to run the program and restarts on file changes

> npm install --save-dev nodemon

## Database

This app uses mongoDb as the database due to it's flexibility and field scalability.

Make sure to check if the `.pem` file exists at `utils` folder.

> [!IMPORTANT]
> The `.pem` file is set to last until April 2025. Please contact me (jasonczx27@gmail.com) to generate the token again if needed.

## Lib (submodule)

This project uses `GIT Submodule`.

Submodule act as general libraries for non-sensitive functions, enums, classes across projects as long as the submodule repo is set public.

### Setup (Lib)

As the repo puts lib in gitignore, once you've done cloning the module,
run the following

> git submodule add https://github.com/jczx27/submodule lib

If you already had installed the submodule but unsure if you're having the latest submodule

> git submodule update --recursive --remote

> [!INFORMATION]
> Avoid editing/commiting directly on the submodule from referring repos, if there's any suggestions, please make a change requests on the submodule git repo instead

##### For more information

If you wish to know more about how to setup/ remove, [<visit the source repo>](https://github.com/jczx27/submodule)

> [!WARNING]
> Removing the submodule is not recommended as some or most components within the project may refer to the lib to sync a standard across front and backend

# Running the program

Congratulations on coming this far, now seems you've been fully setup, let's prepare to run the program.

## wait! Last check

Before you run the app, note that the default `.env` at this repo sets the port to `3001`, please make sure no other program runs on port `3001`, or if you have to change the port, you may edit on the `.env` in the repo you cloned.

Run the program using below:

> npm run dev

You should wait and see if the console runs through without error and waits at lines below.

<code>
You can now view ebook-management-react-maybank in the browser.<br/>
Compiled successfully!<br/>
  Local:            http://localhost:PORT<br/>
  On Your Network:  http://your-ip:PORT<br/>

webpack compiled successfully<br/></code>

If not, kindly refer to above [steps](#setup) to check if any steps' missing.

# Quizzes time

## Explain the difference between client-side rendering and server-side rendering.

Server side rendering renders the webpage on the server for each requests before sent into the client (user's device).

Client-side rendering at the other hand sends minimal HTML file with JS bundle to client.

[Reference](https://www.geeksforgeeks.org/server-side-rendering-vs-client-side-rendering-vs-server-side-generation/)

### Differences

1.  In usage, stacks in server-side (e.g. Next.js) relies more on server-side resources as numbers of clients requests climbs, all rendering thus calculations would be done on-server, whilst client-side (e.g. React.js) would be more reliance on users' devices' computing power (pre-requisites that clients' browsers have javascript enabled)

2.  For speed, under optimized traffic, server-side would have the advantage for sending in fully rendered webpage upon processed by server, in contrast to client-side rendering. Thus, in conditions where user has limited access to internet, server-side webpage also loads using lesser resources and faster as compared to client-side rendering, server-side renders do not need to fetch clients with huge javascript for interations and more, as the page is been rendered, hence smaller overall package is downloaded

3.  For interactions, client-side rendering is probably better for rich interactive actions as javascript is downloaded along the skeleton html, whilst server-side rendering had the rendered webpage readily sent to client, and javascript comes after, some interactives were delayed.

## Justify your chosen technology stack, libraries, router framework, and UI components.

> [!INFORMATION]
> This answer contains answer for mostly front-end. For back-end answer, please kindly refer to readme at [backend](https://github.com/jczx27/ebook-management-nodejs-maybank).

1.  This project runs MERN stack, with back-end utilizing Nodejs + Express.js and `Reactjs` and is used for front-end, this stack is rather lightweight.

    `Reactjs` is modern, well supported front-end technology (backed by Facebook) and has a large NPM package supported community.

    For developers knowing basics of `Javascript`, `HTML`, Reactjs's learning curve can be less intense.

    As briefly showed in the code content, this technology allows use of `reusable` component, as the Footer and Header were isolated component in this project's context, they can be used by other pages as sub-components.

    What works well with `Reactjs`?

    Single Page Applications (as this project demonstrates, coding a single paged component can be clean and logics can be reusable if handled nicely)

    Dashboard and Portals/ Interactive web apps that requires real-time state updates - as React introduces `state` and `virtual DOM`, it improves efficiency on pages that requires rapid updates on page elements (hence browser DOM does not need to reflow/refresh on smaller changes) as React is able to compare, and update ONLY changing parts in DOM upon logic changes in batches.
    e.g. React changes/updates only 2 (changing elements) out of 1k table rows in DOM instead of letting the whole tree reflow/refresh.

    As in first question that states Reactjs as a Client-side rendering, React excels in helping browsers locally for interactive logics efficiencies.

2.  Libraries and UI - to keep the project simple, lesser libraries/dependencies were used, for HTTP exchange with backend, I used `axios` for it's simpleness to use.
    For UI, I used `react-bootstrap` as this library provides well enough components and css to be used for this project, and their [documentation](https://react-bootstrap.netlify.app/docs/getting-started/introduction) is made easy to understand and follow.

## Describe how to deploy and run the application locally (use PlantUML or Mermaid diagrams if helpful).

Once you have the setup as guided in the [setup section](#setup), you would be good to go, just follow the step [here](#running-the-program)
