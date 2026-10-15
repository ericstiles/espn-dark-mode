# ESPN Dark Mode

A tiny Chrome extension that gives espn.com a dark theme. It is one stylesheet
(`espn-dark.css`) injected on every `*.espn.com` page; it requests no permissions
and runs no JavaScript.

## Install

1. Open `chrome://extensions`.
2. Turn on **Developer mode** (top right).
3. Click **Load unpacked** and choose this folder.

Reload any open ESPN tabs.

## Turn it off

Toggle or remove "ESPN Dark Mode" on `chrome://extensions`.

## Adjusting

After editing `espn-dark.css`, click the reload icon on the extension's card in
`chrome://extensions`, then reload the ESPN tab.

If a part of the site that was already dark shows up light, add its selector to
the second rule in `espn-dark.css`.
