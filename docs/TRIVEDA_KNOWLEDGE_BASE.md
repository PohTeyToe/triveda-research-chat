# Triveda Knowledge Base
> Consolidated from 28 research documents (~96K words) into a structured reference.
> Last updated: March 15, 2026

---

## Part 1: Product Overview

### What Triveda Is

**Name:** Triveda (Sanskrit: *tri* = three + *veda* = knowledge)

**One sentence:** Triveda reads your body through three healing traditions and tells you what to eat today — and where they agree.

**Elevator pitch:** Your body doesn't fit neatly into one system. Ayurveda types your constitution. TCM maps your energy and emotions. Naturopathy grounds it in biochemistry. Three traditions, three continents, three thousand years — and when they look at the same person and reach the same conclusion through completely different reasoning, that convergence means something. Triveda gives you a three-tradition profile in five minutes, then uses it daily to suggest food that fits your body, the season, and today's weather. When the traditions agree, you see it. When they disagree, you see that too.

**Who it's for:** People curious about traditional medicine who don't want to pick one system blindly. Wellness-interested adults who eat every day and want that daily behavior to mean something.

**Who it's NOT for:** People wanting meal plans or recipes. People seeking medical diagnosis. People on clinical diets. People who find all traditional medicine unacceptable. People looking for a single tradition's depth and nothing else.

### The Problem With What Exists Now

The current HolisticAI app is a 22-route feature-sprawling wellness portal. Every feature is essentially a styled form that POSTs to Gemini and displays the response. GlowCoach face scanning returns `Math.random()`. The core loop is consultation-based ("I have symptoms -> get recommendations"), which is episodic — nobody opens it daily.

| | Current App | Triveda |
|-|-|-|
| Core loop | Episodic consultation | Daily food companion |
| Features | 22 routes, shallow depth | 5 screens, deep depth |
| AI role | LLM is the entire product | LLM only explains pre-scored decisions |
| Traditional medicine | Ayurveda surface-level | Three traditions, asymmetric by design |
| Defensibility | Anyone can copy the prompts | Structured food database + scoring algorithm = IP |
| Daily use case | None | "What should I eat today?" |
| Trust mechanism | None | Show reasoning, cite sources, surface disagreements |
| Personalization | None | Learns from every food response |

### How the Research Evolved

**Phase 1 — "Does this project make sense?"** Eight parallel agents researched behavioral psychology, traditional medicine markets, and the codebase. Finding: the current app is a feature-sprawling LLM wrapper with no daily-use hook. Five product visions were synthesized, then an adversarial review killed four. Three elements survived: constitutional identity, food as daily surface, evidence transparency. This produced "Prakrti" — an Ayurveda-first food companion.

**Phase 2 — "What if three traditions is a requirement?"** Seven agents explored whether adding TCM and Naturopathy helps or hurts. The decisive insight: don't treat three traditions as equals. Use them asymmetrically — Ayurveda for food, TCM for energy/timing, Naturopathy for evidence honesty. This evolved Prakrti into "Triveda."

