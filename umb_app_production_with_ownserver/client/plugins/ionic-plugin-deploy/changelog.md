Changelog
=========

## 0.5.0

* **(breaking)** The plugin is incompatible with `ionic-platform-web-client` 
  version 0.6.0 and lower.
* (fix) Android package is now correctly set as io.ionic
* (fix) Plugin now builds correctly cordova-ios 4.x - PR #50
* (fix) Errors propagate correctly when unzip fails - PR #44
* Updated plugin to communicate directly with the Ionic Platform API

## 0.4.1

* (fix) iOS now correctly updates the version label on deploy extraction

## 0.4.0

* Added `getMetadata` method to fetch deploy metadata
* Added `getVersions` and `removeVersion` methods. They will allow you to manage the deploys 
  currently on the device.
* (fix) iOS deploys will now give a download error if the app goes into the background while
  downloading a deploy.
* (fix) Excluding deploys from iOS cloud backups
* (fix) iOS rollbacks now behave the same as android


## 0.3.0

* Changed plugin id from `com.ionic.deploy` to `ionic-plugin-deploy`

## 0.2.3

* Adding deploy info. Fixes #11
* Fix for ios deploys not sticking around after force quitting. Fixes #21


## 0.2.2

* Firing error callback in the event the deploy check is unable to receive a valid response. Fixes #14
* Removed StandardCharset dependency to support older Android platforms. Fixes #19
