# api-tampering

API team too busy? Can't test your UI because you just need that one field changed? Stop waiting and start tampering.

```bash
npm install -g api-tampering
```

----

## Coming Soon

This is a project for Red Hat by Mike Turley!

...It's still being developed. He just wanted the npm package name, and **this README is a draft.**

More details and the full source will be released when it works!

----

## What

A small, temporary npm dependency with some scripts, a proxy server and a config file.

## Why

The goal of this project is to prevent a UI developer from being blocked from testing a change because a response coming back from an API is not what they expected.

**This is a tool for when the UI team is ahead of the API team.**

I want to empower a UI developer to tamper with an API response and specify the conditions for their code to run in freely, so they can move on with their work instead of being blocked by another team.

Don't get blocked by your API ever again. Just bend it to your will from time to time. Everyone will be happier.

Use cases include:

* Adding a fake record to your table that helps you test an edge case without modifying your database.

* Overriding a string in some existing data, to test what another value would look like without modifying the data.

* Just adding that one f*&#ing JSON property that you need to add for this one thing to work so you can push your PR and go home.

## How

This package provides a simple HTTP proxy server for you to run locally and configure your browser to use to connect to the internet.

Once connected, the api-tampering proxy server will pass all of your HTTP requests on to the actual internet or to your other localhost services, and return the real responses to your browser. With no further configuration, it will only listen and not tamper with anything. And it's open source, so you can be assured it's not spying on you unless you tell it to. 😏

When tampering is enabled, for requests matching your configuration rules, **HTTP responses will be intercepted and modified on their way back to the browser**. This allows you to override all or part of any API response in an additive fashion, without having to mock the entire API.

This magic comes in two pieces:

* The `api-tampering` npm package.

  This should either be included in your devDependencies, or not included in your package.json and installed in node_modules only, or installed globally. The intention is to add nothing to your actual UI bundle, but only to provide you with a temporary script you can run while developing the dependant project. **You can and should remove this dependency when you no longer need it.**

* The `api-tampering.json` configuration file.

  This file determines which requests are tampered with, what data will be injected into the responses, and where that data will be injected in the JSON tree. See **Configuration** below for more on this file.

## Setup


1. Decide how you will install and use the `api-tampering` package.

    * **Globally.** This will install it just for you, for any project, and requires no modifications to your `package.json`. You might want to do this if you plan on putting the config file in your `.gitignore` and only using the proxy a little bit.

        * Install with `npm i -g api-tampering`

        * Use with `api-tampering proxy`

    * **As a devDependency.** This will add some new npm scripts to your `package.json`, and install it for anyone who runs `npm install` in your project. You might need this if things are really behind and your whole team wants to get tampering.
        
        * Install with `npm i -D api-tampering`
        * Use with `npm run proxy` or `yarn proxy`

    * **In your node_modules directory only.** This is just for you, and will not modify your project or your global namespace in any way, but has no command shortcuts.

        * Install with `npm i --no-save api-tampering`
        * Use with `./node_modules/api-tampering/proxy`

    You should not simply run `npm install api-tampering`, which will add it as a regular dependency for all consumers. I don't think this would do anything bad, it's just not necessary. use `-g` or `-D` or `--no-save`.

## Usage

1. Configure rules in `api-tampering.json` (see Configuration).

2. Run the Proxy server and configure your browser.

    Depending on how you installed api-tampering, use one of the proxy start commands:

    * Global: `api-tampering proxy`
    * devDependency with npm: `npm run tampering`
    * devDependency with yarn: `yarn tampering`
    * no dependency: `./node_modules/api-tampering/proxy`

    This will run the HTTP proxy server in the foreground. You can press `Ctrl`+`C` in the terminal to stop the server, but leave it running for now.

    When the proxy starts up, it will also open a tab in your browser with instructions to configure your proxy settings to use the api-tampering proxy.

3. Use your browser. Your tampering rules should take effect and inject data into API responses when your browser makes matching requests.

4. If you change the `api-tampering.json` file, you'll need to restart the tampering proxy server for your new rules to take effect. You can just press `Ctrl`+`C` and `npm run tampering` (or equivalent) again. 

    * [NOTE: fork me if you want to help remove this requirement! I don't want to reevaluate the config file on every HTTP request, but I want to listen to file changes and restart the proxy automatically, or load rules into the running proxy.]

5. When you are done, be sure to turn off the proxy settings in your browser. Otherwise, the browser will be unable to connect to the internet when the tampering proxy server isn't running.

----

## This is intended as a temporary dependency.

As I emphasized above, this is a tool for when the UI team is ahead of the API team. When that is no longer true, it will no longer be necessary, and you should remove it. If that becomes true again, you can install it again.

It's a pain in the ass when things aren't lining up right. This tool is a hacky workaround for temporary problems. It's annoying, you have to configure your browser and everything. Things will get updated and improved and then you won't need the hack anymore.

**You can and should come back to test things again without api-tampering**, after API changes have caught up with the expected responses. This is probably not a dependency that should ship with your release.

## A JSON-based REST API is required, for now.

This tool is only for REST APIs that respond with JSON-structured data. Currently it does not support XML or GraphQL or anything like that, and it won't be terribly useful for those APIs.


## Fork this repo and help me!

I would really like to add things like GraphQL support and a UI for editing your config file more quickly.

![Help Me Help You](https://media.giphy.com/media/uRb2p09vY8lEs/giphy.gif)