# Contributing to the Tulsa Web Devs Website

## Table of Contents

1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
3. [Docker Setup](#docker-setup)
4. [Developing/Deploying/Documenting Microservices](#developingdeployingdocumenting-microservices)
5. [Git Branch Naming Conventions](#git-branch-naming-conventions)
6. [Pre-commit Setup](#pre-commit-setup)
7. [Continuous Integration (CI) Process](#continuous-integration-ci-process)
8. [Testing Your Contributions](#testing-your-contributions)
9. [Conventional Commits](#conventional-commits)
10. [Pull Requests Process](#pull-requests-process)
11. [Astro Project Structure](#astro-project-structure)
12. [Useful Commands](#useful-commands)
13. [Reporting Bugs](#reporting-bugs)
14. [Code of Conduct](#code-of-conduct)
15. [Contact Information](#contact-information)

## Introduction

Contributions are what make the open-source community an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**. Please use this as a guide to assist in your contributions to our community. This guide aims to streamline the contribution process, making it easier for everyone to participate and contribute effectively to the Tulsa Web Devs Website. Whether you're fixing a bug, adding a new feature, or improving documentation, your efforts help us grow and improve.

## Getting Started

1. **Fork the Repository**: Click the fork button to create a copy of the repository.
2. **Clone Your Fork**: Clone the repository to your local machine.

   ```
   git clone <your-fork-url>
   ```

This project has been containerized with [Docker](https://docs.docker.com/) for OS and framework agnostic contributions and conveinence.

3. **Launch the Project**: Navigate to the project directory and run if you are adding no dependencies:

   ```
   docker-compose up
   ```

   **If you're not using Docker, just running `npm install` after you download the project will work too.**

## Docker Setup

To work on our project with Docker (a tool that makes it easy for everyone to run the project the same way), here's what to do:

#### If the project is running and you want to add a new tool or library, type:

`docker-compose exec app npm install [the name of what you're adding]`.

#### If you're not running the project, but still want to add something, use:

`docker-compose run --rm app npm install [the name of what you're adding]`.
This helps keep things simple and consistent for everyone, especially if you're new. It's best to use Docker for these steps.

## Developing/Deploying/Documenting Microservices

For Contributors: Simplified Microservices Workflow

- **Development**: We use a common style for coding. When adding features, create a new branch named feature/your-feature-name.
- **Deployment**: Our projects use automated systems (CI/CD) to test, build, and deploy code. Make sure your code passes these checks.
- **Documentation**: Write a simple guide for your microservice, including how to set it up, its design, and what it does.

We link all guides in one place for easy access.

Everything’s organized around an API gateway, making it easier to combine our services for the website. Don’t worry if you’re new; this process helps everyone contribute effectively.

## Git Branch Naming Conventions

These prefixes are among the most commonly used in branch naming conventions:

- `feature/`: For new features or additions to the project.
- `issue/`: For work related to a specific issue tracked in the project's issue tracker.
- `bugfix/`: For fixes that address bugs in the project.
- `hotfix/`: For urgent fixes to be applied directly to a production environment.

Check out this resources for more details
[Best Practices to Follow](https://phoenixnap.com/kb/git-branch-name-convention)

_While working in your own fork you are welcome to work off your own `main` branch and label pull requests descriptively instead if preferred_

## Pre-commit Setup

To set up pre-commit hooks for your project, you'll need to install the pre-commit package manager.

This can be done using pip with pip install pre-commit. Then, create a .pre-commit-config.yaml in your project's root directory to define which hooks you want to use.
You can generate a basic configuration with pre-commit sample-config. After setting up your configuration, use pre-commit install to install git hook scripts, which will automatically run pre-commit on every commit. For detailed instructions and more options, visit [pre-commit.com](https://pre-commit.com/#:~:text=If%20you%20want%20to%20manually,first%20time%20may%20be%20slow.).

- **This file has already been set up in this repository**
- use **pre-commit install**

## Continuous Integration (CI) Process

Our project uses GitHub Actions for continuous integration (CI) and deployment to ensure code quality and to automate the deployment process. Here’s a brief overview of our workflows and how they impact your contributions.

### Deploy to GitHub Pages Workflow

**Purpose**: It's designed to build the project using Astro and deploy it to GitHub Pages. This ensures that our development progress is automatically compiled and made visible for testing and preview.

Steps:

- **Checkout**: The repository's code is checked out for use in the workflow.

- **Build and Upload**: The site is built using Astro, and the output is prepared for deployment.

- **Deployment**: The built site is deployed to GitHub Pages. It will be deployed when commits are tagged for relase with semver.

**Contributors should target their feature branches towards the dev branch for any site updates or changes. This branch is our staging area for the website.**

### Frontend CI Workflow

**Trigger**: This workflow is activated on push or pull request events for the prod branch. It supports manual triggers as well.

**Purpose**: To ensure that frontend changes (e.g., style updates, JavaScript modifications) do not break the build. It helps maintain the integrity of our codebase.

Steps:

- **Checkout**: The latest code is fetched to the runner.

- **Install Dependencies**: All necessary dependencies are installed.

- **Build Project**: The project is built to validate that changes do not introduce build errors.

**For contributions that involve frontend changes, please ensure that your code passes this CI check before marking your pull request as ready for review.**

Contributions must pass all checks before merging.

## Testing Your Contributions

**Unit Testing**: Contributors should write unit tests for new code and updates. Aim for a high coverage percentage to ensure robustness.

**Integration Testing**: Ensure that your changes integrate seamlessly with existing services. Write automated tests with Vitest when possible.

- Run `npm run test` to execute any unit or integration tests.

**End-to-End Testing**: For critical features, conduct end-to-end testing to simulate real-world scenarios.

- Run `npm run test:e2e` to execute End to End browser tests with Playwright
- For UI changes, visually inspect your changes in multiple browsers.

## Conventional Commits

We follow the Conventional Commits specification which outlines a structured format for commit messages to make them more readable and easier to automate. Here's a brief explanation of common prefixes:

- `feat`: Introduces a new feature.
- `fix`: Fixes a bug.
- `docs`: Documentation changes or improvements.
- `style`: Code style changes (formatting, missing semi-colons, etc.) without affecting meaning.
- `refactor`: Code changes that neither fix a bug nor add a feature.
- `test`: Adding missing tests or correcting existing tests.
- `chore`: Changes to the build process or auxiliary tools and libraries such as documentation generation.

Please see the [Conventional Commits website](https://www.conventionalcommits.org/en/v1.0.0/) for more details.

## Pull Requests Process

1. Fork the Project
2. Clone your Fork
3. Create your Feature Branch if desired (`git checkout -b feature/AmazingFeature`)
4. Commit your Changes (`git commit -m 'feat: Add some AmazingFeature'`)
   **[see above commit prefixes](#conventional-commits)**
5. Push to the Branch (`git push origin feature/AmazingFeature`)
6. Open a Pull Request against the `tulsawebdevs/website:prod` branch

- Ensure any install or build dependencies are removed before the end of the layer when doing a build.
- Update the README.md with details of changes to the interface, including new environment variables, exposed ports, useful file locations, and container parameters.

## Astro Project Structure

This project is built using the Astro framework. For a deeper understanding and to troubleshoot any Astro-specific issues, please refer to the [Astro Documentation](https://docs.astro.build).

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   └── Card.astro
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## Useful Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## Reporting Bugs

Report bugs by opening a new issue. Please include a clear description, as much relevant information as possible, and, most importantly, a [minimum reproducible example (instructions)](https://stackoverflow.com/help/minimal-reproducible-example).

## Code of Conduct

Participants in the project must adhere to our Code of Conduct. Please read [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) for details.

## Contact Information

For any questions or concerns, please reach out to us via [GitHub Issues](https://github.com/tulsawebdevs/website/issues) or for members [#ug-tulsawebdevs Slack Channel](https://techlahoma.slack.com/archives/C0HM5SS7P).

If you are not currently a member of Techlahoma please [Check out how to become a member here.](https://www.techlahoma.org/how-to-be-a-member)

# Thank you for contributing to the Tulsa Web Devs website!
