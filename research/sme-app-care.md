# SME app care: working plan and evidence

The plan (chosen by Mike on 2026-10-15): take on a few established UK SMEs and look after
their modest iOS and Android apps on **monthly retainers**, part-time at first, possibly growing
to 25–30 hours a week. The weekly scout keeps this file up to date. Each section is a living
summary; update it in place. The dated changelog at the bottom records what changed each week.
Every claim has a source URL or is marked "unverified".

Not published: this lives only on the `research/app-scout` branch.

## Stack focus

- **First choice:** native iOS (Swift/SwiftUI) and native Android (Kotlin). AI coding tools make
  maintaining both natively realistic for one person.
- **Also fine:** cross-platform (Flutter, React Native/Expo, .NET MAUI), and web-based apps
  (PWAs, WebView wrappers).
- **Quality edge:** Mike builds automated UI test suites with **Maestro** (iOS and Android
  flows) to find bugs and catch regressions, and raises unit-test coverage. Most small apps
  inherited from an agency or freelancer likely have little or no automated testing
  (unverified; check how competitors describe their testing).
- **.NET edge:** Xamarin support ended on 1 May 2024
  (https://dotnet.microsoft.com/en-us/apps/xamarin). Microsoft recommends moving to .NET MAUI.
  SMEs with old Xamarin apps may need a migration, then ongoing care.

## Demand evidence

- PeoplePerHour mobile app development listing, read in Mike's browser on 2026-10-15
  (https://www.peopleperhour.com/freelance-jobs/technology-programming/mobile-app-development):
  at least 5 "finish, ship or look after an existing app" posts in about a month.
  - UK sailing school: Claude-written Swift needing App Store release plus a yearly rebuild price.
  - Builders' web app: review, device testing, fixes and an annual maintenance price; "not
    looking for the cheapest quote".
  - App acquisition: transfer checks and a release, with possible monthly maintenance from
    January 2027.
  - Owners stranded after their developer left: "not even sure it's live", and a lost signing key.
- Against: 25–93 proposals per job, and many tiny budgets. Board work is a race to the bottom;
  use it only to build reviews.
- Still missing: UK SME owners (not developers) describing this pain in their own words outside
  freelance boards.

## Forcing events and deadlines

Verify against official sources only, such as Apple Developer news, Google Play Console Help
and Microsoft.

- **Google Play target API** (verified 2026-10-15 at
  https://support.google.com/googleplay/android-developer/answer/11926878):
  - From 31 Aug 2026, new apps and updates must target Android 16 (API 36).
  - Existing apps must target Android 15 (API 35) or higher to stay discoverable to new users on
    newer Android versions. Apps on API 34 or lower only show on devices with the same or lower
    OS version.
  - Developers can request an extension to 1 Nov 2026.
- **Apple SDK requirement:** a third-party blog says uploads need the iOS 26 SDK from
  28 Apr 2026 (https://stora.sh/blog/2026-04-26-ios-26-sdk-deadline-48-hours-triage).
  **Unverified; check Apple Developer news.**
- **Xamarin end of support:** 1 May 2024 (see above).

## UK pricing benchmarks

- Foresight Mobile (Manchester agency): app support and maintenance retainers from **£675/month**,
  onboarding £500–£1,000, 3-month minimum
  (https://foresightmobile.com/services/app-support-and-maintenance). Read by the scout on
  2026-10-15.
- PeoplePerHour takeover job at about £27/hr (search snippet only). This is the board floor, not
  a target.

## Competitors and positioning

- To research: do UK competitors advertise automated UI testing or regression suites in their
  maintenance plans? If few do, "every release is tested before it ships" is a clear
  differentiator.
- To research: UK freelancers and small studios offering app maintenance retainers, what they
  include, and the gaps (for example: no native work, agency minimums, no Xamarin/MAUI).

## Ways to find prospects (methods, not mass outreach)

- **Local first:** Mike is in Wrexham. SMEs in Wrexham and North Wales, then Chester and
  Cheshire West, the Wirral, Merseyside and Shropshire, rank above equivalent remote leads,
  because he can meet them face to face. To research: local business networks and support
  bodies (verify names and links, don't assume), local tech or digital meetups, and public
  listings of apps by businesses in the area.
- To research (unverified idea): do Welsh businesses' apps need, or benefit from, Welsh-language
  support? Bilingual apps could be a local niche. Check what actually applies to private SMEs
  rather than public bodies before claiming anything.

- To research: public signals of UK SME apps that look neglected (last-updated date, old OS
  support, trader details shown on store listings), found through web search and individual
  listings. **No bulk scraping** of the App Store or Google Play (against their terms). Business
  information only, never personal data. Outreach decisions are Mike's.

## Offer ideas

- Fixed-price "health check": audit the code and dependencies, build it, test on real
  devices, write a Maestro suite for the app's critical flows (sign-in, purchase or booking,
  core journey), produce a baseline unit-test coverage report, and send a written findings
  report. This leads into a monthly retainer.
- **Quality-led retainer:** run the Maestro regression suite before every store release, raise
  unit-test coverage a little each month, and send a short monthly report (OS and SDK
  readiness, crashes, coverage, tests passed). It protects the client's app and shows the
  value of the retainer each month.
- Retainer scope: OS and SDK updates, store policy compliance, crash monitoring, store releases,
  and a set number of hours of small fixes. New features quoted separately. **Next-working-day
  response, never on-call** while Mike is employed.
- "Built your app with AI? I'll get it into the store and keep it there." (search-led)
- Xamarin to .NET MAUI migration, then a retainer.

## Next step

- Start the local angle: find 2 or 3 verified North Wales and Cheshire business networks or
  meetups, and look for public listings of apps by businesses in the region.
- Confirm the Apple SDK deadline from Apple. Collect 3 or more more UK retainer prices. Look for
  SME-owner demand outside freelance boards.

## Changelog

- 2026-10-15: file created by Claude from the PeoplePerHour check, the verified Google Play rule,
  Xamarin end of support and the Foresight pricing benchmark.
- 2026-10-15: added Mike's testing edge (Maestro UI suites, unit-test coverage) to Stack focus, Offer ideas and Competitors.
- 2026-10-15: added location priority (Wrexham, North Wales and the nearby border region) to prospects and next step.
