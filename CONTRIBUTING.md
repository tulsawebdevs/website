# Contributing to the Tulsa Web Developers Website

## How to Contribute
Contributions are what make the open-source community an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

## Getting Started
This project has been containerized with [Docker](https://docs.docker.com/) for OS and framework agnostic contributions and conveinence.
1. **Fork the Repository**: Click the fork button to create a copy of the repository.
2. **Clone Your Fork**: Clone the repository to your local machine.
    ```
    git clone <your-fork-url>
    ```
3. **Launch the Project**: Navigate to the project directory and run:
    ```
    docker-compose up
    ```

## Branch Naming Conventions
- Use clear, descriptive names for branches.
- Prefix branches with `feature/`, `issue/`, `bugfix/`, or `hotfix/` based on the work.

## Pre-commit Setup
To set up pre-commit hooks for your project, you'll need to install the pre-commit package manager.

This can be done using pip with pip install pre-commit. Then, create a .pre-commit-config.yaml in your project's root directory to define which hooks you want to use. You can generate a basic configuration with pre-commit sample-config. After setting up your configuration, use pre-commit install to install git hook scripts, which will automatically run pre-commit on every commit. For detailed instructions and more options, visit [pre-commit.com](https://pre-commit.com/#:~:text=If%20you%20want%20to%20manually,first%20time%20may%20be%20slow.).

## Continuous Integration (CI) Process
Our project uses GitHub Actions for continuous integration (CI) and deployment to ensure code quality and to automate the deployment process. Here’s a brief overview of our workflows and how they impact your contributions.

### Deploy to GitHub Pages Workflow

**Trigger**: This workflow is triggered on pushes to the dev branch and can also be run manually via GitHub's Actions tab.

**Purpose**: It's designed to build the project using Astro and deploy it to GitHub Pages. This ensures that our development progress is automatically compiled and made visible for testing and preview.

Steps:

- **Checkout**: The repository's code is checked out for use in the workflow.

- **Build and Upload**: The site is built using Astro, and the output is prepared for deployment.

- **Deployment**: The built site is deployed to GitHub Pages.

**Contributors should target their feature branches towards the dev branch for any site updates or changes. This branch is our staging area for the website.**

### Frontend CI Workflow

**Trigger**: This workflow is activated on push or pull request events for the dev and prod branches. It supports manual triggers as well.

**Purpose**: To ensure that frontend changes (e.g., style updates, JavaScript modifications) do not break the build. It helps maintain the integrity of our codebase.

Steps:

- **Checkout**: The latest code is fetched to the runner.

- **Install Dependencies**: All necessary dependencies are installed.

- **Build Project**: The project is built to validate that changes do not introduce build errors.

**For contributions that involve frontend changes, please ensure that your code passes this CI check before marking your pull request as ready for review.**

Contributions must pass all checks before merging.

## Testing Your Contributions

**Unit Testing**: Contributors should write unit tests for new code and updates. Aim for a high coverage percentage to ensure robustness.

**Integration Testing**: Ensure that your changes integrate seamlessly with existing services. Use automated tools where possible.

**End-to-End Testing**: For critical features, conduct end-to-end testing to simulate real-world scenarios.

- Ensure to run `npm run test` to execute any unit tests.
- For UI changes, visually inspect your changes in multiple browsers.

## Conventional Commits
We follow the Conventional Commits specification. Common prefixes you should use include:
- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
Please see the [Conventional Commits website](https://www.conventionalcommits.org/en/v1.0.0/) for more details.

## Pull Requests Process
1. Fork the Project
2. Clone your Fork
3. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
4. Commit your Changes (`git commit -m 'feat: Add some AmazingFeature'`)
5. Push to the Branch (`git push origin feature/AmazingFeature`)
6. Open a Pull Request

- Ensure any install or build dependencies are removed before the end of the layer when doing a build.
- Update the README.md with details of changes to the interface, including new environment variables, exposed ports, useful file locations, and container parameters.

## Developing/Deploying/Documenting Microservices

**Development**: Follow a consistent coding style across services. Utilize feature branches for new developments.

**Deployment**: Automate deployment using CI/CD pipelines. Ensure each microservice's pipeline is configured for automated testing, building, and deployment.

**Documentation**: Create a README.md in each microservice repository with setup instructions, architecture diagrams, and API endpoints. Maintain a central documentation repository or wiki that links to each microservice for easy navigation.

## 🚀 Project Structure

### Astro Framework
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

## 🧞 Commands

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
Report bugs by opening a new issue. Please include a clear description, as much relevant information as possible, and a code sample or an executable test case demonstrating the expected behavior that is not occurring.

## Code of Conduct
Participants in the project must adhere to our Code of Conduct. Please read [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) for details.

# Thank you for contributing to the Tulsa Web Developers website!
