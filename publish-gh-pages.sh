#!/usr/bin/env sh
ng build -bh angular-travis-ci-heroku --aot -prod 
cd dist/;
git init;
git config user.name "prasanjit-" && git config user.email "mailprasanjit@gmail.com";
git add .;
git commit -m "github page code"
git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" master:gh-pages > /dev/null 2>&1
