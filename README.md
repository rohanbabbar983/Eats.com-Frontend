# Eats.com Frontend

Welcome to the Eats.com frontend repository! This project is built using the MERN stack with TypeScript and several modern libraries and tools to provide a seamless food ordering and restaurant management experience.

## Live Demo
Check out the live site: 

## Features
- **React** with **TypeScript** for a robust and maintainable codebase
- **Vite** for fast and optimized development
- **Auth0** for secure authentication
- **Stripe** for payment processing
- **Cloudinary** for image handling
- **ShadCN** and **Tailwind CSS** for beautiful UI design
- **React Hook Form** for form management

## Installation

1. Clone the repository
    ```bash
    git clone https://github.com/rohanbabbar983/Eats.com-Frontend.git
    cd Eats.com-Frontend
    ```

2. Install dependencies
    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add the necessary environment variables:
    ```env
    VITE_AUTH0_DOMAIN=your_auth0_domain
    VITE_AUTH0_CLIENT_ID=your_auth0_client_id
    VITE_AUTH0_CALLBACK_URL= your_callback_uri
    VITE_AUTH0_AUDIENCE=your_audience_from_auth0
    VITE_API_BASE_URL=http://localhost:7000 || your_base_url_backend
    ```

4. Start the development server
    ```bash
    npm run dev
    ```

## Usage

Visit `http://localhost:5173` to see the application in action.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

