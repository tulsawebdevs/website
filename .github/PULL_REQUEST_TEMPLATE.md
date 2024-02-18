# Pull Request Template

IMPORTANT: Please review the [CONTRIBUTING.md](../CONTRIBUTING.md) file for detailed contributing guidelines.

**PLEASE REMOVE UNNECESSARY CONTENT FROM THIS TEMPLATE BEFORE SUBMITTING**

Please, go through these steps before you submit a PR.

1. Make sure that your PR is not a duplicate.
2. If not, then make sure that:

    a. You have done your changes in a separate branch. Branches MUST have descriptive as outlined in the CONTRIBUTING.md

    b. You have a descriptive commit message with a short title (first line).

    c. You have only one commit (if not, squash them into one commit).

    d. `npm test` doesn't throw any error. If it does, fix them first and amend your commit (`git commit --amend`).

3. **After** these steps, you're ready to open a pull request.

    a. Your pull request MUST NOT target the `prod` branch on this repository. You probably want to target `dev` instead.

    b. Give a descriptive title to your PR.

    c. Describe your changes.(Follow Structure Below)

    d. Put `closes #XXXX` in your comment to auto-close the issue that your PR fixes (if such).

<hr>

## Description
Please include a summary of the change and which issue it addresses. Include the motivation for the changes and any additional context.

- Fixes #(issue)
- Closes #(issue)

## Type of Change
Please delete options that are not relevant.
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update
- [ ] Code cleanliness (removal of unnecessary comments or debug logs)

## How Has This Been Tested?

Please describe the tests that you ran to verify your changes.
- Please Provide instructions so we can reproduce the scenarios.
- Please List any relevant details for your test configuration.

    - [ ] Test A
    - [ ] Test B

**Test Configuration** (Optional):
* Firmware version:
    -  If you know the version of any specific software you used, list it here. If unsure, you can leave it blank.
* Hardware:
    -  Mention your computer or device model if your changes are hardware-dependent. If not, it's okay to skip.
* Toolchain:
    - This refers to the set of programming tools you used. For beginners, it could be the IDE (Integrated Development Environment) like Visual Studio Code.
* SDK:
    - Mention any specific Software Development Kit versions you used. If you didn't use any, no need to include it.

## Microservices and API Integration
- [ ] If applicable, my changes are compatible with the project's microservices architecture and API gateway integration requirements.

## Checklist:
- [ ] My code follows the style guidelines of this project
- [ ] I have performed a self-review of my own code
- [ ] I have commented on my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] Any dependent changes have been merged and published in downstream modules
- [ ] I have removed all unnecessary comments and debug log statements
- [ ] I have linked this PR to its corresponding issue

## Screenshots (if appropriate):


Please review and suggest any further insights, improvements, or modifications needed.
