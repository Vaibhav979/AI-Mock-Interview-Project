# Environment Setup Guide

## Securing API Keys and Client Secrets

This guide explains how to set up environment variables to securely manage your API keys and client secrets.

## Backend Setup (Spring Boot)

### 1. Create Environment File
Copy the `.env.example` file to `.env` in the root directory:
```bash
cp .env.example .env
```

### 2. Fill in Your Values
Edit the `.env` file with your actual values:
```
# API Keys
GEMINI_API_KEY=your_actual_gemini_api_key_here
HUME_API_KEY=your_actual_hume_api_key_here

# Database Configuration
DATABASE_URL=jdbc:mysql://localhost:3306/mockinterview
DATABASE_USERNAME=your_actual_database_username
DATABASE_PASSWORD=your_actual_database_password

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your_actual_google_client_id_here
GOOGLE_CLIENT_SECRET=your_actual_google_client_secret_here
```

### 3. Running the Application
Spring Boot will automatically read these environment variables. You can run the application normally:
```bash
./mvnw spring-boot:run
```

## Frontend Setup (React/Vite)

### 1. Create Environment File
Copy the `LandingPage/.env.example` file to `LandingPage/.env`:
```bash
cd LandingPage
cp .env.example .env
```

### 2. Fill in Your Values
Edit the `LandingPage/.env` file with your actual values:
```
# Google OAuth Client ID for React
VITE_GOOGLE_CLIENT_ID=your_actual_google_client_id_here

# API Base URL (optional)
VITE_API_BASE_URL=http://localhost:8080
```

### 3. Running the Application
Vite will automatically load environment variables prefixed with `VITE_`. Run the frontend:
```bash
cd LandingPage
npm install
npm run dev
```

## Important Notes

1. **Never commit `.env` files** - They are excluded from git via `.gitignore`
2. **Use different values for development and production** - Create separate `.env` files for different environments
3. **Environment variables are case-sensitive** - Use the exact names specified
4. **Restart applications after changing `.env` files** - Changes won't take effect until you restart

## Production Deployment

For production deployment, set environment variables directly on your hosting platform:
- Heroku: Use Config Vars in dashboard
- AWS: Use Elastic Beanstalk environment properties
- Docker: Use `-e` flag or docker-compose environment section
- Vercel/Netlify: Use environment variables in project settings

## Security Best Practices

- Rotate API keys regularly
- Use different API keys for different environments
- Never hardcode secrets in source code
- Use secret management services for production
- Regularly audit access to sensitive keys
