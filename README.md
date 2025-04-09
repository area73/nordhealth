# Nordhealt challenge

## Challenge task

Create a client-side only rendered Nuxt 3 application that allows people to sign up for a product. If you don't have any experience with Nuxt 3, it's OK to only use Vue 3. The form should contain fields for email and password, which should be required and show an error if no value is entered. The password field should have a way to make the password visible. The user should be able to choose to receive occasional product updates and announcements. Once signed up, they should be presented with a success page.

Please use the Provet Cloud Design System ([https://provetcloud.design/]) appropriately.

Read https://provetcloud.design/web-components/#installation-1 to learn how to use the Provet components in Vue. If possible, use TypeScript; however, JavaScript is also fine.

## Decision constrains

- **Use Nuxt3 / Vue3**
  Since we're tasked with building a client-side only application, I don't see a need for a Nuxt3 application—its main advantage is enabling server-side rendering. Moreover, using Nuxt3 would add unnecessary complexity, so I've decided to stick with Vue 3 to keep things simple.

- **Use Typescript**

  Using a robust type system can make our code more resilient to changes. Since the Provet Cloud Design System's Vue 3 components already come with predefined types that we plan to use, I believe adopting TypeScript is a smart choice—the benefits of strong typing outweigh the added complexity.

- Use Provet Cloud Design System (https://provetcloud.design/)

## Planing

- Create a signup page with description above
- create a success page
- Add functional / e2e test

---

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
