# Pull Request Template

- Fixes: <!-- #(issue) -->
- Closes: <!-- #(issue) -->

## Checklist

- [ ] This PR conforms to the guidelines in [CONTRIBUTING.md](../CONTRIBUTING.md)
  - [ ] It has a descriptive title
  - [ ] My commits conform to the [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) specification
- [ ] This PR is not a duplicate of a similar PR ([how to search issues](https://docs.github.com/en/issues/tracking-your-work-with-issues/filtering-and-searching-issues-and-pull-requests) for similar/duplicate PRs, which this is not
- [ ] This PR targets the `dev` branch
- [ ] I ran the pre-commit hooks or `npm test && npm lint && npm test:e2e` and all tests pass

<hr>

## Description

<!--
Please include a summary of the change and which issue it addresses. Include the motivation for the changes and any additional context.
-->

## Type of Change

<!--
Please delete options that are not relevant.
-->

- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update
- [ ] Code cleanliness (removal of unnecessary comments or debug logs)

## How Has This Been Tested?

<!--
Please describe the tests that you ran to verify your changes.
- Please Provide instructions so we can reproduce the scenarios.
- Please List any relevant details for your test configuration.

    - [ ] Test A
    - [ ] Test B
-->
<!--
**Test Configuration** (Optional):

- Firmware version:
    -  If you know the version of any specific software you used, list it here. If unsure, you can leave it blank.
- Hardware:
    -  Mention your computer or device model if your changes are hardware-dependent. If not, it's okay to skip.
- Toolchain:
    - This refers to the set of programming tools you used. For beginners, it could be the IDE (Integrated Development Environment) like Visual Studio Code.
- SDK:
    - Mention any specific Software Development Kit versions you used. If you didn't use any, no need to include it.
-->

## Microservices and API Integration

- [ ] If applicable, my changes are compatible with the project's microservices architecture and API gateway integration requirements.

## Checklist:

- [ ] My code follows the style guidelines of this project
- [ ] I have made corresponding changes to the documentation
- [ ] I have removed all unnecessary comments and debug log statements
- [ ] I have linked this PR to its corresponding issue

## Screenshots (if appropriate):

Please review and suggest any further insights, improvements, or modifications needed.
