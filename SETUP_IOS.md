# Shipping Py's Python Adventure to the App Store

This app is a static HTML/CSS/JS site with no build step. [Capacitor](https://capacitorjs.com/)
wraps it in a native iOS shell so it can run in Xcode, the Simulator, on a real iPhone/iPad,
and eventually the App Store. The config files for this are already in the repo:

- `package.json` — Capacitor dependencies + scripts
- `capacitor.config.json` — app id, app name, points Capacitor at this folder as the web app
- `.capacitorignore` — keeps `node_modules`, `resources/`, docs, etc. out of the shipped app bundle
- `resources/icon.png` — a **placeholder** 1024×1024 app icon generated from the existing mascot artwork

**This machine has Command Line Tools but not the full Xcode.app, and no Node.js — so the actual
`ios/` native project has not been generated here.** Everything below is what you'll run once
those two things are installed. It's two commands once your machine is ready.

## 1. Install what's missing

**Node.js** (any LTS works):
```bash
# Download the macOS installer from nodejs.org, or if you use Homebrew:
brew install node
```

**Full Xcode** (Command Line Tools alone aren't enough to build iOS apps):
1. Install **Xcode** from the Mac App Store (multi-GB download).
2. Point the command line tools at it and accept the license:
   ```bash
   sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer
   sudo xcodebuild -license accept
   ```

**CocoaPods** (manages native iOS dependencies Capacitor needs):
```bash
sudo gem install cocoapods
```

## 2. Generate the native iOS project

From the project root (`kids-python-tutorial/`):
```bash
npm install
npx cap add ios
npx cap sync ios
```

This creates an `ios/` folder containing a full Xcode project that loads this site's
`index.html`, `css/`, `js/`, and `assets/` as its local web content — no server needed, and
since Skulpt is now vendored in `js/vendor/skulpt/`, the app works fully offline after install.

## 3. Open it in Xcode and run it

```bash
npx cap open ios
```

In Xcode:
1. Select the **App** target → **Signing & Capabilities**.
2. Pick your Apple ID under **Team** (Xcode will create a free personal-team signing
   certificate — fine for Simulator and your own devices; the paid Developer Program is only
   required for App Store submission, see below).
3. Press **Run (⌘R)** with an iPhone Simulator selected. The app should boot straight to the
   nickname/avatar setup screen.

## 4. Real app icon + launch screen

`resources/icon.png` is a flattened placeholder built from `assets/mascot.svg` — good enough to
get building, **not good enough to ship**. Before submitting:

1. Design a proper 1024×1024 PNG icon (no transparency — Apple rejects icons with an alpha
   channel) and replace `resources/icon.png`.
2. Generate all required iOS icon sizes and a launch screen automatically:
   ```bash
   npx @capacitor/assets generate --ios
   npx cap sync ios
   ```

## 5. App Store submission checklist

- **Apple Developer Program** — $99/year, required to submit to the App Store (developer.apple.com/programs).
- **App Store Connect record** — create the app listing, choose a category, upload screenshots
  for each required device size.
- **Privacy policy URL** — required even for simple apps. This one is genuinely easy to write
  honestly: no accounts, no real names collected (kids pick an anonymous nickname + animal
  avatar), no ads, no third-party analytics, no server — everything lives in the device's local
  storage. Host a short policy page (e.g. GitHub Pages) saying exactly that.
- **Age rating / Kids Category** — if you apply for the **Kids Category**, Apple requires:
  - No third-party analytics or advertising SDKs (this app has none — good).
  - No external links a child could tap into without a parental gate. Check before submitting
    that nothing besides the Google Fonts/Skulpt resource loads reaches out to the internet —
    there are no outbound links in the kid-facing UI today.
  - A COPPA-compliant privacy statement (see above — this app's local-only design makes this
    straightforward).
- **Data collection disclosure (App Privacy section)** — you can truthfully declare "Data Not
  Collected," since nothing leaves the device.
- **TestFlight** (optional but recommended) — upload a build via Xcode Organizer and invite a
  few testers before the public submission.

## Notes

- `capacitor.config.json` uses a placeholder `appId` of `com.pyspythonadventure.app` — change
  this to your own reverse-DNS identifier before creating the App Store Connect record (it must
  match exactly and can't be changed later).
- If you ever add a real backend (e.g. for a cross-device leaderboard), revisit the privacy
  policy and Kids Category disclosures — the "no data leaves the device" story is what makes
  compliance simple today.
