# Influencers

> Influencers app for Instagram

[![Build Status](https://travis-ci.com/cesargdm/influencers.svg?token=LsXP7nMr91SKiiystJTt&branch=master)](https://travis-ci.com/cesargdm/influencers)
[![Dependencies](https://david-dm.org/cesargdm/influencers.svg)](https://david-dm.org/cesargdm/influencers)
[![Code Climate](https://codeclimate.com/repos/58caa635f63976025900181b/badges/0b14f6e27ed6c2068811/gpa.svg)](https://codeclimate.com/repos/58caa635f63976025900181b/feed)

## Versions

Dependencies versions

| Module   | Version  |
| -------- | -------- |
| NodeJS   | v6.10.1  |
| NPM      | v3.10.10 |
| MongoDB  | v3.4.2   |
| Python   | v2.7.10  |
| PyMongo  | v3.4.0   |

## Install

Install Node dependencies
```
npm i
```
or
```
yarn
```

## Run

> Global gulp is needed

**Development Mode**
Starts node server with nodemon on 8080, compiles into bundles and listen for .scss and .js changes

```
gulp develop
```
**Production Mode**
Compiles .scss and .js into bundles in *dist/* with optimization

```
gulp build
```

**Test**
> [PhantomJS](http://phantomjs.org) is required to run tests.

The program runs a Karma test with mocha in PhantomJS

```
gulp test
```

## License
&copy; Kamikaze Followers, Coma México
