
# Deployment Instructions

## GitHub Pages (Automatic Deployment)

This project is configured for automatic deployment to GitHub Pages. When you push changes to the main branch, GitHub Actions will automatically build and deploy your site.

### Setup Steps

1. Ensure your repository has GitHub Pages enabled:
   - Go to your repository on GitHub
   - Navigate to Settings > Pages
   - Under "Source", select "GitHub Actions"

2. Push your changes to the main branch:
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin main
   ```

3. Wait for the GitHub Actions workflow to complete (you can check progress in the Actions tab of your repository)

4. Your site will be available at: `https://[your-username].github.io/[repository-name]/`

## Custom Domain Setup

If you want to use a custom domain with your GitHub Pages site:

1. Add your custom domain in the GitHub repository settings:
   - Go to Settings > Pages
   - Under "Custom domain", add your domain and save

2. Configure your DNS records with your domain provider:
   - Add an A record pointing to GitHub Pages IP addresses:
     - 185.199.108.153
     - 185.199.109.153
     - 185.199.110.153
     - 185.199.111.153
   - Or add a CNAME record pointing to `[your-username].github.io`

3. Wait for DNS propagation (can take up to 48 hours)

For more detailed instructions, see [GitHub's documentation](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).
