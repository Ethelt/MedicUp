# Getting Started

This guide will help you set up and run this project. Don't worry if you're new to this - we'll go through it step by step!

## 1. Install Required Tools

### Install Node.js and npm
1. Go to [Node.js website](https://nodejs.org)
2. Download the "LTS" (Long Term Support) version
3. Double click the downloaded file and follow the installation steps
4. To check if it worked, open Terminal (Mac) or Command Prompt (Windows) and type:

```bash
node --version
npm --version
```
Both commands should show a version number.

### Install Docker
1. Go to [Docker website](https://www.docker.com/products/docker-desktop)
2. Download Docker Desktop for your system (Windows/Mac)
3. Install it by double clicking and following the steps
4. Start Docker Desktop
5. To check if it worked, open Terminal/Command Prompt and type:

```bash
docker --version
```
You should see a version number.

## 2. Download and Set Up the Project

1. Download this project to your computer
2. Open Terminal/Command Prompt
3. Navigate to the project folder (use the `cd` command)

## 3. Start the Database

1. In Terminal/Command Prompt, make sure you're in the project folder
2. Type this command:

```bash
docker-compose up -d
```
You should see some text showing Docker starting up.

## 4. Start the Server

1. Open a new Terminal/Command Prompt window
2. Navigate to the server folder:

```bash
cd server
```
3. Install the server packages:

```bash
npm install
```
4. Start the server:

```bash
npm run dev
```
You should see a message saying the server is running.

## 5. Start the Client

1. Open another new Terminal/Command Prompt window
2. Navigate to the client folder:

```bash
cd client
```
3. Install the client packages:

```bash
npm install
```
4. Start the client:

```bash
npm run dev
```
A browser window should open automatically.

## All Done! 🎉

- The database is running on port 5432
- The server is running on http://localhost:5000
- The client is running on http://localhost:3000

## Common Problems

### "Port already in use" error
Something else is using that port. Try:
1. Close other programs that might be using the port
2. Restart your computer

### Docker not starting
1. Make sure Docker Desktop is running
2. Try restarting Docker Desktop
3. Restart your computer

### "Command not found" error
Make sure you're in the right folder when running commands

### Need to start over?
1. Stop everything (press Ctrl+C in each Terminal window)
2. Run this to stop Docker:

```bash
docker-compose down
```
3. Then start again from step 3

## Need Help?
If you're stuck, try:
1. Reading the error message carefully
2. Closing everything and starting over
3. Restarting your computer
4. Asking for help from a team member
