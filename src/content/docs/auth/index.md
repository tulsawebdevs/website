---
---

This project uses [Clerk](https://clerk.com/docs) for authentication and user management. Clerk is a modern, secure, and scalable user authentication and identity management platform. It provides a complete user management system, including user registration, login, and password reset. This guide will illustrate how to use Clerk in this project.

## Front-End

On the front-end, Clerk is powered by `@clerk/clerk-js`, the official JavaScript front-end client for Clerk. The Clerk object is stored in-memory and can be accessed by importing the `clerkStore` [nanostore](https://docs.astro.build/en/recipes/sharing-state-islands/) from `features/auth/clerk`.

```jsx
import { clerkStore } from 'features/auth/clerk';

// Access the Clerk object
const clerk = clerkStore.get();

// Or, subscribe to changes in the Clerk object
clerkStore.subscribe((clerk) => {
  // Do something with the Clerk object
});
```

For convenience in React islands, you can simply import and call the `useClerk` hook from `features/auth/useClerk`:

```jsx
import { useClerk } from 'features/auth/useClerk';

export default function MyComponent() {
  const clerk = useClerk();

  if (clerk) {
    // Do something with the Clerk object
  }
}
```

### Session Management

#### Signing In

Clerk provides a pre-built sign-in form that you can use to authenticate users. To use the sign-in form, import the `SignInButton` component from `features/auth/SignInButton`.

### Accessing User Data

### Sending Authenticated Requests

To make authenticated requests from the frontend, the approach differs based on whether your client and server are on the same origin.

The origin includes the protocol, hostname, and port (optional):

<protocol>//<hostname>[:<port>]

#### Same-origin

For same-origin requests, refer to the guide on [making same-origin requests](https://clerk.com/docs/backend-requests/making/same-origin).

#### Cross-origin

For cross-origin requests, refer to the guide on [making cross-origin requests](https://clerk.com/docs/backend-requests/making/cross-origin).

## Back-End
