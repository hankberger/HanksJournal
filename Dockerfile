FROM nginx:alpine

# Copy custom Nginx config
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Copy frontend files
COPY frontend/dist /usr/share/nginx/html/
