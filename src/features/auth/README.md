---
title: Authentication with Clerk
---

This project uses [Clerk](https://clerk.com/docs) for authentication and user management. Clerk is a modern, secure, and scalable user authentication and identity management platform. It provides a complete user management system, including user registration, login, and password reset. This guide will illustrate how to use Clerk in this project.

## Front-End (Astro)

On the front-end, Clerk is powered by `@clerk/clerk-js`, the official JavaScript front-end client for Clerk. The Clerk object is stored in-memory and can be accessed by importing the `clerkStore` [nanostore](https://docs.astro.build/en/recipes/sharing-state-islands/) from `features/auth/clerk`.

### In Astro Pages/Components

To access the Clerk object in Astro pages or components, import the `clerkStore` and call the `get` method:

```jsx
import { clerkStore } from 'features/auth/clerk';

// Access the Clerk object
const clerk = clerkStore.get();

// Or, subscribe to changes in the Clerk object
clerkStore.subscribe((clerk) => {
  // Do something with the Clerk object, e.g.

  // Check if the user is signed in
  if (clerk?.session?.user) {
    // Do something
  }

  // Get the user's session
  const session = clerk?.session;
});
```

### In React Islands

For convenience in React islands, there are a few hooks and components provided in `features/auth` that you can use to interact with Clerk.

#### Hooks

- `useClerk`: returns the Clerk object
- `useUser`: returns the user object, or null-ish if the user is not signed in
- `useSession`: returns the session object, or null-ish if the user is not signed in

#### Components

- `SignInButton`: A HoC that renders a button which opens the Clerk sign-in form when clicked
- `UserButton`: A button that displays the logged-in user's name and avatar, and opens a dropdown with user actions when clicked
- `IfAuthorized`: A component that takes an array of 1 or 2 render props as children. A `conditions` props can be passed to check additional roles/permission. The first render prop is called if the user is signed in, and the second render prop is called if the user is not signed in. For example:

```jsx
<IfAuthorized conditions={{ role: 'admin' }}>
  {({ user, session }) => <p>Welcome, {user.name}!</p>}
  {({ user, session, conditions }) => {
    const role = conditions?.role.replace('_', '') ?? 'authorized user';

    return user ?
        <p>
          Sorry, {user.name}, you must have {role} permissions to see this!
        </p>
      : <p>You must be signed in to see this!</p>;
  }}
</IfAuthorized>
```

The `SignInButton` can be given a ref to access the underlying button, and the text/style can be customized via props.

The `UserButton` does not currently provide those options.

### Sending Authenticated Requests

To make authenticated requests from the frontend, the approach differs based on whether your client and server are on the same origin.

The origin includes the protocol, hostname, and port (optional):

<protocol>//<hostname>[:<port>]

#### Same-origin

For same-origin requests, refer to the guide on [making same-origin requests](https://clerk.com/docs/backend-requests/making/same-origin).

#### Cross-origin

For cross-origin requests, refer to the guide on [making cross-origin requests](https://clerk.com/docs/backend-requests/making/cross-origin).

## Back-End

- TODO: Add back-end authentication guide
