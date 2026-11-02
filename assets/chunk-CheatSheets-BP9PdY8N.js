import{a_ as a,a$ as j,a7 as ie,S as X,X as B,T as K,y as T,d as I,i as R,w as v,b0 as se,c as n,r as N,n as P,b as f,V as _,h as C,F as g,e as l,o as t,t as E,j as x,f as A,b1 as J,s as oe,v as G,Q as re,as as ne,G as le,I as de,L as ce,H as ue,J as me,b2 as pe,g as L,l as he}from"./index-Bzk4ivv4.js";import{_ as S}from"./chunk-Markdown.vue_vue_type_script_setup_true_lang-CXmhk2DX.js";import{V as U}from"./chunk-VCard-33aZZv8X.js";import{_ as M}from"./chunk-_plugin-vue_export-helper-DlAUqK2U.js";import{C as fe}from"./chunk-CodeBlock-Bd7Rm-5_.js";import{V as Z}from"./chunk-VAlert-hDWb7kMi.js";import{D as ge}from"./chunk-DataTablePreview-DEWQ6Yyg.js";import{V as ee}from"./chunk-VChip-CUTDS8cc.js";import{V as ye}from"./chunk-VTextField-DA7hlpA7.js";import{V as be}from"./chunk-VSwitch-acg9RN_3.js";import{m as ve,V as W}from"./chunk-VDialog-W7avKfoj.js";import{V as we,a as ke}from"./chunk-VRow-BhGFYFKR.js";import"./chunk-aiPrompt-DPxwMzhA.js";import"./chunk-VField-WkfzGleu.js";import"./chunk-VInput-BywVE20d.js";import"./chunk-forwardRefs-DWGaNmQL.js";import"./chunk-VSelectionControl-B0fQS4UL.js";import"./chunk-VOverlay-Bp6n4WXQ.js";import"./chunk-lazy-vDaiAnC8.js";import"./chunk-dialog-transition-m-4XF-tm.js";const Ee={id:"ab-checklist",title:"A/B testing checklist",cards:[{kind:"reference",id:"ab-design",title:"Design (before launch)",body:a`
- [ ] **Hypothesis** and the **decision** it informs.
- [ ] **Primary metric** (one), **guardrails**, **diagnostics**: pre-registered.
- [ ] **Unit of randomisation** = unit of analysis. Interference? Then cluster, geo or switchback.
- [ ] **MDE** agreed with the business → **sample size** → **duration** in **whole weeks**.
- [ ] **Variance reduction**: CUPED covariates, stratification.
- [ ] **Assignment**: salted hash, sticky, ramp plan.
- [ ] **Analysis plan**: test, α, sidedness, **no peeking** (or a sequential design), a multiple-testing policy.
- [ ] **Triggering**: analyse users who could see the change.
`},{kind:"reference",id:"ab-during",title:"During the test",body:a`
- [ ] Daily **SRM** monitor (p < 0.001 means stop and investigate).
- [ ] Guardrail alerts (latency, crashes, revenue).
- [ ] Don't change the allocation mid-test (or analyse the periods separately).
`},{kind:"reference",id:"ab-readout",title:"Readout (in this order)",body:a`
1. **SRM / data quality**, an A/A sanity check.
2. **Guardrails** (one-sided, "not worse").
3. **Primary metric**: the effect, a **CI**, and the p-value. Practical significance vs the MDE.
4. **Secondary metrics** with FDR control.
5. **Pre-registered segments** only. Treat the rest as hypotheses.
6. **Novelty**: the effect by day since exposure.
7. **Decision**: ship / iterate / kill, per the pre-agreed criteria. Document it.
`},{kind:"reference",id:"ab-not-right-tool",title:"When an A/B test isn't the right tool",body:a`
- Can't randomise: **DiD, synthetic control, CausalImpact**.
- Portfolio media effects: **MMM (Meridian)** + geo experiments.
- Many variants, short horizon, optimise reward: **bandits**.
`}]},Re={id:"case-framework",title:"Data-intuition cases",cards:[{kind:"reference",id:"six-step-structure",title:"The 6-step structure",body:a`
1. **Clarify**: goal, stakeholders, the decision, the time horizon. *"Before I dive in, can I ask…"*
2. **Assumptions**: state them out loud.
3. **Metrics**: a primary (north star) metric, guardrails, diagnostics.
4. **Approach**: causal design (experiment > quasi-experiment > adjustment) or a model, and why.
5. **Analysis and risks**: biases (selection, confounding, novelty, seasonality, SRM), power, segments.
6. **Recommendation**: the decision rule, next steps, how you'd communicate it, and what you'd build so it scales.
`},{kind:"reference",id:"clarifying-questions",title:"Clarifying-question bank",body:a`
- **Assignment**: random? targeted? opt-in? global?
- **Counterfactual**: is there a holdout? history? comparable units?
- **Unit**: user, session, advertiser, geo? Interference?
- **Data**: what exists, at what granularity, how complete (conversion lag)?
- **Confounders**: what else changed (seasonality, promos, pricing, competitors, tracking)?
- **Success**: which metric, over what horizon, and what threshold?
`},{kind:"reference",id:"metric-drop-triage",title:"Metric-drop triage",body:a`
Data validity → expected variation (seasonality, forecast band) → localisation (segment) → funnel decomposition (traffic × CTR × CVR) → external factors → quantify each factor's share.
`},{kind:"reference",id:"l6-boosters",title:"L6 boosters",body:a`
- **Think at scale**: billions of rows, many advertisers. Make it a repeatable process.
- **Focus on the user**: UX guardrails, advertiser outcomes.
- **Be conversational**: check in with the interviewer at each step.
- **Systems thinking**: standing holdouts, platform alerts, templates.
`}]},xe={id:"glossary",title:"Glossary",cards:[{kind:"reference",id:"meridian-glossary",title:"MMM & Meridian glossary",when:"Every Meridian term, default and health check you may be asked about.",body:a`
| Term | Meaning |
|---|---|
| **MMM** | Regression of a KPI on media (adstocked + saturated), controls and a baseline, to estimate incremental effects |
| **Meridian** | Google's open-source Bayesian, geo-level, hierarchical MMM (TensorFlow Probability; NUTS sampling) |
| **KPI / revenue_per_kpi** | The outcome; non-revenue KPIs can be converted to revenue with revenue per KPI |
| **μ_t (knots)** | Time-varying baseline (trend + seasonality), interpolated between knot values. Default for geo models: a knot per period |
| **τ_g** | Geo effect (persistent level differences) |
| **Controls** | Confounders: price, promotions, macro, **GQV** (Google Query Volume) for paid search |
| **Non-media treatments** | Things like price changes whose effect you want to estimate |
| **Organic media** | Activity with no direct cost (contribution prior by default) |
| **Adstock** | Carryover: geometric (α^s) or binomial decay, normalised weights, \`max_lag\` (geometric ≈ 2–10, binomial ≈ 4–20) |
| **Hill** | Saturation $x^s/(x^s + ec^s)$; ec = half-saturation; slope fixed at 1 for non-RF media by default |
| **HillAdstock order** | Adstock first, then Hill (\`hill_before_adstock=False\`) |
| **RF channels** | Reach & frequency: Adstock(reach × Hill(frequency)) → optimal frequency |
| **Geo hierarchy** | $\log\beta_{g,m} \sim N(\beta_m, \eta_m)$ (log-normal media effects) |
| **ROI prior (default)** | LogNormal(0.2, 0.9): median ≈ 1.22, mean ≈ 1.83 |
| **mROI prior (default)** | LogNormal(0.0, 0.5): median 1.0, conservative recommendations |
| **Contribution prior** | Beta(1, 99) default (paid/organic); the default type for organic and non-media |
| **Prior types** | \`media_prior_type\`: roi (default) / mroi / contribution / coefficient |
| **Calibration** | Turn lift or geo experiments into ROI priors (CalibrationBuilder: adjusts for spend share, recency with a 52-week half-life, duration) |
| **Calibration score** | A composite (implausible ROI, high variance, potential bias); channels < 67.5 are flagged; lower = test first |
| **Incremental outcome** | KPI with the media − KPI with that channel set to zero |
| **ROI / mROI / CPIK** | Incremental outcome ÷ spend / slope of the response curve / spend ÷ incremental KPI |
| **Response curve** | Incremental outcome vs spend, with credible bands |
| **Health checks** | R-hat < 1.2; negative baseline P < 0.2 (PASS) / 0.2–0.8 (REVIEW) / > 0.8 (FAIL); PPP ≥ 0.05; R² > 0 (+ MAPE, wMAPE, holdout); prior–posterior shift; ROI consistency |
| **Holdout observations** | Geo-times held out for out-of-sample fit |
| **Budget optimisation** | Fixed budget (default, ±30% bounds); flexible with a target ROI (total level) or target mROI (channel level, ±100% bounds) |
| **Optimal frequency** | The frequency maximising ROI for RF channels; used by default in optimisation |
| **Scenario Planner** | Meridian's planning tool (open beta) for future budget scenarios |
| **LightweightMMM / Robyn** | Google's earlier JAX MMM (superseded by Meridian) / Meta's ridge-based MMM |
`}]},Ne={id:"mmm-formulas",title:"MMM formulas",cards:[{kind:"reference",id:"mmm-formula-table",title:"Adstock, Hill, ROI and mROI",body:a`
| | |
|---|---|
| Geometric adstock | $\sum_{s=0}^L \alpha^s x_{t-s} / \sum \alpha^s$; half-life $\ln 0.5/\ln\alpha$ |
| Hill | $x^s/(x^s + ec^s)$ |
| ROI / mROI | $R(s)/s$ / $R'(s)$; for $\beta s/(s + ec)$: $\beta ec/(s + ec)^2$ |
| Optimal split | equal mROI across channels (within bounds) |
`}]},Se=[],Ce={id:"core-patterns",title:"Core patterns",cards:[{kind:"reference",id:"imports",title:"Imports to know",body:a`
\`\`\`python
import math, random, statistics as st
from collections import defaultdict, Counter
from dataclasses import dataclass
\`\`\`
`},{kind:"reference",id:"grouping",title:"Grouping",body:a`
\`\`\`python
totals = defaultdict(float)
for r in rows:
    totals[r["campaign"]] += r["spend"]
counts = Counter(r["device"] for r in rows)
\`\`\`
`},{kind:"reference",id:"join-dedupe",title:"Join (left) and dedupe",body:a`
\`\`\`python
lookup = {u["user_id"]: u for u in users}
joined = [{**o, "country": lookup.get(o["user_id"], {}).get("country", "unknown")} for o in orders]
unique_users = {e["user_id"] for e in events}
\`\`\`
`},{kind:"reference",id:"sort-top-n",title:"Sort / top-n",body:a`
\`\`\`python
top3 = sorted(totals, key=totals.get, reverse=True)[:3]
rows.sort(key=lambda r: (-r["rate"], r["name"]))
\`\`\`
`},{kind:"reference",id:"lags-rolling",title:"Lags and rolling",body:a`
\`\`\`python
lag1 = [None] + xs[:-1]
roll7 = [None if i < 6 else sum(xs[i - 6:i + 1]) / 7 for i in range(len(xs))]
\`\`\`
`},{kind:"reference",id:"dates",title:"Dates",body:a`
\`\`\`python
import datetime as dt
d = dt.date.fromisoformat("2026-09-14"); d + dt.timedelta(days=7); d.weekday()
\`\`\`
`}]},Ae={id:"stats-from-scratch",title:"Stats from scratch",cards:[{kind:"reference",id:"stats-basics",title:"Mean, variance, SE, normal CDF",body:a`
\`\`\`python
m = sum(xs) / len(xs)
var = sum((x - m) ** 2 for x in xs) / (len(xs) - 1)      # sample variance
se = math.sqrt(var / len(xs))
norm_cdf = lambda z: 0.5 * (1 + math.erf(z / math.sqrt(2)))
p_two_sided = math.erfc(abs(z) / math.sqrt(2))
\`\`\`
`},{kind:"reference",id:"two-proportion-z",title:"Two-proportion z-test",body:a`
\`\`\`python
p_pool = (k1 + k2) / (n1 + n2)
z = (k2 / n2 - k1 / n1) / math.sqrt(p_pool * (1 - p_pool) * (1 / n1 + 1 / n2))
\`\`\`
`},{kind:"reference",id:"simulation",title:"Simulation, bootstrap, permutation",body:a`
\`\`\`python
rng = random.Random(42)
boot = [st.mean(rng.choices(xs, k=len(xs))) for _ in range(2000)]
rng.shuffle(pooled)
post_draws = [rng.betavariate(a + k, b + n - k) for _ in range(10000)]
\`\`\`
`},{kind:"reference",id:"hash-assignment",title:"Hashing assignment",body:a`
\`\`\`python
import hashlib
bucket = int(hashlib.sha256(f"{salt}:{uid}".encode()).hexdigest()[:8], 16) % 1000
\`\`\`
`},{kind:"reference",id:"safe-sigmoid",title:"Safe sigmoid, log space",body:a`
\`\`\`python
sig = lambda z: 1 / (1 + math.exp(-z)) if z >= 0 else math.exp(z) / (1 + math.exp(z))
logs = [k * math.log(p) + (n - k) * math.log(1 - p) for p in grid]; mx = max(logs)
w = [math.exp(l - mx) for l in logs]
\`\`\`
`}]},Oe={id:"edge-cases",title:"Say it out loud",cards:[{kind:"reference",id:"edge-cases-out-loud",title:"Edge cases",body:a`
**Edge cases to say out loud**: empty input, divide-by-zero, duplicates, missing keys, ties, NaN/None, the unit of analysis.
`}]},Te={id:"strings",title:"Strings",cards:[{kind:"question",id:"first-non-repeating-character",title:"First non-repeating character",keywords:["first unique character","counter","frequency"],prompt:a`Return the first character in a string that appears exactly once, or \`None\` if there isn't one.`,approach:a`Two passes: count every character, then walk the string in order and return the first with a count of 1. That's O(n) time and O(k) space for k distinct characters.`,solution:{lang:"python",code:j`
from collections import Counter

def first_unique(s):
    counts = Counter(s)
    for ch in s:
        if counts[ch] == 1:
            return ch
    return None
`},output:a`\`first_unique("swiss")\` → \`"w"\`, \`first_unique("aabb")\` → \`None\`, \`first_unique("")\` → \`None\``,pitfalls:["Calling `s.count(ch)` inside the loop works, but is O(n²).","Walking the Counter also works, because dicts keep insertion order, but walking the string makes the intent obvious.",'Say what you assume about case and whitespace: is "S" the same as "s"?'],followUps:["What if the characters arrive as a stream?","Return the index instead of the character."],practice:["d1-py-easy-2","d5-py-easy-2"],lessons:["py1-foundations"],verify:{lang:"python",check:{expr:'[first_unique("swiss"), first_unique("aabb"), first_unique("")]',expected:["w",null,null]}}}]},Le={id:"window-functions",title:"Window functions",cards:[{kind:"reference",id:"execution-order",title:"Execution order",when:"Why you can't filter on a window in WHERE.",body:a`
\`FROM/JOIN → WHERE → GROUP BY → HAVING → window functions → QUALIFY → SELECT aliases → DISTINCT → ORDER BY → LIMIT\`

- Windows run **after** GROUP BY, so \`SUM(SUM(x)) OVER ()\` is legal: it's a window over the aggregated rows.
- To filter on a window result, use \`QUALIFY\` (BigQuery, Snowflake, DuckDB) or wrap it in a CTE. BigQuery requires a \`WHERE\`, \`GROUP BY\` or \`HAVING\` alongside \`QUALIFY\`, so write \`WHERE TRUE\` if needed.
- Window functions can't be nested (\`LAG(LAG(x))\`), so use two CTEs.
`},{kind:"reference",id:"window-anatomy",title:"Window anatomy",body:a`
\`\`\`sql
fn(expr) OVER (
  PARTITION BY g          -- restart per group (optional)
  ORDER BY t              -- order inside the partition
  ROWS BETWEEN 6 PRECEDING AND CURRENT ROW   -- the frame (optional)
)
\`\`\`

| You write | The frame you get |
|---|---|
| \`OVER ()\` | the whole partition (here, all rows) |
| \`OVER (PARTITION BY g)\` | the whole group |
| \`OVER (ORDER BY t)\` with no frame | **\`RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\`**, which includes tied **peers** |
| \`ROWS BETWEEN 6 PRECEDING AND CURRENT ROW\` | 7 physical rows |
| \`ROWS BETWEEN UNBOUNDED PRECEDING AND 1 PRECEDING\` | everything strictly before (**empty on the first row, so SUM is NULL**) |
`},{kind:"reference",id:"rows-range-groups",title:"ROWS vs RANGE vs GROUPS",body:a`
| | Counts | Ties (same ORDER BY value) | Missing dates |
|---|---|---|---|
| **ROWS** | physical rows | split: each row is its own step | silently stretches over the gap |
| **RANGE** | value distance from the current row | peers are all in or all out | handled: it's a calendar window |
| **GROUPS** | distinct ORDER BY values | peers move together | n/a (not in BigQuery) |

- **Duplicate-date trap:** a running total \`SUM(x) OVER (ORDER BY date)\` uses the default RANGE frame, so every row on the same date shows the **day's** total. Use \`ROWS\` plus a unique tie-break, or aggregate to one row per date first.
- **7-day window:** \`RANGE BETWEEN INTERVAL 6 DAY PRECEDING AND CURRENT ROW\` (6, not 7, because the current day counts). BigQuery needs a numeric ORDER BY for RANGE: \`ORDER BY UNIX_DATE(d) RANGE BETWEEN 6 PRECEDING AND CURRENT ROW\`.
- **Guard partial windows:** \`IF(COUNT(*) OVER w = 7, AVG(x) OVER w, NULL)\`.
`},{kind:"reference",id:"rank-family",title:"The rank family (on 100, 90, 90, 80)",body:a`
| Function | Result | Use it for |
|---|---|---|
| \`ROW_NUMBER()\` | 1, 2, 3, 4 | dedupe, or exactly N rows (**add a tie-break**) |
| \`RANK()\` | 1, 2, 2, 4 | top N, keeping everyone tied at the cut-off |
| \`DENSE_RANK()\` | 1, 2, 2, 3 | top N *values*; gaps and islands with duplicates |
| \`NTILE(4)\` | 1, 2, 3, 4 | quartiles (buckets of nearly equal size, which can split ties) |
| \`PERCENT_RANK()\` | 0, ⅓, ⅓, 1 | (rank − 1)/(n − 1) |
| \`CUME_DIST()\` | ¼, ¾, ¾, 1 | share of rows ≤ this one |
`},{kind:"reference",id:"lag-lead-first-last",title:"LAG / LEAD / FIRST_VALUE / LAST_VALUE",body:a`
| | |
|---|---|
| \`LAG(x, k, default)\` | the value k rows back (NULL on the first row unless a default is given) |
| \`LEAD(x)\` | the next row. **Validity intervals**: \`valid_to = LEAD(valid_from) − 1 day\` |
| \`FIRST_VALUE(x)\` | safe with the default frame (the frame always starts at the partition start) |
| \`LAST_VALUE(x)\` | **trap**: the default frame ends at CURRENT ROW, so you get the current row back. Add \`ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING\`, or use \`FIRST_VALUE … ORDER BY t DESC\` |
| \`NTH_VALUE(x, 2)\` | the 2nd row in the frame (same frame trap as LAST_VALUE) |
| \`LAST_VALUE(x IGNORE NULLS)\` | carry the last non-NULL value forward (forward-fill) |

- LAG means the previous **row**, not the previous week. With gaps, use a date spine or join on \`date − 7\`.
- After filtering rows, LAG skips the filtered ones. Carry \`LAG(week)\` too, and check it equals \`week − 1\`.
`}]},$e={id:"query-patterns",title:"Query patterns",cards:[{kind:"reference",id:"patterns-asked-for",title:"Patterns you'll be asked for",body:a`
| Task | Pattern |
|---|---|
| Dedupe to latest | \`QUALIFY ROW_NUMBER() OVER (PARTITION BY k ORDER BY loaded_at DESC) = 1\` or \`ARRAY_AGG(x ORDER BY t DESC LIMIT 1)[OFFSET(0)]\` / \`MAX_BY(x, t)\` |
| Top N per group | dedupe first, then \`RANK() <= N\` (ties kept) or \`ROW_NUMBER()\` with a tie-break |
| Running share / Pareto | \`SUM(v) OVER (ORDER BY v DESC, id ROWS UNBOUNDED PRECEDING) / SUM(v) OVER ()\`; in the set if the share *before* the row is < 80% |
| Share of group | \`v / SUM(v) OVER (PARTITION BY g)\` |
| Gaps and islands | \`week_num − ROW_NUMBER()\` = island ID (\`DENSE_RANK\` if there are duplicate weeks), or a \`LAG\` new-island flag + running \`SUM\` |
| Sessionise | \`new = ts − LAG(ts) > 30 min\`, then \`session_id = SUM(new) OVER (… ROWS UNBOUNDED PRECEDING)\` |
| Zero-fill | scaffold (\`CROSS JOIN\` of dimensions or a date spine) → \`LEFT JOIN\` facts → \`COALESCE(x, 0)\` → *then* windows |
| Histogram | \`FLOOR(x / w) * w AS bucket\`; uneven ranges via \`CASE\`; add a \`GENERATE_ARRAY\` spine for empty buckets |
| Percentile | \`PERCENTILE_CONT(x, 0.9) OVER ()\` (analytic-only in BigQuery), or \`APPROX_QUANTILES(x, 100)[OFFSET(90)]\` |
`},{kind:"reference",id:"cte-vs-subquery",title:"CTE vs subquery",body:a`
- **CTEs** (\`WITH a AS (…), b AS (…)\`) read top to bottom, can be referenced more than once, and each step can be tested with \`SELECT * FROM step\`. Interviewers like them.
- A BigQuery CTE referenced twice may be **computed twice** (it isn't materialised). For a heavy step, use a temp table.
- Correlated subqueries (\`WHERE x > (SELECT AVG(x) FROM t WHERE t.g = o.g)\`) are fine for explaining a definition, but are O(n²) in the worst case. Prefer a window.
`},{kind:"reference",id:"conditional-aggregation",title:"CASE inside aggregates (conditional aggregation)",body:a`
\`\`\`sql
SUM(CASE WHEN device = 'mobile' THEN spend ELSE 0 END)   -- pivot / filtered sum
COUNT(CASE WHEN converted THEN 1 END)                     -- no ELSE: NULLs are not counted
COUNTIF(converted)  /  SUM(IF(c, x, 0))                   -- BigQuery shorthands
AVG(CASE WHEN g = 'B' THEN x END)                          -- mean over a subset (ELSE 0 would be wrong)
\`\`\`
- CASE tests branches **in order**, so put \`WHEN x IS NULL\` first. \`NULL < 20\` is NULL, not true.
`}]},_e={id:"nulls",title:"NULLs",cards:[{kind:"reference",id:"null-functions",title:"NULL functions",body:a`
| | Behaviour |
|---|---|
| \`COALESCE(a, b, c, 'x')\` | first non-NULL, with any number of args (fallback chains). Standard SQL |
| \`IFNULL(a, b)\` | two-arg COALESCE (BigQuery/MySQL) |
| \`NULLIF(a, b)\` | NULL if a = b: \`x / NULLIF(y, 0)\`, \`NULLIF(TRIM(s), '')\` (blank → NULL) |
| \`SAFE_DIVIDE(a, b)\` | BigQuery: NULL instead of a division error |
| \`IS DISTINCT FROM\` | NULL-safe ≠ (\`NULL = NULL\` is NULL, not true) |

- \`''\` is **not** NULL: \`COALESCE('', 'x')\` returns \`''\`.
- Aggregates skip NULLs: \`AVG\` divides by the non-NULL count, and \`COUNT(col)\` ≠ \`COUNT(*)\`.
- \`NOT IN (subquery)\` returns **nothing** if the subquery contains a NULL. Use \`NOT EXISTS\`.
- NULL sort order differs: BigQuery puts NULLs first in ASC and last in DESC, Postgres the opposite, and DuckDB last in both. Say \`NULLS LAST\` explicitly.
`}]},Ie={id:"joins",title:"Joins",cards:[{kind:"reference",id:"cross-join-uses",title:"CROSS JOIN uses (beyond the date spine)",body:a`
| | |
|---|---|
| Scaffold | \`segments × funnel_steps\`, \`dates × channels\`, so absences become rows you can zero-fill |
| Unordered pairs | \`channels a CROSS JOIN channels b WHERE a.ch < b.ch\`: k(k−1)/2 pairs, no self-pairs (\`<>\` gives each pair twice) |
| Attach a scalar | \`CROSS JOIN (SELECT SUM(x) AS total FROM t)\` (or just \`SUM(x) OVER ()\`) |
| Parameters | \`CROSS JOIN (SELECT DATE '2026-09-08' AS report_date) p\` |
| Explode arrays | \`FROM t, UNNEST(t.labels) AS label\` (the comma is an implicit CROSS JOIN) |
`},{kind:"reference",id:"range-joins",title:"Range (non-equi) joins",body:a`
\`\`\`sql
-- each spend day matched to the budget version in effect
LEFT JOIN budgets b
  ON s.campaign_id = b.campaign_id
 AND s.date >= b.valid_from
 AND (s.date < b.next_from OR b.next_from IS NULL)   -- half-open: no overlaps, works for timestamps
\`\`\`
- Inclusive \`BETWEEN valid_from AND valid_to\` only works if \`valid_to = next_from − 1 day\` on DATEs. Otherwise the changeover day is counted twice.
- Non-equi joins can be slow in BigQuery. Alternative: explode intervals with \`GENERATE_DATE_ARRAY\` + \`UNNEST\`, then equi-join on the day.
- Always sanity-check the fan-out: \`COUNT(*)\` before and after the join.
`}]},Y={id:"rosetta",title:"SQL ↔ pandas ↔ pure Python",cards:[{kind:"reference",id:"rosetta-stone",title:"Rosetta stone",when:"The same operation in all three languages, side by side.",body:a`
| Operation | SQL (BigQuery) | pandas | Pure Python |
|---|---|---|---|
| Filter | \`WHERE x > 0\` | \`df[df.x > 0]\` | \`[r for r in rows if r["x"] > 0]\` |
| Select | \`SELECT a, b\` | \`df[["a","b"]]\` | \`[{k: r[k] for k in ("a","b")} for r in rows]\` |
| Group-sum | \`GROUP BY g\` + \`SUM(v)\` | \`df.groupby("g")["v"].sum()\` | \`d[g] = d.get(g, 0) + v\` |
| Count distinct | \`COUNT(DISTINCT u)\` | \`df.u.nunique()\` | \`len({r["u"] for r in rows})\` |
| Having | \`HAVING COUNT(*) >= 3\` | \`g[g.n >= 3]\` | \`{k: v for k, v in d.items() if v >= 3}\` |
| Join | \`LEFT JOIN b USING (k)\` | \`a.merge(b, on="k", how="left")\` | \`m = {r["k"]: r for r in b}; m.get(k)\` |
| Anti-join | \`NOT EXISTS (...)\` | \`a[~a.k.isin(b.k)]\` | \`[r for r in a if r["k"] not in set_b]\` |
| Sort / top-N | \`ORDER BY v DESC LIMIT 3\` | \`df.nlargest(3, "v")\` | \`sorted(rows, key=..., reverse=True)[:3]\` |
| Top-N per group | \`QUALIFY ROW_NUMBER() OVER (PARTITION BY g ORDER BY v DESC) <= 2\` | \`df.sort_values("v").groupby("g").tail(2)\` | group into lists, sort each |
| Lag | \`LAG(v) OVER (PARTITION BY g ORDER BY t)\` | \`df.groupby("g")["v"].shift(1)\` | \`[None] + vs[:-1]\` |
| Rolling sum | \`SUM(v) OVER (ORDER BY t ROWS 6 PRECEDING)\` | \`s.rolling(7).sum()\` | a running-sum loop |
| Share of total | \`v / SUM(v) OVER ()\` | \`df.v / df.v.sum()\` | \`v / total\` |
| Group share | \`v / SUM(v) OVER (PARTITION BY g)\` | \`v / groupby(g).v.transform("sum")\` | two-pass dict |
| Pivot | \`SUM(IF(ch='a', v, 0))\` / \`PIVOT\` | \`pivot_table(index, columns, values)\` | dict of dicts |
| Dedupe | \`SELECT DISTINCT\` / \`QUALIFY ROW_NUMBER() = 1\` | \`drop_duplicates()\` | a set of tuples |
| Conditional count | \`COUNTIF(c)\` | \`df.c.sum()\` | \`sum(1 for r in rows if c(r))\` |
| Safe divide | \`SAFE_DIVIDE(a, b)\` | \`a / b.replace(0, np.nan)\` | \`a / b if b else None\` |
| Date trunc | \`DATE_TRUNC(d, WEEK(MONDAY))\` | \`d.dt.to_period("W").dt.start_time\` | \`d - timedelta(days=d.weekday())\` |
`}]},Ue={id:"top-n",title:"Top N",cards:[{kind:"question",id:"top-3-users",title:"Find the top 3 users by spend",keywords:["leaderboard","highest","best customers","qualify"],prompt:a`Given \`orders(user_id, amount)\`, return the top 3 users by total spend.`,approach:a`Aggregate to one row per user, then rank. Ask how to treat ties: \`RANK\` keeps everyone tied at the cut-off, so you can get more than 3 rows. \`ROW_NUMBER\` returns exactly 3 but needs a tie-break.`,solution:{lang:"sql",code:j`
SELECT user_id, SUM(amount) AS total_spend
FROM orders
GROUP BY user_id
QUALIFY RANK() OVER (ORDER BY SUM(amount) DESC) <= 3
ORDER BY total_spend DESC, user_id
`},pitfalls:["`ORDER BY ... LIMIT 3` silently drops anyone tied for third.","Ranking raw orders instead of per-user totals finds the biggest orders, not the biggest spenders.","BigQuery needs a `WHERE`, `GROUP BY` or `HAVING` alongside `QUALIFY`. Without `QUALIFY`, use a CTE."],followUps:["Top 3 users per country?","Top 3 distinct spend values? (`DENSE_RANK`)"],practice:["d2-sql-easy-2","d3-sql-easy-1","d3-sql-medium-3"],verify:{lang:"sql",tables:[{name:"orders",columns:["user_id","amount"],rows:[["u1",300],["u1",200],["u2",300],["u3",150],["u3",50],["u4",200],["u5",100]]}],expectedOutput:{kind:"table",columns:["user_id","total_spend"],rows:[["u1",500],["u2",300],["u3",200],["u4",200]],ordered:!0}}}]},Be={id:"choosing-a-method",title:"Choosing a method",cards:[{kind:"reference",id:"method-chooser",title:'"Which method?" decision tree',when:"Click through a few questions to land on the right method, its key assumption and the alternative.",component:"MethodChooser",body:a`
**How to use it in the interview**: say the branch points out loud: *"Is this causal or predictive? Was it randomised? What's the outcome type?"* That's exactly the structured thinking interviewers look for.
`}]},Me={id:"probability",title:"Probability",cards:[{kind:"reference",id:"probability-formulas",title:"Probability formulas",body:a`
| | |
|---|---|
| Bayes | $P(H \mid D) = \dfrac{P(D \mid H)P(H)}{P(D)}$ |
| Total probability | $P(A) = \sum_i P(A \mid B_i)P(B_i)$ |
| Linearity | $E[aX + bY] = aE[X] + bE[Y]$ |
| Variance | $\text{Var}(X) = E[X^2] - E[X]^2$, $\text{Var}(aX) = a^2\text{Var}(X)$ |
| Sum | $\text{Var}(X + Y) = \text{Var}X + \text{Var}Y + 2\text{Cov}(X, Y)$ |
| Bernoulli / Binomial | $p,\ p(1-p)$ / $np,\ np(1-p)$ |
| Poisson | $E = \text{Var} = \lambda$ |
| LogNormal | mean $e^{\mu + \sigma^2/2}$, median $e^\mu$ |
| Beta | mean $\alpha/(\alpha + \beta)$ |
`}]},De={id:"inference",title:"Inference",cards:[{kind:"reference",id:"inference-formulas",title:"Inference formulas",body:a`
| | |
|---|---|
| SE of a mean | $\sigma/\sqrt n$ |
| SE of a proportion | $\sqrt{p(1-p)/n}$ |
| SE of a difference | $\sqrt{SE_1^2 + SE_2^2}$ |
| 95% CI | $\hat\theta \pm 1.96\,SE$ |
| Two-proportion z | $\dfrac{\hat p_B - \hat p_A}{\sqrt{\hat p(1-\hat p)(1/n_A + 1/n_B)}}$, $\hat p$ pooled |
| Two-sided p | $2(1 - \Phi(\lvert z\rvert)) = \text{erfc}(\lvert z\rvert/\sqrt2)$ |
| Normal CDF (no scipy) | $\Phi(z) = \tfrac12[1 + \text{erf}(z/\sqrt2)]$ |
| χ² SRM | $\sum (O - E)^2/E$; 1 df: $p = \text{erfc}(\sqrt{x/2})$; 2 df: $e^{-x/2}$ |
| Sample size per arm | $n \approx 7.85\,[p_1(1-p_1) + p_2(1-p_2)]/\delta^2$ |
| CUPED | $Y - \theta(X - \bar X)$, $\theta = \text{Cov}/\text{Var}$, variance × $(1-\rho^2)$ |
| Bonferroni / BH | $\alpha/m$ / largest $k$ with $p_{(k)} \le \tfrac{k}{m}q$ |
| DiD | $(T_{post} - T_{pre}) - (C_{post} - C_{pre})$ |
`}]},Pe={id:"regression",title:"Regression & modelling",cards:[{kind:"reference",id:"regression-formulas",title:"Regression & modelling formulas",body:a`
| | |
|---|---|
| OLS | $\hat\beta = (X^\top X)^{-1}X^\top y$ |
| Coefficient variance | $\hat\sigma^2(X^\top X)^{-1}$ |
| R² | $1 - SS_{res}/SS_{tot}$ |
| OVB | bias $= \beta_2 \cdot \text{Cov}(x, z)/\text{Var}(x)$ |
| VIF | $1/(1 - R_j^2)$ |
| Logistic | $\text{logit}\,p = X\beta$; OR $= e^\beta$; gradient $X^\top(y - p)$ |
| Ridge / lasso | $+\lambda\|\beta\|_2^2$ / $+\lambda\|\beta\|_1$ |
| Bias–variance | $\text{MSE} = \text{bias}^2 + \text{variance} + \sigma^2$ |
| Precision / recall | $TP/(TP + FP)$ / $TP/(TP + FN)$ |
| wMAPE | $\sum\lvert e\rvert / \sum\lvert y\rvert$ |
`}]},qe={id:"bayesian",title:"Bayesian",cards:[{kind:"reference",id:"bayesian-formulas",title:"Bayesian formulas",body:a`
| | |
|---|---|
| Posterior | $\propto$ likelihood × prior |
| Beta–Binomial | Beta$(\alpha + k, \beta + n - k)$ |
| Normal–Normal | precision-weighted mean; precisions add |
| Shrinkage | $(k + m\bar p)/(n + m)$ |
| R-hat | $\sqrt{\hat V/W}$; Meridian guidance < 1.2 |
`},{kind:"reference",id:"bayes-core",title:"Core",body:a`
$p(\theta \mid y) \propto p(y \mid \theta)\,p(\theta)$. **MAP** = mode, **posterior mean/median** = summaries, a **credible interval** = a probability statement about θ.
`},{kind:"reference",id:"conjugate-pairs",title:"Conjugate pairs",body:a`
| Likelihood | Prior | Posterior |
|---|---|---|
| Binomial | Beta(α, β) | Beta(α + k, β + n − k) |
| Poisson | Gamma(a, b) | Gamma(a + Σy, b + n) |
| Normal (σ known) | Normal(μ₀, τ₀²) | Normal: precision-weighted mean |
`},{kind:"reference",id:"regularisation-priors",title:"Regularisation = priors",body:a`
Ridge = a Normal(0, τ²) prior. Lasso = a Laplace prior. λ = σ²/τ².
`},{kind:"reference",id:"hierarchical-models",title:"Hierarchical models",body:a`
Groups drawn from a shared distribution, so **partial pooling**: shrinkage $\lambda_g = \tau^2/(\tau^2 + \sigma^2/n_g)$. Meridian: $\log\beta_{g,m} \sim N(\beta_m, \eta_m)$.
`},{kind:"reference",id:"mcmc",title:"MCMC",body:a`
- **Metropolis**: accept with min(1, posterior ratio). p(y) cancels.
- **HMC/NUTS**: gradient-guided. Meridian uses NUTS (TensorFlow Probability).
- **Diagnostics**: **R-hat** (Meridian: < 1.2; ideally ≈ 1.01), **ESS**, trace plots, divergences.
- Fixes: longer chains / more adaptation, better priors, reparameterisation, fewer weakly identified parameters.
`},{kind:"reference",id:"bayesian-ab",title:"Bayesian A/B",body:a`
P(B > A) = the share of posterior draws where B wins. **Expected loss** = E[max(p_A − p_B, 0)]. Ship when the expected loss < ε (pre-registered).
`},{kind:"reference",id:"defending-priors",title:"Defending priors (the stakeholder script)",body:a`
1. Every model has assumptions. Priors make them explicit.
2. Weakly informative defaults, plus **evidence-based** custom priors (experiments).
3. The data dominates where it's informative: show **prior vs posterior**.
4. **Sensitivity analysis**: does the decision change under reasonable alternative priors?
5. **Validation**: holdout fit, and agreement with experiments.
`},{kind:"reference",id:"credible-vs-confidence",title:"Credible vs confidence",body:a`
| | Credible | Confidence |
|---|---|---|
| "95%" means | P(θ ∈ CI \| data) | 95% of such intervals cover θ |
| Prior? | yes | no |
`}]},Ve={id:"other-formulas",title:"Other",cards:[{kind:"reference",id:"other-formulas-card",title:"Survival & Monte Carlo formulas",body:a`
| | |
|---|---|
| Kaplan–Meier | $\prod (1 - d_j/n_j)$ |
| Cox hazard ratio | $e^{\beta}$ |
| Monte Carlo SE | $\propto 1/\sqrt S$ |
`}]},D=[{id:"sql",title:"SQL",icon:"mdi-database-search-outline",color:"sql",summary:"Window functions, joins and NULLs, plus the classic interview queries.",parts:[{id:"sql-syntax",title:"Formulas & syntax",sections:[Le,$e,_e,Ie,Y]},{id:"sql-questions",title:"Interview questions",sections:[Ue]}]},{id:"python",title:"Python",icon:"mdi-language-python",color:"python",summary:"The patterns to write from memory, plus the classic interview questions.",parts:[{id:"python-patterns",title:"Patterns",sections:[Ce,Ae,Oe,Y]},{id:"python-questions",title:"Interview questions",sections:[Te]}]},{id:"stats",title:"Stats",icon:"mdi-sigma",color:"theory",summary:"Probability, inference, regression and Bayesian formulas, and how to choose a method.",parts:[{id:"stats-formulas",title:"Formulas",sections:[Be,Me,De,Pe,qe,Ve]}]},{id:"experiments",title:"Experiments",icon:"mdi-flask-outline",color:"secondary",summary:"The A/B testing checklist, causal alternatives and the data-intuition case framework.",parts:[{id:"experiments-guides",title:"Checklists & frameworks",sections:[Ee,Re]}]},{id:"ml",title:"ML",icon:"mdi-robot-outline",color:"accent",summary:"Models, metrics, validation and clustering.",parts:Se},{id:"meridian",title:"Meridian & MMM",icon:"mdi-chart-bell-curve-cumulative",color:"meridian",summary:"Every Meridian term and default, plus the MMM formulas.",parts:[{id:"meridian-reference",title:"Reference",sections:[xe,Ne]}]}],Fe=[["sql",["sql"]],["meridian",["meridian","mmm"]],["experiments",["ab-testing","experimental-design","causal-inference"]],["ml",["predictive-modelling","clustering","decision-trees","survival"]]];function Ge(e){var d;return((d=Fe.find(([,r])=>r.some(h=>e.tags.includes(h))))==null?void 0:d[0])??"stats"}const We=Object.values(ie).flatMap(e=>e.cards),z=e=>We.filter(d=>Ge(d)===e),Ye=e=>e.parts.flatMap(d=>d.sections.flatMap(r=>r.cards));function ze(e){var h;const d=[e.title,...e.keywords??[]],r=e.kind==="reference"?[e.when??"",e.body]:[e.prompt,e.approach,((h=e.solution)==null?void 0:h.code)??"",e.answer??"",e.output??"",...e.pitfalls??[],...e.followUps??[]];return[...d,...r].join(" ").toLowerCase()}function He(e){return[e.scenario,e.answer,e.why].join(" ").toLowerCase()}const H=(e,d)=>d.toLowerCase().split(/\s+/).filter(Boolean).every(r=>e.includes(r));function Qe(e,d=72){const r=T(null),h=new Set;let c=null;function m(){c==null||c.disconnect(),h.clear(),c=new IntersectionObserver(s=>{var w;for(const p of s)p.isIntersecting?h.add(p.target.id):h.delete(p.target.id);const i=e.value.find(p=>h.has(p));i?r.value=i:(((w=document.getElementById(e.value[0]))==null?void 0:w.getBoundingClientRect().top)??0)>d&&(r.value=null)},{rootMargin:`-${d}px 0px -70% 0px`});for(const s of e.value){const i=document.getElementById(s);i&&c.observe(i)}}return X(m),B(e,m,{flush:"post"}),K(()=>c==null?void 0:c.disconnect()),r}const je={class:"font-weight-bold mb-1"},Xe=I({__name:"QuickFire",props:{cards:{},quiz:{type:Boolean}},setup(e){const d=e,r=se(new Set);return B(()=>d.quiz,()=>r.clear()),(h,c)=>(t(),R(U,{class:"quick-fire"},{default:v(()=>[(t(!0),n(g,null,N(e.cards,(m,s)=>(t(),n("div",{key:m.id,class:P(["pa-4",{"row-divider":s}])},[f(S,{source:m.scenario,class:"row-prose mb-2"},null,8,["source"]),e.quiz&&!r.has(m.id)?(t(),R(_,{key:0,color:"primary",variant:"tonal",size:"small","prepend-icon":"mdi-eye-outline",onClick:i=>r.add(m.id)},{default:v(()=>[...c[0]||(c[0]=[C("Reveal",-1)])]),_:1},8,["onClick"])):(t(),n(g,{key:1},[l("div",je,[f(S,{source:m.answer,inline:""},null,8,["source"])]),f(S,{source:m.why,class:"row-prose text-body-2 text-muted"},null,8,["source"])],64))],2))),128))]),_:1}))}}),Ke=M(Xe,[["__scopeId","data-v-2d2e9b8d"]]),Je={class:"d-flex flex-wrap ga-1 mb-4 text-caption text-muted"},Ze={class:"text-h6 font-weight-bold mb-3"},et={class:"d-flex flex-column ga-2"},tt={class:"text-h6 font-weight-bold mb-1"},at={class:"d-flex ga-2 mt-4"},it=I({__name:"MethodChooser",setup(e){const d={start:{q:"What is the question?",options:[{label:"Did X cause a change in Y? (causal)",next:"causal"},{label:"Predict / classify / forecast something",next:"predict"},{label:"Describe uncertainty, or estimate a quantity",next:"estimate"},{label:"Find groups / structure (no labels)",next:"cluster"},{label:"Allocate budget / choose an action",next:"decide"}]},causal:{q:"Can you (or did you) randomise?",options:[{label:"Yes, at the user level, with no interference",next:"rct_metric"},{label:"Yes, but units interact (auctions, marketplaces, budgets)",next:"cluster_rand"},{label:"No: the change hit some units/regions at a known time",next:"did"},{label:"No: one treated unit or series, with good controls",next:"synth"},{label:"No: individual-level, rich covariates",next:"psm"},{label:"Portfolio of media channels over time",next:"mmm"}]},rct_metric:{q:"What is the metric?",options:[{label:"Binary (converted?), large n",next:"ztest"},{label:"Binary, small counts",next:"fisher"},{label:"Continuous / revenue",next:"welch"},{label:"Ratio (clicks per impression, revenue per session)",next:"delta"},{label:"Time-to-event (retention)",next:"survival"},{label:"Many variants, want to maximise reward now",next:"bandit"}]},ztest:{answer:"Two-proportion z-test (pooled SE), plus a CI for the difference",why:"Check SRM first. Pre-register α and the MDE. Use a sequential design if you need to peek. Bayesian alternative: Beta–Binomial P(B > A)."},fisher:{answer:"Fisher's exact test (or a permutation test)",why:"The Normal approximation is unreliable with small counts."},welch:{answer:"Welch's t / z-test on means, with CUPED + winsorising",why:"The CLT applies to the mean at scale. CUPED uses pre-period data to cut the variance by 1 − ρ². Permutation test or bootstrap if n is small or the data is weird."},delta:{answer:"Delta-method SE or a bootstrap at the randomisation unit (user)",why:"Numerator and denominator are both random and correlated within users."},survival:{answer:"Kaplan–Meier curves + log-rank test, or Cox PH with treatment",why:"Handles right-censoring (users still active)."},bandit:{answer:"Multi-armed bandit (Thompson sampling)",why:"Earning > learning. Keep an exploration floor and a holdout. Beware delayed rewards."},cluster_rand:{answer:"Cluster / geo / switchback / budget-split randomisation",why:"Contain the interference within the randomisation unit (SUTVA). Fewer units means less power, so plan by simulation."},did:{answer:"Difference-in-differences (event study) or a geo TBR",why:"Parallel-trends assumption: plot the pre-trends, and use clustered SEs. Beware staggered adoption."},synth:{answer:"Synthetic control or CausalImpact (BSTS)",why:"Build the counterfactual from unaffected controls fitted on the pre-period."},psm:{answer:"Propensity score matching / IPW, or regression adjustment",why:"Only fixes *observed* confounding. Add a sensitivity analysis. Look for an instrument or a discontinuity if possible."},mmm:{answer:"Bayesian MMM (Meridian), calibrated with geo experiments",why:"Adstock + Hill + controls (GQV for search) + a geo hierarchy + ROI priors. Check the health; validate on a holdout."},predict:{q:"What is the target?",options:[{label:"Binary (churn, convert)",next:"clf"},{label:"Continuous",next:"reg"},{label:"Count",next:"count"},{label:"Future values of a time series",next:"forecast"},{label:"Time until an event",next:"survival"}]},clf:{answer:"Logistic regression baseline → gradient boosting",why:'Validate on a time-based split. Metrics: log loss, AUC / PR-AUC, calibration, precision@k. For "who to treat" use uplift models.'},reg:{answer:"Linear / regularised regression (ridge, lasso) → boosting",why:"Check the residuals. Log-transform skewed targets. Cross-validate."},count:{answer:"Poisson / negative binomial GLM",why:"Use the negative binomial if variance ≫ mean. Use an exposure offset."},forecast:{answer:"Seasonal naive baseline → ETS / ARIMA / regression with Fourier terms",why:"Rolling-origin backtests at the horizon you need; report intervals."},estimate:{q:"What are you estimating?",options:[{label:"A mean or proportion",next:"ci"},{label:"A median, ratio, or complex statistic",next:"boot"},{label:"Rates for many small groups",next:"hier"},{label:"A probability with prior knowledge / little data",next:"bayes"},{label:"How many users an experiment needs",next:"power"}]},ci:{answer:"CLT-based CI: estimate ± 1.96·SE (Wilson for proportions with small n)",why:"SE = σ/√n, or √(p(1−p)/n)."},boot:{answer:"Bootstrap (percentile / BCa)",why:"Resample the independent unit. Use a block bootstrap for time series."},hier:{answer:"Hierarchical model / empirical-Bayes shrinkage",why:"Partial pooling stabilises the small groups (as Meridian does for geos)."},bayes:{answer:"Bayesian posterior (e.g. Beta–Binomial)",why:"Gives direct probability statements. Show prior sensitivity."},power:{answer:"Power analysis: n ≈ 7.85·σ²/δ² per arm (α = 0.05, 80% power)",why:"Or simulate for complex designs. Translate into whole weeks."},cluster:{answer:"k-means (standardised features) / GMM / hierarchical clustering",why:"Choose k with the elbow + silhouette + business usefulness. Validate stability."},decide:{q:"What kind of decision?",options:[{label:"Split a budget across channels",next:"alloc"},{label:"Pick a variant to show",next:"bandit"},{label:"Act under uncertainty / compare plans",next:"mc"}]},alloc:{answer:"Optimise the response curves: equalise marginal ROI (Meridian BudgetOptimizer)",why:"A convex problem for concave curves. Use bounds (±30% default) and test big moves."},mc:{answer:"Monte Carlo over posterior draws (common random numbers)",why:"Report the expected uplift, P(better) and the downside quantile."}},r=T(["start"]),h=A(()=>d[r.value[r.value.length-1]]);function c(i){r.value.push(i)}function m(){r.value.length>1&&r.value.pop()}function s(){r.value=["start"]}return(i,w)=>(t(),n("div",null,[l("div",Je,[(t(!0),n(g,null,N(r.value,(p,y)=>(t(),n("span",{key:y},E(y?"›":"")+" "+E(d[p].q??d[p].answer),1))),128))]),h.value.q?(t(),n(g,{key:0},[l("div",Ze,E(h.value.q),1),l("div",et,[(t(!0),n(g,null,N(h.value.options,p=>(t(),R(_,{key:p.label,variant:"outlined",color:"primary",class:"justify-start text-left",style:{height:"auto",padding:"10px 16px","white-space":"normal"},onClick:y=>c(p.next)},{default:v(()=>[C(E(p.label),1)]),_:2},1032,["onClick"]))),128))])],64)):(t(),R(Z,{key:1,color:"success",variant:"tonal",icon:"mdi-check-decagram",class:"mb-2"},{default:v(()=>[l("div",tt,E(h.value.answer),1),f(S,{source:h.value.why??""},null,8,["source"])]),_:1})),l("div",at,[r.value.length>1?(t(),R(_,{key:0,variant:"text","prepend-icon":"mdi-arrow-left",onClick:m},{default:v(()=>[...w[0]||(w[0]=[C("Back",-1)])]),_:1})):x("",!0),r.value.length>1?(t(),R(_,{key:1,variant:"text","prepend-icon":"mdi-restore",onClick:s},{default:v(()=>[...w[1]||(w[1]=[C("Start over",-1)])]),_:1})):x("",!0)])]))}}),st={class:"d-flex align-start ga-2 mb-2"},ot={class:"card-title flex-grow-1"},rt={class:"card-list mb-3"},nt={class:"card-list mb-3"},lt={key:5,class:"d-flex flex-wrap ga-2 mt-3"},dt=I({__name:"RevisionCard",props:{card:{},quiz:{type:Boolean}},setup(e){const d=e,r=T(!1);B(()=>d.quiz,()=>r.value=!1);const h=A(()=>d.quiz&&!r.value),c=A(()=>{var i;const s=(i=d.card.verify)==null?void 0:i.expectedOutput;return(s==null?void 0:s.kind)==="table"?{name:"Output",columns:s.columns,rows:s.rows}:null}),m=A(()=>[...(d.card.practice??[]).map(s=>{var i;return{id:s,title:((i=oe[s])==null?void 0:i.title)??s,to:`/challenge/${s}`,icon:"mdi-code-braces"}}),...(d.card.lessons??[]).map(s=>{var i;return G[s]?{id:s,title:G[s].title,to:`/lesson/${s}`,icon:"mdi-school-outline"}:{id:s,title:((i=re[s])==null?void 0:i.title)??s,to:`/python/${s}`,icon:"mdi-language-python"}})]);return(s,i)=>{const w=J("router-link");return t(),R(U,{id:e.card.id,class:"pa-5 revision-card"},{default:v(()=>{var p,y;return[l("div",st,[l("h4",ot,E(e.card.title),1),f(w,{to:{hash:`#${e.card.id}`,force:!0},class:"anchor","aria-label":`Link to ${e.card.title}`},{default:v(()=>[...i[1]||(i[1]=[C("#",-1)])]),_:1},8,["to","aria-label"])]),e.card.kind==="question"?(t(),R(S,{key:0,source:e.card.prompt,class:"card-prose mb-3"},null,8,["source"])):e.card.when?(t(),R(S,{key:1,source:e.card.when,class:"card-prose text-body-2 text-muted mb-3"},null,8,["source"])):x("",!0),h.value?(t(),R(_,{key:2,color:"primary",variant:"tonal",size:"small","prepend-icon":"mdi-eye-outline",onClick:i[0]||(i[0]=b=>r.value=!0)},{default:v(()=>[...i[2]||(i[2]=[C("Reveal",-1)])]),_:1})):e.card.kind==="reference"?(t(),n(g,{key:3},[e.card.component==="MethodChooser"?(t(),R(it,{key:0,class:"mb-4"})):x("",!0),f(S,{source:e.card.body,class:"card-prose"},null,8,["source"])],64)):(t(),n(g,{key:4},[i[7]||(i[7]=l("div",{class:"section-label mb-1"},"Approach",-1)),f(S,{source:e.card.approach,class:"card-prose mb-3"},null,8,["source"]),e.card.answer?(t(),n(g,{key:0},[i[3]||(i[3]=l("div",{class:"section-label mb-1"},"Answer",-1)),f(S,{source:e.card.answer,class:"card-prose mb-3"},null,8,["source"])],64)):x("",!0),e.card.solution?(t(),R(fe,{key:1,code:e.card.solution.code,lang:e.card.solution.lang,title:"Solution",class:"mb-3"},null,8,["code","lang"])):x("",!0),c.value?(t(),R(ge,{key:2,table:c.value},null,8,["table"])):e.card.output?(t(),n(g,{key:3},[i[4]||(i[4]=l("div",{class:"section-label mb-1"},"Output",-1)),f(S,{source:e.card.output,class:"card-prose mb-3"},null,8,["source"])],64)):x("",!0),(p=e.card.pitfalls)!=null&&p.length?(t(),n(g,{key:4},[i[5]||(i[5]=l("div",{class:"section-label mb-1"},"Pitfalls",-1)),l("ul",rt,[(t(!0),n(g,null,N(e.card.pitfalls,b=>(t(),n("li",{key:b},[f(S,{source:b,inline:""},null,8,["source"])]))),128))])],64)):x("",!0),(y=e.card.followUps)!=null&&y.length?(t(),n(g,{key:5},[i[6]||(i[6]=l("div",{class:"section-label mb-1"},"Follow-ups",-1)),l("ul",nt,[(t(!0),n(g,null,N(e.card.followUps,b=>(t(),n("li",{key:b},[f(S,{source:b,inline:""},null,8,["source"])]))),128))])],64)):x("",!0)],64)),!h.value&&m.value.length?(t(),n("div",lt,[(t(!0),n(g,null,N(m.value,b=>(t(),R(ee,{key:b.id,to:b.to,"prepend-icon":b.icon,size:"small",variant:"tonal",label:"",class:"link-chip"},{default:v(()=>[C(E(b.title),1)]),_:2},1032,["to","prepend-icon"]))),128))])):x("",!0)]}),_:1},8,["id"])}}}),ct=M(dt,[["__scopeId","data-v-ee6da0d3"]]),ut={class:"part"},mt=I({__name:"RevisionToc",props:{parts:{},active:{},expanded:{type:Boolean}},emits:["navigate"],setup(e,{emit:d}){const r=e,h=d,c=s=>r.active===s.id||s.cards.some(i=>i.id===r.active),m=T();return B(()=>r.active,async()=>{var y,b,$;await ne();const s=(y=m.value)==null?void 0:y.parentElement,i=((b=m.value)==null?void 0:b.querySelector(".card.is-active"))??(($=m.value)==null?void 0:$.querySelector(".section.is-active"));if(!s||!i)return;const w=s.getBoundingClientRect(),p=i.getBoundingClientRect();(p.top<w.top||p.bottom>w.bottom)&&(s.scrollTop+=p.top-w.top-s.clientHeight/3)}),(s,i)=>{const w=J("router-link");return t(),n("nav",{ref_key:"root",ref:m,class:"toc","aria-label":"On this page"},[i[2]||(i[2]=l("div",{class:"section-label mb-2"},"On this page",-1)),(t(!0),n(g,null,N(e.parts,p=>(t(),n("div",{key:p.id,class:"mb-3"},[l("div",ut,E(p.title),1),(t(!0),n(g,null,N(p.sections,y=>(t(),n(g,{key:y.id},[f(w,{to:{hash:`#${y.id}`,force:!0},class:P(["entry section",{"is-active":c(y)}]),onClick:i[0]||(i[0]=b=>h("navigate"))},{default:v(()=>[C(E(y.title),1)]),_:2},1032,["to","class"]),e.expanded||c(y)?(t(!0),n(g,{key:0},N(y.cards,b=>(t(),R(w,{key:b.id,to:{hash:`#${b.id}`,force:!0},class:P(["entry card",{"is-active":e.active===b.id}]),onClick:i[1]||(i[1]=$=>h("navigate"))},{default:v(()=>[C(E(b.title),1)]),_:2},1032,["to","class"]))),128)):x("",!0)],64))),128))]))),128))],512)}}}),Q=M(mt,[["__scopeId","data-v-f9b2be3a"]]),pt=de({inset:Boolean,...ve({transition:"bottom-sheet-transition"})},"VBottomSheet"),ht=le()({name:"VBottomSheet",props:pt(),emits:{"update:modelValue":e=>!0},setup(e,d){let{slots:r}=d;const h=ce(e,"modelValue");return ue(()=>{const c=W.filterProps(e);return f(W,me(c,{contentClass:["v-bottom-sheet__content",e.contentClass],modelValue:h.value,"onUpdate:modelValue":m=>h.value=m,class:["v-bottom-sheet",{"v-bottom-sheet--inset":e.inset},e.class],style:e.style}),r)}),{}}}),ft={key:0},gt={class:"d-flex flex-wrap ga-2 mb-5"},yt={class:"text-h4 font-weight-bold mb-1"},bt={class:"text-muted mb-4"},vt={class:"d-flex flex-wrap align-center ga-4 mb-6"},wt={class:"doc-layout"},kt={class:"doc-content"},Et={class:"section-label part-title mb-4"},Rt=["id"],xt={class:"d-flex flex-column ga-4"},Nt={key:1,class:"mb-8"},St={key:0,class:"doc-toc"},Ct={key:1},At={class:"font-weight-bold mb-1"},Ot={class:"text-body-2 text-muted mb-2"},Tt={class:"text-caption text-muted"},Lt=I({__name:"CheatSheets",props:{id:{}},setup(e){const d=e,{lgAndUp:r,mdAndUp:h}=pe(),c=A(()=>D.find(k=>k.id===d.id)),m=T(""),s=T(!1),i=T(!1),w=T(),p=A(()=>{var k;return(((k=c.value)==null?void 0:k.parts)??[]).map(u=>({...u,sections:u.sections.map(o=>({...o,cards:o.cards.filter(O=>H(`${o.title} ${ze(O)}`.toLowerCase(),m.value))})).filter(o=>o.cards.length)})).filter(u=>u.sections.length)}),y=A(()=>c.value?z(c.value.id).filter(k=>H(He(k),m.value)):[]),b=A(()=>!p.value.length&&!y.value.length),$=A(()=>{const k=p.value.map(u=>({id:u.id,title:u.title,sections:u.sections.map(o=>({id:o.id,title:o.title,cards:o.cards.map(O=>({id:O.id,title:O.title}))}))}));return y.value.length&&k.push({id:"quick-fire-part",title:"Quick-fire",sections:[{id:"quick-fire",title:`All cards (${y.value.length})`,cards:[]}]}),k}),te=A(()=>[...p.value.flatMap(k=>k.sections.flatMap(u=>u.cards.map(o=>o.id))),...y.value.length?["quick-fire"]:[]]),q=Qe(te),ae=k=>Ye(k).length+z(k.id).length;function V(k){var o;const u=k.target;k.key!=="/"||!c.value||u.closest("input, textarea, [contenteditable]")||(k.preventDefault(),(o=w.value)==null||o.focus())}return X(()=>window.addEventListener("keydown",V)),K(()=>window.removeEventListener("keydown",V)),(k,u)=>c.value?(t(),n("div",ft,[l("div",gt,[(t(!0),n(g,null,N(L(D),o=>(t(),R(ee,{key:o.id,to:`/cheatsheets/${o.id}`,"prepend-icon":o.icon,color:o.id===c.value.id?"primary":void 0,variant:o.id===c.value.id?"flat":"outlined",label:""},{default:v(()=>[C(E(o.title),1)]),_:2},1032,["to","prepend-icon","color","variant"]))),128))]),l("h1",yt,E(c.value.title),1),l("p",bt,E(c.value.summary),1),l("div",vt,[f(ye,{ref_key:"searchBox",ref:w,"model-value":m.value,"prepend-inner-icon":"mdi-magnify",label:L(h)?"Search this page (press /)":"Search this page",density:"compact","hide-details":"",clearable:"",class:"search","onUpdate:modelValue":u[0]||(u[0]=o=>m.value=o??"")},null,8,["model-value","label"]),f(be,{modelValue:s.value,"onUpdate:modelValue":u[1]||(u[1]=o=>s.value=o),label:"Quiz me",color:"primary",density:"compact","hide-details":"",inset:""},null,8,["modelValue"])]),l("div",wt,[l("div",kt,[b.value?(t(),R(Z,{key:0,type:"info",variant:"tonal"},{default:v(()=>[C('No cards match "'+E(m.value)+'".',1)]),_:1})):x("",!0),(t(!0),n(g,null,N(p.value,o=>(t(),n("section",{key:o.id,class:"mb-8"},[l("h2",Et,E(o.title),1),(t(!0),n(g,null,N(o.sections,O=>(t(),n("div",{key:O.id,class:"mb-6"},[l("h3",{id:O.id,class:"text-h6 font-weight-bold mb-3"},E(O.title),9,Rt),l("div",xt,[(t(!0),n(g,null,N(O.cards,F=>(t(),R(ct,{key:F.id,card:F,quiz:s.value},null,8,["card","quiz"]))),128))])]))),128))]))),128)),y.value.length?(t(),n("section",Nt,[u[5]||(u[5]=l("h2",{class:"section-label part-title mb-4"},"Quick-fire",-1)),f(Ke,{id:"quick-fire",cards:y.value,quiz:s.value},null,8,["cards","quiz"])])):x("",!0)]),L(r)?(t(),n("aside",St,[f(Q,{parts:$.value,active:L(q),expanded:!!m.value},null,8,["parts","active","expanded"])])):x("",!0)]),L(r)?x("",!0):(t(),n(g,{key:0},[f(_,{class:"toc-fab",color:"primary","prepend-icon":"mdi-format-list-bulleted",elevation:"4",rounded:"pill",onClick:u[2]||(u[2]=o=>i.value=!0)},{default:v(()=>[...u[6]||(u[6]=[C("Contents",-1)])]),_:1}),f(ht,{modelValue:i.value,"onUpdate:modelValue":u[4]||(u[4]=o=>i.value=o)},{default:v(()=>[f(U,{class:"pa-4 sheet-card"},{default:v(()=>[f(Q,{parts:$.value,active:L(q),expanded:!!m.value,onNavigate:u[3]||(u[3]=o=>i.value=!1)},null,8,["parts","active","expanded"])]),_:1})]),_:1},8,["modelValue"])],64))])):(t(),n("div",Ct,[u[7]||(u[7]=l("h1",{class:"text-h4 font-weight-bold mb-1"},"Cheat sheets",-1)),u[8]||(u[8]=l("p",{class:"text-muted mb-5"},"Pick a subject. Every card for it is on one page, to skim the night before and the morning of.",-1)),f(we,null,{default:v(()=>[(t(!0),n(g,null,N(L(D),o=>(t(),R(ke,{key:o.id,cols:"12",sm:"6",lg:"4"},{default:v(()=>[f(U,{to:`/cheatsheets/${o.id}`,class:"pa-5 h-100"},{default:v(()=>[f(he,{icon:o.icon,color:o.color,size:"28",class:"mb-2"},null,8,["icon","color"]),l("div",At,E(o.title),1),l("div",Ot,E(o.summary),1),l("div",Tt,E(ae(o))+" cards",1)]),_:2},1032,["to"])]),_:2},1024))),128))]),_:1})]))}}),Jt=M(Lt,[["__scopeId","data-v-27c08253"]]);export{Jt as default};
