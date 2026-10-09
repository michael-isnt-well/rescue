# App opportunity log

Weekly scout of niche dog app/tool ideas for the overseas-rescue-adopter audience
(rescuejourney.co.uk). Newest entry first. Lives on branch `research/app-scout`,
not on main, not published. Rule: every demand/competition claim has a source URL
or is marked "unverified". A week with no finding is a good, honest result.
Qualifying bar: total >= 22/30, no score below 3, demand >= 4.

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
