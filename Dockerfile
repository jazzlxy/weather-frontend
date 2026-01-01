# Dockerfile for Backend
# STEP 1: Choose base image (start point)
# Think of this like: "I want to start with a computer that has Node.js installed"
FROM node:22-alpine

# STEP 2: Set working directory inside container
# Think of this like: "Create a folder called /app and work inside it"
WORKDIR /app

# STEP 3: Copy package files first
# Think of this like: "Copy the shopping list"
COPY package*.json ./

# STEP 4: Install dependencies
# Think of this like: "Go shopping and buy everything on the list"
RUN npm install

# STEP 5: Copy all my code
# Think of this like: "Move all your stuff into the container"
COPY . .

# STEP 6: Expose Vite's port (tell docker which port my app uses) 
EXPOSE 5173

# STEP 7:  Start Vite dev server
# npm: program that runs the script
# run: instruction to look in package.json for script name
# dev: name of the specific script to execute
# --: standard delimiter
# --host: development server to listen all avail network interfaces within the container (0,0,0,0) making it accessible to host machine and other containers.
CMD [ "npm", "run", "dev", "--", "--host" ]
# Start the npm program. Tell it to run the dev script. And when that script runs, ensure you pass the --host flag to it so the server is accessible from outside the container."