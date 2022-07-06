#!/bin/bash

# this script can create a review branch
# to merge from one release/feature branch
# to another

set -e


# check to see if there are any changes in the current branch, whatever that is
if [[ -n "$(git diff --name-only HEAD)" ]]; then
  echo "Changes on current branch from HEAD"
  echo "Commit, reset, or stash before continuing."
  exit 1
fi


if [[ $# -ne 3 ]]; then
  echo "Invalid number of arguments"
  echo "should reinvoke with pattern ./mergh.sh from-branch to-branch review-branch-name"
  exit 1
fi

git fetch

FROM_BRANCH=$1
TO_BRANCH=$2
REVIEW_BRANCH=$3

git checkout "${FROM_BRANCH}"
git rebase "origin/${FROM_BRANCH}"
if [[ -n "$(git diff --name-only origin/${FROM_BRANCH})" ]]; then
  echo "You have local changes in ${FROM_BRANCH} that are not in origin."
  echo "Push them to origin or create a separate branch and reset this one before continuing."
  exit 1
fi
git reset --hard "origin/${FROM_BRANCH}"

git checkout "${TO_BRANCH}"
git rebase "origin/${TO_BRANCH}"
if [[ -n "$(git diff --name-only origin/${TO_BRANCH})" ]]; then
  echo "You have local changes in ${TO_BRANCH} that are not in origin."
  echo "Push them to origin or create a separate branch and reset this one before continuing."
  exit 1
fi
git reset --hard "origin/${TO_BRANCH}"

git branch -D "${REVIEW_BRANCH}" >/dev/null || true
git checkout -b "${REVIEW_BRANCH}"
git merge -m "Merge branch '${FROM_BRANCH}' into ${TO_BRANCH}" "${FROM_BRANCH}"
git push --force origin "${REVIEW_BRANCH}"
git fetch

