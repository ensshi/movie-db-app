# MovieDbApp

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed. You can download them from Node.js official website.

- Angular CLI installed globally. You can install it using the following command:

```bash
npm install -g @angular/cli
```

## Setup

1. Clone this repository to your local machine.

```bash
git clone https://github.com/ensshi/movie-db-app.git
cd movie-db-app
```

2. Install dependencies

```bash
npm install
```

3. Paste API_DEV_KEY key from email to src/environments/environment.development.ts

```typescript
export const environment = {
  production: false,
  apiKey: "API_DEV_KEY",
};
```

## Development server

Run development server

```bash
ng serve
```

Navigate to http://localhost:4200/ in your browser to view the application.
