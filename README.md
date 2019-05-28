# Family Services Directory Searchinator
![dependencies](https://david-dm.org/ServiceInnovationLab/FSD.svg)
[![CircleCI](https://circleci.com/gh/ServiceInnovationLab/FSD.svg?style=svg)](https://circleci.com/gh/ServiceInnovationLab/FSD)

This runs [on github pages](https://serviceinnovationlab.github.io/FSD/) but has a lovely custom domain name http://family.services.govt.nz

## Overview
A React frontend for the existing Family Services Directory providing keyword, category, and location-based search results

## Environments
**Environment** | **URL**  | **Git Branch**
--- | --- | ---
Github Pages | https://serviceinnovationlab.github.io/FSD/ | master |

## Project Resources

**Resource** | **URL**
--- | ---
Backlog | https://github.com/orgs/ServiceInnovationLab/projects/8
CI | https://circleci.com/gh/ServiceInnovationLab/FSD

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

Make a copy of the example environment file containing some important settings
```
cp example.env .env
```

To install dependencies, cd into folder and run
```
npm install
```

To run a development server:
```
npm start
```

### Major Dependencies
- React (^16.6.3)


### Quality assurance tools

- jest
- cucumber

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
