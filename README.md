# TablEat API

The backend service for **TablEat**, a comprehensive full-stack restaurant management application. This API provides robust and scalable endpoints to manage everything a modern restaurant needs, from tables and menus to real-time order processing.

## Tech Stack

This project is built with a modern Node.js ecosystem, focusing on developer experience, type safety, and scalability:

* **[NestJS](https://nestjs.com/)**: A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
* **[Prisma](https://www.prisma.io/)**: Next-generation Node.js and TypeScript ORM for database access and migrations.
* **[PostgreSQL](https://www.postgresql.org/)**: Advanced open-source relational database.
* **[Docker](https://www.docker.com/)**: Containerization for an easy and consistent development environment (Database setup).
* **[PNPM](https://pnpm.io/)**: Fast, disk space-efficient package manager.

## Core Modules & Features

The API is structured in a modular way, handling the following core domains of the restaurant management system:

* **`Category`**: Management of product categories (e.g., Beverages, Main Courses, Desserts).
* **`Product`**: Management of restaurant items, including descriptions, prices, and image URLs.
* **`Menu`**: Aggregation and handling of the available menus.
* **`Table`**: Management of restaurant tables, tracking their availability and unique numbers.
* **`Order` & `OrderItem`**: Full handling of customer orders, drafting items, calculating total prices, and tracking order status.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the following installed on your machine:
* [Node.js](https://nodejs.org/en/) (v18 or higher recommended)
* [PNPM](https://pnpm.io/installation)
* [Docker](https://www.docker.com/products/docker-desktop) and Docker Compose

### Installation

1. Clone the repository and navigate to the project directory:
   ```bash
   cd tableat-api
   ```
2. Install the project dependencies using PNPM:
    ```bash
    pnpm install
    ```

3. Set up your environment variables. Copy the example file and update it with your local credentials:
    ```bash
    cp .env.example .env
    ```

### Database Setup

1. Start the PostgreSQL database using Docker Compose:
    ```bash
    docker-compose up -d
    ```
2. Run the Prisma migrations to set up the database schema:
    ```bash
    npx prisma migrate dev
    ```
3. (Optional) Seed the database with initial testing data:
    ```bash
    npx prisma db seed
    ```
### Running the Application

You can start the NestJS server in different modes:
```bash
# development
$ pnpm run start

# watch mode (recommended for development)
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

Once running, the API will be available at `http://localhost:3000` (or the port specified in your .env file).

### Docker Deployment

A Dockerfile is included for containerizing the API itself. To build and run the application container:

```bash
docker build -t tableat-api .
docker run -p 3000:3000 --env-file .env tableat-api
```

## License

This project is licensed under the terms included in the [LICENSE](LICENSE) file.
