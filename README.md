# Echo Canvas Frontend

This is the frontend application for Echo Canvas, built with Next.js and TypeScript. It provides a user interface for interacting with image generation and refinement services.

## Running with Docker Compose

To run the Echo Canvas frontend using Docker Compose, follow these steps:

1.  **Ensure Docker is running.**

2.  **Navigate to the root of the frontend directory** where the `docker-compose.yml` file is located.

3.  **Build and run the services:**
    ```bash
    docker compose up --build
    ```

    This command will build the Docker image (if it hasn't been built or if there are changes) and start the container.

4.  **Access the application:**
    The application will be accessible at `http://localhost:3000` in your browser.

To stop the services, press `Ctrl+C` in the terminal where `docker compose up` is running, or use:
    ```bash
    docker compose down
    ```