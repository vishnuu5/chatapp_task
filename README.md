# Real-Time Chat Application

A full-stack real-time chat application built with React Native (Expo) for the frontend and Node.js/Express for the backend, featuring Socket.IO for real-time communication.

## Features

- Real-time messaging
- User authentication (Login/Signup)
- Typing indicators
- Online/Offline status
- Message read receipts
- User profiles with avatars
- Last seen timestamps

## Tech Stack

### Frontend

- React Native (Expo)
- Socket.IO Client
- Expo Router for navigation
- AsyncStorage for local storage
- Axios for HTTP requests

### Backend

- Node.js
- Express.js
- Socket.IO
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Expo CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)


## Prview
https://github.com/user-attachments/assets/0da339df-4bd7-48f8-a367-6c0644a2db1f

### Installation

1. Clone the repository:

```bash
git clone https://github.com/vishnuu5/chatapp_task.git
cd chat-app
```

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app frontend

   ```bash
    npx expo start
   ```

3. Start the backend server:

```bash
cd backend
npm start
```

4. Run on your preferred platform:

- Press 'a' for Android
- Press 'i' for iOS
- Scan QR code with Expo Go app on your mobile device
  In the output, you'll find options to open the app in a

## ## Building for Production

### Android APK

```bash
cd frontend
eas build -p android --profile preview
```

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
