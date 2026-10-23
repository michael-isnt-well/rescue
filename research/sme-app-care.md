# SME app care: working plan and evidence

The plan (chosen by Mike on 2026-10-15): take on a few established UK SMEs and look after
their modest iOS and Android apps on **monthly retainers**, part-time at first, possibly growing
to 24–28 hours a week. The weekly scout keeps this file up to date. Each section is a living
summary; update it in place. The dated changelog at the bottom records what changed each week.
Every claim has a source URL or is marked "unverified".

Not published: this lives only on the `research/app-scout` branch.

## Direction update (2026-10-23): local first

After three research runs, the national market looks crowded: agencies at £675+/month above, and
ready-made branded apps at £10–£250/month below. **Mike's edge is local trust**: face-to-face
meetings and referrals in Wrexham, North Wales and the Cheshire border region. The offer leads
with **problems, not technology** (clunky booking or ordering, spreadsheets, an app nobody looks
after); the fix can be a native app (his speciality), a web app, a booking portal or a small
internal tool. The hard boundary against general IT work stays. Caution: there may be few local
businesses with apps, which is why the offer is broadened beyond native apps. Local dog businesses
are a natural first niche, given rescuejourney.co.uk.

## Local: Wrexham and North Wales

### Competition and search
- Not yet researched.

### Networking calendar
- Connect Wrexham: monthly, last Thursday, so next would be **29 Oct 2026**. Unconfirmed for 2026;
  only an older announcement was found.
- Others from Wrexham Council's list (BNI, Chamber, FSB, Wrexham University breakfast, Networx 4
  Business): dates unconfirmed.

### Referral partners
- Not yet researched.

### Prospect signals
- Not yet researched. Wrexham Eats (a local food-ordering platform) was noted on 2026-10-21.

### Local offer
- Starting idea: a fixed-price "digital health check" for local businesses (bookings, ordering, any
  app), leading into a build or a retainer.

## Best-case positioning (Mike, 2026-10-15)

**New native apps for businesses that already have a web service or API, then a monthly
retainer to look after the app.** The client's existing supplier keeps owning the back end;
Mike owns the app and its connection to that API. This avoids the "one-person IT department"
trap by design.

Things to check before relying on it (all unverified until researched):
- **Who has a usable API:** SMEs on platforms with public APIs (e-commerce, booking, membership,
  gym or class software, CRMs), and SMEs with a custom web app whose agency exposed an API.
  Check each platform's API terms allow a third-party branded app.
- **Ready-made substitutes:** many platforms sell their own white-label or "branded app"
  add-ons, and there are app-builder services for e-commerce. Find out which platforms have
  them, what they cost, and where they fall short (that gap is the sale).
- **Apple's minimum-functionality rule:** Apple's App Review Guidelines (4.2) reject apps that are
  little more than a repackaged website. A WebView wrapper of an existing site is a real
  rejection risk, so a native app needs genuine app value (push notifications, offline use,
  device features, a faster native experience). Verify the current wording at
  https://developer.apple.com/app-store/review/guidelines/. This is also a selling point for
  native over wrappers. (The PeoplePerHour "WordPress to app via WebView" post from 2026-10-15
  is exactly this case.)
- **API change risk:** when the client's API supplier changes something, the app breaks. The
  retainer should cover adapting to API changes up to the included hours, with bigger rework
  quoted, and the responsibility list should say the API supplier owns the API.

