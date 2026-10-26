import{a_ as l,d as M,c as d,e as a,F as f,r as w,t as s,i as u,V as g,w as i,h as b,b as o,j as x,y as B,f as R,o as t,l as _,g as E}from"./index-Cb8GbmxJ.js";import{_ as P}from"./chunk-Markdown.vue_vue_type_script_setup_true_lang-CmgJy2yq.js";import{V as I}from"./chunk-VAlert-BIS9X6XB.js";import{V as v}from"./chunk-VCard-BhkMmn_j.js";import{V as T,a as A}from"./chunk-VRow-BZOdB-l8.js";import{_ as N}from"./chunk-_plugin-vue_export-helper-DlAUqK2U.js";const O=[{id:"method-chooser",title:'"Which method?" decision tree',icon:"mdi-sitemap-outline",summary:"Click through a few questions to land on the right method, its key assumption and the alternative.",component:"MethodChooser",body:l`
**How to use it in the interview**: say the branch points out loud: *"Is this causal or predictive? Was it randomised? What's the outcome type?"* That's exactly the structured thinking interviewers look for.
`},{id:"formula-sheet",title:"Stats formula sheet",icon:"mdi-sigma",summary:"Every formula from the 8 days on one page.",body:l`
## Probability
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

## Inference
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

## Regression & modelling
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

## Bayesian
| | |
|---|---|
| Posterior | $\propto$ likelihood × prior |
| Beta–Binomial | Beta$(\alpha + k, \beta + n - k)$ |
| Normal–Normal | precision-weighted mean; precisions add |
| Shrinkage | $(k + m\bar p)/(n + m)$ |
| R-hat | $\sqrt{\hat V/W}$; Meridian guidance < 1.2 |

## MMM
| | |
|---|---|
| Geometric adstock | $\sum_{s=0}^L \alpha^s x_{t-s} / \sum \alpha^s$; half-life $\ln 0.5/\ln\alpha$ |
| Hill | $x^s/(x^s + ec^s)$ |
| ROI / mROI | $R(s)/s$ / $R'(s)$; for $\beta s/(s + ec)$: $\beta ec/(s + ec)^2$ |
| Optimal split | equal mROI across channels (within bounds) |

## Other
| | |
|---|---|
| Kaplan–Meier | $\prod (1 - d_j/n_j)$ |
| Cox hazard ratio | $e^{\beta}$ |
| Monte Carlo SE | $\propto 1/\sqrt S$ |
`},{id:"ab-checklist",title:"A/B testing checklist",icon:"mdi-clipboard-check-outline",summary:"Design → launch → readout, in the order a senior DS would check things.",body:l`
## Design (before launch)
- [ ] **Hypothesis** and the **decision** it informs.
- [ ] **Primary metric** (one), **guardrails**, **diagnostics**: pre-registered.
- [ ] **Unit of randomisation** = unit of analysis. Interference? Then cluster, geo or switchback.
- [ ] **MDE** agreed with the business → **sample size** → **duration** in **whole weeks**.
- [ ] **Variance reduction**: CUPED covariates, stratification.
- [ ] **Assignment**: salted hash, sticky, ramp plan.
- [ ] **Analysis plan**: test, α, sidedness, **no peeking** (or a sequential design), a multiple-testing policy.
- [ ] **Triggering**: analyse users who could see the change.

## During the test
- [ ] Daily **SRM** monitor (p < 0.001 means stop and investigate).
- [ ] Guardrail alerts (latency, crashes, revenue).
- [ ] Don't change the allocation mid-test (or analyse the periods separately).

## Readout (in this order)
1. **SRM / data quality**, an A/A sanity check.
2. **Guardrails** (one-sided, "not worse").
3. **Primary metric**: the effect, a **CI**, and the p-value. Practical significance vs the MDE.
4. **Secondary metrics** with FDR control.
5. **Pre-registered segments** only. Treat the rest as hypotheses.
6. **Novelty**: the effect by day since exposure.
7. **Decision**: ship / iterate / kill, per the pre-agreed criteria. Document it.

## When an A/B test isn't the right tool
- Can't randomise: **DiD, synthetic control, CausalImpact**.
- Portfolio media effects: **MMM (Meridian)** + geo experiments.
- Many variants, short horizon, optimise reward: **bandits**.
`},{id:"bayesian",title:"Bayesian cheat sheet",icon:"mdi-chart-bell-curve",summary:"Conjugate pairs, MCMC diagnostics, Bayesian A/B, and how to defend priors.",body:l`
## Core
$p(\theta \mid y) \propto p(y \mid \theta)\,p(\theta)$. **MAP** = mode, **posterior mean/median** = summaries, a **credible interval** = a probability statement about θ.

## Conjugate pairs
| Likelihood | Prior | Posterior |
|---|---|---|
| Binomial | Beta(α, β) | Beta(α + k, β + n − k) |
| Poisson | Gamma(a, b) | Gamma(a + Σy, b + n) |
| Normal (σ known) | Normal(μ₀, τ₀²) | Normal: precision-weighted mean |

## Regularisation = priors
Ridge = a Normal(0, τ²) prior. Lasso = a Laplace prior. λ = σ²/τ².

## Hierarchical models
Groups drawn from a shared distribution, so **partial pooling**: shrinkage $\lambda_g = \tau^2/(\tau^2 + \sigma^2/n_g)$. Meridian: $\log\beta_{g,m} \sim N(\beta_m, \eta_m)$.

## MCMC
- **Metropolis**: accept with min(1, posterior ratio). p(y) cancels.
- **HMC/NUTS**: gradient-guided. Meridian uses NUTS (TensorFlow Probability).
- **Diagnostics**: **R-hat** (Meridian: < 1.2; ideally ≈ 1.01), **ESS**, trace plots, divergences.
- Fixes: longer chains / more adaptation, better priors, reparameterisation, fewer weakly identified parameters.

## Bayesian A/B
P(B > A) = the share of posterior draws where B wins. **Expected loss** = E[max(p_A − p_B, 0)]. Ship when the expected loss < ε (pre-registered).

## Defending priors (the stakeholder script)
1. Every model has assumptions. Priors make them explicit.
2. Weakly informative defaults, plus **evidence-based** custom priors (experiments).
3. The data dominates where it's informative: show **prior vs posterior**.
4. **Sensitivity analysis**: does the decision change under reasonable alternative priors?
5. **Validation**: holdout fit, and agreement with experiments.

## Credible vs confidence
| | Credible | Confidence |
|---|---|---|
| "95%" means | P(θ ∈ CI \| data) | 95% of such intervals cover θ |
| Prior? | yes | no |
`},{id:"meridian-glossary",title:"MMM & Meridian glossary",icon:"mdi-book-alphabet",summary:"Every Meridian term, default and health check you may be asked about.",body:l`
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
`},{id:"case-framework",title:"Data-intuition case framework",icon:"mdi-briefcase-search-outline",summary:"The structure for any open-ended business question, plus clarifying-question banks.",body:l`
## The 6-step structure
1. **Clarify**: goal, stakeholders, the decision, the time horizon. *"Before I dive in, can I ask…"*
2. **Assumptions**: state them out loud.
3. **Metrics**: a primary (north star) metric, guardrails, diagnostics.
4. **Approach**: causal design (experiment > quasi-experiment > adjustment) or a model, and why.
5. **Analysis and risks**: biases (selection, confounding, novelty, seasonality, SRM), power, segments.
6. **Recommendation**: the decision rule, next steps, how you'd communicate it, and what you'd build so it scales.

## Clarifying-question bank
- **Assignment**: random? targeted? opt-in? global?
- **Counterfactual**: is there a holdout? history? comparable units?
- **Unit**: user, session, advertiser, geo? Interference?
- **Data**: what exists, at what granularity, how complete (conversion lag)?
- **Confounders**: what else changed (seasonality, promos, pricing, competitors, tracking)?
- **Success**: which metric, over what horizon, and what threshold?

## Metric-drop triage
Data validity → expected variation (seasonality, forecast band) → localisation (segment) → funnel decomposition (traffic × CTR × CVR) → external factors → quantify each factor's share.

## L6 boosters
- **Think at scale**: billions of rows, many advertisers. Make it a repeatable process.
- **Focus on the user**: UX guardrails, advertiser outcomes.
- **Be conversational**: check in with the interviewer at each step.
- **Systems thinking**: standing holdouts, platform alerts, templates.
`},{id:"sql-pandas",title:"SQL ↔ pandas ↔ pure Python Rosetta stone",icon:"mdi-swap-horizontal-bold",summary:"The same operation in all three languages, side by side.",body:l`
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
`},{id:"python-survival",title:"Pure-Python survival kit",icon:"mdi-language-python",summary:"The syntax you must be able to write from memory, with no libraries.",body:l`
\`\`\`python
import math, random, statistics as st
from collections import defaultdict, Counter
from dataclasses import dataclass

# --- grouping
totals = defaultdict(float)
for r in rows:
    totals[r["campaign"]] += r["spend"]
counts = Counter(r["device"] for r in rows)

# --- join (left) and dedupe
lookup = {u["user_id"]: u for u in users}
joined = [{**o, "country": lookup.get(o["user_id"], {}).get("country", "unknown")} for o in orders]
unique_users = {e["user_id"] for e in events}

# --- sort / top-n
top3 = sorted(totals, key=totals.get, reverse=True)[:3]
rows.sort(key=lambda r: (-r["rate"], r["name"]))

# --- stats
m = sum(xs) / len(xs)
var = sum((x - m) ** 2 for x in xs) / (len(xs) - 1)      # sample variance
se = math.sqrt(var / len(xs))
norm_cdf = lambda z: 0.5 * (1 + math.erf(z / math.sqrt(2)))
p_two_sided = math.erfc(abs(z) / math.sqrt(2))

# --- two-proportion z-test
p_pool = (k1 + k2) / (n1 + n2)
z = (k2 / n2 - k1 / n1) / math.sqrt(p_pool * (1 - p_pool) * (1 / n1 + 1 / n2))

# --- simulation, bootstrap, permutation
rng = random.Random(42)
boot = [st.mean(rng.choices(xs, k=len(xs))) for _ in range(2000)]
rng.shuffle(pooled)
post_draws = [rng.betavariate(a + k, b + n - k) for _ in range(10000)]

# --- lags and rolling
lag1 = [None] + xs[:-1]
roll7 = [None if i < 6 else sum(xs[i - 6:i + 1]) / 7 for i in range(len(xs))]

# --- dates
import datetime as dt
d = dt.date.fromisoformat("2026-09-14"); d + dt.timedelta(days=7); d.weekday()

# --- hashing assignment
import hashlib
bucket = int(hashlib.sha256(f"{salt}:{uid}".encode()).hexdigest()[:8], 16) % 1000

# --- safe sigmoid, log space
sig = lambda z: 1 / (1 + math.exp(-z)) if z >= 0 else math.exp(z) / (1 + math.exp(z))
logs = [k * math.log(p) + (n - k) * math.log(1 - p) for p in grid]; mx = max(logs)
w = [math.exp(l - mx) for l in logs]
\`\`\`

**Edge cases to say out loud**: empty input, divide-by-zero, duplicates, missing keys, ties, NaN/None, the unit of analysis.
`}],C=O,D={class:"d-flex flex-wrap ga-1 mb-4 text-caption text-muted"},q={class:"text-h6 font-weight-bold mb-3"},V={class:"d-flex flex-column ga-2"},z={class:"text-h6 font-weight-bold mb-1"},U={class:"d-flex ga-2 mt-4"},L=M({__name:"MethodChooser",setup($){const h={start:{q:"What is the question?",options:[{label:"Did X cause a change in Y? (causal)",next:"causal"},{label:"Predict / classify / forecast something",next:"predict"},{label:"Describe uncertainty, or estimate a quantity",next:"estimate"},{label:"Find groups / structure (no labels)",next:"cluster"},{label:"Allocate budget / choose an action",next:"decide"}]},causal:{q:"Can you (or did you) randomise?",options:[{label:"Yes, at the user level, with no interference",next:"rct_metric"},{label:"Yes, but units interact (auctions, marketplaces, budgets)",next:"cluster_rand"},{label:"No: the change hit some units/regions at a known time",next:"did"},{label:"No: one treated unit or series, with good controls",next:"synth"},{label:"No: individual-level, rich covariates",next:"psm"},{label:"Portfolio of media channels over time",next:"mmm"}]},rct_metric:{q:"What is the metric?",options:[{label:"Binary (converted?), large n",next:"ztest"},{label:"Binary, small counts",next:"fisher"},{label:"Continuous / revenue",next:"welch"},{label:"Ratio (clicks per impression, revenue per session)",next:"delta"},{label:"Time-to-event (retention)",next:"survival"},{label:"Many variants, want to maximise reward now",next:"bandit"}]},ztest:{answer:"Two-proportion z-test (pooled SE), plus a CI for the difference",why:"Check SRM first. Pre-register α and the MDE. Use a sequential design if you need to peek. Bayesian alternative: Beta–Binomial P(B > A)."},fisher:{answer:"Fisher's exact test (or a permutation test)",why:"The Normal approximation is unreliable with small counts."},welch:{answer:"Welch's t / z-test on means, with CUPED + winsorising",why:"The CLT applies to the mean at scale. CUPED uses pre-period data to cut the variance by 1 − ρ². Permutation test or bootstrap if n is small or the data is weird."},delta:{answer:"Delta-method SE or a bootstrap at the randomisation unit (user)",why:"Numerator and denominator are both random and correlated within users."},survival:{answer:"Kaplan–Meier curves + log-rank test, or Cox PH with treatment",why:"Handles right-censoring (users still active)."},bandit:{answer:"Multi-armed bandit (Thompson sampling)",why:"Earning > learning. Keep an exploration floor and a holdout. Beware delayed rewards."},cluster_rand:{answer:"Cluster / geo / switchback / budget-split randomisation",why:"Contain the interference within the randomisation unit (SUTVA). Fewer units means less power, so plan by simulation."},did:{answer:"Difference-in-differences (event study) or a geo TBR",why:"Parallel-trends assumption: plot the pre-trends, and use clustered SEs. Beware staggered adoption."},synth:{answer:"Synthetic control or CausalImpact (BSTS)",why:"Build the counterfactual from unaffected controls fitted on the pre-period."},psm:{answer:"Propensity score matching / IPW, or regression adjustment",why:"Only fixes *observed* confounding. Add a sensitivity analysis. Look for an instrument or a discontinuity if possible."},mmm:{answer:"Bayesian MMM (Meridian), calibrated with geo experiments",why:"Adstock + Hill + controls (GQV for search) + a geo hierarchy + ROI priors. Check the health; validate on a holdout."},predict:{q:"What is the target?",options:[{label:"Binary (churn, convert)",next:"clf"},{label:"Continuous",next:"reg"},{label:"Count",next:"count"},{label:"Future values of a time series",next:"forecast"},{label:"Time until an event",next:"survival"}]},clf:{answer:"Logistic regression baseline → gradient boosting",why:'Validate on a time-based split. Metrics: log loss, AUC / PR-AUC, calibration, precision@k. For "who to treat" use uplift models.'},reg:{answer:"Linear / regularised regression (ridge, lasso) → boosting",why:"Check the residuals. Log-transform skewed targets. Cross-validate."},count:{answer:"Poisson / negative binomial GLM",why:"Use the negative binomial if variance ≫ mean. Use an exposure offset."},forecast:{answer:"Seasonal naive baseline → ETS / ARIMA / regression with Fourier terms",why:"Rolling-origin backtests at the horizon you need; report intervals."},estimate:{q:"What are you estimating?",options:[{label:"A mean or proportion",next:"ci"},{label:"A median, ratio, or complex statistic",next:"boot"},{label:"Rates for many small groups",next:"hier"},{label:"A probability with prior knowledge / little data",next:"bayes"},{label:"How many users an experiment needs",next:"power"}]},ci:{answer:"CLT-based CI: estimate ± 1.96·SE (Wilson for proportions with small n)",why:"SE = σ/√n, or √(p(1−p)/n)."},boot:{answer:"Bootstrap (percentile / BCa)",why:"Resample the independent unit. Use a block bootstrap for time series."},hier:{answer:"Hierarchical model / empirical-Bayes shrinkage",why:"Partial pooling stabilises the small groups (as Meridian does for geos)."},bayes:{answer:"Bayesian posterior (e.g. Beta–Binomial)",why:"Gives direct probability statements. Show prior sensitivity."},power:{answer:"Power analysis: n ≈ 7.85·σ²/δ² per arm (α = 0.05, 80% power)",why:"Or simulate for complex designs. Translate into whole weeks."},cluster:{answer:"k-means (standardised features) / GMM / hierarchical clustering",why:"Choose k with the elbow + silhouette + business usefulness. Validate stability."},decide:{q:"What kind of decision?",options:[{label:"Split a budget across channels",next:"alloc"},{label:"Pick a variant to show",next:"bandit"},{label:"Act under uncertainty / compare plans",next:"mc"}]},alloc:{answer:"Optimise the response curves: equalise marginal ROI (Meridian BudgetOptimizer)",why:"A convex problem for concave curves. Use bounds (±30% default) and test big moves."},mc:{answer:"Monte Carlo over posterior draws (common random numbers)",why:"Report the expected uplift, P(better) and the downside quantile."}},e=B(["start"]),r=R(()=>h[e.value[e.value.length-1]]);function n(k){e.value.push(k)}function c(){e.value.length>1&&e.value.pop()}function S(){e.value=["start"]}return(k,p)=>(t(),d("div",null,[a("div",D,[(t(!0),d(f,null,w(e.value,(m,y)=>(t(),d("span",{key:y},s(y?"›":"")+" "+s(h[m].q??h[m].answer),1))),128))]),r.value.q?(t(),d(f,{key:0},[a("div",q,s(r.value.q),1),a("div",V,[(t(!0),d(f,null,w(r.value.options,m=>(t(),u(g,{key:m.label,variant:"outlined",color:"primary",class:"justify-start text-left",style:{height:"auto",padding:"10px 16px","white-space":"normal"},onClick:y=>n(m.next)},{default:i(()=>[b(s(m.label),1)]),_:2},1032,["onClick"]))),128))])],64)):(t(),u(I,{key:1,color:"success",variant:"tonal",icon:"mdi-check-decagram",class:"mb-2"},{default:i(()=>[a("div",z,s(r.value.answer),1),o(P,{source:r.value.why??""},null,8,["source"])]),_:1})),a("div",U,[e.value.length>1?(t(),u(g,{key:0,variant:"text","prepend-icon":"mdi-arrow-left",onClick:c},{default:i(()=>[...p[0]||(p[0]=[b("Back",-1)])]),_:1})):x("",!0),e.value.length>1?(t(),u(g,{key:1,variant:"text","prepend-icon":"mdi-restore",onClick:S},{default:i(()=>[...p[1]||(p[1]=[b("Start over",-1)])]),_:1})):x("",!0)])]))}}),F={key:0,style:{"max-width":"980px"}},G={class:"d-flex align-center ga-3 mb-1"},H={class:"text-h4 font-weight-bold"},X={class:"text-muted mb-5"},W={key:1},Y={class:"font-weight-bold mb-1"},j={class:"text-body-2 text-muted"},K=M({__name:"CheatSheets",props:{id:{}},setup($){const h=$,e=R(()=>C.find(r=>r.id===h.id));return(r,n)=>e.value?(t(),d("div",F,[o(g,{variant:"text",size:"small","prepend-icon":"mdi-arrow-left",to:"/cheatsheets",class:"mb-3 px-1"},{default:i(()=>[...n[0]||(n[0]=[b("All cheat sheets",-1)])]),_:1}),a("div",G,[o(_,{icon:e.value.icon,color:"primary",size:"32"},null,8,["icon"]),a("h1",H,s(e.value.title),1)]),a("p",X,s(e.value.summary),1),e.value.component==="MethodChooser"?(t(),u(v,{key:0,class:"pa-6 mb-4"},{default:i(()=>[o(L)]),_:1})):x("",!0),o(v,{class:"pa-6 mb-8"},{default:i(()=>[o(P,{source:e.value.body,class:"cheat"},null,8,["source"])]),_:1})])):(t(),d("div",W,[n[1]||(n[1]=a("h1",{class:"text-h4 font-weight-bold mb-1"},"Cheat sheets",-1)),n[2]||(n[2]=a("p",{class:"text-muted mb-5"},"One-page references to skim the night before and the morning of.",-1)),o(T,null,{default:i(()=>[(t(!0),d(f,null,w(E(C),c=>(t(),u(A,{key:c.id,cols:"12",sm:"6",lg:"4"},{default:i(()=>[o(v,{to:`/cheatsheets/${c.id}`,class:"pa-5 h-100"},{default:i(()=>[o(_,{icon:c.icon,color:"primary",size:"28",class:"mb-2"},null,8,["icon"]),a("div",Y,s(c.title),1),a("div",j,s(c.summary),1)]),_:2},1032,["to"])]),_:2},1024))),128))]),_:1})]))}}),ie=N(K,[["__scopeId","data-v-86757044"]]);export{ie as default};
