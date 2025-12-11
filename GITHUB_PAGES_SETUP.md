# GitHub Pages Deployment Setup

This project is configured to automatically deploy to GitHub Pages when you push to the `main` branch.

## Initial Setup

1. **Enable GitHub Pages in your repository:**
   - Go to your repository on GitHub
   - Navigate to **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions** (not "Deploy from a branch")
   - Save the settings

2. **Push your code:**
   - The workflow will automatically run when you push to the `main` branch
   - You can also manually trigger it from the **Actions** tab → **Deploy to GitHub Pages** → **Run workflow**

3. **Access your site:**
   - After the first deployment completes, your site will be available at:
     - If your repo is named `username.github.io`: `https://username.github.io`
     - If your repo has a different name (like `wedsite`): `https://username.github.io/wedsite/`
   - **Important**: Make sure you're accessing the site from the account that owns the repository (e.g., if repo is under `dustmodebros`, use `https://dustmodebros.github.io/repo-name/`)

## How It Works

- The GitHub Actions workflow (`.github/workflows/deploy.yml`) automatically:
  - Builds your Vite + React app
  - Deploys it to GitHub Pages
  - Sets the correct base path based on your repository name

- The base path is automatically configured:
  - For repositories named `*.github.io`: base path is `/`
  - For other repositories: base path is `/repository-name/`

## Custom Domain (Optional)

If you want to use a custom domain:

1. Add a `CNAME` file in the `public/` directory with your domain name
2. Configure DNS settings for your domain to point to GitHub Pages
3. Update the base path in `vite.config.ts` to `/` (or remove the base setting)

## Troubleshooting

- **Build fails?** Check the Actions tab for error messages
- **Site not loading?** Make sure GitHub Pages is enabled and the workflow completed successfully
- **404 errors?** 
  - Verify the base path matches your repository name
  - Make sure you're accessing the site from the correct GitHub account (the one that owns the repository)
  - Check that the repository is under the account you want to host from (Settings → General → Repository name shows the owner)
  - If you're committing from one account but hosting from another, make sure the repository is transferred to or created under the hosting account



