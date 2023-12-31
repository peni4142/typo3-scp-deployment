# typo3-scp-deployment

This extension is wrapping the SCP action of appleboy for TYPO3 extensions. https://github.com/appleboy/scp-action

It only works for Linux.

This action is for TYPO3 extensions. This action copies the whole repo except the .git and .github directories to the specified path. So, the extension root path should also be the repository root path. That is my use case for this extension.

If you have some improvements, feel free to contribute by PR.


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
