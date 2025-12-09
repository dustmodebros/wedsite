# Troubleshooting GitHub Pages 404 Errors

If you're getting a 404 error on `https://dustmodebros.github.io/wedsite/`, follow these steps:

## Step 1: Verify GitHub Pages is Enabled

1. Go to your repository: `https://github.com/dustmodebros/wedsite`
2. Click **Settings** → **Pages**
3. Under **Source**, make sure it says **"GitHub Actions"** (NOT "Deploy from a branch")
4. If it's not set to GitHub Actions, change it and save

## Step 2: Check the Workflow Run

1. Go to the **Actions** tab in your repository
2. Look for the latest "Deploy to GitHub Pages" workflow run
3. Click on it to see if it completed successfully
4. Check the "Set base path" step - it should show: `Using base path: /wedsite/`
5. If the workflow failed, check the error messages

## Step 3: Verify the Base Path

The workflow automatically sets the base path based on your repository name:
- Repository: `dustmodebros/wedsite` → Base path: `/wedsite/`
- Repository: `dustmodebros/dustmodebros.github.io` → Base path: `/`

You can verify this in the workflow logs under the "Set base path" step.

## Step 4: Check the Deployment

1. After the workflow completes, wait 1-2 minutes for GitHub Pages to update
2. Go to **Settings** → **Pages** and check the deployment status
3. You should see a green checkmark and a URL

## Step 5: Clear Browser Cache

Sometimes browsers cache the 404 page. Try:
- Hard refresh: `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)
- Open in incognito/private mode
- Clear browser cache

## Step 6: Verify Repository Ownership

Make sure the repository is actually under the `dustmodebros` account:
- The URL should be: `https://github.com/dustmodebros/wedsite`
- If it's under a different account, you need to transfer it or create it under `dustmodebros`

## Step 7: Manual Workflow Trigger

If the workflow hasn't run:
1. Go to **Actions** tab
2. Click **Deploy to GitHub Pages** workflow
3. Click **Run workflow** → **Run workflow** (use main branch)
4. Wait for it to complete

## Common Issues

### Issue: "Workflow not found"
- Make sure you've pushed the `.github/workflows/deploy.yml` file
- Check that it's on the `main` branch

### Issue: "Permission denied"
- Go to **Settings** → **Actions** → **General**
- Under "Workflow permissions", select "Read and write permissions"
- Save the changes

### Issue: Base path is wrong
- Check the workflow logs to see what base path was calculated
- The repository name must match: if repo is `wedsite`, base should be `/wedsite/`

## Still Not Working?

1. Check the browser console (F12) for any JavaScript errors
2. Check the Network tab to see if files are loading (look for 404s on JS/CSS files)
3. Verify the built files in the `dist` folder have the correct paths (they should start with `/wedsite/`)

If files in the Network tab show 404s, the base path might not be set correctly during build.

