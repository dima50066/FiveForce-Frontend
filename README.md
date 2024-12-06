# Aqua-Track

Aqua-Track is a web application for tracking water intake. Users can log the amount of water they drink, view their daily and monthly consumption history, and access summary data.

## Technologies

- **React** — For building the user interface.
- **Redux** — For state management.
- **Axios** — For HTTP requests.
- **React Router** — For routing.
- **i18next** — For multi-language support (English, Ukrainian).
- **React Hook Form** & **Formik** — For managing forms.
- **Yup** — For form validation.

## Project Structure

```
src/
├── components/        # Reusable UI components
├── pages/             # Pages of the app
├── redux/             # Redux store and slices
├── utils/             # Helper functions
├── i18next.js         # i18next configuration
└── ...
```

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd aqua-track
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open in your browser at `http://localhost:3000`.

## Environment Variables

Set the following environment variable in a `.env` file:

```
REACT_APP_API_URL=https://your-api-url.com
```

## Scripts

- `npm run dev` — Starts the development server.
- `npm run start` — Previews the production build.
- `npm run build` — Builds the app for production.
- `npm run lint` — Runs ESLint.
- `npm run format` — Runs Prettier.

## Deployment

The project will automatically be built and deployed to GitHub Pages on commits to the `main` branch. Set the `homepage` field in `package.json` to your repository URL:

```json
"homepage": "https://your_username.github.io/your_repo_name/"
```

Then, set GitHub Pages to serve from the `gh-pages` branch.

## Contributions

Feel free to fork and submit pull requests. Open issues for bugs or feature requests.

## License

This project is licensed under the MIT License.
