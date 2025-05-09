
# GitHub Pages Deployment

This GitHub workflow automatically builds and deploys your InvestEd site to GitHub Pages whenever changes are pushed to the main branch.

## Setup Instructions

1. Go to your GitHub repository
2. Navigate to Settings > Pages
3. Under "Source", select "GitHub Actions"
4. Make sure the repository has proper permissions set for GitHub Pages

The site will be automatically built and deployed when changes are pushed to the main branch.

## Local Development

You can still use `npm run dev` for local development. The GitHub Pages configuration only affects the production deployment.
