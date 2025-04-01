# Nordhealt challenge

## Challenge task

Create a client-side only rendered Nuxt 3 application that allows people to sign up for a product. If you don't have any experience with Nuxt 3, it's OK to only use Vue 3. The form should contain fields for email and password, which should be required and show an error if no value is entered. The password field should have a way to make the password visible. The user should be able to choose to receive occasional product updates and announcements. Once signed up, they should be presented with a success page.

Please use the Provet Cloud Design System ([https://provetcloud.design/]) appropriately.

Read https://provetcloud.design/web-components/#installation-1 to learn how to use the Provet components in Vue. If possible, use TypeScript; however, JavaScript is also fine.

## Constrains

- Use Nuxt3
- Use Typescript
- disable SSR (build a client-side only)
  In the `nuxt.config.ts` file, we will disable server-side rendering:

```js
export default defineNuxtConfig({
  ssr: false, // Disable server-side rendering for client-side only application
});
```

- Use Provet Cloud Design System (https://provetcloud.design/)

## Planing

- Create a signup page with description above
- create a succes page

---

## How to run the project

### Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

### Setup

Make sure to install dependencies:

```bash
# npm
npm install
```

### Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

```

### Production

Build the application for production:

```bash
# npm
npm run build

```

Locally preview production build:

```bash
# npm
npm run preview

```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
