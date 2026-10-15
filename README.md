# ESPN Dark Mode

A tiny Chrome extension that gives espn.com a dark theme. It is one stylesheet
(`espn-dark.css`) plus a small script (`toggle.js`) for the on/off button,
injected on every `*.espn.com` page; it requests no permissions.

## Install

1. Open `chrome://extensions`.
2. Turn on **Developer mode** (top right).
3. Click **Load unpacked** and choose this folder.

Reload any open ESPN tabs.

## Turn it off

Click the round ◐ button in the bottom-left corner of any ESPN page. The choice
is remembered (in that site's `localStorage`, so each espn.com subdomain keeps
its own). Click it again to turn dark mode back on.

To remove it entirely, toggle or remove "ESPN Dark Mode" on `chrome://extensions`.

The button works because every rule in `espn-dark.css` sits inside
`@scope (html:not(.espn-dark-off))`; the script only adds or removes that class.
New rules must go inside the `@scope` block, and must write `<html>` itself as
`:scope`, not `html`.

## Adjusting

After editing `espn-dark.css`, click the reload icon on the extension's card in
`chrome://extensions`, then reload the ESPN tab.

If a part of the site that was already dark shows up light, add its selector to
the second rule in `espn-dark.css`.
