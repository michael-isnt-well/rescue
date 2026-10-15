# App opportunity log

Weekly scout of side-business opportunities on two tracks: (P) products Mike owns (apps,
sites, APIs, data tools, directories, including dog/rescue ideas for the rescuejourney.co.uk
audience) and (S) productised services for UK SMEs (fixed scope, fixed price, remote and
asynchronous). See `about-mike.md` for skills and constraints. Newest entry first. Lives on branch
`research/app-scout`, not on main, not published. Rule: every demand/competition claim
has a source URL or is marked "unverified". A week with no finding is a good, honest result.
Qualifying bar: total >= 22/30, no score below 3, demand >= 4.

---

## 2026-10-15 (manual check by Claude, PeoplePerHour via Mike's browser)

Not a scout run. The scout couldn't open PeoplePerHour, so Claude read the public listing at
https://www.peopleperhour.com/freelance-jobs/technology-programming/mobile-app-development
in Mike's browser on 2026-10-15: 11 live jobs and 9 recent past jobs, posted over the last month or so.

**General picture:** heavy competition, with most jobs drawing **25–93 proposals**. Budgets for full
app builds are often unrealistically low (£100–£400 for complete apps), so generic app building
on this board is a race to the bottom. Avoid it.

**Distinct pattern worth testing: "finish, ship and look after an app someone built with AI or
inherited."** At least five posts in about a month fit it:
- **Skippers Online** (UK sailing school), £1.5K, 93 proposals: Swift source "written with
  Claude", never compiled. Wants it built, tested on real devices, through TestFlight and App
  Store review, **plus a price for Apple's yearly rebuild**. Prefers UK hours.
- **Craig S.**, £50/hr, 69 proposals: a small web app for builders. Wants an independent code and
  security review, testing on real iOS and Android devices (PWA deep-link behaviour), agreed
  fixes, and **an annual maintenance price**. Says "we are not looking for the cheapest quote".
- **Gerry C.**, £100, 49 proposals: a complete Flutter survey app for UK air-conditioning
  installers. Needs building into a release APK, testing on devices, and optionally publishing.
- **Jess A.**, £200, 45 proposals: acquiring a live Expo/Supabase app. Needs account set-up,
  checks on the transfer, rotating credentials and a release, with **possible recurring monthly
  maintenance from January 2027**.
- **Lee G.**, £50 ("we're not even sure it's live"), and **Daniel A.**, £15 (lost signing key):
  owners of apps whose developers have gone.

**Why it fits Mike:** store releases, OS-update rebuilds, device testing and automated testing are
his day job, and he uses AI coding tools himself, so he can work *with* AI-written code instead of
rewriting it. Not telephony.
**Evidence of demand:** real budgets, and two posts explicitly ask for recurring or annual
maintenance. **Against:** proposal counts show plenty of supply, and many budgets are tiny.
**Next for the scout:** test whether this works as a fixed-price package found through search
rather than the boards. Look for owners asking "how do I publish my AI-built app", "Claude or
ChatGPT wrote my app, now what", or "App Store rejected my app", and for existing services
already offering this. Score it properly next run.

---

## 2026-10-15 (weekly run, products + services tracks)

**Verdict: nothing qualifies.**

**Angles tested:** (S1, services) app care for SMEs whose agency/freelancer left, store-policy deadlines; (S2, services) trade-niche websites (plumbers/electricians) and monthly pricing; (S3, services) integrations and spreadsheet replacement (Xero/Shopify, tradesperson quotes); (S4, services) MTD for Income Tax bridging/software; (S5, services) abandoned agency-hosted websites; (P1, product) UK registers/open data lacking an API.

