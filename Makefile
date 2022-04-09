install:
		npm install

publish:
		npm publish --dry-run

build:
		npm build

test:
		npm test

test-coverage:
		npm test -- --coverage --coverageProvider=v8

start:
		npx babel-node -- src/bin/gendiff.js

lint:
		npx eslint .

.PHONY: test