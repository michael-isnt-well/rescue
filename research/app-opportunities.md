# App opportunity log

Weekly scout of niche dog app/tool ideas for the overseas-rescue-adopter audience
(rescuejourney.co.uk). Newest entry first. Lives on branch `research/app-scout`,
not on main, not published. Rule: every demand/competition claim has a source URL
or is marked "unverified". A week with no finding is a good, honest result.
Qualifying bar: total >= 22/30, no score below 3, demand >= 4.

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
