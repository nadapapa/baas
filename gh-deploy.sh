#!/bin/bash
set -e # Exit with nonzero exit code if anything fails

SOURCE_BRANCH="master"
TARGET_BRANCH="gh-pages"

function doCompile {
  echo "ng build -prod";
  ./node_modules/@angular/cli/bin/ng build --deploy-url /baas --base-href /baas
}

# Pull requests and commits to other branches shouldn't try to deploy, just build to verify
if [ "$TRAVIS_PULL_REQUEST" != "false" -o "$TRAVIS_BRANCH" != "$SOURCE_BRANCH" ]; then
    echo "Skipping deploy; just doing a build."
    exit 0
fi

# Save some useful information
REPO=`git config remote.origin.url`
SSH_REPO=${REPO/https:\/\/github.com\//git@github.com:}
SHA=`git rev-parse --verify HEAD`

# Clone the existing gh-pages for this repo into dist/
# Create a new empty branch if gh-pages doesn't exist yet (should only happen on first deply)
echo "git clone ${REPO} out"
git clone $REPO out

echo "cd out"
cd out

# Clean out existing contents except .git
echo "Clean out existing contents except .git"
git rm -rf .
git clean -fxd
ls -hal

echo "git checkout ${TARGET_BRANCH} || git checkout --orphan ${TARGET_BRANCH}"
git checkout $TARGET_BRANCH || git checkout --orphan $TARGET_BRANCH

echo "cd ..";
cd ..
pwd

# Run our compile script
doCompile

# copy compiled output
echo "cp -r dist/* out/"
cp -r dist/* out/

# Now let's go have some fun with the cloned repo
cd out
git config user.name "Travis CI"
git config user.email "$COMMIT_AUTHOR_EMAIL"

# Commit the "changes", i.e. the new version.
# The delta will show diffs between new and old versions.
git status

echo "git add -f ."
git add -f .

echo "git commit -m \"Deploy to GitHub Pages: ${SHA}\""
git commit -m "Deploy to GitHub Pages: ${SHA}"

# Get the deploy key by using Travis's stored variables to decrypt deploy_key.enc
ENCRYPTED_KEY_VAR="encrypted_${ENCRYPTION_LABEL}_key"
echo "encrypted key: ${ENCRYPTED_KEY_VAR}"

ENCRYPTED_IV_VAR="encrypted_${ENCRYPTION_LABEL}_iv"
echo "encrypted IV: ${ENCRYPTED_IV_VAR}"

ENCRYPTED_KEY=${!ENCRYPTED_KEY_VAR}
ENCRYPTED_IV=${!ENCRYPTED_IV_VAR}
openssl aes-256-cbc -K $ENCRYPTED_KEY -iv $ENCRYPTED_IV -in ../travis.enc -out ../travis -d
chmod 600 ../travis
eval `ssh-agent -s`
ssh-add ../travis

# Now that we're all set up, we can push.
echo "git push ${SSH_REPO} ${TARGET_BRANCH}"
git push $SSH_REPO $TARGET_BRANCH