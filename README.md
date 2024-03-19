# YourNotes-App README

Welcome to the README for YourNotes-App! This document will guide you through the setup process, explain the project structure, and provide instructions on how to run the application.

## Setup Instructions

To get started with this application, follow these steps:

1. **Clone the Repository:** 

`git clone https://github.com/Ah98lg/YourNotes-app.git`

2. **Install Dependencies:**
Navigate into the project directory and install the necessary dependencies using npm or yarn.

`pnpm install`


3. **Initialize Prisma:**
Initialize Prisma by running the following command and follow the prompts to set up your database connection:

`npx prisma migrate dev --name initialize`

4. **Environment Variables:**
To configure your database connection, create a `.env` file in the root of your project and add the following content:

`DATABASE_URL="file:./db.sqlite"`

5. **Start the Development Server:**
Once the dependencies are installed, start the development server to run the application locally.

`pnpm dev` 

6. **Access the Application:**
Open your browser and visit `http://localhost:3000` to view the application.

## Project Structure

The project structure for this Next.js application is organized as follows:

`notes-app/
├── public/
│ └── icons/
│ └── images/
├── src/
│ ├── app/
│ │ ├── api/
│ │ │ ├── layout.js
│ │ │ └── page.js
│ │ └── ...
│ ├── components/
│ │ ├── Component1.js
│ │ ├── Component2.js
│ │ └── ...
│ ├── server/
│ │ └── prismaConnection.js
│ └── styles/
│ ├── global.css
│ └── ...
└── ...`


- **public:** Contains icons and images used in the program, accessible publicly.
  - **icons:** Icons used in the application.
  - **images:** Images used in the application.

- **src:** Main source code directory.
  - **app:** Contains the main logic of the application.
    - **api:** Contains files responsible for creating the CRUD of the application.
        -**notes:** Contains all the logic of the CRUD for Notes entity.
    - **layout.js:** Central file organizing the layout of the application.
    - **page.js:** File responsible for rendering the pages of the application.
  - **components:** Contains all necessary components in the application.
    - **Component1.js:** An example component.
    - **Component2.js:** Another example component.
    - *Other components used in the application.*
  - **server:** Contains the Prisma connection to the database.
    - **db.ts:** File responsible for configuring the connection to the database through Prisma.
  - **styles:** Contains global style files.
    - **globals.css:** Global style file used in the application.
