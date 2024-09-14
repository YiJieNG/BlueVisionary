
# BlueVisionary Project

## Frontend

### A. New to project development and first time downloading the project

1. Clone the project from Git:
   - (HTTPS): `git clone https://github.com/YiJieNG/BlueVisionary.git`
   - (SSH): `git clone git@github.com:YiJieNG/BlueVisionary.git`
   
2. Install Node.js:
   - [Node.js Download](https://nodejs.org/en/download/package-manager/current)
   
3. Navigate to the frontend folder:
   - Command: `cd frontend`
   
4. Install dependencies (This might take some time):
   - Command: `npm install`
   
5. Run the app in development mode (Open [http://localhost:3000](http://localhost:3000) to view in your browser):
   - Command: `npm start`
   
6. (For production build) Build the app for production:
   - Command: `npm run build`

### B. Developer implementing the project

1. Update the project from the git main branch:
   - Command: `git pull origin main`
   
2. Navigate to the correct file path:
   - Command: `cd frontend`
   
3. Install dependencies:
   - Command: `npm install`
   
4. Run the app in development mode:
   - Command: `npm start`
   
5. (For production build) Build the app for production:
   - Command: `npm run build`

## Backend

### A. New to project development and first time downloading the project

1. Install MySQL:
   - [MySQL Download](https://dev.mysql.com/downloads/mysql/8.0.html)
   
2. Install Python:
   - [Python Download](https://www.python.org/downloads/)
   
3. Navigate to the backend folder:
   - Command: `cd backend`
   
4. Install necessary libraries:
   - For Linux: Create a virtual environment and install libraries ([Virtual Environment Guide](https://docs.python.org/3/library/venv.html#creating-virtual-environments))
   - Command: `pip install -r requirements.txt`
   
5. Create a `.env` file under the backend folder:
   - Format the `.env` file as:
     ```
     MYSQL_HOST=[ip address of MySQL]
     MYSQL_USER=[username]
     MYSQL_PASSWORD=[password]
     MYSQL_DB=[database name]
     MYSQL_PORT=[port number of MySQL] (default: 3306)
     ```

6. Start the backend server:
   - Command: `python api.py`

### B. Developer implementing the project

1. Navigate to the backend folder:
   - Command: `cd backend`
   
2. Start the backend server:
   - Command: `python api.py`

## Deployment

1. Install Nginx:
   - [Nginx Installation](https://nginx.org/en/docs/install.html)
   
2. Configure Nginx (file location: `/etc/nginx/sites-available/default`):
   ```
   server {
      listen 80;
      server_name [your_domain_name];
      root [your_build_path];
      index index.html;

      location / {
          try_files $uri $uri/ /index.html;
      }

      location /api {
          include proxy_params;
          proxy_pass http://localhost:5000;
      }
   }
   ```

3. Add SSL:
   - Install Certbot: `sudo apt install certbot python3-certbot-nginx`
   - Run Certbot to obtain SSL certificate: `sudo certbot --nginx -d yourdomain.com`

4. Configure Nginx for SSL:
   ```
   server {
      listen 443 ssl;
      server_name [your_domain_name];
      root [your_build_path];
      index index.html;

      location / {
          try_files $uri $uri/ /index.html;
      }

      location /api {
          include proxy_params;
          proxy_pass http://localhost:5000;
      }
      ssl_certificate /etc/letsencrypt/live/[your_domain_name]/fullchain.pem;
      ssl_certificate_key /etc/letsencrypt/live/[your_domain_name]/privkey.pem;
      include /etc/letsencrypt/options-ssl-nginx.conf;
      ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
   }

   server {
      if ($host = [your_domain_name]) {
          return 301 https://$host$request_uri;
      }
      listen 80;
      server_name [your_domain_name];
      return 301 https://$host$request_uri;
   }
   ```


# Copyright
## All right reserved, Made with love by BlueVisionary
