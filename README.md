# Fitspo

Fitspo is a fitness mobile application built with React Native and TypeScript. It allows users to sign up or log in, and provides a calendar interface for tracking their workouts. Users can add, delete, and edit their workout records for each date.
<img width="284" alt="Screen Shot 2024-05-28 at 2 53 42 PM" src="https://github.com/justjjasper/workoutLog/assets/98243819/64c731bc-1fdb-4823-a694-491423adccb5">

## Features

- User authentication (Sign up / Login) using JWT.
- Calendar interface for workout tracking.
- Add, delete, and edit workout entries.
- State management with Redux.
- Backend built with Node.js and Express.

## Technologies Used

- **React Native**: For building the mobile application.
- **TypeScript**: Ensures type safety and improved code maintainability.
- **Node.js**: For the backend server.
- **Express**: Web framework for Node.js.
- **Redux**: State management library for React.
- **JWT Authentication**: Secure user authentication.


## Installation

### Prerequisites

- Node.js
- npm or yarn
- React Native CLI

### Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/justjjasper/workoutLog.git
    ```

2. Navigate to the workoutLog directory:

    ```bash
    cd workoutLog
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Create a `.env` file and add your environment variables:

    ```env
    PORT=3000
    JWT_SECRET=your_jwt_secret
    ```

5. Start the server:

    ```bash
    npm run server
    ```

6. Create a proxy localtunnel url (make sure you npm install localtunnel)

   ```bash
   npx localtunnel --port 3000
   ```
   a. Configure the created localtunnel into the config.js file

8. Start the React Native applicaiton:

   ```bash
   npm run start
   ```

## Usage

1. Open the application on your mobile device or emulator.
2. Sign up for a new account or log in with your existing credentials.
<img width="287" alt="Screen Shot 2024-05-28 at 2 54 13 PM" src="https://github.com/justjjasper/workoutLog/assets/98243819/65dd551a-0a91-4f2e-a8a2-39d648d60c8e">
<img width="285" alt="Screen Shot 2024-05-28 at 2 54 46 PM" src="https://github.com/justjjasper/workoutLog/assets/98243819/514c9695-d553-4c49-8bbd-e67c95be9246">

3. Use the calendar to navigate to the desired date.
<img width="287" alt="Screen Shot 2024-05-28 at 2 55 27 PM" src="https://github.com/justjjasper/workoutLog/assets/98243819/49055a57-533d-4e91-b073-c6151eb2f779">

4. Click on a date cell to add, edit, or delete workout entries.
<img width="295" alt="Screen Shot 2024-05-28 at 2 55 55 PM" src="https://github.com/justjjasper/workoutLog/assets/98243819/d20f1dfa-6d98-4ff7-9c26-86201e0d149d">
<img width="287" alt="Screen Shot 2024-05-28 at 2 56 09 PM" src="https://github.com/justjjasper/workoutLog/assets/98243819/275604ee-fe1b-4caf-8199-2b0880a62b4b">
<img width="291" alt="Screen Shot 2024-05-28 at 2 56 35 PM" src="https://github.com/justjjasper/workoutLog/assets/98243819/e93f26af-0b01-4ff1-becf-e420e73fe6f0">

## Contact

If you have any questions or feedback, please feel free to reach out:

- **Email**: jasjasper101@gmail.com
- **GitHub**: [justjjasper](https://github.com/justjjasper)