**Phase 3 — "Solve the four unsolved problems."** Four agents tackled domain expertise, content repetition, LLM wrapper risk, and viability beyond portfolio. All four were resolved: 2-week knowledge sprint using published instruments, 450-500 unique daily experiences per year, Database+LLM architecture (LLM explains but doesn't select), 10-15% real product probability with an open-source middle path.

**Phase 4 — "I want more tech like the database architecture."** Three agents designed deterministic intelligence systems: a 6-factor food scoring engine, Bayesian preference learning with Thompson sampling, statistical pattern detection, and a cross-tradition knowledge graph (~165 nodes, ~785 edges). This is the technical blueprint that makes Triveda an engineering portfolio piece, not just prompt engineering.

### Key Decisions Made

| Decision | Rationale |
|-|-|
| Kill 16+ features (GlowCoach, chat, journal, blood work, employer portal, clinics, meal plans, gamification, symptom analysis, wellness dashboard, consultation) | Episodic consultation can't become daily-use. Feature sprawl without depth. |
| Three traditions, not one | Project requirement + competitive differentiation. Asymmetric design prevents dilution. |
| Food as the only domain | Safest area of traditional medicine, lowest regulatory risk, universal daily behavior to attach to. |
| Ayurveda=food lens, TCM=energy/temporal lens, Naturopathy=evidence lens | Each tradition answers a different question. Prevents competing recommendations. |
| Database+LLM, not pure LLM | LLM selects nothing — it only explains pre-scored foods. Structured data is the IP. Hallucination-proof for the action layer. |
| Three isolated LLM calls with deterministic convergence | Prevents manufactured consensus. Convergence computed from structured properties, not AI text comparison. |
| 50-food MVP database | Buildable in 1 week. Expands to 200. Each food has Ayurvedic rasa/virya/vipaka, TCM nature/flavor/organs, and evidence-level ratings. |
| Open-source middle path | If the consumer product fails, the food-property database + scoring algorithm become a community resource. Better portfolio story either way. |
| 8-week kill-date post-launch | Day-7 return rate target: 20%. Failure: <12%. Willingness-to-pay signals absent = portfolio piece and that's fine. |

### Current State

**Product direction is decided:** Triveda, a three-tradition daily food companion. The product spec, technical architecture, content strategy, and business model are all documented.

**Nothing has been built yet.** The entire session was product/architecture exploration. The existing 22-route app is still deployed and unchanged.

### MVP Scope: 5 Screens

1. **Assessment** — 18 questions (10 Ayurvedic, 5 TCM, 3 Naturopathic), one per screen, auto-advance. 4.5 minutes.
2. **Constitution Card** — Plain-language summary + three expandable tradition sections (Ayurveda expanded by default).
3. **Daily Card (Home)** — Date, season, weather. One food, two-sentence rationale. Feedback buttons. Inline "Why?" panel with three tradition sections + convergence/divergence framing.
4. **Profile/Settings** — Constitution Card, retake assessment, dietary restrictions, location, tradition toggles.
5. **Seasonal Transition Card** — Appears when Ritu shifts (~every 2 months). Three-tradition seasonal explanation.

### API Endpoints

- `POST /constitution/assess` — 18-answer vector -> dosha ratios, element type, metabolic classification, plain-language summary.
- `GET /daily-food` — Profile ID + location + date -> scored food + three tradition explanations + convergence report.
- `POST /food-feedback` — Suggestion ID + response (tried/rejected) + optional symptom tag.

### Build Timeline

- **Weeks 1-2: Knowledge Sprint.** Read six key reference texts. Build 50-food database with three-tradition properties (LLM-assisted generation + manual validation against sources). Create 50-scenario validation dataset.
- **Weeks 3-4: Assessment + Constitution Card.** 18-question assessment with three deterministic scoring algorithms. Constitution Card display with expandable tradition sections. Backend: `POST /constitution/assess`, Supabase schema.
- **Weeks 5-6: Daily Food Engine.** Food scoring algorithm, three-call LLM explanation layer, convergence detection, OpenWeather integration, Ritu calculation. Frontend: daily card with Why panel, feedback buttons. `GET /daily-food` and `POST /food-feedback` endpoints.
- **Week 7: Polish + Deploy.** Remove existing feature pages, simplify navigation, seasonal transition card logic. Run CI, deploy to Vercel. Begin sharing with real users.
- **Weeks 8-15: Validation Period.** Collect metrics. Run 50-scenario validation audit. Fix systematic prompt biases. Build preference learning if feedback volume justifies it.

**Total: 7 weeks to ship, 15 weeks to decide if it's a product or a portfolio piece.**

### Success Metrics

**North star: Day 7 return rate.** Target: 20%. Industry benchmark: 10-15%. Failure: <12%.

| Metric | Target | What it validates |
|-|-|-|
| Assessment completion | >80% | 18 questions aren't too many |
| Why panel engagement | 25-35% of daily views | Three-tradition depth is interesting |
| Tradition section expansion | >40% expand non-Ayurvedic section in week 1 | Users engage with all three traditions |
| Feedback engagement | >40% of daily views | Personalization data is flowing |
| Day 30 return rate | >10% | Sustained daily value |

**Pivot criteria:** If tradition expansion stays below 20% after 4 weeks, strip TCM and Naturopathy. If Day 7 improves or holds, three traditions was adding complexity without value — ship the simpler Ayurveda-first product.

**Kill-date:** 8 weeks post-launch. If Day 7 return < 12% AND willingness-to-pay signals absent, it's a portfolio piece and that's fine.

### What Gets Reused From Current App

API client patterns (error handling, auth injection, AbortSignal), Supabase auth + demo mode, theme system (terracotta/sage/parchment tokens), dosha quiz component pattern, CI/CD pipeline (all workflows), Vercel + Render deployment config.

### What We're NOT Building

| Killed Feature | Why |
|-|-|
| GlowCoach face scanning | Returns `Math.random()`. No MediaPipe. No value. |
| Chat / conversational AI | A text box forwarding to Gemini. Zero defensibility. |
| Journal / mood tracking | Episodic, no daily hook, no tradition depth. |
| Blood work analysis | Phase 2 — needs the three-tradition framework built first. |
| Employer wellness portal | Requires SOC 2/HIPAA. Series-A play, not MVP. |
| Practitioner clinics | Marketplace dynamics are a separate business. |
| Meal plans / recipes | Triveda suggests ingredients and preparations, not step-by-step cooking. |
| Gamification (streaks/XP) | Extrinsic motivation risks worsening long-term retention (overjustification effect). |
| Symptom diagnosis | Medical domain. Regulatory risk. Not food. |
| Wellness dashboard | Feature sprawl without depth. |
| Consultation reports | Episodic consultation can't become daily use. |
| Notifications / daily briefing | Push notifications without daily value = uninstall trigger. |
| Saved care / bookmarks | Organizing LLM responses is not a product. |

---

## Part 2: Research Foundation

### Behavioral Psychology Findings

**The retention crisis is real and severe:**
- Day 1 retention: ~23% (77% never return after install)
- Day 7 retention: 10-15% average
- Day 30 retention: 3-10% average. Standout apps (MyFitnessPal, Strava) reach 8-25%.
- Day 90 retention: Single digits for average fitness apps. MyFitnessPal achieves ~24%. Strava pushed from 18% to 32% after introducing Challenges.

**Behavioral loops that drive daily return:**

| Mechanism | How it works | Best example |
|-|-|-|
| Loss aversion (streaks) | Breaking a streak feels like losing accumulated investment. Duolingo's iOS streak widget increased daily commitment by 60%. | Duolingo |
| Variable reward | Unpredictable outcomes trigger dopamine responses stronger than predictable rewards. | Strava segment leaderboards |
| Identity reinforcement | "I am a runner" — the app becomes part of self-concept. Activities with PRs get 3x more social engagement. | Strava, Peloton |
| Social accountability | Knowing others can see your activity creates external motivation. | Strava, Noom |
| Completion drive | Progress bars and daily goals exploit the Zeigarnik effect. | Apple Watch rings |
| Escalating commitment | Each day of data makes the app more valuable, raising switching costs. | Oura, MyFitnessPal |

**Why health apps fail:**
- Novelty decay: 77% never return after Day 1 (the "Resolutioner" churn problem)
- Guilt spirals from missed days: Streak-based apps punish absence, triggering avoidance
- Information overload: Education-heavy apps overwhelm users who wanted a simple tool
- No perceived progress: Tracking-focused apps show data but not meaning
- Privacy friction: 60% of surveyed downloaders decided not to install when they saw data requirements

**The overjustification problem:** Extrinsic rewards (points, badges, streaks) can actively undermine intrinsic motivation. Edward Deci's 1971 study showed participants who enjoyed puzzles lost interest after being paid to solve them. A PMC meta-analysis found gamified elements did not improve, and might weaken, retention in health app studies. Non-tangible rewards (praise, recognition, self-insight) do not trigger overjustification and can enhance intrinsic motivation.

**Self-Determination Theory:** Only 7.7% of 194 mental health apps studied satisfied all three SDT needs (autonomy, competence, relatedness). Competence was the strongest predictor of sustained health behavior change.

**Time-to-value:** If users don't experience core value in their first session, long-term retention drops dramatically. The "aha moment" must be emotionally felt, not intellectually understood.

**Underexplored hooks:**
- Daily briefing model (from news apps): curated, time-limited digest with clear beginning and end
- Daily quest with expiration (from gaming): creates urgency without streaks
- Anticipatory models: apps that predict and pre-empt rather than react ("tomorrow is likely a low-energy day")
- Widgets and ambient displays delivering value without app opens

**The untapped opportunity:** No app has combined (1) a deep, authentic traditional health framework, (2) modern AI-powered personalization, and (3) behavioral design rigor of a Duolingo or Strava. The intersection is essentially empty.

### Traditional Medicine Market Findings

**Market size:**
| Metric | Value |
|-|-|
| Global CAM market (2025) | $222.6B |
| Global CAM market (2033 projected) | $1,282.7B - $1,430.7B |
| CAM CAGR (2026-2033) | 26.4% |
| U.S. CAM market (2033 projected) | $229.1B |
| Herbal medicine market (2025) | $251.2B |

**Consumer base:** Female, 35-65, highly educated, substantial disposable income. 240,000 Americans actively using Ayurvedic medicine. U.S. adults spent $33.9 billion out-of-pocket on CAM (11% of all out-of-pocket healthcare spending).

**Practitioner landscape:**
- India: ~500,000 registered Ayurveda practitioners, 280 colleges
- US: Ayurvedic providers NOT licensed (no national standard). TCM practitioners licensed in most states. NDs licensed in ~25 states.
- Zero purpose-built digital tools for traditional medicine practitioners

**Prakriti genomic validation:** A genome-wide SNP analysis of 262 individuals (published in *Scientific Reports*, Nature) found 52 SNPs significantly different between the three Prakriti types. Principal component analysis successfully classified individuals into Prakriti groups irrespective of ancestry. Machine learning using unsupervised clustering on phenotypic traits independently rediscovered three clusters corresponding to the three Prakriti classes.

**What each tradition uniquely offers:**

**Ayurveda:**
- Prakriti (constitutional typing) — a comprehensive psycho-physiological classification across physical structure, metabolism, temperament, disease susceptibility. Seven recognized constitutional patterns.
- Dinacharya/Ritucharya — a complete time-based lifestyle protocol with a five-variable personalization matrix (constitution, strength, age, season, health status)
- Agni/Ama — the gut health framework before gut health. Agni maps to digestive enzyme activity and microbiome composition. Ama maps to metabolic endotoxemia and systemic inflammation.

**TCM:**
- Pattern differentiation vs. disease diagnosis: "What pattern of disharmony?" not "What disease?" Naturally handles comorbidity and individual variation.
- The meridian system: identified by *Science* as one of the 125 most important scientific questions in the world (2021)
- Five Element Theory: constitutional typology mapping personality, organs, emotions, seasons, foods. Stronger emphasis on emotional patterns than Ayurvedic doshas.
- Organ clock: 12 two-hour windows assigned to organ systems across 24 hours. Modern biorhythm research confirms relevant circadian patterns in organ systems TCM associates with specific times.

**Naturopathy:**
- Vis Medicatrix Naturae — structured treatment hierarchy (identify and remove obstacles, support self-repair, before pharmaceuticals)
- Functional lab interpretation — narrower optimal ranges than conventional reference ranges. Contentious but increasingly accepted.

**Cross-system convergence:** All three systems share constitution-based personalization, digestion as root of health, food as medicine, botanical pharmacopeia overlap (~50% shared between Ayurveda and TCM), and mind-body integration.

**Cross-system divergence:** Different elemental frameworks (Ayurveda: 5 elements -> 3 doshas; TCM: 5 phases in generative/controlling cycles). Different diagnostic methods. Different treatment sequencing. TCM's Qi has no direct Ayurvedic equivalent.

**AI risk:** Mount Sinai study found AI chatbots hallucinated fabricated diseases, lab values, and clinical signs in up to 83% of simulated cases when no safety measures were in place.

### Codebase Audit Findings

**Core infrastructure is solid and reusable:** API client (`vjds-api.ts`, 1394 lines) — well-typed, 20+ endpoint methods, proper error class, AbortSignal support, auth header injection. Auth system with clean demo mode gating. Theme system (537-line semantic token system with light/dark mode). CI/CD pipeline (4 GitHub Actions workflows). Code splitting with lazy loading.

**Feature depth is shallow:** Most pages are 500-1000 line components with no decomposition. Every "AI-powered" feature is a thin form that POSTs to Gemini. No client-side state management beyond React context, no caching layer, no offline support, no persistent local data model.

**Technical debt:** No state management. localStorage as a database. No data model. GlowCoach vision is fake. Massive page files (JournalPage 1,027 lines). No error boundaries. Duplicated types and logic.

**The standout:** Blood work privacy model (three-tier system with QR verification, access logs, access requests with approve/deny, and employer portal) — the one feature with genuine product thinking.

**Bottom line:** Keep the infrastructure skeleton (API client, auth, theme, CI/CD, routing patterns) and the analyze-transform testing pattern. Drop all medicine-system-specific content and rebuild around the new product.

### Five Product Visions and What Survived

Five visions were synthesized from the research:
1. **The Body Forecast** — Anticipatory health predictions (weather app for your body)
2. **The Convergence Engine** — Cross-tradition second opinion tool
3. **The Constitution Layer** — Prakriti-based health OS with daily briefing
4. **The Evidence Translator** — Citation-first Snopes for traditional medicine
5. **Seasonal Kitchen** — Constitution-filtered daily food suggestions

The adversarial review killed all five as standalone products, but three elements survived all tests:

| Survivor | Why it's resilient |
|-|-|
| **Constitutional identity as organizing principle** | Identity reinforcement is the strongest behavioral mechanism. Genomic validation gives credibility. Persistent profile is something ChatGPT can't replicate. |
| **Food as daily surface** | Eating is the one universal daily behavior the app can attach to. Not recipes — simple "what to eat today" with constitutional + seasonal filtering. |
| **Evidence transparency as trust architecture** | The trust gap is the #1 barrier. Show reasoning, cite sources, express uncertainty. Design principle, not a feature. |

**Combined identity:** "Know your constitution. Eat for it. Understand why."

### Contrarian Challenges That Shaped the Direction

**"Daily retention is the wrong goal":** Apps that achieve daily retention share a structural trait this product initially couldn't replicate — they track an activity the user already does daily. This is why food became the anchor: eating is a daily behavior.

**"The consumer is probably the wrong user":** 500,000 practitioners with no tools. Better economics ($50-200/month B2B vs. $10-20/month consumer). Practitioners are distribution channels for consumer products. The practitioner direction was filed as a Phase 2+ opportunity because it requires domain expertise the team doesn't have yet.

**"AI is not a differentiator":** Within 18 months, every health app will have AI-generated recommendations. The real moats are curated structured knowledge bases, network effects from practitioner adoption, and proprietary data from user interactions. This drove the Database+LLM architecture decision.

**"Three traditions is a weakness disguised as a strength":** Covering three traditions at surface depth is worse than one at real depth. This was resolved by the asymmetric design — each tradition answers a different question, preventing dilution.

### Creative Ideas That Make It Revolutionary

**Contradiction Engine:** Surface where traditions conflict with each other and with modern science. "Here's what we recommend, and here's why we might be wrong." Makes the app more trustworthy AND more interesting. Each contradiction is a behavioral hook.

**Personal Hypothesis Testing:** After 2 weeks of data, generate testable hypotheses: "You respond well to warming breakfasts but not warming lunches. Hypothesis: your Agni is strongest in the morning. Want to test it? Eat warm lunch at noon for 5 days." Transforms the app from advice-giver to collaborator.

**Evolving Constitution:** After 30 days, show a "confidence map" — which parts of the initial assessment are confirmed by behavioral data, which are in question. At 90 days, offer reassessment combining questionnaire + behavioral data. Treats constitution as living hypothesis, not permanent label.

**Aggregate Insights (Post-Scale):** "73% of Vata types report better energy with warm breakfasts. You're in the 27% who didn't. Here's what the 27% have in common." Creates genuinely new knowledge no competitor can match.

**"What Ayurveda Gets Wrong" Section:** A permanent section cataloging known limitations and contested claims. Nothing builds trust faster than admitting limitations.

**Moonshot (North Star):** A participatory health science platform partnering with Ayurgenomics researchers. Users contribute anonymized data linking Prakriti typing -> food outcomes -> genetic markers. First large-scale empirical validation of Ayurvedic dietary principles.

---

## Part 3: Three-Tradition Architecture

### The Question

The original pipeline converged on Ayurveda-first. The team then asked: what if three traditions is a hard requirement? Does it ruin the product or make it a superpower?

### The Case Against Three Traditions

**The dilution problem:** The product has finite surface area per interaction. The design target is forty-five seconds of reading per day. Divide that by three traditions and each gets fifteen seconds — a fortune cookie, not an education. Compounding literacy is lost: Agni appears one-third as often, nothing internalizes.

**The coherence problem:** The traditions disagree on the nature of reality, not just details. Doshas are not qi. Meridians are not metabolic pathways. Fire in Ayurveda is categorically different from Fire in TCM. Concrete example: acid reflux — Ayurveda says no sour (Pitta excess), TCM may recommend sour (to regulate Liver Qi), Naturopathy might recommend apple cider vinegar (too little acid theory). These are incommensurable, not complementary.

**The false consensus trap:** When an LLM generates "agreement" across traditions, it may be an artifact of a language model trained to find consensus, not genuine convergence. False consensus is worse than honest disagreement because it gives the user a confidence with no epistemic foundation.

**The user problem:** The intersection of three niche audiences is smaller than any component. Choice overload (Barry Schwartz's paradox, Sheena Iyengar's jam study) — three competing rationales are less persuasive than one strong reason (the "dilution effect" in attribution theory). More frameworks = more cognitive load = less behavior change.

**The identity problem:** "An Ayurvedic food companion" fits in one breath. "A food companion using Ayurveda, TCM, and Naturopathy" raises questions instead of answering them.

### The Case For Three Traditions

**Independent validation is the logic of science itself.** When three traditions developed on different continents arrive at the same recommendation through different reasoning, that's convergence — the same mechanism that makes scientific findings trusted through independent replication. Ayurveda says warming foods stoke Agni. TCM says they support Spleen Yang. Naturopathy says they reduce the thermic cost of digestion. Three different causal mechanisms, same conclusion. That triple validation is more credible than any single tradition alone.

**Complementary blind spots.** Concrete example: persistent afternoon fatigue. Ayurveda identifies weak Agni at midday and adjusts lunch. TCM identifies Spleen Qi deficiency (peak 9-11 AM, crash manifests afternoons) and flags that worry may contribute. Naturopathy checks functional ferritin range and flags HPA axis dysregulation. Together: a digestive adjustment, an emotional awareness, and a lab test. No single tradition covers all three angles.

**The disagreement hook.** Disagreement is the most interesting thing that can happen. It creates curiosity ("why do they differ?"), engagement ("which applies to me?"), and intellectual honesty ("this app doesn't pretend to have one right answer"). Every contradiction is a behavioral hook that no single-tradition app can generate.

**Cultural and market breadth.** Ayurveda reaches the South Asian diaspora (4.4M in US) and yoga community (~36M). TCM reaches the East Asian diaspora (24M in US) and acupuncture community (38,000 practitioners). Naturopathy reaches Western wellness consumers broadly ($33.9B out-of-pocket CAM spending). A three-tradition product addresses the union of these markets, not the intersection.

**The moat argument.** Prompt engineering complexity, unprecedented cross-tradition response data, multi-community credibility, and positioning in a completely empty market ("Health Rosetta Stone").

### The Verdict: Asymmetric Design

The key insight: don't treat three traditions as three equal constitutional systems. Naturopathy doesn't have constitutional typing. Forcing it into one produces fake depth. Instead:

- **Ayurveda** = the constitutional food lens (what to eat, why it fits your body)
- **TCM** = the temporal-emotional lens (when to eat, what your energy/emotions mean today)
- **Naturopathy** = the evidence/honesty lens (what biochemistry says, where evidence exists and doesn't)

Three dimensions of one recommendation, not three competing recommendations. Ayurveda and TCM are the two constitutional pillars. Naturopathy is the empirical check.

### Three-Tradition Architecture Principles

1. **Synthesis First, Traditions on Demand.** The user's default experience is a single recommendation with a single rationale. Individual tradition perspectives live behind a tap. The daily card is one suggestion with one reason. The three-tradition "Why" panel is the drill-down.

2. **Domain Separation Over Competition.** Each tradition owns the domain where it is structurally strongest. When traditions overlap, the product synthesizes a single answer. They answer different questions about the same user (the Crystal Knows pattern: DISC answers "how should I communicate?" while Enneagram answers "what drives this person?").

3. **Convergence Is the Trust Signal, Not the Default.** Convergence is surfaced only when genuinely surprising or informative. If convergence badges appear on 90% of recommendations, they become noise. Convergence must feel earned, not wallpaper.

4. **Disagreement Is Content, Not a Bug.** Disagreements in reasoning are surfaced openly; disagreements in action recommendations are reconciled into a single suggestion with the tension explained in the Why panel. The user always gets one clear thing to do.

5. **Scope Aggressively Per Tradition.** Each tradition deployed only in its highest-confidence, lowest-controversy domain. No full TCM pattern differentiation. No Naturopathic functional lab diagnosis.

### The Core Daily Experience

You wake up, open Triveda at 7:10 AM. The screen shows one card:

> **Today — Early Spring**
> *46F, warming to 62. Dry, with wind building after noon.*
>
> **Warm oatmeal with ghee, cardamom, and stewed apples.**
> Grounding, warm, and easy on your digestion — which peaks in the next two hours.

One food. Two sentences. Fifteen seconds. Tap the checkmark and close. Twenty seconds total.

The surface card never uses "Ayurveda," "TCM," or "Naturopathy." Traditional knowledge is delivered in plain English. The depth is there when you want it, invisible when you don't.

Tap **"Why?"** and the panel expands:

> **All three traditions point the same direction this morning.**
>
> **Your Constitution (Ayurveda):** Oats are Madhura (sweet) and Guru (heavy) — they directly ground Vata's mobile quality. Ghee lubricates without aggravating Pitta. Cardamom (Ela) kindles Agni gently. Charaka Samhita, Sutrasthana Ch. 6.
>
> **Your Energy Today (TCM):** It's Stomach hour (7-9 AM), when your digestive energy peaks. The wind today stirs your Wood element's Liver Qi. Oats and ghee are stabilizing — they prevent restless, irritable energy. You may notice more neck tension than usual today. That is Liver Qi, not a personal failing.
>
> **The Evidence (Naturopathy):** Oat beta-glucan (3-4g per serving) moderates postprandial glucose response. Ghee contains butyrate, a short-chain fatty acid with demonstrated anti-inflammatory effects (Hamer et al., 2008). No controlled trials exist for constitution-specific oat recommendations — this guidance is traditional, supported by general nutritional science but not validated for dosha-specific application.

When traditions disagree, the user sees: "Traditions split on one detail here" — and the Why panel explains the tension with labeled disagreement markers.

### The Constitution Card: Three-Tradition Profile

Plain-language summary at top, drawing from all three traditions without naming any:

> **Your Constitution**
> You run hot-cold: intense creative energy that burns fast, then crashes. Your digestion is your barometer — when it's off, everything's off. Wind and cold weather hit you hardest. Stress lands in your gut before your mind processes it.

Below: three expandable sections.

**Ayurvedic Profile:** Vata-Pitta. Variable Agni (Vishama trending Tikshna). Sweet, warm, grounding foods as constitutional base. Genomic validation: 52 significant genetic markers (Govindaraj et al., *Nature Scientific Reports*).

**TCM Five Element Profile:** Wood-Water. Liver Qi tends toward excess in spring and under stress. The Wood-Water combination explains why emotional state and digestion are tightly linked — something Ayurveda's dosha model captures less precisely.

**Evidence Profile (Naturopathy):** Does NOT attempt constitutional typing. Provides empirical context: sympathetic nervous system dominance, likely fast oxidizer, functional considerations worth tracking (ferritin, B12, thyroid). Flags points of tension with other traditions: "Higher protein needs possible — a point of tension with standard Ayurvedic Vata-Pitta diet recommendations that the app will track through food feedback data."

### Solving the False Consensus Problem

Three SEPARATE LLM calls with tradition-isolated system prompts. Convergence is computed by deterministic post-processing (comparing food categories, ingredients, timing from structured properties), not inferred by the AI. The synthesis prompt is *told* whether traditions agree — never asked to determine it. A 50-scenario validation dataset establishes baseline accuracy before launch.

### Creative Ideas Specific to Three Traditions

**Diagnostic Triptych:** Three vertical columns constructing diagnostic narratives simultaneously when the user investigates a symptom pattern. Agni flame for Ayurveda, Qi flow arrows for TCM, biomarker curves for Naturopathy. Columns then attempt to merge — the degree of visual overlap shows convergence or divergence spatially on the user's body outline.

**Tradition Drift Tracking:** Ternary plot (triangle diagram) showing which tradition's recommendations are most predictive for each user over time. The user's dot moves toward whichever tradition is currently most accurate. "Six months ago, your body responded most consistently to Ayurvedic food recommendations. Since your new job started, TCM recommendations have become significantly more predictive."

**Disagreement Calendar:** Calendar view where each day is color-coded by inter-tradition agreement. Over a month, patterns emerge — red days might cluster around seasonal transitions, menstrual cycles, or stress periods.

**Cross-Tradition Hypothesis Testing:** "Ayurveda says warm for you, TCM says cooling. Let's test both." Four-week protocols distinguishing between competing traditional explanations using the user's own data.

**Seasonal Premieres:** Quarterly immersive experiences showing the season arriving in your body from three angles simultaneously — the constitutional shift, the emotional surge, and the biochemical recalibration.

**Translation Moments:** Long-press any tradition-specific term to see its equivalent in the other two traditions. "Ayurveda calls this Agni (digestive fire). TCM calls it Spleen Yang. Naturopathy calls it gastric motility, enzyme secretion, and thermic effect of food. Three names for the same fire in your belly." Users build a personal glossary of cross-tradition translations over time.

**Monthly Portraits:** 300-400 word narrative telling the story of the user's body that month from all three perspectives woven together.

---

## Part 4: Technical Architecture & Challenges

### Challenge 1: Domain Expertise Gap — SOLVED

**The reframe:** "We need two weeks and six books."

The knowledge required is narrower than assumed. Four layers:

**Layer 1: Assessment Scoring.** Use published, validated instruments:
- Ayurveda: Sivapuram questionnaire (30 items, Cronbach's alpha 0.976, physician-validated). Prakriti200 dataset on arXiv for validation.
- TCM: CCMQ (60-item validated instrument). Five Element heuristic from Beinfield & Korngold's *Between Heaven and Earth* (1991).
- Naturopathy: Wolcott's *The Metabolic Typing Diet* — extract 3 high-signal questions (protein vs. carb satiation, caffeine sensitivity, exercise recovery).

**Layer 2: Food-Constitution Pairings.** The classification systems are finite, published, and structured:
- Ayurveda: Charaka Samhita Ch. 27 (12 food groups with rasa/virya/vipaka/dosha effects). Amidha Herb Database (700+ items, structured JSON on Figshare).
- TCM: Kastner's *Chinese Nutrition Therapy* (300+ foods by thermal nature/five flavors/organ affinity). Pitchford's *Healing with Whole Foods* (700+ pages).
- Naturopathy: USDA FoodData Central API (380,000+ foods, free, public domain). PubMed for evidence.

**Layer 3: The "Why" Panel Reasoning.** LLM generates natural-language explanations from structured data. Hallucination hotspots: specific textual citations, cross-tradition claims, herb-specific safety claims. These require validation against Layer 2 lookup tables.

**Layer 4: Cross-Tradition Mapping.** Convergence detection operates on structured food properties, not natural-language reasoning. Key resource: Svoboda & Lade, *Tao and Dharma* (1995) — the only book-length cross-tradition comparison by credentialed practitioners.

**The "good enough" line:** Food suggestions = recipe-blog risk. Constitutional typing = personality-quiz consequence. The Why panel is where hallucination matters — false citations and fabricated cross-tradition mappings.

**Expert access shortcuts:** Bastyr/NUNM teaching clinics, Reddit communities (r/Ayurveda, r/ChineseMedicine), RIPEN program connections.

**2-week knowledge sprint:** Week 1 = read six key texts + build 10-food cross-reference. Week 2 = expand to 50 foods in structured JSON + build validation dataset + initiate expert outreach.

### Challenge 2: Content Repetition — SOLVED

**Quantified analysis:**
- Ayurvedic Vata-Pitta food corpus: ~133 ingredients total
- After winter + breakfast filters: 50-60 distinct breakfast experiences per season
- TCM adds 15-20 more perceptibly different items
- Seasonal transitions refresh ~30% of the pool every 2 months
- Three traditions provide a 2.5-3x frame multiplier — same oatmeal explained through Ayurvedic rasa theory, TCM organ clock timing, and nutritional biochemistry feels like three different suggestions

**Seven variation strategies:**
1. **Dimension rotation** — food vs. spice vs. timing vs. method vs. avoidance advice (extends by ~3-4x)
2. **Context-driven variation** — weather delta, symptoms, day of week, daylight hours (extends by ~2x)
3. **Three-tradition rotation** — rotate which tradition leads the daily card's rationale (extends by ~2.5-3x)
4. **Complexity scaling** — week 1: single ingredients -> week 4: combinations -> week 8: meal principles (extends by 30-45 days)
5. **Anti-repetition enforcement** — never repeat within 14 days, hard rejection, full pool exhaustion before cycling (extends by 25-40%)
6. **Astronomical/cultural anchoring** — lunar phases, solstice/equinox, Ritu transitions, TCM jieqi (adds ~8-10 unique cards per season)
7. **Educational cards** — "did you know" cards that teach rather than prescribe

**Result: ~450-500 unique daily card experiences per year.** Honest limit is 12-14 months before needing content refreshes.

### Challenge 3: LLM Wrapper Problem — SOLVED

**The "Tongue Not Brain" Principle:** The LLM explains but never decides.

**Architecture shift:**
- A **structured food-property database** (Postgres: foods, food_ayurveda, food_tcm, food_evidence tables) provides the facts
- A **deterministic scoring algorithm** ranks foods for a given constitution + season + weather + user history
- The LLM **only explains** why the top-ranked food is appropriate — it cannot recommend a food not in the database
- Convergence is computed from **structured property scores**, not text comparison

**What this means:**
- Hallucination-proof for the action (LLM can only hallucinate in the explanation, not the recommendation)
- The database is IP that can't be replicated by prompting ChatGPT
- The LLM becomes swappable (not locked to Gemini)
- Accuracy is auditable (check the database, not pray the LLM is right)

**Structured food database entry example:**
```
food_id: "oats_rolled"
ayurveda:
  rasa: ["madhura"]  # sweet
  virya: "sheeta"     # cooling
  vipaka: "madhura"   # sweet post-digestive
  guna: ["guru", "snigdha"]  # heavy, oily
  dosha_effect: { vata: -2, pitta: -1, kapha: +1 }
  seasonal_fit: { vasanta: 0.7, grishma: 0.8, varsha: 0.5, ... }
tcm:
  thermal_nature: "warm"
  flavor: ["sweet"]
  organ_affinity: ["spleen", "stomach", "heart"]
  actions: ["tonify_qi", "supplement_spleen"]
  element_fit: { wood: 0.6, fire: 0.5, earth: 0.9, metal: 0.5, water: 0.4 }
evidence:
  beta_glucan_g_per_100g: 4.0
  glycemic_index: 55
  claims:
    - claim: "Reduces postprandial glucose response"
      evidence_level: "strong"
      source: "EFSA Journal 2011;9(6):2207"
    - claim: "Lowers LDL cholesterol at 3g+/day beta-glucan"
      evidence_level: "strong"
      source: "Whitehead et al., Am J Clin Nutr 2014"
```

### 6-Factor Food Scoring Engine

Every food scored daily per user via weighted additive formula:

| Factor | Weight | Source |
|-|-|-|
| Constitutional fit (dosha) | 0.30 | Food's dosha effects x user's dosha profile |
| Seasonal appropriateness | 0.20 | Food's Ritu fit, blended during 14-day transitions |
| Weather adjustment | 0.15 | Food's thermal nature vs. weather-driven thermal need |
| Five Element compatibility | 0.15 | Food's element fit x user's primary/secondary elements |
| Anti-repetition penalty | 0.12 | Decay over 7 days; hard reject for 14 days |
| Organ clock timing | 0.08 | Food's organ affinity vs. current TCM organ hour |

Weather modifies the user's effective dosha profile by up to 15% — a cold windy day shifts Vata upward, changing which foods rank highest. Hard dietary restriction filter applied before scoring.

### Deterministic Engines

All computed without LLM involvement:

**Seasonal Engine:** Date + latitude -> Ayurvedic Ritu (6 seasons) + TCM phase (5 phases). Handles hemisphere inversion, latitude dampening (tropical regions = weaker seasonal signal), and 14-day sandhi kala transition periods with linear blending.

**Constitutional Scoring:** 18-question assessment scored via weighted accumulation matrix (not LLM interpretation). Dual-dosha detection when gap is <15%. Five Element weights from 5 questions. Metabolic typing via 3-question decision tree. Confidence: ~70-75% for dosha, ~60-65% for element.

**Organ Clock:** Full 12-organ TCM cycle with time ranges. Stomach 7-9 AM, Spleen 9-11 AM = optimal meal absorption. Feeds digestive/wind-down window flags into scoring.

**Weather Mapper:** OpenWeather API -> dosha aggravation levels via specific thresholds. Wind speed > 5 m/s + cold = Wind-Cold pattern. Humidity > 70% = Kapha aggravation. Temperature < 40F = Vata +1. Re-normalizes user's dosha profile based on current conditions.

**Convergence Detection:** Four-dimension comparison (thermal, constitutional, seasonal, evidence) computed from structured food properties BEFORE any LLM call. "Interesting divergence" heuristic: thermal contradictions always flagged; evidence contradicting traditional consensus triggers the honesty layer.

### Three-Call LLM Architecture

Each daily recommendation generated through three separate LLM calls with tradition-isolated system prompts. The convergence flag is computed deterministically and *injected* into the synthesis prompt — the LLM is told whether traditions agree, never asked to determine it. This prevents RLHF-trained models from manufacturing coherent consensus.

### ML & Data Systems (Post-Launch)

**Bayesian Preference Learning:** Beta distributions track per-user acceptance rates for food properties (virya, guna, rasa, category, time-of-day). ~200 lines of Python. Works with 10 responses. Learns WHY you like foods ("this user responds 40% better to heating virya").

**Thompson Sampling:** Explore/exploit selection from equally-scored candidates. Picks WHICH specific food from the shortlist.

**Cold-Start Ramp:**
- 0-9 responses: pure constitutional scoring
- 10-29 responses: category preferences
- 30-49 responses: thermal/time weights
- 50+ responses: full personalization

**Pattern Detection:** Fisher's exact tests and point-biserial correlations detect time, weather, property, and symptom patterns. Generates testable hypotheses: "Your Agni seems strongest in the morning. Want to test warm lunch for 5 days?"

**Aggregate Insights (Post-Scale):** Nightly materialized views in Supabase. Four query types: constitution x thermal acceptance, cross-tradition interactions, convergence validation, next-day symptom correlations. k=30 anonymity threshold.

**Tradition Affinity Tracker:** 60-day rolling point-biserial correlation per tradition. Surfaces after 40+ responses. Blended 60/40 with base weights so no tradition drops below ~15% influence.

### Knowledge Graph

**Cross-Tradition Concept Map:** ~30 concept mappings across four categories (constitutional, physiological, diagnostic, food properties). Each mapping has a confidence score.

Key strong mappings: Agni <-> Spleen Qi, Ama <-> Dampness, Ojas <-> Jing. Key gaps: Metal element has no dosha equivalent, Guna maps to Yin/Yang only at structural level.

**Schema:** Two Postgres tables (kg_nodes, kg_edges) with JSONB metadata. ~165 nodes, ~785 edges. Small enough for Supabase — no graph database needed.

**What it enables:**
- Translation Moments: deterministic concept lookup ("Agni in TCM is called Spleen Qi")
- Contradiction type classification: same-axis disagreement vs. different-axis priority vs. different-scope analysis
- Concept-level personalization: "you respond well to Agni-kindling foods" translates to "Spleen Qi tonifiers" and "carminative foods"
- Progressive vocabulary: track which concepts user has encountered, surface deeper education after repeated exposure

**Implementation:** v1 in 2-3 days (concept nodes + edges). v2 in 1-2 weeks (food links + Translation Moments). v3 in 2-3 weeks (feedback propagation).

### System Build Order

| Phase | Systems | Effort | Prerequisite |
|-|-|-|-|
| 1 | Food database (50 foods) + Constitutional scoring + Seasonal engine | 1-2 weeks | Food database research (done) |
| 2 | Food scoring engine + Weather mapper + Organ clock | 1 week | Phase 1 |
| 3 | Three-call LLM explanation layer + Convergence detection | 1 week | Phase 2 |
| 4 | Feedback model + Anti-repetition + Cold-start ramp | 1 week | Phase 3 deployed |
| 5 | Knowledge graph v1 + Translation Moments | 2-3 days | Phase 1 |
| 6 | Bayesian preference learning + Thompson sampling | 1 week | Phase 4 (needs data) |
| 7 | Pattern detection + Hypothesis testing | 1-2 weeks | Phase 6 (needs 2+ weeks of data) |
| 8 | Aggregate insights + Tradition affinity | Post-scale | 1000+ users |

**Phases 1-3 = the shippable MVP (3-4 weeks).** Phases 4-5 follow immediately. Phases 6-8 require user data.

### Portfolio Interview Answers

| System | "I built..." |
|-|-|
| Food Scoring Engine | "A multi-factor recommendation algorithm with seasonal, constitutional, weather, and temporal inputs" |
| Preference Learning | "A Bayesian preference model with Thompson sampling for explore/exploit optimization" |
| Pattern Detection | "A statistical hypothesis generation engine using Fisher's exact test and point-biserial correlation" |
| Knowledge Graph | "A cross-tradition medical ontology with confidence-scored concept translations" |
| Convergence Detection | "A structured property comparison system that validates cross-framework agreement without relying on LLM consensus" |
| Seasonal Engine | "A geolocation-aware seasonal computation engine mapping Western dates to Ayurvedic and TCM seasonal systems" |

### Challenge 4: Beyond Portfolio — PARTIALLY SOLVED

**Honest probability of becoming a real product: 10-15%.**

**Why it might work:**
- $12.2B Ayurveda market, 37.8% North America share, growing 15%+ annually
- Nobody does cross-tradition consumer products (structural gap, not lack of demand)
- Break-even at ~100 paid users at $4.99/month (Vercel/Render/Supabase hosting is cheap)
- Realistic 12-month best case: 2-5K users, $500-1500/month revenue

**Six business models explored:**
1. Consumer freemium ($4.99/mo) — most natural path. Break-even math: 1,000 free users + 100 paid users at $4.99/month = ~$499 revenue against ~$90-270 API costs.
2. Practitioner B2B SaaS ($29-49/seat) — better economics but harder to reach. 50 practitioners at $39/month = $1,950/month, achievable in 12-18 months.
3. Content licensing / API ($0.01-0.05/call or $500-2K/mo enterprise) — year-two play
4. Education/courses ($29.99 one-time or $7.99/mo) — highest margin. 500 purchases = $14,995.
5. Research partnerships ($50K-200K grants) — 2-3 year timeline, needs 5,000-10,000 users with 90+ days of data.
6. Employer wellness — requires SOC 2/HIPAA, series-A play

**The middle path:** Open-source the food-property database and scoring algorithm. Build community around the structured knowledge base. The app is the reference implementation. Creates value even if consumer product doesn't take off.

**Biggest blocker:** Distribution, not technology.

### Phase 2+ Roadmap

If metrics are strong (tradition expansion >30%, disagreement flags drive engagement):
- **Contradiction Engine deepening:** Weekly "Tradition Tensions" cards
- **Hypothesis testing:** Detected patterns -> testable 5-day experiments
- **Blood work through three traditions:** Ayurveda functional ranges, TCM pattern diagnosis from lab markers, evidence-based flags
- **Aggregate insights:** Cross-user patterns at 1,000+ users
- **Knowledge graph:** Full ~165 nodes, ~785 edges for Translation Moments and progressive vocabulary
- **Open-source food database:** If consumer product doesn't take off, the curated database becomes a community resource

---

## Part 5: Stakeholder Direction (March 15, 2026)

Sasha fully aligned on Triveda pivot direction after two March 15 calls (group check-in + 1:1 follow-up ~50 min).

She independently identified the same problems (too many features, overwhelming, chaotic) and arrived at the same solutions during the call — input/output structure, daily companion ("little buddy"), progressive profiling.

### Key Decisions Agreed

- **Input/output structure** — simple input side (assessment, daily check-in), clean output side (daily card, profile)
- **Progressive profiling** — NOT 18 questions upfront. Start with 2-3 questions, give first card immediately, weave one question per day into the daily experience. She thinks even 10 questions is too many for modern attention spans. "People can't even do 3-second Instagram reels."
- **22 features become backend intelligence** — nothing removed, they power recommendations behind the scenes. Users just see the simple daily output. "Why change anything you guys have done the work."
- **User profile shows daily output** — notifications, daily cards. Users don't navigate 22 features.
- **Testing is #1 priority** — she explicitly said this. Constitution card as standalone testable artifact.
- **Reports upload / health system connection** — she mentioned connecting to Alberta Health or uploading reports as future input. Not Phase 1.
- **"We're not trying to change behavior, we're recommending a better behavior"** — her framing.
- **Mobile app is the real goal** — client wants web app as test phase first. If web validates, mobile is next. "In my mind it should always be a mobile app."
- **Ethnicity/food background** — she raised matching food suggestions to user's cultural background. Not critical but good progressive profiling question. "We're giving Indian food options to a Jamaican..."
- **"Little buddy"** — she wants the app to feel like a companion that learns. "It learns the person, can say hey you need to start sleeping early."

### Design Feedback

- **Loved the name "Triveda"** — "did you make that? I really like that"
- **Loves the teal color scheme** — "whatever this color is I really like that, let's keep that as main color"
- **V3 redesign preferred** over v2, but wants less scrolling and more consolidated layout. Too much empty space. Reduce scroll length.
- **Scroll-snap popping** — she noticed the snap behavior, didn't love it. V2's smooth scroll felt better.
- **Orbs/bubbles** — "sometimes annoying, can bunch up, might be trippy"
- **V2 quote was praised** by someone — "I was told the quote in v2 is really good"
- **Light mode** — she saw light mode screenshots, said "they looked really nice"
- **Consolidate sections** — use left/right/center layout instead of full-width sections. Less empty space, less scroll.

### Promised Follow-ups

- Send Triveda presentation link + chatbot connected to research knowledge base so Sasha can explore asynchronously
- Explain direction to teammates in detail
- Next check-in: Sunday or during the week if ready earlier
- Another round of v3 redesign with consolidated layout (less scroll, more density)

### How to Apply

- Phase 1 scope: build constitution card with 2-3 question quick start + progressive profiling, not 18-question dump
- Keep all 22 features in codebase as backend engines
- Present the app as input/output, not feature list
- Build the research chatbot (65K words fits in one context window)
- Next redesign: consolidate v3, reduce scroll, denser layout, keep teal scheme
- Consider mobile-first design even for web (validates for eventual app)