**Checked 2026-10-21 (run 3), what the evidence says so far:**
- **Apple 4.2 (read at https://developer.apple.com/app-store/review/guidelines/):** "Your app should
  include features, content, and UI that elevate it beyond a repackaged website." 4.2.2: apps
  shouldn't primarily be "marketing materials, advertisements, web clippings, content aggregators,
  or a collection of links" (catalogs excepted). **4.2.6:** apps from "a commercialized template or app
  generation service will be rejected unless they are submitted directly by the provider of the app's
  content", with a single "picker" binary as the other allowed route. This supports native-with-real-value
  over wrappers and is a sales point against template builders that submit on clients' behalf. The page
  text showed no "last updated" date.
- **Shopify (official):** native iOS/Android/React Native storefronts are supported via the Storefront
  API (token from the Headless channel) plus Checkout Kit for payment
  (https://shopify.dev/docs/storefronts/mobile/about-mobile-storefronts). Shopify's headless overview warns
  that a headless storefront costs more to build and run than a theme and that the merchant needs
  developers to maintain it (https://shopify.dev/docs/storefronts/headless/overview.md, via search
  snippet). So Shopify is a workable API; the maintenance warning is the retainer's selling point.
- **Mindbody (gym/class software), a caution:** its API terms (read via fetch summary, verify in full
  before relying: https://developers.mindbodyonline.com/Resources/DeveloperAgreement) bar competing
  products and, per the summary, use "on behalf of any third party" (§8.11), cap data caching at 48 hours
  and allow revocation without notice. Its own Branded App is run by Mindbody, with the customer holding the
  Apple developer account and Mindbody loading the code
  (https://www.mindbodyonline.com/company/legal/terms-of-service/supplemental-terms-branded-app). Platform
  terms can block a third-party app; check each platform before pitching.
- **Not yet checked:** other common UK booking, membership and CRM platforms' API terms.

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
- Re-searched 2026-10-21 (4 more queries on "developer disappeared", "app no longer works", "built with
  ChatGPT, how do I publish"): results were developer forums and advice blogs, **no UK SME owner posts**.
  Advice pages (e.g. https://gtstu.com/?p=5772, unverified commercial blog) say to confirm owner-level access
  to repo, store accounts, hosting and API keys first; same ownership-handover check as in Offer ideas.
- Apple removes apps with no update in three years plus low downloads, after an email warning to the account
  holder; removed apps keep working on devices that already have them (news coverage, e.g.
  https://www.thurrott.com/?p=266499; primary Apple source not opened, unverified).
- AI-built-app publishing guides are plentiful (e.g. https://theneuron.ai/explainer-articles/how-to-publish-an-ai-built-iphone-app-to-the-app-store/)
  and claim Apple enforces guideline 2.5.2 (no runtime-downloaded code) strictly since March 2026: third-party
  claim, unverified. Plenty of supply of how-to content means the "AI-built" angle is crowded for search;
  the service, not the guide, is the offer.
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
- **Google Play extension window:** the 1 Nov 2026 extension limit above is **11 days away as of
  2026-10-21**; a search of the official page on 2026-10-21 repeated the same text (new apps target API 36;
  API 35 apps are compliant). A possible conversation opener for apps still on API 34 or lower.
- **Apple page re-read 2026-10-21** (https://developer.apple.com/news/upcoming-requirements/): nothing newer
  than the 9 Sep 2026 iOS 13 target. No new forcing event from Apple since last week.
- **Google Play new-account testing rule (official, https://support.google.com/googleplay/android-developer/answer/14151465):**
  personal accounts created after 13 Nov 2023 need a closed test with 12 testers opted in for 14 continuous
  days before production access. The page doesn't say whether organisation accounts are exempt (third-party
  guides say they are: unverified). Relevant when an SME must re-publish under a new account.
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
- **Rule of thumb from build cost:** UK agency guides put yearly upkeep at **15–25% of the
  original build cost** (Softomate example: a £60k app works out at £9k–£15k a year,
  https://www.softomatesolutions.com/blog/mobile-app-maintenance-support-uk/; Arch says the same,
  https://wearearch.com/blog/app-maintenance-and-support; both read 2026-10-15). **This is a
  warning for small builds:** a £10k app implies only about £125–£210/month on that rule. To reach
  about £450–£500/month per client, the retainer has to be sold on value (store compliance,
  tested releases, monthly report, a set number of fix hours), not as a percentage of build cost.
  Agency rule of thumb only, not a standard.
- Arch's guide cites typical UK tiers of about £675 (basic) and about £1,495 (premium) a month,
  matching Foresight's, plus on-demand £75–£150/hr (2025 reference).
- 2026-10-21: two more searches for a solo UK freelancer retainer price found **nothing**, only the same
  agencies. A side-hustle calculator gives £30–£130/hr for UK app development, typical £60
  (https://www.uktaxcalculators.co.uk/side-hustles/app-development/, not a survey). **Honest read: after
  three weeks' searching, published solo-UK app-retainer prices don't exist in search; pricing must be set
  from value and Mike's £50–65/hr target, tested with real quotes.**
- Substitutes' prices (USD, third-party reviews, unverified, confirm on vendor pages): Shopify app builders
  Tapcart from $250/month, Shopney $99–$149, MageNative from $99
  (https://wiserreview.com/blog/tapcart-alternatives/, https://easysellapp.com/blogs/wiki/best-shopify-mobile-app-builder-apps-2026).
  UK booking tools: Gymcatch base plan £10+VAT/month with web/iOS/Android client apps listed (white-label
  status not stated, https://gymcatch.com/?p=6); PRESS $2 per member per month for a white-label app
  (https://mystrengthbook.com/pricing-press). **A custom-app retainer of £400+ competes with £10–£250/month
  ready-made apps, so the pitch needs a reason the off-the-shelf app falls short.**
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
- 2026-10-21: a search for UK providers advertising automated UI/regression testing per release in
  maintenance retainers returned only Maestro tool pages, no providers. Still weak evidence, not a
  confirmed gap.
- Xamarin to MAUI, re-searched: still only non-UK or unlocated firms (Xablu, Innowise, UKAD, Rishabhsoft); a UK
  job ad leading a Xamarin-to-MAUI migration exists (https://www.itjobswatch.co.uk/jv/Fynity/Senior-Net-MAUI-Developer-United-Kingdom-Job-Guernsey-UK-3vjqz1?jr=8n4-w2-1ck),
  showing some UK migrations are happening, but in-house.
- **Real competitor class is ready-made branded apps** (Mindbody Branded App, Gymcatch, Shopify app
  builders), not only agencies. See Pricing.
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
- Local apps seen 2026-10-21 (search snippets, none judged neglected; not opened): Wrexham Eats
  (food ordering, 70+ takeaways: https://wrexham.com/news/wrexham-eats-app-celebrates-first-birthday-local-startup-helps-save-local-businesses-500k-in-commissions-209624.html),
  and council/tourism apps built on platforms (Near Me Now, Viro Media/Bookry Ltd). Local business apps are
  mostly platform-hosted, which fits the "ready-made substitutes" caution above.
- Connect Wrexham: only an older announcement found, last-Thursday schedule not confirmed for 2026
  (https://businessnewswales.com/new-monthly-networking-event-launches-for-wrexham-professionals).
  **North Wales Social Autumn Expo is tomorrow, Thu 22 Oct 2026**, 10am–2:30pm, Deeside Leisure Centre, 70+
  stands (search result and Eventbrite listing; organiser not opened).
- No neglected-listing examples noted yet (none checked; individual store pages not opened this week).
- To research (unverified idea): do Welsh businesses' apps need, or benefit from, Welsh-language
  support? Bilingual apps could be a local niche. Check what actually applies to private SMEs
  rather than public bodies before claiming anything.

- To research: public signals of UK SME apps that look neglected (last-updated date, old OS
  support, trader details shown on store listings), found through web search and individual
  listings. **No bulk scraping** of the App Store or Google Play (against their terms). Business
  information only, never personal data. Outreach decisions are Mike's.

## Scope boundaries: not becoming a one-person IT department

Mike's concern (2026-10-15): SME clients may assume "the app" includes APIs, databases,
servers, hosting and general IT. **The evidence supports the worry.** Some UK maintenance guides
list "cloud servers, databases, storage, bandwidth, scaling, uptime monitoring" and third-party
services (payments, maps, push, SMS, email) as part of "app maintenance" (Softomate, link above),
and Arch's covers "hosting, security, dependencies, bug fixes, APIs and compliance work". A client
who has read those will expect it unless the scope says otherwise. Both guides also list common
exclusions: new features, platform fees, third-party renewals, cloud overage and out-of-hours cover.

**Proposed approach (Claude's suggestion, to refine):**
- **A one-page responsibility list in every proposal,** in three columns: *Mike* (the iOS and
  Android apps, their builds and store listings, the app's connection to the backend), *the
  client* (accounts, hosting bills, content, its own staff), and *third parties* (the backend or
  API supplier, the website host, the IT support company). Anything not in Mike's column is out
  of scope by default.
- **Tiers:**
  1. **App Care**: the app only. OS and SDK updates, store compliance, Maestro regression
     before each release, crash monitoring, a set number of fix hours. The app talks to the
     client's existing API, and Mike maintains the *integration*, not the server.
  2. **App and Backend Care** (optional add-on): a managed backend (Firebase or Supabase) **in
     the client's own account**. Mike maintains its configuration (schema, auth, functions); the
     client pays hosting directly. No self-managed servers or VMs.
  3. **Not offered:** general IT (email, Microsoft 365 or Google Workspace, PCs, printers, Wi-Fi,
     on-premise servers, websites unless separately agreed). Refer it to a local IT support
     company instead, ideally one that refers app work back.
- **The health check maps the architecture first:** what backend exists, who hosts it, who owns
  each account, which third-party services are in use. That decides the tier, or tells Mike to
  decline.
- **For new builds, design for a small maintenance surface:** use the client's existing systems
  through their APIs, or a managed backend in the client's account. Mike can build a .NET API,
  but every bespoke server is long-term maintenance, so price it as the separate tier.
- **Contract wording sources (UK, general, not legal advice; have a solicitor review):** Sprintlaw says
  agreements should state services, exclusions and service levels
  (https://sprintlaw.co.uk/articles/support-and-maintenance-agreements-key-terms-for-uk-saas-and-tech-businesses/);
  WebLaw notes excusing failures of third-party providers
  (https://www.weblaw.co.uk/articles/website-maintenance-agreements/); a G-Cloud contract excludes
  degradation from work by the client's other contractors
  (https://assets.applytosupply.digitalmarketplace.service.gov.uk/g-cloud-14/documents/708005/687402306131679-terms-and-conditions-2024-05-03-1355.pdf).
  Summaries from search results only, pages not opened.
- **Change requests:** anything outside the list is quoted separately before work starts
  (standard freelance practice; e.g. https://www.withmoxie.com/blog/3-ways-to-avoid-scope-creep-in-freelance-projects).
- **Managed backends:** Supabase is standard Postgres (portable, easier to hand over); Firebase is
  more proprietary. Either way, the project lives in the client's account (general comparisons,
  e.g. https://bytebase.com/blog/supabase-vs-firebase; unverified detail).

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
- **Small builds as the way in** (Mike's idea, 2026-10-15): build small, tightly scoped apps for
  SMEs, with care included from day one (a build fee plus a minimum 6–12 months of retainer
  written into the deal), so every build becomes a retainer. Risks: builds are where board
  prices race down (PeoplePerHour full-app budgets were £100–£400 on 2026-10-15), plus scope
  creep and fixed-price overruns on part-time hours. Honest qualifier: some SMEs don't need a
  native app (a website or PWA may do), and saying so builds trust.
- **Portfolio gap:** almost every serious PeoplePerHour post on 2026-10-15 asked for links to 2–3
  published apps. Mike's day-job app may not be citable (employer's name or NDA), so 1–2 small
  published apps of his own, or one discounted build for a friendly local business in exchange
  for a case study, may be a prerequisite. To research: what local SMEs actually ask apps for
  (bookings, loyalty, ordering, job sheets), and typical UK small-build prices from published
  price lists, not boards.

## Next step

- Mike (this week): if possible, go to Connect Wrexham on Thu 29 Oct (confirm with the organiser
  first) and ask "Do your customers book, order or log in on your website?"
- Next run: confirm networking dates; map local competition for "app developer Wrexham / North
  Wales / Chester"; find 3–5 local web or IT firms without app development as referral partners;
  note up to 8 local prospect signals, starting with dog businesses.

## Changelog

- 2026-10-15: file created by Claude from the PeoplePerHour check, the verified Google Play rule,
  Xamarin end of support and the Foresight pricing benchmark.
- 2026-10-15: added Mike's testing edge (Maestro UI suites, unit-test coverage) to Stack focus, Offer ideas and Competitors.
- 2026-10-15: added location priority (Wrexham, North Wales and the nearby border region) to prospects and next step.
- 2026-10-15 (run 2): workstreams Deadlines, Pricing, Competitors, Prospects, Demand. 15 searches, 6 pages opened (Apple upcoming-requirements, Android developer-verification, Foresight, Magora, Xablu, Wrexham Council). No blocked domains. Apple SDK date now verified; added iOS 13 target (9 Sep 2026); UK solo-freelancer prices and UK-owner demand still unevidenced.
- 2026-10-15: added small builds with care included, and the portfolio gap, to Offer ideas.
- 2026-10-15: added the Scope boundaries section (responsibility list, tiers, no general IT) and the 15–25%-of-build-cost pricing warning.
- 2026-10-15: added Best-case positioning (new native apps on existing web services or APIs) and its checks.
- 2026-10-21 (run 3): workstreams Offer/positioning (white-label, Apple 4.2), Deadlines, Pricing, Competitors, Demand, Prospects. 22 searches, 8 pages opened (Apple guidelines, Apple upcoming-requirements, Mindbody branded-app terms, Mindbody API terms, Shopify mobile storefronts, Google Play testing page, plus Google Play target-API via search). No blocked domains; WebFetch summaries are model-condensed, so quoted clauses should be verified in full. Evidence weakening: no UK solo retainer prices, no UK owner demand, and cheap ready-made branded apps compete.
- 2026-10-23: direction changed to local first; added the 'Local: Wrexham and North Wales' section and rewrote the next step.
