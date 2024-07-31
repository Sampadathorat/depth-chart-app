
# Depth Chart App

A Node.js application using Express for managing and visualizing sports team depth charts.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [Pending Tasks](#pending-tasks)

## Features

- Add players to depth charts.
- View and update depth charts for different positions.
- In-memory database for development and testing.

## Installation

Follow these steps to set up the project on your local machine:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Sampadathorat/depth-chart-app.git
   cd depth-chart-app
   ```

2. **Install Dependencies and Build the Project**

   ```bash
   npm install
   npm run build
   ```

## Configuration

The application uses environment variables for configuration. You can set these in a `.env` file in the root directory of your project. Create a `.env` file with the following content:

```
PORT=3000
```

## Usage

To run the development server and view the depth chart, follow these steps:

1. **Start the Development Server**

   Run the following command in your terminal:

   ```bash
   npm run dev
   ```

2. **Access the Depth Chart**

   Open your web browser and navigate to:
   
   ```bash
   http://localhost:3000/depth-chart?team=TBB
   ```

   In this example, `TBB` is the team code for which default sample data is seeded.

3. **Sample Data**

   The following players are included in the depth chart:

   ```javascript
   var TomBrady = { "number": 12, "name": "Tom Brady" };
   var BlaineGabbert = { "number": 11, "name": "Blaine Gabbert" };
   var KyleTrask = { "number": 2, "name": "Kyle Trask" };
   var MikeEvans = { "number": 13, "name": "Mike Evans" };
   var JaelonDarden = { "number": 1, "name": "Jaelon Darden" };
   var ScottMiller = { "number": 10, "name": "Scott Miller" };

   addPlayerToDepthChart("QB", TomBrady, 0);
   addPlayerToDepthChart("QB", BlaineGabbert, 1);
   addPlayerToDepthChart("QB", KyleTrask, 2);
   addPlayerToDepthChart("LWR", MikeEvans, 0);
   addPlayerToDepthChart("LWR", JaelonDarden, 1);
   addPlayerToDepthChart("LWR", ScottMiller, 2);
   ```

## Testing

Run the following command to build the project and run the test cases:

```bash
npm run test
```

## Project Structure

The project is organized into the following structure to promote clarity and maintainability:

```
src
│
├── controllers
│   └── (Handles HTTP requests and responses, orchestrates calls to services)
│
├── models
│   └── (Defines the data structures and business logic for the application)
│
├── routes
│   └── (Defines the application's endpoints and maps them to controller functions)
│
├── services
│   ├── dataAccess
│   │   ├── entities
│   │   │   └── (Contains database entities or schemas used for data persistence)
│   │   ├── depthChartDataAccessService
│   │   │   └── (Contains logic for accessing and manipulating depth chart data)
│   │   └── inMemoryDb.ts
│   │       └── (Provides an in-memory database implementation for development/testing)
│   │
│   └── dtos
│       └── (Contains Data Transfer Objects used to standardize data across services)
│
├── types
│   └── (Defines custom TypeScript types and interfaces used throughout the application)
│
└── tests
    └── (Contains test files organized by type and functionality)
```

### Description

- **`src`**: The main source directory for the application code.

  - **`controllers`**: Manages HTTP requests, coordinates service calls, and handles responses.

  - **`models`**: Defines data models and business logic.

  - **`routes`**: Specifies the API routes and maps them to the appropriate controller functions.

  - **`services`**: Contains business logic and data access layers.

    - **`dataAccess`**: Manages data access and persistence.

      - **`entities`**: Defines database entities or schemas.

      - **`depthChartDataAccessService`**: Contains methods for accessing and manipulating depth chart data.

      - **`inMemoryDb.ts`**: Implements an in-memory database for development and testing purposes.

    - **`dtos`**: Defines Data Transfer Objects for data standardization.

  - **`types`**: Includes custom TypeScript types and interfaces.

  - **`tests`**: Contains unit tests.

## Pending Tasks

### 1. Logging

- Implement comprehensive logging throughout the application.
- Ensure logs cover different levels (info, debug, error, etc.).

### 2. Error Handling

- Enhance error handling to cover all potential failure points.
- Implement custom error messages and status codes for different types of errors.

### 3. Code Coverage

- Aim for high coverage to increase reliability and maintainability.

### 4. Folder Structure for Test Cases

- Organize test cases into a well-defined folder structure.
- Ensure that the test structure reflects the application's architecture and modules.

### 5. Additional Tests for Edge Cases

- Ensure that critical paths and edge cases are covered by tests.

### 6. Cleanup

- Code review and remove unused code to improve code quality.