**Effort:** 18 WebSearch calls; 8 pages opened successfully with WebFetch (appsops.store, B4A forum thread, Foresight Mobile pricing, Whito plumber-site guide, Xero product-ideas forum, two Apple Developer Forum threads, stora.sh). **Blocked/empty:** upwork.com job pages (403, twice), peopleperhour.com job and hourlie pages (empty body); Reddit not fetchable, so no r/smallbusinessuk threads (searched once, nothing found). Real-person posts actually read: 3 (B4A thread, two Apple forum threads), all from developers, not SME owners, so SME demand is **unverified**.

### Ideas considered
- **App care retainer for SMEs (store deadlines)** - Real forcing events: Apple requires the iOS 26 SDK for uploads from 28 Apr 2026 (https://stora.sh/blog/2026-04-26-ios-26-sdk-deadline-48-hours-triage, opened, third-party blog); Google Play API 36 target, extension to 1 Nov 2026, sources disagree on consequences (https://appsops.store/news/google-play-november-2026-api36-existing-apps-deadline, opened, dated 25 Aug 2026; https://www.b4x.com/android/forum/threads/app-must-target-android-16-api-level-36-or-higher.171610/, opened, developers). Price anchors: Foresight Mobile (Manchester) retainers from £675/mo, onboarding £500-1,000, 3-month minimum (https://foresightmobile.com/services/app-support-and-maintenance, opened, vendor page); a PPH takeover job of an iOS app at about £27/hr with 23 proposals (https://www.peopleperhour.com/freelance-jobs/technology-programming/mobile-app-development/an-existing-live-ios-app-needs-a-new-developer-to-take-over-2419939, search snippet only, page empty). Apple forum threads show rebuilt/handed-over apps hitting Guideline 4.3 rejection (https://developer.apple.com/forums/thread/773963, https://developer.apple.com/forums/thread/847079; posters are developer teams, unanswered or Apple-staff only). **Not qualified: closest lead.** The retainer price is real and fits Mike's skills, but no SME owner asking for it was found, there is no obvious list to find clients (apps with stale SDKs are not publicly searchable by me), and the PPH example suggests a low-price race. The deadlines are real; demand from SMEs is not evidenced.
- **Trade-niche websites (plumbers etc.)** - Freelancer builds £800-3,000, hosting/updates £100-300/yr (https://whito.co.uk/plumbers/guides/plumber-website-cost-uk/, opened, single vendor guide). Crowded, price-competitive, one vendor source; no complaints found. **Rejected: saturated, no demand evidence.**
- **Tradesperson quote/spreadsheet tool** - QuoteMaster Google Sheets add-on already targets tradespeople (https://workspace.google.com/marketplace/app/quotemaster/163701876040, snippet; no reviews shown). **Rejected: existing tool, no demand evidence.**
- **Xero/Shopify integration work** - Xero's own app is 3.1/5 from 129 users, from £12/mo (https://apps.xero.com/uk/industry/retail/app/shopify, snippet); A2X, Link My Books, Dext well established (https://www.elverecommerceaccountants.co.uk/best-shopify-xero-integrations/, snippet, biased). Xero ideas forum (opened, https://productideas.xero.com/forums/939198-for-small-businesses/suggestions/44988754-create-an-in-house-xero-shopify-integration-ie-n) shows invoice-template gripes (e.g. 103 votes to revert theme; 123 votes for DOCX modernisation), a possible niche for invoice template customisation, but Xero says it does not plan more DOCX work. No budgets found. **Rejected for now: no budgets; template customisation is worth one follow-up.**
- **MTD for Income Tax bridging software** - Phased from 6 Apr 2026 (>£50k), 2027 (>£30k), 2028 (>£20k) (https://hwfisher.co.uk/top-tips-choosing-the-right-software-for-making-tax-digital/, snippet; https://www.gov.uk/guidance/choose-the-right-software-for-making-tax-digital-for-income-tax, snippet). Bridging tools exist and HMRC recognition is required; tax-adjacent liability and HMRC software recognition process are heavy. **Rejected: regulated-adjacent, crowded, high liability.**
- **Agency-hosted site rescue** - Only old generic forum advice found (https://seotraininglondon.org/never-let-your-web-developers-host-your-website/, snippet). **Nothing found.**
- **UK registers API** - Companies House has a free API and bulk data; the gap is PDF accounts (https://zephira.ai/companies-house-data-whats-available-whats-missing-and-how-to-use-it-in-2026/, snippet, commercial blog). legislation.gov.uk, EA flood APIs exist (https://guidance.data.gov.uk/get_data, snippet). No developer asking for a missing UK API found. **Nothing found.**

### Best candidate scorecard: fixed-price app-care retainer for UK SMEs
| Criterion | Score | Evidence |
|---|---|---|
| Evidenced demand | 2 | Real store deadlines (stora.sh, appsops.store) and agency retainers exist, but no SME owner request or budget found; Upwork/PPH pages blocked. |
| Competition gap | 3 | Agencies charge £675+/mo (Foresight); a cheaper solo option is plausible but unproven. |
| Part-time feasibility | 4 | Async, fixed-scope maintenance fits evenings, matches his mobile day-job skills. |
| Distribution | 2 | No defined list of target businesses found; PPH takeover job at about £27/hr suggests a low-price board. |
| Honest monetisation | 3 | £675/mo anchor (Foresight); dishonest if SLAs promised without capacity. |
| Risk (5 = low) | 4 | Low regulatory risk; flag possible overlap with employer's mobile work (about-mike.md). |
| **Total** | **18/30** | Below 22; demand below 4. **Does not qualify.** |

**Suggested follow-up:** Test demand directly: find real SME-owner posts (Upwork/PPH/Bark are blocked here, so Mike could check them manually for "take over existing app" jobs and note budgets). Check the employer-conflict question before pursuing anything mobile.

NO QUALIFYING OPPORTUNITY THIS WEEK

---

## 2026-10-15 (weekly run)

**Verdict: nothing qualifies.**

**Angles tested:** (A1, dogs) renting with a rescue dog / pet-request paperwork under the Renters' Rights Act; (A2, dogs) secure fields / quiet places for nervous dogs; (A3, dogs) overseas-adopter pain points and "wish there was" asks; (B1, club admin) volunteer rotas and village-hall bookings; (B2, club admin) allotment societies; (B3, club admin) grassroots football and running-club admin; (B4, open data) hard-to-search UK registers/OGL datasets; (B5, abandoned apps) discontinued/badly reviewed apps with users.

**Effort:** 17 WebSearch calls; 6 pages opened with WebFetch successfully (Wamiz forum thread, Rovva Product Hunt, Scribe Allotments, Property118 article, Pembee club-software roundup, Dogs Trust renting page). **Blocked/failed:** fetcheveryone.com (403), apps.apple.com/ca offlead (429), a Reddit mirror lr.ggtyler.dev (503), dogparksnearme.co.uk (empty body). Only ~2 real-person discussions were readable (Wamiz thread; Product Hunt comments), below the 3 target, so demand findings are partly **unverified**. B4 and B5 searches returned generic results; no specific dataset or abandoned app emerged.

### Ideas considered
- **Pet-request / "pet CV" tool for renters with rescue dogs** - Renters' Rights Act pet-request rules in force from 1 May 2026, landlord has 28 days (https://www.gov.uk/guidance/renting-out-your-property-guidance-for-landlords-and-letting-agents/if-a-tenant-wants-a-pet-to-live-with-them, via search summary). Dogs Trust already offers a fillable Pet CV and an email template (https://www.dogstrust.org.uk/dog-advice/life-with-your-dog/at-home/pet-friendly-rentals, opened); NRLA published free landlord pet documents (https://www.nrla.org.uk/news/renters-rights-act-pet-documents, snippet). Legal-adjacent (rights, deadlines), free competition from a major charity, no adopter asking found. **Rejected: saturated, legal-advice risk.** Content angle only ("renting with an imported dog").
- **Secure dog field finder for nervous dogs** - directories exist: Dog Parks Near Me (https://www.dogparksnearme.co.uk/, page empty on fetch), offlead app (https://apps.apple.com/ca/app/offlead/id6751276903, blocked), DogFriendly listings (one listing last updated 2021: https://dogfriendly.co.uk/days-out/listing/bromsgrove-field-hire-76290). Staleness is plausible but one example is not evidence, and listings depend on scraping or field-owner cooperation (marketplace-like). **Rejected: no demand evidence; data-sourcing problem.**
- **Overseas-adopter pain points** - Wamiz thread (opened, https://wamiz.co.uk/dog/forum/advice-needed-romanian-rescue-dogs-73355.html) shows complaints about rescue vetting and transport stops, no tool mentioned; Veterinary Record survey of adopters found information gaps on import rules (via https://dogwelfareproject.org/research/how-was-my-overseas-adoption-experience-uk-adopters-share-their-thoughts/, snippet). Information gap, not a tool request. **Rejected: content, not an app.**
- **Volunteer rota tool for clubs** - Rovva launched 2026, 6 points, 14 followers, no reviews, no WhatsApp integration; maker claims messy spreadsheets/WhatsApp (https://www.producthunt.com/products/rovva, opened, marketing). Also Three Rings, Redder (snippets). Crowded with funded tools. **Rejected: saturated.**
- **Village hall booking** - Village Hall Hub, Hallmaster (1500+ venues, vendor claim), MIDAS, LemonBooking, Chobble at £25/yr (https://lemonbooking.com/en-GB/solutions/village-hall-booking-system, snippet). **Rejected: saturated, vendor claims only.**
- **Allotment society admin** - Scribe Allotments (demo-only pricing, councils and societies; https://www.scribeaccounts.com/scribe-allotments, opened); Blyth Town Council said Word/Excel folders were error-prone and moved to software (https://blythtowncouncil.gov.uk/widescopecms/resources/blyth-meetings/agenda-item-7-decision-report-1.pdf, snippet); Saltash TC sought quotes (https://modern.saltash.gov.uk/documents/s8376/ - snippet). Gap might exist for small independent societies who cannot afford quote-led software, but no society saying so was found, and it stores tenants' personal data. **Not qualified; closest B-track lead. Worth one follow-up (allotment forums, NSALG) with evidence of price complaints.**
- **Grassroots football admin** - FA Matchday (free, official), Spond, Pitchero, TeamStats from £5/mo (https://www.pembee.app/blog/best-football-club-management-software, opened, vendor-biased). **Rejected: saturated.**
- **parkrun/running club volunteer tooling** - a single forum complaint about volunteer-recruitment guidance (https://www.fetcheveryone.com/forum/parkrun-thread-26887/5202, snippet; fetch 403). Official ecosystem; no evidence. **Rejected.**
- **UK registers hard to search** - Companies House bulk CSVs are ~400MB each (https://resources.companieshouse.gov.uk/infoAndGuide/faq/publicDataProduct.shtml, snippet) but Companies House already offers search and API; no specific underserved register found. **Nothing found.**
- **Abandoned apps** - searches only returned generic abandonment statistics (Appfigures: 30% of App Store apps not updated in 2 years, https://appfigures.com/resources/insights/20230217/5-opportunity-time-more-than-30-percent-of-apps-on-the-app-store-&-google-play-are-abandoned) - not a niche. **Nothing found.**

### Best candidate scorecard: affordable admin tool for small allotment societies
| Criterion | Score | Evidence |
|---|---|---|
| Evidenced demand | 2 | One council report (snippet) of spreadsheet pain; no society asking found. |
| Competition gap | 3 | Scribe is quote-led and council-oriented; cheaper options not checked. |
| Solo feasibility | 3 | Needs accounts, persistence, and a backend for tenant data. |
| Distribution | 3 | Searches like "allotment waiting list software" plausible; unmeasured. |
| Honest monetisation | 3 | Small subscription to societies; fine if transparent. |
| Risk (5 = low) | 3 | Stores personal data of tenants (GDPR). |
| **Total** | **17/30** | Below 22; demand below 4. **Does not qualify.** |

**Suggested follow-up:** Reddit/Fetcheveryone/Apple store fetches are unreliable from this environment; real-person demand evidence remains the bottleneck.

NO QUALIFYING OPPORTUNITY THIS WEEK

---

## 2026-10-14 (weekly run)

**Verdict: nothing qualifies.**

**Angles tested:** (1) pet-passport / import paperwork tracking; (2) transport / arrival-day communication; (3) decompression / 3-3-3 first weeks; (4) behaviour-change tracking to share with a behaviourist; (5) multi-dog introductions; (6) adopter-to-rescue updates (re-test, new wording).

**Effort:** 13 WebSearch calls; 4 pages opened with WebFetch (App Store: Focus Canine, Dogtales, Dogo, BauBau). **Blocked / unreachable (DNS or proxy):** reddit.com, mumsnet.com, dogwelfareproject.org, rescuedogs101.com, wamiz.co.uk. **Zero real-person discussions were opened**, so demand is **unverified**, not proven absent. Search snippets surfaced no adopter asking for any of these tools either.

### Ideas considered
- **Behaviour log shareable with a behaviourist** - saturated. BauBau now includes behaviourist sharing in its *free* plan, Pro $3.99/mo or $34.99/yr, v1.13.3, no ratings yet (https://apps.apple.com/app/id6757988336). Focus Canine: free, behaviour log + PDF vet reports, no ratings (https://apps.apple.com/us/app/-/id6756831382). Dogtales: free, Unlimited $3.99/mo or $24.99/yr, vet-visit logs, iCloud sharing costs extra, no ratings (https://apps.apple.com/app/id6468829982). Overlaps the queued nervous-dog diary. **Rejected.**
- **3-3-3 / decompression tracker** - plenty of explainer content (https://rescuedogs101.com/bringing-new-dog-home-3-3-3-rule, snippet only, page blocked); no tracker found, but no one found asking for one, and the nervous-dog diary already covers it. **Rejected: no demand evidence, overlaps queue.**
- **Import paperwork / health-record "adopter file"** (passport, titre, tapeworm, retest dates in one place) - guidance is spread across vendor PDFs (e.g. https://www.tailharbor.eu/pdfs/bringing-your-dog-from-spain-to-united-kingdom.pdf; GOV.UK AHC PDF https://assets.publishing.service.gov.uk/media/69a54a73286b6fdc85daeb24/2580NFG.pdf, not opened). No dedicated app found, but generic record apps exist (Dogtales above; Animark/VetKit from last week). Rules change and vary by origin, so a tool would carry accuracy and health-advice risk. Better as a checklist article. **Rejected for now.**
- **Transport / arrival-day tracking** - flight-nanny and transporter listings already advertise live tracking and updates (https://citizenshipper.com/drivers/765335, marketing, unverified; https://travel.yahoo.com/advice/lifestyle/articles/cant-fly-pet-flight-nanny-090150433.html). Transport is run by rescues/third parties, so a tool depends on their cooperation. **Rejected: not controllable by Mike, no demand evidence.**
- **Multi-dog introduction planner** - guidance abundant and sound (https://www.Muttville.org/pdfs/resources/IntroducingYourNewMuttvilleDogToYourResidentDog.pdf, https://pasadenahumane.org/introducing-a-new-dog-to-your-resident-dog/); only generic Doggy Time-style pet trackers (https://pottywhiz.app/furry-friends-forever-introducing-your-new-puppy-to-your-home-s-pet-family, a blog page, app unverified). No import-specific angle. **Rejected: weak fit, no demand; content only.**
- **Adopter-to-rescue update channel** - re-tested; still no adopter or UK overseas rescue found asking for a tool. A Mumsnet thread (snippet only, https://www.mumsnet.com/talk/the_doghouse/2699226-Adopting-a-dog-from-an-overseas-rescue-centre-WWYD) argues overseas rescues give less post-adoption support, which is a content angle ("what to ask your rescue for"), not evidence of tool demand. **Rejected.**
- **Dogo** (generic training) for context: 4.8 from 17K ratings, v10.53.0, paywall complaints in reviews (https://apps.apple.com/app/id1153294767). Confirms generic training is saturated.

### Best candidate scorecard: import paperwork / health-record file
| Criterion | Score | Evidence |
|---|---|---|
| Audience fit | 5 | Only imported dogs need this paperwork (tailharbor/GOV.UK links above). |
| Evidenced demand | 1 | No real person asking found; all discussion sites blocked. |
| Competition gap | 3 | No import-specific tool found; generic record apps exist (Dogtales). |
| Solo feasibility | 5 | Client-side Nuxt tool, no backend. |
| Honest monetisation | 2 | No clear path; lab/insurer affiliates would bias health/legal-adjacent content. |
| Risk (5 = low) | 3 | Import rules and retest timing are legal/veterinary; must defer to GOV.UK and vet. |
| **Total** | **19/30** | Below 22; demand below 4. **Does not qualify.** |

**Suggested follow-up:** the blocked discussion sites are the main gap. If access is not fixed, further scouting of demand is not meaningful; consider checking with Mike whether Reddit/Mumsnet can be allow-listed.

NO QUALIFYING OPPORTUNITY THIS WEEK

---

## 2026-10-09 (weekly run)

**Verdict: nothing qualifies.**

**Angles tested:** (1) post-import health retest reminders (Brucella/Leishmania/Ehrlichia); (2) vet-visit prep/handling log for fearful dogs; (3) lost-dog / flight-risk in the first weeks; (4) adopter-to-rescue updates; (5) UK foster-carer tools / handover notes.

**Effort:** 15 WebSearch calls; 5 pages opened with WebFetch successfully (3 App Store listings, 1 Google Play search page; plus the first-pass App Store pages below). **Blocked by the network proxy / unreachable:** reddit.com (both search URLs), mumsnet.com, wamiz.co.uk, maddiesfund.org, forum.maddiesfund.org, manytearsrescue.org, langfordvets.co.uk. So **zero real-person threads were opened directly**; the Mumsnet thread is known only via search-result summaries. Reddit demand is therefore **unverified**, not absent.

### Ideas considered
- **Post-import retest reminder/record keeper** — closest candidate, again not qualifying. Guidance on retesting exists but is vet-led and inconsistent (Laboklin suggests repeating Leishmania ELISA ~6 months after import: https://vbd.laboklin.com/wp-content/uploads/2023/07/Fact_Sheet_RO_EN_web.pdf; Langford Vets say follow-up depends on risk factors: https://langfordvets.co.uk/media/kp0dcywe/recommended-testing-for-imported-dogs-lvp.pdf; Many Tears Rescue says most UK vets now ask for a Brucella retest 3 months after arrival, per search summary only, page blocked: https://manytearsrescue.org/news-and-articles/adopting-a-romanian-dog). Demand evidence is still a single Mumsnet thread (https://www.mumsnet.com/talk/the_doghouse/5215390-brucella; per search summary the vet ultimately accepted the passport result, so the "problem" was a one-off conversation, not a tooling gap). Generic vet-record apps already cover due-date reminders: Animark (free, premium $3.99/mo or $24.99/yr, no ratings yet, https://apps.apple.com/app/id6758277760) and VetKit ($5.99 one-off, PDF export, no ratings yet, https://apps.apple.com/app/id6760608165). Neither is import-specific, but a "next test due" field is a small gap. Also high health-advice exposure: any default schedule would be a veterinary claim. **Verdict: rejected for now; could be an article/checklist on the site, not an app.**
- **Fearful-dog vet-visit log** — no dedicated app found; sources only give generic prep advice and suggest a notes app/spreadsheet (e.g. https://vcahospitals.com/know-your-pet/fear-free-for-dogs, https://1stpetvet.com/?p=2322 pre-visit form). No evidence people are asking for a tool. Overlaps the queued nervous-dog diary. **Rejected: no demand evidence, overlaps existing queue.**
- **First-weeks lost-dog / flight-risk tool** — advice is plentiful (https://www.luckydoganimalrescue.org/articles/2024-08/ownership-resource/lost-pet-guidance, https://petfbi.org/tips-for-newly-adopted-or-foster-dogs-lost-from-their-new-home/); lost-pet apps and GPS trackers are crowded (Finding Rover, Trackipet, PetRadar: https://petradar.org/en/articles/lost-dog-app). **Rejected: saturated; content opportunity only (a "first 48 hours" checklist).**
- **Adopter-to-rescue update channel** — Maddie's Pet Assistant (Pethealth) already does adopter/foster check-ins: 3.5/5 from 69 ratings, last version 14.0 on 1 Oct 2020, reviews ask for per-animal notes and vet logs (https://apps.apple.com/app/id968274332). It is US-shelter oriented; I found no UK/overseas-rescue equivalent, but also no adopter or rescue asking for one (rescue-side tools like Rescue Workflow, Buddy, ShelterLuv exist: https://rescueworkflow.com/animal-rescue-management-software). A B2B tool for small rescues would be a different business (sales, support, data protection) from this site. **Rejected: no demand evidence; wrong business model.**
- **UK foster-carer/handover tool** — nothing found; no evidence of demand. **Rejected: unverified/no demand.**
- **Wamiz forum complaints** (rescue misdescribing dog behaviour, closed-off after adoption: https://wamiz.co.uk/dog/forum/advice-needed-romanian-rescue-dogs-73355/6.html — snippet only, page blocked) point at due diligence/behaviour matching rather than a tool. Not scored; noted as content angle.

### Best candidate scorecard: post-import retest reminder
| Criterion | Score | Evidence |
|---|---|---|
| Audience fit | 5 | Only affects imported dogs (Laboklin/Langford pages above). |
| Evidenced demand | 2 | One Mumsnet thread (via summary); no Reddit/forum thread verified; those domains blocked. |
| Competition gap | 3 | Generic record apps with due dates exist (Animark, VetKit); no import-specific one found. |
| Solo feasibility | 5 | Client-side web tool on Nuxt site, no backend. |
| Honest monetisation | 2 | No clear path; insurance/lab affiliate links would risk bias in a health context. |
| Risk (5 = low) | 3 | Retest timing is veterinary advice; must be framed as "ask your vet" only. |
| **Total** | **20/30** | Below 22; demand below 4. **Does not qualify.** |

**Suggested follow-up (not a recommendation to build):** next week, retry the demand question via non-blocked sources; a printable "post-import health record" page would be a cheap content test.

NO QUALIFYING OPPORTUNITY THIS WEEK

---

## 2026-10-09 (test run, shallow because app stores were blocked)
- Reactive-dog trigger and threshold logger: rejected as saturated. Mellow: Reactive Dog Trainer (https://apps.apple.com/app/id6775967899) has a free log, with Pro at $9.99/month. BauBau (https://apps.apple.com/app/id6757988336) logs triggers, distance and a 0-10 reaction score. The site's nervous-dog diary is already queued.
- Post-import health retest reminders: the closest candidate. No dedicated tool was found, but demand evidence was thin: one Mumsnet thread (https://www.mumsnet.com/talk/the_doghouse/5215390-brucella) where vets disagreed about a 3-month Brucella retest. Worth re-testing with Reddit and forum evidence.
