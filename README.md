
# Portfolio Manager

## Overview
Portfolio Manager is a web application designed to help users track and manage their investment portfolios. The app provides features like stock tracking, news aggregation, financial calculators, and portfolio analytics.

## Tech Stack

### Frontend
- **React**: A library for building user interfaces, structured using components for efficient UI rendering.
- **Redux Toolkit**: State management with centralized state storage, using slices for various features.
- **React Router**: For client-side routing between different pages.
- **SCSS**: Enhanced styling capabilities using variables, nesting, and mixins.
- **Tailwind CSS**: Utility-first CSS framework for custom designs.
- **Bootstrap 5**: Responsive design framework for UI components.
- **MUI (Material-UI)**: React date pickers and Material-UI components for consistent UX.
- **Charting Libraries**: Integration with TradingView Widget and custom components for financial data visualization.

### Backend
- **Express.js**: Web application framework for the backend API, serving the frontend build and managing API requests.
- **GraphQL & Apollo Server**: Flexible querying and data manipulation, providing an efficient data-fetching layer.
- **MongoDB**: NoSQL database for user data, portfolios, and application data storage.
- **Mongoose**: ODM library for MongoDB, providing schema definitions and easy database interactions.
- **dotenv**: Environment variables management.
- **AWS Services**: Integration with DynamoDB and S3 for data storage and file management.

### API Integrations
- **Polygon.io API**: Real-time stock data and market information.
- **Plaid API**: Fetch and manage user financial data.
- **Google APIs**:
  - **YouTube API**: Educational video content integration.
  - **Google Sheets API**: Data interaction with Google Sheets.
- **OpenAI API**: GPT-based functionality for insights and automated responses.

## Project Structure

### Frontend
- **`src/`**: Core application code organized into:
  - **`app/`**: Global configurations (`store.js` for Redux and `AppProviders.js` for context providers).
  - **`layout/`**: Components for the overall layout (`NavBar`, `SideBar`, `Footer`).
  - **`features/`**: Redux slices, thunks, and selectors organized by features like `user`, `stocks`, `news`, `theme`, `portfolio`, and `watchlist`.
  - **`components/`**: Reusable UI components such as financial calculators, stock details, widgets, etc.
  - **`pages/`**: Main page components like `HomePage`, `EducationPage`, `PortfolioPage`, etc.
  - **`api/`**: API integration code for external services such as Google, AWS, OpenAI, and Plaid.

### Backend
```
backend/
├── config/
│   └── db.js                # Database connection configuration
├── data/
│   └── portfolio.json       # Sample portfolio data for initial syncing
├── graphql/
│   ├── resolvers/
│   │   ├── portfolioResolvers.js  # Resolvers for portfolio-related GraphQL operations
│   │   ├── userResolvers.js       # Resolvers for user-related GraphQL operations
│   │   └── watchlistResolvers.js  # Resolvers for watchlist-related GraphQL operations
│   ├── typeDefs/
│   │   ├── portfolioTypeDefs.js   # Type definitions for portfolio GraphQL schema
│   │   ├── userTypeDefs.js        # Type definitions for user GraphQL schema
│   │   └── watchlistTypeDefs.js   # Type definitions for watchlist GraphQL schema
│   └── schema.js            # Merges all type definitions and resolvers into a single executable schema
├── models/
│   ├── PortfolioModel.js     # Mongoose model for Portfolio
│   ├── UserModel.js          # Mongoose model for User
│   └── WatchlistModel.js     # Mongoose model for Watchlist
├── routes/
│   └── api/
│       └── portfolioRoute.js # RESTful API routes for portfolio management
├── scripts/
│   └── syncPortfolio.js      # Script to sync portfolio data from JSON file to MongoDB
├── server.js                 # Main server file that initializes Express and Apollo GraphQL server
└── package.json              # Dependencies and scripts for the backend
```

### API Endpoints

1. **GraphQL Endpoint**:
   - `/graphql`: The main endpoint for all GraphQL queries and mutations.
   
2. **RESTful API Endpoint**:
   - `/api/portfolio/:userId`: 
     - `GET`: Fetches the portfolio for the specified user.
     - `POST`: Adds or updates the portfolio for the specified user.

### GraphQL Schema

The GraphQL schema consists of three main parts:
- **User**: Operations related to user management.
  - Queries: `getUser(id: ID!): User`
  - Mutations: `createUser(username: String!, email: String!, password: String!): User`
- **Portfolio**: Operations related to user portfolios.
  - Queries and mutations to fetch and update user portfolios.
- **Watchlist**: Operations for managing stock watchlists.
  - Queries: `getWatchlist(userId: ID!): [Watchlist]`
  - Mutations: 
    - `addStockToWatchlist(userId: ID!, stockSymbol: String!): Watchlist`
    - `removeStockFromWatchlist(userId: ID!, stockSymbol: String!): Watchlist`

## Available Scripts

In the project directory, you can run:

### `npm start`
Runs the app in the development mode.Open [http://localhost:3000](http://localhost:3000) to view it in the browser.The page will reload when you make changes.You may also see any lint errors in the console.

### `npm test`
Launches the test runner in the interactive watch mode.See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`
Builds the app for production to the `build` folder.It correctly bundles React in production mode and optimizes the build for the best performance.The build is minified and the filenames include the hashes.Your app is ready to be deployed!See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`
**Note: this is a one-way operation. Once you `eject`, you can’t go back!**If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

## Development Setup
1. **Clone the repository**:
   ```bash
   git clone https://github.com/illiusionz/portfolio-manager.git
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Run the application**:
   ```bash
   npm start
   ```
   This will start the frontend development server.

4. **Backend Server**: Navigate to the backend directory and start the server:
   ```bash
   cd backend
   npm start
   ```
5. **Environment Variables**: Ensure `.env` files are correctly set up for API keys, MongoDB URIs, and other sensitive data.

## Contribution Guidelines
- **Code Style**: Follow the existing coding style for consistency.
- **Commit Messages**: Use clear and descriptive commit messages.
- **Feature Branching**: Create a new branch for each feature or bug fix.
- **Pull Requests**: Submit pull requests with a detailed description of changes.

## Useful Resources
- **Redux Toolkit Documentation**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **GraphQL Documentation**: [GraphQL](https://graphql.org/learn/)
- **React Documentation**: [React](https://reactjs.org/)
- **AWS SDK for JavaScript**: [AWS SDK](https://docs.aws.amazon.com/sdk-for-javascript/)

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
