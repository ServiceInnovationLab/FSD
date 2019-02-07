# Family Services Directory Searchinator
[![CircleCI](https://circleci.com/gh/ServiceInnovationLab/fsd-spike.svg?style=svg)](https://circleci.com/gh/ServiceInnovationLab/fsd-spike)
[![Waffle.io - Columns and their card count](https://badge.waffle.io/ServiceInnovationLab/fsd-spike.png?columns=all)](https://waffle.io/ServiceInnovationLab/FSD?utm_source=badge)

This runs [on github pages](https://serviceinnovationlab.github.io/fsd-spike/)

## Overview
A React frontend for the existing Family Services Directory providing keyword, category, and location-based search results

## Environments
**Environment** | **URL**  | **Git Branch**
--- | --- | ---
Github Pages | https://serviceinnovationlab.github.io/fsd-spike/ | master |

## Project Resources

**Resource** | **URL**
--- | ---
Backlog | https://waffle.io/ServiceInnovationLab/fsd-spike
CI | https://circleci.com/gh/ServiceInnovationLab/fsd-spike

**Role(s)** | **Name(s)**
--- | ---
Team | Family Services Directory Searchinator
Developers | [Brenda Wallace](https://github.com/Br3nda), [Dana Iti](https://github.com/dlouise64), [Jacob Ong](https://github.com/JacOng17), [Lyall Morrison](https://github.com/lamorrison), [Mischa Saunders](https://github.com/mischa-s)
Designers |
Testers | 
Project Manager |
Product Owner |

## Comms
Slack: LabPlus-team #family-searchinator

## Setup

## Development

to install dependencies, cd into folder and run
```
npm install
```

to run a development server:
```
npm start
```

### Major Dependencies

### Quality assurance tools

## Deployment

To deploy to github pages, checkout the branch you want to deploy and then run
```
npm run deploy
```

To build a static copy instead, run:
```
npm run build
```

## Testing

To run Jest tests
```
npm test
```

To run Cucumber tests (not currently included in the CI pipeline)
```
npm run cucumber
```
Cucumber reports are generated in `features/reports/cucumber-report.html`
