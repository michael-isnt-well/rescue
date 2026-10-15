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
- Apple Developer Forums (2026-10-15 search snippets; developers/owners, not UK-specific) show the
  recurring ownership-handover pain: a departed colleague owned the company's Apple account and
  2FA went to a dead number (https://developer.apple.com/forums/thread/738225); an organisational
  account transfer stalled ~4 weeks despite a CEO-signed letter
  (https://developer.apple.com/forums/thread/827073); advice there is to check the developer
  contract and whether the owner has the source code (same thread family). Shows the problem is real
  and slow to fix, but these are forum posts, not volume data.
- Google's own help page confirms the failure mode: a removed app can't be reinstalled unless the
  developer republishes it (https://support.google.com/googleplay/answer/12246761).
- Weakening: a search for UK business-forum threads ("developer left", "take over my app") returned
  nothing relevant (searches 2026-10-15). UK SME-owner demand in their own words outside freelance
  boards is still NOT evidenced. Reddit not fetchable; no Reddit snippets found this week.
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
- **Apple SDK requirement** (verified 2026-10-15 at https://developer.apple.com/news/upcoming-requirements/):
  - From 28 Apr 2026, uploads to App Store Connect must be built with Xcode 26 or later (iOS 26 SDK etc.).
    Live apps keep working, but the next update needs the new toolchain, so a neglected app can't ship a
    fix without a build-environment upgrade (and old CI images may default to Xcode 16: third-party
    note, unverified).
  - From 9 Sep 2026, iOS/iPadOS uploads must target iOS 13 or later (a minimum deployment target).
  - From 31 Jan 2026, new age-rating questions must be answered per app in App Store Connect.
  - Older items on the page (privacy-manifest required-reason APIs from 1 May 2024; EU DSA trader
    status) remain relevant to inherited apps.
- **Android developer verification** (verified 2026-10-15 at https://developer.android.com/developer-verification):
  protections start 30 Sep 2026 in Brazil, Indonesia, Singapore and Thailand; global expansion "in 2027".
  Google Play automatically registers 99% of apps. The page does not mention the UK. Low forcing power
  for Play-distributed UK SME apps; mainly affects apps distributed outside Play.
- **Google Play extension window:** the 1 Nov 2026 extension limit above is about two weeks away
  (as of 2026-10-15), a possible conversation opener for apps still on API 34 or lower.
- **Xamarin end of support:** 1 May 2024 (see above).

## UK pricing benchmarks

- Foresight Mobile (Manchester agency): app support and maintenance retainers from **£675/month**,
  onboarding £500–£1,000, 3-month minimum
  (https://foresightmobile.com/services/app-support-and-maintenance). Read by the scout on
  2026-10-15.
- Foresight Mobile tiers (read in full 2026-10-15, https://foresightmobile.com/services/app-support-and-maintenance):
  Essentials from £675/month (iOS/Android OS compatibility updates, critical security patches, uptime
  monitoring, monthly health report, Slack channel); Standard from £995 (adds backend/API monitoring,
  priority SLA, monthly engineer check-in); Premium from £1,495 (adds emergency incident response,
  quarterly security audits, dedicated feature hours). 3-month minimum then rolling monthly. Onboarding
  £500–£1,000 (waived after a rescue or no-code delivery). Critical issues: 2-hour response, UK office
  hours. Note the agency promises a response time Mike can't match.
- Magora Systems (London agency, https://magora-systems.com/app-maintenance-cost-uk/, read 2026-10-15):
  entry-level app support from £1,000/month or £12,000/year, ex VAT; includes OS and dependency updates,
  bug fixes, monitoring, minor changes. Features, support and SLAs priced on top. No minimum term stated
  for maintenance. Developers from £49/hr (about 20 hours/month at £1,000, per the page).
- Gap: no published solo-freelancer UK app-retainer price found in 4 searches this week; only agencies.
  Day rates in a search snippet for a Laravel freelancer (£375–£500/day, https://rockingtech.co.uk/blog/what-a-laravel-support-retainer-actually-covers)
  are not mobile. Treat agency prices as a ceiling, not Mike's price.
- PeoplePerHour takeover job at about £27/hr (search snippet only). This is the board floor, not
  a target.

## Competitors and positioning

- Observed (2026-10-15, two agency pages): Foresight and Magora list OS updates, monitoring, security
  patches and bug fixes; neither lists automated UI/regression testing per release (Foresight's page
  mentions a monthly health report). Two agencies is a tiny sample, so the "tested every release"
  differentiator is plausible but NOT yet confirmed.
- Agency gaps visible from pricing: £675–£1,000+/month entry points, onboarding fees, 3-month minimums,
  office-hours SLAs. A solo developer can undercut on price and onboarding but not on response time.
- Xamarin to MAUI: the firms found (Xablu, Netherlands, no prices: https://www.xablu.com/net-maui-migration-service/;
  Innowise; Softweb; UKAD, location not stated) are not clearly UK-based. No UK-based small MAUI
  migration specialist surfaced in one search; this looks like a gap (weak evidence).
- To research: UK freelancers and small studios offering app maintenance retainers, what they
  include, and the gaps (for example: no native work, agency minimums, no Xamarin/MAUI).

## Ways to find prospects (methods, not mass outreach)

- **Local first:** Mike is in Wrexham. SMEs in Wrexham and North Wales, then Chester and
  Cheshire West, the Wirral, Merseyside and Shropshire, rank above equivalent remote leads,
  because he can meet them face to face. To research: local business networks and support
  bodies (verify names and links, don't assume), local tech or digital meetups, and public
  listings of apps by businesses in the area.
- Wrexham Council's networking list (read 2026-10-15,
  https://www.wrexham.gov.uk/service/business-and-investment-support/networking-groups-wrexham):
  360 Networking (monthly), BNI Deadpool (weekly Tue), Connect Wrexham (monthly, last Thu,
  https://connectwrexham.co.uk/), Networx 4 Business (fortnightly, https://networx4business.co.uk/wrexham-networking/),
  West Cheshire and North Wales Chamber (https://wcnwchamber.org.uk/), Wrexham Business Professionals
  (https://www.wrexhambusinessprofessionals.com/), FSB, Wrexham University business breakfast
  (every two months), Mersey Dee Alliance, Theatr Clwyd business breakfast (quarterly).
- North Wales Social Autumn Expo: 22 Oct 2026, Deeside Leisure Centre, 10am–2:30pm, 70+ stands
  (search snippet, unverified; confirm with organiser). North Wales Tech (https://northwales.technology)
  is a developer meetup; its current schedule is unverified. Developer meetups are for peers, not
  clients; the business groups above are the likelier source of SME owners.
- ITJobsWatch shows only 3 contract vacancies citing mobile app skills in Wrexham in six months to
  Nov 2025 (snippet): local developer supply is thin, which cuts both ways (less competition, but
  little evidence of local demand).
- No neglected-listing examples noted yet (none checked this week).
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
- Ownership-handover check (from the Apple forum cases above): offer to confirm the client owns its
  Apple Developer and Play Console accounts, has the source code, signing keys and a second
  Account Holder/admin. Cheap first step, and a trust-builder.
- "Built your app with AI? I'll get it into the store and keep it there." (search-led)
- Xamarin to .NET MAUI migration, then a retainer.

## Next step

- Mike: attend or contact one of the Wrexham business groups (e.g. Connect Wrexham, last Thursday
  of the month, or the 22 Oct North Wales Social Expo if it is confirmed) and ask owners whether they
  have an app and who looks after it. This is the only route to real demand evidence.
- Next run: find a solo-UK-freelancer app-maintenance price (Bark/Upwork/Contra/own sites), check
  3 more agency pages for whether they mention automated testing, and note up to 5 neglected public
  listings from individual store pages in North Wales/Cheshire.

## Changelog

- 2026-10-15: file created by Claude from the PeoplePerHour check, the verified Google Play rule,
  Xamarin end of support and the Foresight pricing benchmark.
- 2026-10-15: added Mike's testing edge (Maestro UI suites, unit-test coverage) to Stack focus, Offer ideas and Competitors.
- 2026-10-15: added location priority (Wrexham, North Wales and the nearby border region) to prospects and next step.
- 2026-10-15 (run 2): workstreams Deadlines, Pricing, Competitors, Prospects, Demand. 17 searches, 7 pages opened (Apple upcoming-requirements, Android developer-verification, Foresight, Magora, Xablu, Wrexham Council). No blocked domains. Apple SDK date now verified; added iOS 13 target (9 Sep 2026); UK solo-freelancer prices and UK-owner demand still unevidenced.
