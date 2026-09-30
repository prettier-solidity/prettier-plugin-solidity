# How to publish

New versions are published to npm by the [Release workflow](.github/workflows/release.yml) when a GitHub release is published.

```bash
nvm use

git checkout main

git pull
```

- Create a branch with the name of the new version number, e.g.: `git checkout -b 2.1.0`

- Bump the version in the package.json file

- `npm i`

```bash
git add .

git commit -m 'bump version'

git push
```

- Open a PR and wait for it to be merged

- Add a new release in GitHub: https://github.com/prettier-solidity/prettier-plugin-solidity/releases/new

- The tag version and the name should be prefixed by a `v` followed by the new version number; e.g.: `v2.1.0`. Mark it as a pre-release to publish it under npm's `next` tag instead of `latest`

- Publishing the release starts the Release workflow. It checks that the tag matches the version in package.json, runs the whole CI (lint, tests on every Node version and OS, and the standalone bundle on Node and every browser), and then publishes the package to npm. You can follow it in the repository's Actions tab

## One-time setup

The workflow uses npm's [trusted publishing](https://docs.npmjs.com/trusted-publishers), so it doesn't need an npm token. It has to be enabled once on npmjs.com, by someone with publish rights, in the package's settings under "Trusted Publisher":

- Publisher: GitHub Actions
- Organization or user: `prettier-solidity`
- Repository: `prettier-plugin-solidity`
- Workflow filename: `release.yml`
