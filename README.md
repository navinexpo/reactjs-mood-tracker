# React.js Application with Recharts and Tailwind CSS

This project is a React.js application that leverages Recharts for data visualization and Tailwind CSS for styling. It is configured for development and production builds.

## Prerequisites

Ensure you have the following installed on your system:
- **Node.js** (v14 or later)
- **npm** (v6 or later)

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <repository-name>
```

### 2. Install Dependencies

Install all necessary packages using npm or yarn:

```bash
npm install
```

### 3. Run the Application in Development Mode

Start the development server:

```bash
npm run dev
```

By default, the application will be available at `http://localhost:5173`.

## Building for Production

To create a production-ready build of the application, follow these steps:

### 1. Build the Application

Run the following command to create a production build:

```bash
npm run build
# or
yarn build
```


## Project Structure

```plaintext
├── public/             # Static assets
├── src/                # Application source code
│   ├── components/     # Reusable components
│   ├── styles/         # Tailwind CSS customizations
│   ├── App.jsx         # Main application component
│   ├── index.js        # Entry point
├── tailwind.config.js  # Tailwind CSS configuration
├── package.json        # Project dependencies and scripts
└── README.md           # Documentation
```

## Key Technologies

- **React.js**: Frontend library for building user interfaces.
- **Recharts**: Library for creating responsive and customizable charts.
- **Tailwind CSS**: Utility-first CSS framework for styling.

## Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.

## License

This project is licensed under the [MIT License](LICENSE).
