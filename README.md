# typo3-scp-deployment


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
    - name: install bash
      uses: actions/checkout@v3

    - name: deploy extension to production server
      uses: peni4142/typo3-scp-deployment@main
      with:
        host: ${{ secrets.TYPO3_SERVER_HOST }}
        user_name: ${{ secrets.TYPO3_SERVER_USERNAME }}
        user_password: ${{ secrets.TYPO3_SERVER_PASSWORD }}
        target_path: ${{ vars.EXTENSION_PATH }}
```
