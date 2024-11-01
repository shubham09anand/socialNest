
# Social Nest



A brief description of what this project does.




## Authors

[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://shubham09anand.in/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)]([https://www.linkedin.com/](https://www.linkedin.com/in/subham09anand/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app))
- [Instagram](https://www.instagram.com/shubham09anand/?igsh=YTJvZDZlZmNwYWY1)
- [Docker](https://hub.docker.com/u/shubham09anand)

https://socialnest.shubham09anand.in/static/media/socialNest.284b6b7c03b19ec4d054.png
## 🔗 Links 
<img src="https://socialnest.shubham09anand.in/static/media/socialNest.284b6b7c03b19ec4d054.png" style="height: 30px; width: 30px;" />
- [Social nest](https://socialnest.shubham09anand.in)

## Deployment

To deploy this project run

Setup Instructions
Prerequisites
Install Docker: Ensure Docker is installed on your system. You can download it from Docker’s official website.

Install Docker Compose: Docker Compose is typically bundled with Docker Desktop. Confirm it’s installed by running ```bash
docker-compose --version ``` in your terminal.

Instructions
Create a docker-compose.yml File: In your project directory, create a file named docker-compose.yml and add the following configuration:

```bash
version: '3.8'

services:
  social_nest_backend:
    image: shubham09anand/social_nest_backend:latest
    container_name: social_nest_backend_container
    ports:
      - '8080:8080'
    networks:
      - socialnestnetwork
    depends_on:
      - mongo

  social_nest_frontend:
    image: shubham09anand/social_nest_frontend:latest
    container_name: social_nest_frontend_container
    ports:
      - '3000:3000'
    networks:
      - socialnestnetwork
    depends_on:
      - social_nest_backend

  mongo:
    image: mongo:7.0
    container_name: mongo_container
    ports:
      - '27017:27017'
    networks:
      - socialnestnetwork
    volumes:
      - mongo_data:/data/db

networks:
  socialnestnetwork:
    driver: bridge

volumes:
  mongo_data:
```

Run Docker Compose: Open a terminal in the directory containing your docker-compose.yml file and run:

```bash
docker-compose up -d 
```

The -d flag runs the services in detached mode, so they continue running in the background.
Docker Compose will download the images, create containers, and start the application.
Access the Application:

- Frontend: Visit ``` bash http://localhost:3000 ``` in your browser.

- Backend: Access ``` bash http://localhost:8080 ``` to interact with the backend.

- MongoDB: MongoDB will be running locally on ``` bash port 27017.```

