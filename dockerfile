FROM node:16 AS build

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the code and build
COPY . .
RUN npm run build

# Use Nginx to serve the build
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
