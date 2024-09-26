
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

## Setup and Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Variables**:
   - Create a `.env` file in the root directory and add the following variables:
     ```
     MONGO_URI=<Your MongoDB URI>
     PORT=5001
     ```

4. **Start the server**:
   ```bash
   npm start
   ```

5. **Sync Initial Data** (optional):
   - To sync initial portfolio data from the JSON file to MongoDB:
   ```bash
   node scripts/syncPortfolio.js
   ```

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
