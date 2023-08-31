# typo3-scp-deployment

These extensions is wrapping the SCP action of appleboy for TYPO3 extensions. https://github.com/appleboy/scp-action

It only works for linux.


This action is for TYPO3 extensions. This action copy the whole repo except the .git and .github directories to the speciefied path. So the eextension root path should also be the repository root path. What basically was my use-case for this extension.

## Example how to use

`.github/workflow/[filename].yml`
```
name: Typo3_Extension

on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    env:
      CI: false

    steps:
    - name: deploy extension to production server
      uses: peni4142/typo3-scp-deployment@main
      with:
        host: ${{ secrets.TYPO3_SERVER_HOST }}
        user_name: ${{ secrets.TYPO3_SERVER_USERNAME }}
        user_password: ${{ secrets.TYPO3_SERVER_PASSWORD }}
        target_path: ${{ vars.EXTENSION_PATH }}
```
