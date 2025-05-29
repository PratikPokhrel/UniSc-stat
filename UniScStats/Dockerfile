# Use the official Nginx image as a base image
FROM nginx:alpine

# Copy the React app's build output into the container's Nginx html directory
COPY dist /usr/share/nginx/html

# Copy the custom Nginx configuration file into the container
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80 (the default port for Nginx)
EXPOSE 80
