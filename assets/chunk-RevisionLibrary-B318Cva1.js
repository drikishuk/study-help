import{a_ as e,a$ as h,a7 as me,S as ie,X as G,T as ne,y as L,d as q,i as A,w as R,b0 as pe,c as r,r as C,n as W,b,V as U,h as $,F as w,e as l,o as s,t as v,j as T,f as O,b1 as z,s as fe,v as X,Q as ye,as as ge,G as be,I as we,L as ve,H as ke,J as Ee,b2 as xe,g as P,l as Re}from"./index-CKK18feP.js";import{_ as I}from"./chunk-Markdown.vue_vue_type_script_setup_true_lang-CDiBpVa6.js";import{V}from"./chunk-VCard-BDJHa15O.js";import{_ as H}from"./chunk-_plugin-vue_export-helper-DlAUqK2U.js";import{C as Ae}from"./chunk-CodeBlock-6DkI3GeX.js";import{V as oe}from"./chunk-VAlert-DgW5A0kA.js";import{D as J}from"./chunk-DataTablePreview-Bd_-86pS.js";import{V as re}from"./chunk-VChip-Drj1p5a1.js";import{V as Se}from"./chunk-VTextField-Dxz5IHa_.js";import{V as Te}from"./chunk-VSwitch-Cw_wCTQM.js";import{m as Ne,V as Z}from"./chunk-VDialog-EmeohJvW.js";import{V as _e,a as Ce}from"./chunk-VRow-lGPHF7UF.js";const g=(t,i)=>({lang:"python",code:t,check:{expr:"result",expected:i}}),$e={id:"ab-basics",title:"The idea",cards:[{kind:"reference",id:"what-is-ab-test",title:"What an A/B test is",when:"The reason experiments can claim cause and effect.",keywords:["randomise","randomize","RCT","randomised controlled experiment","causal","experiment"],body:e`
- An A/B test randomly splits users into groups, changes one thing for one group, and compares the outcomes.
- Random assignment makes the groups the same on average in every way, both seen and unseen.
- So any difference beyond noise was **caused** by the change.
- Without randomising, the groups can differ from the start. Users who choose a new feature were probably keener already.
`,lessons:["d2-ab-anatomy"]},{kind:"reference",id:"control-treatment",title:"Control and treatment",when:"The two groups, and how users end up in them.",keywords:["variant","arm","A","B","hash","assignment","sticky","split"],body:e`
| Group | What it gets | Its job |
|---|---|---|
| **Control** (A) | the current experience | shows what would have happened anyway |
| **Treatment** (B) | the change | shows what the change does |

Assignment should be random and **sticky**. Hashing the user ID means a user always lands in the same group, however often they return.
`,lessons:["d2-ab-anatomy","d5-ab-advanced"]}]},Ie={id:"ab-design-basics",title:"Designing a test",cards:[{kind:"reference",id:"metrics",title:"Primary and guardrail metrics",when:"Decide what you are measuring before you launch.",keywords:["OEC","north star","diagnostic","KPI","success metric","pre-register"],body:e`
| Type | Its job | Example |
|---|---|---|
| **Primary** | makes the decision; pick one | conversions per user |
| **Guardrail** | must not get worse | latency, unsubscribes |
| **Diagnostic** | explains why the result happened | click-through rate, funnel steps |

Choose them before launch. If you pick afterwards, you can always find a winner among 15 metrics.
`,lessons:["d2-ab-anatomy"]},{kind:"reference",id:"randomisation-unit",title:"Randomisation unit",when:"Choose what gets randomised.",keywords:["user","session","cookie","geo","advertiser","unit of analysis","interference","spillover","randomization"],body:e`
- Common units are a user, a session, a cookie, an advertiser or a geo.
- Usually pick the user, so each person gets a consistent experience.
- Analyse at the same level you randomised. Randomising by user but analysing by session understates variance, which gives false positives.
- If one unit can affect another, known as **interference**, randomise a bigger unit such as a geo.
`,lessons:["d2-ab-anatomy","d5-ab-advanced"]},{kind:"reference",id:"sample-size",title:"What drives sample size",when:"Work out how many users a test needs, and how long it will run.",keywords:["MDE","minimum detectable effect","power","duration","how long","7.85","baseline"],body:e`
$$n \text{ per arm} \approx \dfrac{7.85\,[p_1(1-p_1) + p_2(1-p_2)]}{(p_2 - p_1)^2}$$

This uses α = 0.05 and 80% power. The **minimum detectable effect** (MDE) is the smallest change worth acting on.

- A smaller MDE needs far more users: halving it takes about 4× as many.
- Noisier metrics and higher power need more users too.

To detect 5% → 6%, you need about 8,200 users per arm. With 2,000 eligible users a day split across both arms, that's about 8 days, so run for 2 whole weeks to cover each day of the week evenly.
`,lessons:["d2-ab-anatomy"],verify:g(h`
import math
n = 7.85 * (0.05 * 0.95 + 0.06 * 0.94) / (0.06 - 0.05) ** 2
result = [round(n, -2), round(2 * n / 2000), math.ceil(2 * n / 2000 / 7)]
`,[8200,8,2])}]},Oe={id:"ab-running",title:"Running and reading",cards:[{kind:"reference",id:"dont-peek",title:"Don't peek",when:"What goes wrong when you check a test early and stop on a good result.",keywords:["peeking","early stopping","sequential","false positive","fixed horizon"],body:e`
- Every look at a running test is another chance for noise to cross the significance line.
- At α = 0.05, the real false-positive rate grows to about 14% with 5 looks, and about 25% with daily looks over a month.
- Decide the sample size up front and read the result once.
- If you need to look early, use a method built for it, such as a group sequential design.
- Watching guardrails during the test is fine, because that's for catching harm.
`,lessons:["d5-ab-advanced"]},{kind:"reference",id:"reading-result",title:"Reading a result",when:"Turn the numbers into a decision.",keywords:["readout","ship","significant","lift","confidence interval","practical significance","decision"],body:e`
Check that the experiment is healthy, then the guardrails, then the primary metric.

| 95% CI on the difference | What to do |
|---|---|
| Above 0, and the likely effect is worth it | ship |
| Above 0, but too small to matter | significant, but probably not worth shipping |
| Spans 0, and narrow | no meaningful effect; move on |
| Spans 0, and wide | inconclusive; you need more data |
| Below 0 | don't ship |

With 5.0% → 5.5%, the lift is +0.5pp, or +10% in relative terms. The CI is 0.10pp to 0.90pp, so it's a real effect but its size is uncertain.
`,lessons:["d2-hypothesis-testing","d2-ab-anatomy"],practice:["d2-py-hard"],verify:g(h`
import math
n = 24000
p_a, p_b = 1200 / n, 1320 / n
se = math.sqrt(p_a * (1 - p_a) / n + p_b * (1 - p_b) / n)
result = [round((p_b - p_a) * 100, 1), round((p_b - p_a) / p_a * 100), round((p_b - p_a - 1.96 * se) * 100, 2), round((p_b - p_a + 1.96 * se) * 100, 2)]
`,[.5,10,.1,.9])},{kind:"reference",id:"common-gotchas",title:"Common gotchas",when:"The usual ways a test ends up misleading you.",keywords:["SRM","sample ratio mismatch","novelty","multiple testing","segments","Simpson","Bonferroni"],body:e`
| Gotcha | What happens | What to do |
|---|---|---|
| **Sample ratio mismatch** | a 50/50 split comes out uneven, so something is broken | stop and investigate; don't trust the result |
| **Novelty** | users react to the change itself, then it fades | look at the effect over time |
| **Many metrics or segments** | "it worked for iOS in Germany" after 40 tries is probably noise | correct for it, then confirm in a new test |
| **Changing the split mid-test** | pooling the periods biases the result | analyse each period separately |
| **Interference** | groups affect each other | randomise a bigger unit |
`,lessons:["d5-ab-advanced"]}]},Le={id:"cant-randomise",title:"When you can't randomise",cards:[{kind:"reference",id:"alternatives",title:"The alternatives",when:"Find a comparison when you can't split users at random, such as for TV or a nationwide launch.",keywords:["DiD","difference-in-differences","diff-in-diff","synthetic control","CausalImpact","geo experiment","quasi-experiment","MMM","parallel trends","counterfactual"],body:e`
| Situation | Method |
|---|---|
| You can randomise regions | geo experiment |
| A change hit some units at a known time | difference-in-differences |
| One treated unit and many possible controls | synthetic control |
| One treated time series, plus controls it didn't affect | CausalImpact |
| Media effects across all channels, over time | MMM, checked against experiments |

All of them estimate what would have happened without the change. For difference-in-differences, if treated regions go from 100 to 130 while control regions go from 100 to 110, the effect is 30 − 10 = 20. That assumes both would otherwise have moved in parallel.
`,lessons:["d5-causal-quasi"],verify:g(h`
result = (130 - 100) - (110 - 100)
`,20)}]},Me={id:"mmm-idea",title:"The idea",cards:[{kind:"reference",id:"what-is-mmm",title:"What an MMM is",when:"The question a Marketing Mix Model answers, and how Meridian does it.",keywords:["marketing mix model","Meridian","baseline","incremental","aggregated","privacy","geo","hierarchical"],body:e`
- An MMM answers: how much of our sales did each channel actually cause, and where should the next dollar go?
- It works from aggregated data, usually weekly and by region, with no user-level tracking.
- **Meridian** is Google's open-source MMM. It's a Bayesian, geo-level, hierarchical regression.

Its equation reads like a sentence: this week's KPI in this region = a time-varying baseline + the region's typical level + the effect of controls + the effect of each media channel + noise.
`,lessons:["m1-what-is-meridian","m3-model-spec"]},{kind:"reference",id:"mmm-inputs",title:"What goes in",when:"The data you need before you can fit a model.",keywords:["data","KPI","media","controls","geos","spend","impressions","population","revenue per KPI","GQV"],body:e`
| Input | What it is |
|---|---|
| **KPI** | revenue, or conversions with an optional \`revenue_per_kpi\` |
| **Paid media** | impressions and spend, per channel, geo and week |
| **Controls** | things that move the KPI but aren't media, such as price, promotions and Google Query Volume |
| **Geos** | the regions, with the population of each |

- Aim for about 2-3 years of weekly data in which spend really varies.
- Geos help a lot: 2 years of national data gives 104 rows, while 50 geos give 5,200.
`,lessons:["m1-what-is-meridian"],practice:["d3-py-medium-1"],verify:g(h`
weeks = 2 * 52
result = [weeks, weeks * 50]
`,[104,5200])}]},De={id:"mmm-model",title:"Inside the model",cards:[{kind:"reference",id:"adstock",title:"Adstock",when:"How the model handles the timing of an ad's effect.",keywords:["carryover","decay","alpha","max_lag","geometric","binomial","lag"],body:e`
**Adstock is carryover:** an ad seen this week still nudges purchases in later weeks, with the effect fading over time.

- The decay rate $\alpha$ sets how fast it fades, and \`max_lag\` caps how long it lasts (8 periods by default).
- Meridian's weights sum to 1, so adstock changes when the effect lands, not how big it is.

With $\alpha = 0.5$ and a max lag of 2, a burst of 100 in one week counts as 57, then 29, then 14.
`,lessons:["d6-mmm-mechanics","m6-transforms-health"],verify:g(h`
alpha, max_lag = 0.5, 2
weights = [alpha ** s for s in range(max_lag + 1)]
result = [round(100 * w / sum(weights)) for w in weights]
`,[57,29,14])},{kind:"reference",id:"saturation",title:"Saturation",when:"How the model handles spending more and more on one channel.",keywords:["Hill","diminishing returns","ec","half-saturation","slope","response curve"],body:e`
**Saturation is diminishing returns:** the first million reaches new people, and the tenth mostly reaches the same people again.

$$\text{Hill}(x) = \dfrac{x}{x + ec}$$

- This is the Hill curve with slope 1, the default for most media.
- **ec** is the half-saturation point, where the channel reaches half its maximum effect.
- Meridian applies adstock first, then Hill.

With $ec = 2$, media of 2 gives 0.50 and media of 6 gives 0.75. Three times the media gives only 1.5 times the effect.
`,lessons:["d6-mmm-mechanics","m6-transforms-health"],verify:g(h`
hill = lambda x, ec: x / (x + ec)
result = [hill(2, 2), hill(6, 2), hill(6, 2) / hill(2, 2)]
`,[.5,.75,1.5])},{kind:"reference",id:"why-bayesian",title:"Why Bayesian",when:"Why Meridian is built this way rather than as a plain regression.",keywords:["posterior","MCMC","NUTS","uncertainty","credible interval","distribution"],body:e`
- **The data is small for the question.** A few years of weekly data, many channels and correlated spend make a plain regression unstable. Priors keep it sensible.
- **Priors can carry real evidence.** A lift test can become the prior for that channel.
- **Decisions need uncertainty.** Each result, such as a channel's ROI, comes out as a distribution rather than a single number.

Meridian combines priors and data, then samples the posterior with MCMC.
`,lessons:["m1-what-is-meridian","d4-bayesian-inference"]},{kind:"reference",id:"mmm-priors",title:"Priors",when:"What the model assumes before it sees your data.",keywords:["LogNormal","ROI prior","default","calibration","prior vs posterior","informative"],body:e`
- A prior is what's reasonable to believe before seeing this data, written as a range.
- By default, Meridian sets it directly on each paid channel's ROI: LogNormal(0.2, 0.9).
- That has a median of 1.22, a mean of 1.83 and an 80% range of about 0.39 to 3.87. It can't go negative.
- Where the data is informative, it dominates. Where it's weak, the result stays close to the prior.
- Compare the prior and posterior for each channel to see which case you're in.
`,lessons:["m1-what-is-meridian","m4-priors"],verify:g(h`
import math
mu, sigma = 0.2, 0.9
result = [round(math.exp(mu), 2), round(math.exp(mu + sigma ** 2 / 2), 2), round(math.exp(mu - 1.2816 * sigma), 2), round(math.exp(mu + 1.2816 * sigma), 2)]
`,[1.22,1.83,.39,3.87])}]},Ue={id:"mmm-results",title:"Reading the results",cards:[{kind:"reference",id:"roi-vs-mroi",title:"ROI vs mROI",when:"Two return figures that can point in different directions.",keywords:["marginal ROI","return on investment","incremental","next dollar","CPIK","saturated","response curve"],body:e`
| | What it is | Use it for |
|---|---|---|
| **ROI** | incremental outcome ÷ spend: the *average* return so far | judging past spend |
| **mROI** | the return on the *next* unit of spend | deciding where money moves |

A channel can have a high ROI and a low mROI, which means it's probably saturated. On a Hill curve with $ec = 0.5$ and spend of 1, a channel with an ROI of 3 has an mROI of just 1.

If the KPI isn't revenue, use **CPIK** instead: spend ÷ incremental KPI.
`,lessons:["d7-mmm-optimisation","m7-outputs-optimisation"],practice:["d7-py-easy-1"],verify:g(h`
ec, spend, roi = 0.5, 1, 3
beta = roi * (spend + ec)
mroi = beta * ec / (spend + ec) ** 2
result = [round(beta * spend / (spend + ec) / spend, 6), round(mroi, 6)]
`,[3,1])},{kind:"reference",id:"health-checks",title:"Health checks",when:"Check a fitted model before you trust its numbers.",keywords:["R-hat","convergence","negative baseline","PPP","posterior predictive","goodness of fit","R²","wMAPE","MAPE","holdout","model fit","diagnostics"],body:e`
| Check | What it asks | Passes when |
|---|---|---|
| **Convergence** | did the sampler settle? | max R-hat < 1.2 |
| **Negative baseline** | is baseline sales below 0, so media drove over 100%? | P < 0.2 (review up to 0.8) |
| **Bayesian PPP** | is the observed total consistent with the model? | PPP ≥ 0.05 |
| **Goodness of fit** | R², MAPE and wMAPE, ideally on a holdout | R² > 0 |
| **Prior-posterior shift** | did each channel's ROI move from its prior? | all of them shift |
| **ROI consistency** | with custom priors, is each result inside its prior's 1st-99th percentile? | all of them are |

Start with convergence: if that fails, nothing else counts.
`,lessons:["m6-transforms-health","d3-model-diagnostics"]},{kind:"reference",id:"budget-optimisation",title:"Budget optimisation",when:"Turn the response curves into a plan for next quarter's budget.",keywords:["optimizer","BudgetOptimizer","fixed budget","flexible budget","target ROI","target mROI","allocation","equal marginal","scenario","budget optimization"],body:e`
**The rule:** move money towards the channel with the higher mROI until the mROIs are equal. If YouTube's next dollar returns 1.8 and Search's returns 0.9, move money from Search to YouTube.

| Scenario | What it does | Default limit per channel |
|---|---|---|
| **Fixed budget** (default) | best split of the same total | ±30% |
| **Flexible, target ROI** | largest budget that keeps overall ROI at the target | ±100% |
| **Flexible, target mROI** | adds spend until each channel's mROI hits the target | ±100% |

The limits keep the plan near spend levels the model has seen, where its curves can be trusted.
`,lessons:["m7-outputs-optimisation","d7-mmm-optimisation"]}]},Be={id:"mmm-and-experiments",title:"MMM and experiments",cards:[{kind:"reference",id:"mmm-vs-experiments",title:"MMM vs experiments",when:"Which one to use, and how they work together.",keywords:["lift test","geo experiment","calibration","calibrate","causal","attribution","triangulation","gold standard"],body:e`
| | Experiment | MMM |
|---|---|---|
| **Covers** | one channel, a few weeks, one spend level | every channel over years, including offline |
| **Evidence** | the gold standard for cause and effect | observational; causal only under assumptions |
| **Best for** | one decision about one tactic now | splitting the whole budget |

**Calibration** joins them up: experiment results become ROI priors for the matching channels. Meridian adjusts for the differences between the two, so the model agrees with your experiments where you have them and extrapolates where you don't.
`,lessons:["m5-calibration","m1-what-is-meridian"]}]},Pe={id:"ml-basics",title:"The basics",cards:[{kind:"reference",id:"supervised-unsupervised",title:"Supervised vs unsupervised",when:"The first split in any ML problem.",keywords:["label","regression","classification","clustering","target"],body:e`
- **Supervised** learning has a label to predict: a number (**regression**), such as next month's sales, or a class (**classification**), such as whether a user will churn.
- **Unsupervised** learning has no label, so it looks for structure, such as customer segments.
`,lessons:["d7-ml-refresh","d7-clustering"]},{kind:"reference",id:"train-validation-test",title:"Train, validation and test",when:"Split the data so you get an honest score.",keywords:["holdout","split","tuning","hyperparameters","out of sample"],body:e`
| Set | What it's for |
|---|---|
| **Train** | fit the model |
| **Validation** | compare models and tune settings |
| **Test** | get a final score, used once at the end |

- Once you've used a set to make a choice, its score is too optimistic. That's why the test set stays untouched.
- Split time series by time, never at random.
`,lessons:["d6-resampling-validation"]},{kind:"reference",id:"over-under-fitting",title:"Overfitting and underfitting",when:"Diagnose a model from its training and validation scores.",keywords:["generalise","too complex","too simple","learning curve","train error","validation error"],body:e`
- **Underfitting:** train and validation error are both high. Try a more flexible model or better features.
- **Overfitting:** train error is low and validation error is much higher. Try more data, regularisation or a simpler model.
- **Good fit:** both errors are low and close together.

A validation score that looks too good usually isn't overfitting. Check for leakage first.
`,lessons:["d6-resampling-validation","d7-ml-refresh"]},{kind:"reference",id:"bias-variance",title:"Bias and variance",when:"The two sources of error you trade off as a model gets more flexible.",keywords:["tradeoff","trade-off","decomposition","noise","MSE","irreducible"],body:e`
Expected squared error splits into three parts:

$$\text{error} = \text{bias}^2 + \text{variance} + \text{noise}$$

- **Bias:** the model is too simple and misses patterns, so it's wrong in the same way whichever data it sees.
- **Variance:** the model is too flexible and chases noise, so it changes a lot with different data.
- **Noise:** the part no model can remove.

A more flexible model lowers bias and raises variance. The best model sits where the total is lowest.
`,lessons:["d6-resampling-validation"]}]},qe={id:"ml-models",title:"Models",cards:[{kind:"reference",id:"linear-logistic",title:"Linear and logistic regression",when:"The simple, interpretable baselines.",keywords:["OLS","log-odds","odds ratio","sigmoid","log loss","baseline","coefficient"],body:e`
| | Linear | Logistic |
|---|---|---|
| Predicts | a number | the probability of a class |
| Equation | $\hat y = X\beta$ | $P(y = 1) = \sigma(X\beta)$ |
| Minimises | squared error | log loss |
| A coefficient is | the change in $y$ per unit of $x$ | the change in **log-odds** per unit of $x$ |

$e^\beta$ is an **odds** ratio. With $\beta = 0.7$, $e^{0.7} = 2.01$, so one more unit of $x$ about doubles the odds, not the probability.
`,lessons:["d3-linear-regression","d3-logistic-mle"],practice:["d7-py-hard"],verify:g(h`
import math
result = round(math.exp(0.7), 2)
`,2.01)},{kind:"reference",id:"trees-ensembles",title:"Trees, random forests and boosting",when:"The usual choices for tabular data.",keywords:["decision tree","XGBoost","LightGBM","gradient boosting","bagging","ensemble","Gini","splits"],body:e`
- **Decision tree:** splits the data with yes/no rules. It's easy to read, but has high variance: slightly different data can give a very different tree.
- **Random forest:** averages many deep trees, each on a random sample of rows and features. It's a strong default with little tuning, and it reduces variance but not bias.
- **Gradient boosting:** adds shallow trees one at a time, each fixing the errors so far. It's usually the most accurate on tabular data, but overfits without early stopping.
`,lessons:["d6-predictive-models"]},{kind:"reference",id:"k-means",title:"k-means",when:"Group similar rows when there are no labels.",keywords:["clustering","centroid","elbow","silhouette","segmentation","unsupervised","standardise"],body:e`
1. Pick $k$ starting centres.
2. Assign each point to its nearest centre.
3. Move each centre to the mean of its points.
4. Repeat until nothing changes.

- Standardise the features first, or the one with the largest scale dominates.
- Choose $k$ with the elbow or silhouette score, and by whether the groups are useful.
- It finds a local optimum, so run it from several starts.

The points 1, 2, 9 and 10 with $k = 2$ settle at centres of 1.5 and 9.5.
`,lessons:["d7-clustering"],verify:g(h`
import numpy as np
xs = np.array([1.0, 2.0, 9.0, 10.0])
centres = np.array([1.0, 2.0])
for _ in range(10):
    nearest = np.abs(xs[:, None] - centres).argmin(axis=1)
    centres = np.array([xs[nearest == i].mean() for i in range(2)])
result = sorted(centres.tolist())
`,[1.5,9.5])},{kind:"reference",id:"regularisation",title:"Regularisation",when:"Stop a model overfitting by penalising large coefficients.",keywords:["L1","L2","ridge","lasso","elastic net","lambda","penalty","shrinkage","regularization"],body:e`
| | Penalty | What it does |
|---|---|---|
| **L1 (lasso)** | $\lambda \sum_j \lvert\beta_j\rvert$ | sets some coefficients to exactly 0, so it selects features |
| **L2 (ridge)** | $\lambda \sum_j \beta_j^2$ | shrinks them all, and copes well with correlated features |

- A larger $\lambda$ means a stronger penalty and a simpler model.
- Standardise the features first, and choose $\lambda$ by cross-validation.
`,lessons:["d7-ml-refresh","d6-resampling-validation"]}]},Fe={id:"ml-metrics",title:"Metrics",cards:[{kind:"reference",id:"confusion-matrix",title:"Confusion matrix, precision and recall",when:"Score a classifier when plain accuracy would mislead you.",keywords:["TP","FP","FN","TN","true positive","false positive","F1","accuracy","imbalanced","threshold"],body:e`
| | Predicted yes | Predicted no |
|---|---|---|
| **Actually yes** | TP = 40 | FN = 20 |
| **Actually no** | FP = 10 | TN = 930 |

- **Precision** $= TP / (TP + FP) = 40/50 = 0.80$: of those flagged, how many are real.
- **Recall** $= TP / (TP + FN) = 40/60 = 0.67$: of those real, how many we caught.
- **F1** is their harmonic mean, here 0.73.
- **Accuracy** is 0.97, even though a third of the real cases were missed. That's why it misleads when positives are rare.

Raising the threshold usually raises precision and lowers recall.
`,lessons:["d6-predictive-models","d7-ml-refresh"],verify:g(h`
tp, fn, fp, tn = 40, 20, 10, 930
precision = tp / (tp + fp)
recall = tp / (tp + fn)
f1 = 2 * precision * recall / (precision + recall)
result = [round(precision, 2), round(recall, 2), round(f1, 2), round((tp + tn) / (tp + fn + fp + tn), 2), round(fn / (tp + fn), 2)]
`,[.8,.67,.73,.97,.33])},{kind:"reference",id:"roc-auc",title:"ROC AUC",when:"Score how well a model ranks, without picking a threshold.",keywords:["AUC","ROC curve","PR AUC","ranking","threshold-free","base rate"],body:e`
- ROC AUC is the probability that a random positive scores above a random negative.
- 0.5 is no better than guessing, and 1 is a perfect ranking.
- It says nothing about whether the probabilities themselves are right.
- When positives are rare, also look at **PR AUC**.

With positives scoring 0.9, 0.8 and 0.4, and negatives scoring 0.7 and 0.3, the positive wins 5 of the 6 pairs, so the AUC is 0.83.
`,lessons:["d6-predictive-models","d7-ml-refresh"],verify:g(h`
positives, negatives = [0.9, 0.8, 0.4], [0.7, 0.3]
wins = sum(p > n for p in positives for n in negatives)
pairs = len(positives) * len(negatives)
result = [wins, pairs, round(wins / pairs, 2)]
`,[5,6,.83])},{kind:"reference",id:"regression-metrics",title:"MAE, RMSE and R²",when:"Score a model that predicts a number.",keywords:["mean absolute error","root mean squared error","R squared","MAPE","error","forecast"],body:e`
| Metric | Formula | How to read it |
|---|---|---|
| **MAE** | mean of $\lvert e \rvert$ | the typical miss, in the target's units |
| **RMSE** | $\sqrt{\text{mean of } e^2}$ | also in those units, but punishes big misses more |
| **R²** | $1 - SS_{res} / SS_{tot}$ | the share of variance explained; 0 is no better than predicting the mean |

For actuals 10, 20, 30 and 40 with predictions 12, 18, 33 and 35, the MAE is 3, the RMSE is 3.24 and the R² is 0.916.
`,lessons:["d6-predictive-models","d3-linear-regression"],practice:["d6-py-hard"],verify:g(h`
import numpy as np
y = np.array([10, 20, 30, 40])
pred = np.array([12, 18, 33, 35])
e = y - pred
result = [np.abs(e).mean(), round(float(np.sqrt((e ** 2).mean())), 2), round(1 - (e ** 2).sum() / ((y - y.mean()) ** 2).sum(), 3)]
`,[3,3.24,.916])}]},We={id:"ml-validation",title:"Validating honestly",cards:[{kind:"reference",id:"cross-validation",title:"Cross-validation",when:"Get a steadier score than one split gives you.",keywords:["CV","k-fold","folds","group k-fold","rolling origin","time series split","forward chaining"],body:e`
**k-fold:** split the data into $k$ folds. Train on $k - 1$, score on the one left out, repeat so each fold has a turn, then average the scores. With 1,000 rows and 5 folds, each round trains on 800 and scores on 200.

| Your data | Use |
|---|---|
| Independent rows | k-fold |
| Many rows per user or geo | group k-fold, keeping each one in a single fold |
| A time series | rolling-origin: always train on the past and score on the future |
`,lessons:["d6-resampling-validation"],verify:g(h`
rows, k = 1000, 5
result = [rows - rows // k, rows // k]
`,[800,200])},{kind:"reference",id:"leakage",title:"Leakage",when:"The usual reason a model looks great offline and fails in production.",keywords:["data leakage","target leakage","too good","future data","preprocessing"],body:e`
Leakage is when the model trains on information it won't have at prediction time. Common causes:

- Fields filled in after the outcome, such as the cancellation reason when predicting churn.
- Scaling, imputing or target encoding fitted on all the data rather than the training folds.
- The same user or duplicate rows in both train and validation.
- Random splits on a time series.

The tell is a validation score that's too good for how hard the problem is.
`,lessons:["d7-ml-refresh","d6-resampling-validation"]}]},N=(t,i,o)=>({lang:"python",setup:o,check:{expr:t,expected:i}}),Ve=t=>N('__import__("sys").stdout.getvalue()',t),de=h`
import pandas as pd

orders = pd.DataFrame({
    "order_id": [1, 2, 3, 4, 5, 6],
    "user_id": ["u1", "u1", "u2", "u2", "u3", "u9"],
    "amount": [50, 30, 20, None, 100, 40],
    "status": ["paid", "paid", "refunded", "pending", "paid", "paid"],
})
users = pd.DataFrame({
    "user_id": ["u1", "u2", "u3", "u4"],
    "name": ["Ana", "Bo", "Cy", "Di"],
    "country": ["UK", "US", "UK", "DE"],
})
`,D=(t,i)=>N(t,i,de),Ge={id:"data-structures",title:"Data structures",cards:[{kind:"reference",id:"types-truthiness",title:"Types and truthiness",when:"The basic value types, and what counts as true in an if.",keywords:["int","float","str","bool","None","isinstance","falsy","divide","modulo","convert"],body:e`
- The basic types are \`int\`, \`float\`, \`str\`, \`bool\` and \`None\`.
- \`0\`, \`""\`, \`[]\`, \`{}\` and \`None\` are falsy. Almost everything else is truthy.
- Test for a missing value with \`x is None\`, not \`x == None\`.

\`\`\`python
isinstance(3.5, float)    # -> True
int("42") + 1             # -> 43
str(42) + "!"             # -> '42!'
7 / 2                     # -> 3.5
7 // 2                    # -> 3
7 % 2                     # -> 1
2 ** 3                    # -> 8
bool(0), bool(""), bool([]), bool(None)    # -> (False, False, False, False)
bool(1), bool("a"), bool([0])              # -> (True, True, True)
\`\`\`
`,verify:N('[isinstance(3.5, float), int("42") + 1, str(42) + "!", 7 / 2, 7 // 2, 7 % 2, 2 ** 3, (bool(0), bool(""), bool([]), bool(None)), (bool(1), bool("a"), bool([0]))]',[!0,43,"42!",3.5,3,1,8,[!1,!1,!1,!1],[!0,!0,!0]])},{kind:"reference",id:"strings",title:"Strings and f-strings",when:"Clean, split, join and format text.",keywords:["split","join","strip","replace","lower","upper","startswith","format","percent","text"],body:e`
- Strings can't be changed in place, so each method returns a new string.
- In an f-string, \`:.2f\` sets the decimal places, \`:.1%\` shows a percentage and \`:,\` adds thousands separators.

\`\`\`python
s = " Ana,Bo,Cy "
s.strip()               # -> 'Ana,Bo,Cy'
s.strip().split(",")    # -> ['Ana', 'Bo', 'Cy']
"-".join(["a", "b"])    # -> 'a-b'
"Ana".upper()           # -> 'ANA'
"Ana".replace("a", "o") # -> 'Ano'
"na" in "Ana"           # -> True

x = 0.1234
f"x is {x:.2f}"         # -> 'x is 0.12'
f"{x:.1%}"              # -> '12.3%'
f"{1234567:,}"          # -> '1,234,567'
\`\`\`
`,lessons:["py1-foundations"],verify:N('[s.strip(), s.strip().split(","), "-".join(["a", "b"]), "Ana".upper(), "Ana".replace("a", "o"), "na" in "Ana", f"x is {x:.2f}", f"{x:.1%}", f"{1234567:,}"]',["Ana,Bo,Cy",["Ana","Bo","Cy"],"a-b","ANA","Ano",!0,"x is 0.12","12.3%","1,234,567"])},{kind:"reference",id:"lists",title:"Lists and slicing",when:"An ordered collection you can change.",keywords:["append","pop","sort","sorted","slice","index","reverse","copy","array"],body:e`
- A slice is \`xs[start:stop:step]\`, and \`stop\` is excluded. Indexes start at 0, and negative ones count from the end.
- \`sorted(xs)\` returns a new list. \`xs.sort()\` changes \`xs\` and returns \`None\`.
- \`ys = xs\` doesn't copy the list: both names point at the same one. Use \`xs.copy()\` to get a copy.

\`\`\`python
xs = [30, 10, 20]
xs[0], xs[-1]          # -> (30, 20)
xs[:2]                 # -> [30, 10]
xs[1:]                 # -> [10, 20]
xs[::-1]               # -> [20, 10, 30]
sorted(xs)             # -> [10, 20, 30]
xs + [5]               # -> [30, 10, 20, 5]
20 in xs               # -> True
xs.append(40)
last = xs.pop()        # -> 40
\`\`\`
`,lessons:["py1-foundations"],verify:N("[(xs[0], xs[-1]), xs[:2], xs[1:], xs[::-1], sorted(xs), xs + [5], 20 in xs, last]",[[30,20],[30,10],[10,20],[20,10,30],[10,20,30],[30,10,20,5],!0,40])},{kind:"reference",id:"tuples",title:"Tuples and unpacking",when:"A fixed group of values, often returned from a function.",keywords:["unpack","swap","immutable","multiple return","star"],body:e`
- A tuple is like a list that can't change, so \`point[0] = 9\` raises a \`TypeError\`.
- Because it can't change, a tuple can be a dict key, and a list can't.
- A one-item tuple needs a trailing comma: \`(1,)\`.

\`\`\`python
point = (3, 4)
point[0]               # -> 3
x, y = point
y                      # -> 4

a, b = 1, 2
a, b = b, a
a, b                   # -> (2, 1)

first, *rest = [1, 2, 3]
rest                   # -> [2, 3]
\`\`\`
`,lessons:["py2-functions-pandas"],verify:N("[point[0], y, (a, b), rest]",[3,4,[2,1],[2,3]])},{kind:"reference",id:"dictionaries",title:"Dictionaries",when:"Look up a value by its key.",keywords:["dict","get","keys","values","items","KeyError","hash map","lookup","loop over a dict","count"],body:e`
- \`d["z"]\` raises a \`KeyError\` if the key is missing. \`d.get("z", 0)\` returns the default instead.
- Looping over a dict gives its keys. Use \`.items()\` for keys and values together.
- Keys keep the order they were added in.

\`\`\`python
d = {"a": 1, "b": 2}
d["a"]                 # -> 1
d.get("z", 0)          # -> 0
"a" in d               # -> True
list(d.keys())         # -> ['a', 'b']
list(d.items())        # -> [('a', 1), ('b', 2)]
d["c"] = 3             # add or overwrite
del d["c"]

counts = {}
for word in ["x", "y", "x"]:
    counts[word] = counts.get(word, 0) + 1
counts                 # -> {'x': 2, 'y': 1}
\`\`\`
`,lessons:["py1-foundations"],practice:["d1-py-easy-1"],verify:N('[d["a"], d.get("z", 0), "a" in d, list(d.keys()), list(d.items()), counts]',[1,0,!0,["a","b"],[["a",1],["b",2]],{x:2,y:1}])},{kind:"reference",id:"sets",title:"Sets",when:"Keep unique values, and check membership fast.",keywords:["unique","distinct","intersection","union","difference","membership","dedupe"],body:e`
- Sets have no order, so don't rely on the order they print in.
- \`x in a_set\` is O(1), while \`x in a_list\` scans the whole list.
- Add with \`a.add(x)\`. An empty set is \`set()\`, because \`{}\` is an empty dict.

\`\`\`python
a = {"u1", "u2", "u4"}
b = {"u1", "u4", "u5"}
a & b                  # -> {'u1', 'u4'}
a | b                  # -> {'u1', 'u2', 'u4', 'u5'}
a - b                  # -> {'u2'}
"u2" in a              # -> True
len(set([1, 1, 2]))    # -> 2
\`\`\`
`,lessons:["py1-foundations"],practice:["d3-py-easy-2"],verify:N('[sorted(a & b), sorted(a | b), sorted(a - b), "u2" in a, len(set([1, 1, 2]))]',[["u1","u4"],["u1","u2","u4","u5"],["u2"],!0,2])}]},He={id:"control-flow",title:"Control flow",cards:[{kind:"reference",id:"if-else",title:"if, elif and else",when:"Run different code depending on a condition.",keywords:["conditional","ternary","and","or","not","indent","compare"],body:e`
- Combine conditions with \`and\`, \`or\` and \`not\`.
- Python checks the branches in order and runs only the first that's true.
- The body is set by its indent, so keep it at 4 spaces.

\`\`\`python
amount = 30
if amount is None:
    size = "missing"
elif amount >= 50:
    size = "big"
else:
    size = "small"
size                                     # -> 'small'

"even" if amount % 2 == 0 else "odd"     # -> 'even'
0 < amount <= 30                         # -> True
\`\`\`
`,verify:N('[size, "even" if amount % 2 == 0 else "odd", 0 < amount <= 30]',["small","even",!0])},{kind:"reference",id:"for-loops",title:"for loops",when:"Do something once per item.",keywords:["range","enumerate","zip","items","iterate","index","loop over a list","loop over a dict"],body:e`
- \`range(stop)\` or \`range(start, stop, step)\`. The \`stop\` is excluded.
- Use \`enumerate\` when you need the position too, rather than \`range(len(xs))\`.
- \`zip\` walks two lists together and stops at the end of the shorter one.

\`\`\`python
names = ["Ana", "Bo"]
ages = [30, 25]

for i in range(3):
    print(i)                # -> 0, 1, 2
for i, name in enumerate(names):
    print(i, name)          # -> 0 Ana, 1 Bo
for name, age in zip(names, ages):
    print(name, age)        # -> Ana 30, Bo 25
for key, value in {"a": 1, "b": 2}.items():
    print(key, value)       # -> a 1, b 2
\`\`\`
`,lessons:["py1-foundations"],practice:["d6-py-easy-2"],verify:Ve(`0
1
2
0 Ana
1 Bo
Ana 30
Bo 25
a 1
b 2
`)},{kind:"reference",id:"while-loops",title:"while, break and continue",when:"Loop until a condition changes, or leave a loop early.",keywords:["skip","exit loop","infinite loop","stop early"],body:e`
- \`while\` repeats until its condition is false, so make sure something in the loop changes it.
- \`break\` leaves the loop. \`continue\` skips to the next pass. Both work in \`for\` loops too.

\`\`\`python
n = 1
while n < 20:
    n *= 2
n                      # -> 32

seen = []
for x in [1, 2, 3, 4, 5]:
    if x == 2:
        continue
    if x == 4:
        break
    seen.append(x)
seen                   # -> [1, 3]
\`\`\`
`,verify:N("[n, seen]",[32,[1,3]])},{kind:"reference",id:"comprehensions",title:"Comprehensions",when:"Build a list, dict or set from a loop in one line.",keywords:["list comprehension","dict comprehension","set comprehension","generator","filter","map"],body:e`
- The shape is \`[value for item in items if condition]\`.
- An \`if\` at the end filters items. An \`if ... else\` at the front picks a value for each one.
- Inside \`sum()\` or \`max()\` you can drop the square brackets.
- If it gets hard to read, write the loop instead.

\`\`\`python
xs = [1, 2, 3, 4]
[x ** 2 for x in xs]                      # -> [1, 4, 9, 16]
[x for x in xs if x % 2 == 0]             # -> [2, 4]
["even" if x % 2 == 0 else "odd" for x in xs]
# -> ['odd', 'even', 'odd', 'even']
{x: x ** 2 for x in xs if x < 3}          # -> {1: 1, 2: 4}
{x % 2 for x in xs}                       # -> {0, 1}
sum(x for x in xs if x > 2)               # -> 7
\`\`\`
`,lessons:["py1-foundations"],verify:N('[[x ** 2 for x in xs], [x for x in xs if x % 2 == 0], ["even" if x % 2 == 0 else "odd" for x in xs], {x: x ** 2 for x in xs if x < 3}, sorted({x % 2 for x in xs}), sum(x for x in xs if x > 2)]',[[1,4,9,16],[2,4],["odd","even","odd","even"],{1:1,2:4},[0,1],7])}]},ze={id:"functions",title:"Functions and errors",cards:[{kind:"reference",id:"function-basics",title:"Functions and default arguments",when:"Name a step so you can reuse it.",keywords:["def","return","keyword argument","docstring","args","kwargs","mutable default"],body:e`
- \`return\` hands a value back, and \`print\` only shows it. With no \`return\`, a function returns \`None\`.
- Arguments with defaults go after those without.
- Return several values with a comma, then unpack them: \`low, high = min_max(xs)\`.
- Don't write \`def f(xs=[])\`, because every call shares that one list. Default to \`None\` and create the list inside.

\`\`\`python
def rate(wins, total, default=0.0):
    """Return wins / total, or default when total is 0."""
    if total == 0:
        return default
    return wins / total

rate(1, 4)                  # -> 0.25
rate(1, 0)                  # -> 0.0
rate(1, 0, default=None)    # -> None
\`\`\`
`,lessons:["py2-functions-pandas"],practice:["d7-py-easy-1"],verify:N("[rate(1, 4), rate(1, 0), rate(1, 0, default=None)]",[.25,0,null])},{kind:"reference",id:"lambda-sorted",title:"lambda and sorted(key=)",when:"Sort or pick items by a computed value.",keywords:["sort","key","reverse","tie break","max","min","anonymous function","top n"],body:e`
- \`key\` is a function called once per item, and items are compared by what it returns.
- \`lambda p: p[1]\` is a one-line function with no name.
- A tuple key breaks ties, and \`-\` flips a number to sort it descending.
- \`min\` and \`max\` take \`key\` too.

\`\`\`python
people = [("Bo", 20), ("Ana", 50), ("Cy", 20)]
sorted(people, key=lambda p: p[1])
# -> [('Bo', 20), ('Cy', 20), ('Ana', 50)]
sorted(people, key=lambda p: (-p[1], p[0]))
# -> [('Ana', 50), ('Bo', 20), ('Cy', 20)]
max(people, key=lambda p: p[1])          # -> ('Ana', 50)
sorted(["bb", "a", "ccc"], key=len)      # -> ['a', 'bb', 'ccc']
\`\`\`
`,lessons:["py1-foundations"],practice:["d5-py-easy-2"],verify:N('[sorted(people, key=lambda p: p[1]), sorted(people, key=lambda p: (-p[1], p[0])), max(people, key=lambda p: p[1]), sorted(["bb", "a", "ccc"], key=len)]',[[["Bo",20],["Cy",20],["Ana",50]],[["Ana",50],["Bo",20],["Cy",20]],["Ana",50],["a","bb","ccc"]])},{kind:"reference",id:"try-except",title:"try and except",when:"Handle an error you expect, instead of crashing.",keywords:["exception","error","raise","ValueError","KeyError","finally","catch"],body:e`
- Catch the specific error you expect. A bare \`except:\` hides real bugs.
- \`finally\` always runs, which suits clean-up.
- Raise your own with \`raise ValueError("amount must be positive")\`.

\`\`\`python
def to_number(text):
    try:
        return float(text)
    except ValueError:
        return None

to_number("3.5")       # -> 3.5
to_number("n/a")       # -> None
\`\`\`
`,verify:N('[to_number("3.5"), to_number("n/a")]',[3.5,null])}]},Ye={id:"handy-tools",title:"Handy tools",cards:[{kind:"reference",id:"built-ins",title:"Handy built-ins",when:"One-liners worth knowing before you write a loop.",keywords:["len","sum","min","max","round","abs","any","all","map","reversed","enumerate","zip","range"],body:e`
\`range\`, \`reversed\`, \`zip\`, \`enumerate\` and \`map\` produce items one at a time, so wrap them in \`list()\` to see them all.

\`\`\`python
xs = [3, 1, 2]
len(xs), sum(xs), min(xs), max(xs)    # -> (3, 6, 1, 3)
round(3.14159, 2)                     # -> 3.14
abs(-2)                               # -> 2
any(x > 2 for x in xs)                # -> True
all(x > 2 for x in xs)                # -> False
list(reversed(xs))                    # -> [2, 1, 3]
list(map(str, xs))                    # -> ['3', '1', '2']
list(enumerate("ab"))                 # -> [(0, 'a'), (1, 'b')]
dict(zip("ab", [1, 2]))               # -> {'a': 1, 'b': 2}
\`\`\`
`,verify:N('[(len(xs), sum(xs), min(xs), max(xs)), round(3.14159, 2), abs(-2), any(x > 2 for x in xs), all(x > 2 for x in xs), list(reversed(xs)), list(map(str, xs)), list(enumerate("ab")), dict(zip("ab", [1, 2]))]',[[3,6,1,3],3.14,2,!0,!1,[2,1,3],["3","1","2"],[[0,"a"],[1,"b"]],{a:1,b:2}])},{kind:"reference",id:"counter-defaultdict",title:"Counter and defaultdict",when:"Count and group things without checking whether the key exists.",keywords:["collections","most_common","group","frequency","standard library"],body:e`
- \`collections\` ships with Python, so you can use it even when pandas isn't available.
- \`Counter\` returns 0 for a missing key instead of raising an error.
- \`defaultdict(list)\` starts a missing key with an empty list. \`int\` and \`float\` start it at 0.

\`\`\`python
from collections import Counter, defaultdict

counts = Counter(["a", "b", "a"])
counts["a"], counts["z"]        # -> (2, 0)
counts.most_common(1)           # -> [('a', 2)]

groups = defaultdict(list)
for user, amount in [("u1", 50), ("u2", 20), ("u1", 30)]:
    groups[user].append(amount)
dict(groups)                    # -> {'u1': [50, 30], 'u2': [20]}
\`\`\`
`,lessons:["py1-foundations"],practice:["d1-py-easy-2"],verify:N('[(counts["a"], counts["z"]), counts.most_common(1), dict(groups)]',[[2,0],[["a",2]],{u1:[50,30],u2:[20]}])}]},je={id:"numpy",title:"numpy",cards:[{kind:"reference",id:"numpy-arrays",title:"Arrays and masks",when:"Do maths on a whole column of numbers without a loop.",keywords:["np","array","vectorised","boolean mask","where","mean","std","filter"],body:e`
- Arithmetic applies to each element. \`+\` adds arrays, but it joins lists.
- A comparison gives a mask of True and False, which you can use to filter. The mean of a mask is the share that's True.
- Combine masks with \`&\` and \`|\`, with brackets around each one. \`and\` and \`or\` raise an error.
- \`a.std()\` is the population SD. Pass \`ddof=1\` for the sample SD.

\`\`\`python
import numpy as np

a = np.array([10, 20, 30, 40])
a * 2                     # -> array([20, 40, 60, 80])
a.sum(), a.mean()         # -> (100, 25.0)
a > 15                    # -> array([False,  True,  True,  True])
a[a > 15]                 # -> array([20, 30, 40])
a[(a > 15) & (a < 40)]    # -> array([20, 30])
(a > 15).mean()           # -> 0.75
np.where(a > 15, 1, 0)    # -> array([0, 1, 1, 1])
\`\`\`
`,lessons:["py3-combine-reshape-numpy"],practice:["d4-py-easy-2"],verify:N("[a * 2, (a.sum(), a.mean()), a > 15, a[a > 15], a[(a > 15) & (a < 40)], (a > 15).mean(), np.where(a > 15, 1, 0)]",[[20,40,60,80],[100,25],[!1,!0,!0,!0],[20,30,40],[20,30],.75,[0,1,1,1]])}]},Qe={id:"pandas",title:"pandas",cards:[{kind:"reference",id:"sample-frames",title:"The DataFrames on this page",when:"Every pandas example below runs against these two tables.",keywords:["DataFrame","create","example data","pd"],body:e`
- These match the tables on the SQL page, without \`order_date\`.
- \`amount\` has a missing value, so pandas stores the whole column as floats. That's why results below show \`50.0\` rather than \`50\`.

\`\`\`python
${de}
\`\`\`
`,verify:D("[orders.shape, users.shape]",[[6,4],[4,3]])},{kind:"reference",id:"pandas-inspect",title:"Inspect a DataFrame",when:"A first look at a table you've just loaded.",keywords:["head","info","describe","shape","columns","dtype","value_counts","nunique","read_csv"],body:e`
| You write | You see |
|---|---|
| \`pd.read_csv("file.csv")\` | a file loaded as a DataFrame |
| \`df.head()\` | the first 5 rows |
| \`df.info()\` | each column's type and non-missing count |
| \`df.describe()\` | count, mean, SD and quartiles for numeric columns |

\`\`\`python
orders.shape                     # -> (6, 4)
list(orders.columns)
# -> ['order_id', 'user_id', 'amount', 'status']
str(orders["amount"].dtype)      # -> 'float64'
orders["user_id"].nunique()      # -> 4
orders["status"].value_counts().to_dict()
# -> {'paid': 4, 'refunded': 1, 'pending': 1}
\`\`\`
`,lessons:["py2-functions-pandas"],verify:D('[orders.shape, list(orders.columns), str(orders["amount"].dtype), orders["user_id"].nunique(), orders["status"].value_counts().to_dict()]',[[6,4],["order_id","user_id","amount","status"],"float64",4,{paid:4,refunded:1,pending:1}])},{kind:"reference",id:"pandas-select",title:"Select, filter and sort",when:"Pick columns, keep rows and order them: pandas' SELECT, WHERE and ORDER BY.",keywords:["loc","iloc","mask","isin","sort_values","column","series","boolean"],body:e`
- \`df["a"]\` gives one column as a Series. \`df[["a", "b"]]\` gives a DataFrame.
- Combine conditions with \`&\`, \`|\` and \`~\`, with brackets around each one. \`and\` raises an error.
- \`.loc\` selects by label or mask, and \`.iloc\` selects by position.

\`\`\`python
orders[["order_id", "amount"]].shape       # -> (6, 2)
paid = orders[orders["status"] == "paid"]
paid["order_id"].tolist()                  # -> [1, 2, 5, 6]
big = orders[(orders["status"] == "paid") & (orders["amount"] >= 50)]
big["order_id"].tolist()                   # -> [1, 5]
orders[orders["user_id"].isin(["u1", "u3"])].shape[0]     # -> 3
orders.loc[orders["amount"] > 40, "user_id"].tolist()     # -> ['u1', 'u3']
orders.iloc[0]["status"]                   # -> 'paid'
orders.sort_values("amount", ascending=False)["order_id"].tolist()[:2]    # -> [5, 1]
\`\`\`
`,lessons:["py2-functions-pandas"],practice:["d2-py-easy-1"],verify:D('[orders[["order_id", "amount"]].shape, paid["order_id"].tolist(), big["order_id"].tolist(), orders[orders["user_id"].isin(["u1", "u3"])].shape[0], orders.loc[orders["amount"] > 40, "user_id"].tolist(), orders.iloc[0]["status"], orders.sort_values("amount", ascending=False)["order_id"].tolist()[:2]]',[[6,2],[1,2,5,6],[1,5],3,["u1","u3"],"paid",[5,1]])},{kind:"reference",id:"pandas-new-columns",title:"New columns",when:"Add or change a column, with no loop over the rows.",keywords:["assign","where","map","apply","rename","drop","str","computed column"],body:e`
- Arithmetic on a column applies to every row.
- Rename with \`df.rename(columns={"a": "b"})\` and remove with \`df.drop(columns=["a"])\`. Both return a new DataFrame.
- Text methods live under \`.str\`.
- \`.apply\` runs Python once per row, so it's slow. Reach for it last.

\`\`\`python
import numpy as np

df = orders.copy()
df["double"] = df["amount"] * 2
df["double"].tolist()[:2]            # -> [100.0, 60.0]
df["is_paid"] = df["status"] == "paid"
df["is_paid"].sum()                  # -> 4
df["size"] = np.where(df["amount"] >= 50, "big", "small")
df["size"].tolist()[:2]              # -> ['big', 'small']
df["code"] = df["status"].map({"paid": 1, "refunded": 0, "pending": 0})
df["code"].tolist()                  # -> [1, 1, 0, 0, 1, 1]
df["status"].str.upper().tolist()[:1]    # -> ['PAID']
\`\`\`
`,lessons:["py2-functions-pandas"],verify:D('[df["double"].tolist()[:2], df["is_paid"].sum(), df["size"].tolist()[:2], df["code"].tolist(), df["status"].str.upper().tolist()[:1]]',[[100,60],4,["big","small"],[1,1,0,0,1,1],["PAID"]])},{kind:"reference",id:"pandas-groupby",title:"groupby",when:"One result per group: pandas' GROUP BY.",keywords:["agg","aggregate","sum","count","size","as_index","per group","named aggregation"],body:e`
- \`as_index=False\` keeps the group as a normal column.
- \`"count"\` skips missing values, and \`"size"\` counts every row.
- The \`sum\` of only missing values is 0 here, as with \`pending\` below. In SQL it's NULL.

\`\`\`python
orders.groupby("user_id")["amount"].sum().to_dict()
# -> {'u1': 80.0, 'u2': 20.0, 'u3': 100.0, 'u9': 40.0}

summary = orders.groupby("status", as_index=False).agg(
    n_orders=("order_id", "count"),
    total=("amount", "sum"),
)
summary.values.tolist()
# -> [['paid', 4, 220.0], ['pending', 1, 0.0], ['refunded', 1, 20.0]]
\`\`\`
`,lessons:["py2-functions-pandas"],practice:["d2-py-medium-1"],verify:D('[orders.groupby("user_id")["amount"].sum().to_dict(), summary.values.tolist()]',[{u1:80,u2:20,u3:100,u9:40},[["paid",4,220],["pending",1,0],["refunded",1,20]]])},{kind:"reference",id:"pandas-merge",title:"merge and concat",when:"Combine tables: pandas' JOIN and UNION ALL.",keywords:["join","left join","inner join","outer join","how","on","left_on","right_on","indicator","union","stack","append"],body:e`
- \`how\` is \`"inner"\` by default, or \`"left"\`, \`"right"\` or \`"outer"\`.
- Use \`left_on=\` and \`right_on=\` when the key names differ.
- A key that matches several rows comes back once per match, so compare row counts after a merge.
- \`pd.concat([a, b])\` stacks tables on top of each other, like \`UNION ALL\`.

\`\`\`python
len(orders.merge(users, on="user_id"))                  # -> 5
len(users.merge(orders, on="user_id", how="outer"))     # -> 7

left = users.merge(orders, on="user_id", how="left")
len(left)                                               # -> 6
left[left["order_id"].isna()]["name"].tolist()          # -> ['Di']

len(pd.concat([users, users]))                          # -> 8
\`\`\`
`,lessons:["py3-combine-reshape-numpy"],practice:["d3-py-medium-2"],verify:D('[len(orders.merge(users, on="user_id")), len(users.merge(orders, on="user_id", how="outer")), len(left), left[left["order_id"].isna()]["name"].tolist(), len(pd.concat([users, users]))]',[5,7,6,["Di"],8])},{kind:"reference",id:"pandas-missing",title:"Missing values",when:"Find, drop and fill NaN.",keywords:["NaN","null","isna","notna","dropna","fillna","None"],body:e`
- pandas shows a missing number as \`NaN\`. \`x == np.nan\` is never true, so use \`.isna()\`.
- \`sum\` and \`mean\` skip \`NaN\`. Filling with 0 first changes the mean, as below.

\`\`\`python
orders["amount"].isna().sum()              # -> 1
orders["amount"].count(), len(orders)      # -> (5, 6)
orders.dropna(subset=["amount"]).shape[0]  # -> 5
orders["amount"].fillna(0).tolist()
# -> [50.0, 30.0, 20.0, 0.0, 100.0, 40.0]
orders["amount"].mean()                    # -> 48.0
orders["amount"].fillna(0).mean()          # -> 40.0
\`\`\`
`,lessons:["py6-time-series-pandas"],practice:["d2-py-medium-2"],verify:D('[orders["amount"].isna().sum(), (orders["amount"].count(), len(orders)), orders.dropna(subset=["amount"]).shape[0], orders["amount"].fillna(0).tolist(), orders["amount"].mean(), orders["amount"].fillna(0).mean()]',[1,[5,6],5,[50,30,20,0,100,40],48,40])}]},le={name:"users",columns:["user_id","name","country"],rows:[["u1","Ana","UK"],["u2","Bo","US"],["u3","Cy","UK"],["u4","Di","DE"]]},ce={name:"orders",columns:["order_id","user_id","amount","status","order_date"],rows:[[1,"u1",50,"paid","2026-01-05"],[2,"u1",30,"paid","2026-01-20"],[3,"u2",20,"refunded","2026-01-22"],[4,"u2",null,"pending","2026-02-01"],[5,"u3",100,"paid","2026-02-03"],[6,"u9",40,"paid","2026-02-10"]]},ee=({name:t,columns:i,rows:o})=>[`**\`${t}\`**`,"",`| ${i.join(" | ")} |`,`|${i.map(()=>"---").join("|")}|`,...o.map(u=>`| ${u.map(d=>d??"NULL").join(" | ")} |`)].join(`
`),S=(t,i,o=!1)=>({lang:"sql",tables:[le,ce],expectedOutput:{kind:"table",columns:t,rows:i,ordered:o}}),Ke={id:"reading-data",title:"Reading data",cards:[{kind:"reference",id:"sample-tables",title:"The tables on this page",when:"Every example below runs against these two tables.",keywords:["schema","example data"],body:`${ee(le)}

${ee(ce)}`},{kind:"reference",id:"select",title:"SELECT and DISTINCT",when:"Choose columns, rename them, and drop duplicates.",keywords:["alias","AS","columns","unique"],body:e`
- \`AS\` renames a column in the result.
- \`SELECT *\` returns every column. It's fine for a quick look, but BigQuery bills by the columns it reads.
- \`DISTINCT\` applies to the whole row, not just the first column.

\`\`\`sql
SELECT DISTINCT country AS market
FROM users;
\`\`\`
`,verify:S(["market"],[["UK"],["US"],["DE"]])},{kind:"reference",id:"where",title:"WHERE",when:"Keep only the rows you want.",keywords:["filter","AND","OR","IN","BETWEEN","LIKE","IS NULL"],body:e`
| You write | It means |
|---|---|
| \`=\`, \`<>\`, \`<\`, \`>=\` | compare |
| \`AND\`, \`OR\`, \`NOT\` | combine; put brackets around \`OR\` |
| \`IN ('a', 'b')\` | any of these |
| \`BETWEEN 10 AND 50\` | a range, including both ends |
| \`LIKE 'a%'\` | a pattern: \`%\` is any run of characters, \`_\` is one |
| \`IS NULL\`, \`IS NOT NULL\` | missing or present; \`= NULL\` never matches |

\`\`\`sql
SELECT order_id, amount
FROM orders
WHERE status = 'paid' AND amount BETWEEN 40 AND 60;
\`\`\`
`,practice:["d1-sql-easy-1"],verify:S(["order_id","amount"],[[1,50],[6,40]])},{kind:"reference",id:"order-by-limit",title:"ORDER BY and LIMIT",when:"Sort the result, then keep the first few rows.",keywords:["sort","top","ASC","DESC"],body:e`
- Ascending is the default; add \`DESC\` for largest first.
- Without \`ORDER BY\`, row order isn't guaranteed, so \`LIMIT\` alone gives you arbitrary rows.
- Add a second sort column to break ties: \`ORDER BY amount DESC, order_id\`.

\`\`\`sql
SELECT order_id, amount
FROM orders
WHERE amount IS NOT NULL
ORDER BY amount DESC
LIMIT 2;
\`\`\`
`,practice:["d2-sql-easy-2"],verify:S(["order_id","amount"],[[5,100],[1,50]],!0)},{kind:"reference",id:"clause-order",title:"Clause order",when:"The order you write a query in is not the order it runs in.",keywords:["execution order","alias in where","skeleton"],body:e`
The comments show the run order. \`SELECT\` runs late, so its aliases don't exist yet in \`WHERE\`, but \`ORDER BY\` can use them.

\`\`\`sql
SELECT country, COUNT(*) AS n    -- 5
FROM users                       -- 1
WHERE country <> 'DE'            -- 2
GROUP BY country                 -- 3
HAVING COUNT(*) >= 1             -- 4
ORDER BY n DESC, country         -- 6
LIMIT 1;                         -- 7
\`\`\`
`,verify:S(["country","n"],[["UK",2]],!0)}]},Xe={id:"summarising",title:"Summarising",cards:[{kind:"reference",id:"aggregates",title:"COUNT, SUM, AVG, MIN, MAX",when:"Collapse many rows into one number.",keywords:["aggregate","count distinct","average","total"],body:e`
- \`COUNT(*)\` counts rows. \`COUNT(col)\` skips NULLs. \`COUNT(DISTINCT col)\` counts unique non-NULL values.
- \`SUM\` and \`AVG\` skip NULLs too, so the average below divides by 5, not 6.

\`\`\`sql
SELECT
  COUNT(*) AS n_rows,
  COUNT(amount) AS n_amounts,
  COUNT(DISTINCT user_id) AS n_users,
  SUM(amount) AS total,
  AVG(amount) AS mean,
  MAX(amount) AS largest
FROM orders;
\`\`\`
`,practice:["d1-sql-easy-2"],verify:S(["n_rows","n_amounts","n_users","total","mean","largest"],[[6,5,4,240,48,100]])},{kind:"reference",id:"group-by",title:"GROUP BY",when:"One result row per group.",keywords:["per user","per group","aggregate"],body:e`
Every \`SELECT\` column must either be in the \`GROUP BY\` or inside an aggregate.

\`\`\`sql
SELECT user_id, COUNT(*) AS n_orders, SUM(amount) AS total
FROM orders
GROUP BY user_id;
\`\`\`
`,practice:["d1-sql-easy-1","d2-sql-easy-1"],verify:S(["user_id","n_orders","total"],[["u1",2,80],["u2",2,20],["u3",1,100],["u9",1,40]])},{kind:"reference",id:"having",title:"HAVING vs WHERE",when:"Two filters that run at different points.",keywords:["filter groups","filter aggregate"],body:e`
\`WHERE\` filters rows before grouping. \`HAVING\` filters groups after it.

\`\`\`sql
SELECT user_id, SUM(amount) AS total
FROM orders
WHERE status = 'paid'
GROUP BY user_id
HAVING SUM(amount) >= 50;
\`\`\`
`,practice:["d1-sql-easy-2"],verify:S(["user_id","total"],[["u1",80],["u3",100]])}]},Je={id:"combining",title:"Combining tables",cards:[{kind:"reference",id:"joins",title:"Joins",when:"Add columns from another table by matching rows.",keywords:["inner join","left join","right join","full outer join","cross join","ON"],body:e`
| Join | Keeps |
|---|---|
| \`INNER JOIN\` (or plain \`JOIN\`) | only rows that match in both tables |
| \`LEFT JOIN\` | every left row, with NULLs where there's no match |
| \`RIGHT JOIN\` | every right row, with NULLs where there's no match |
| \`FULL JOIN\` | every row from both tables |
| \`CROSS JOIN\` | every combination of rows, with no \`ON\` |

A row matching several rows comes back once per match, so Ana appears twice below. Di has no orders, so a \`LEFT JOIN\` keeps Di with a NULL.

\`\`\`sql
SELECT u.name, o.order_id
FROM users AS u
LEFT JOIN orders AS o ON u.user_id = o.user_id;
\`\`\`
`,practice:["d2-sql-medium-3"],verify:S(["name","order_id"],[["Ana",1],["Ana",2],["Bo",3],["Bo",4],["Cy",5],["Di",null]])},{kind:"reference",id:"find-missing",title:"Find rows with no match",when:"Which users have never ordered?",keywords:["anti join","not exists","missing"],body:e`
\`LEFT JOIN\`, then keep the rows where the right side came back NULL.

\`\`\`sql
SELECT u.name
FROM users AS u
LEFT JOIN orders AS o ON u.user_id = o.user_id
WHERE o.order_id IS NULL;
\`\`\`
`,verify:S(["name"],[["Di"]])},{kind:"reference",id:"union",title:"UNION ALL and UNION DISTINCT",when:"Stack results on top of each other. Joins add columns; unions add rows.",keywords:["stack","append","combine rows"],body:e`
- Both queries need the same number of columns, with compatible types, in the same order.
- \`UNION ALL\` keeps duplicates, so it would return 6 rows here. \`UNION DISTINCT\` removes them.
- BigQuery makes you pick one. Elsewhere, plain \`UNION\` means \`UNION DISTINCT\`.

\`\`\`sql
SELECT user_id FROM orders WHERE status = 'paid'
UNION DISTINCT
SELECT user_id FROM users WHERE country = 'UK';
\`\`\`
`,practice:["d4-sql-easy-2"],verify:S(["user_id"],[["u1"],["u3"],["u9"]])},{kind:"reference",id:"subquery",title:"Subqueries",when:"A query inside a query, often to filter on another table.",keywords:["nested query","IN"],body:e`
\`\`\`sql
SELECT name
FROM users
WHERE user_id IN (SELECT user_id FROM orders WHERE status = 'paid');
\`\`\`
`,verify:S(["name"],[["Ana"],["Cy"]])},{kind:"reference",id:"cte",title:"CTEs (WITH)",when:"Name a step and read the query top to bottom. Usually clearer than nesting.",keywords:["with","common table expression","pipeline"],body:e`
Chain several with commas: \`WITH a AS (...), b AS (...) SELECT ...\`. Each step can use the ones before it.

\`\`\`sql
WITH user_totals AS (
  SELECT user_id, SUM(amount) AS total
  FROM orders
  GROUP BY user_id
)
SELECT u.name, t.total
FROM user_totals AS t
JOIN users AS u ON u.user_id = t.user_id
ORDER BY t.total DESC;
\`\`\`
`,practice:["d4-sql-easy-1"],verify:S(["name","total"],[["Cy",100],["Ana",80],["Bo",20]],!0)}]},Ze={id:"values",title:"Changing values",cards:[{kind:"reference",id:"case-when",title:"CASE WHEN",when:"SQL's if/else.",keywords:["if","else","bucket","conditional"],body:e`
- The first matching \`WHEN\` wins, so order matters.
- A NULL fails every comparison and lands in \`ELSE\`, like order 4 below.
- With no \`ELSE\`, unmatched rows get NULL. So \`COUNT(CASE WHEN status = 'paid' THEN 1 END)\` counts paid orders.

\`\`\`sql
SELECT
  order_id,
  CASE
    WHEN amount >= 50 THEN 'big'
    WHEN amount >= 30 THEN 'medium'
    ELSE 'small'
  END AS size
FROM orders;
\`\`\`
`,practice:["d1-sql-medium-1","d1-sql-medium-2"],verify:S(["order_id","size"],[[1,"big"],[2,"medium"],[3,"small"],[4,"small"],[5,"big"],[6,"medium"]])},{kind:"reference",id:"coalesce-nullif",title:"NULLs: COALESCE and NULLIF",when:"NULL means unknown, and most things touching it become NULL.",keywords:["missing","IFNULL","divide by zero","SAFE_DIVIDE"],body:e`
- \`COALESCE(a, b)\` returns the first non-NULL value.
- \`NULLIF(a, b)\` returns NULL when \`a = b\`. \`x / NULLIF(y, 0)\` avoids dividing by zero, and BigQuery also has \`SAFE_DIVIDE(x, y)\`.
- \`NULL + 1\` is NULL, and \`x = NULL\` is never true.

\`\`\`sql
SELECT
  order_id,
  COALESCE(amount, 0) AS amount_or_zero,
  NULLIF(status, 'pending') AS known_status
FROM orders
WHERE order_id IN (3, 4);
\`\`\`
`,practice:["d1-sql-medium-3"],verify:S(["order_id","amount_or_zero","known_status"],[[3,20,"refunded"],[4,0,null]])},{kind:"reference",id:"strings-cast",title:"Strings and CAST",when:"Tidy text and convert types.",keywords:["upper","lower","length","concat","substr","replace","trim","convert","INT64","STRING"],body:e`
- Also handy: \`LOWER\`, \`TRIM\`, \`REPLACE(s, 'a', 'b')\`.
- \`SUBSTR\` counts from 1, not 0.
- \`CAST(x AS INT64)\`, \`CAST(x AS STRING)\`. BigQuery's \`SAFE_CAST\` returns NULL instead of failing on bad input.
- \`/\` in BigQuery always gives a decimal, so \`1 / 2\` is 0.5. In Postgres it's 0.

\`\`\`sql
SELECT
  UPPER(name) AS shout,
  LENGTH(name) AS n_chars,
  CONCAT(name, ' (', country, ')') AS label,
  SUBSTR(name, 1, 2) AS first_two,
  CAST('42' AS INT64) AS number
FROM users
WHERE user_id = 'u1';
\`\`\`
`,verify:S(["shout","n_chars","label","first_two","number"],[["ANA",3,"Ana (UK)","An",42]])},{kind:"reference",id:"dates",title:"Dates",when:"Group by month, add days, and count the gap between dates.",keywords:["DATE_TRUNC","EXTRACT","DATE_ADD","DATE_DIFF","month","year","interval"],body:e`
This is BigQuery syntax. Postgres and DuckDB write \`DATE_TRUNC('month', d)\`, with the arguments the other way round.

\`\`\`sql
SELECT
  DATE_TRUNC(order_date, MONTH) AS month,
  EXTRACT(YEAR FROM order_date) AS year,
  DATE_ADD(order_date, INTERVAL 7 DAY) AS week_later,
  DATE_DIFF(DATE '2026-02-01', order_date, DAY) AS days_until
FROM orders
WHERE order_id = 1;
\`\`\`
`,practice:["d3-sql-easy-2"],verify:{...S(["month","year","week_later","days_until"],[["2026-01-01",2026,"2026-01-12",27]]),code:`
SELECT
  CAST(DATE_TRUNC('month', d) AS DATE) AS month,
  EXTRACT(YEAR FROM d) AS year,
  CAST(d + INTERVAL 7 DAY AS DATE) AS week_later,
  DATE_DIFF('day', d, DATE '2026-02-01') AS days_until
FROM (SELECT CAST(order_date AS DATE) AS d FROM orders WHERE order_id = 1)`}}]},et={id:"first-window-functions",title:"A first look at window functions",cards:[{kind:"reference",id:"row-number",title:"ROW_NUMBER",when:"Compute across related rows while keeping every row, unlike GROUP BY.",keywords:["window","over","partition by","rank","nth"],body:e`
- \`PARTITION BY\` restarts the count for each group.
- \`ORDER BY\` inside \`OVER\` sets the order within the group.

\`\`\`sql
SELECT
  user_id,
  order_id,
  ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY order_date) AS nth_order
FROM orders;
\`\`\`
`,practice:["d2-sql-medium-2","d3-sql-easy-1"],verify:S(["user_id","order_id","nth_order"],[["u1",1,1],["u1",2,2],["u2",3,1],["u2",4,2],["u3",5,1],["u9",6,1]])},{kind:"reference",id:"running-total",title:"Running total",when:"Add up as you go.",keywords:["cumulative","window","sum over"],body:e`
\`\`\`sql
SELECT
  order_id,
  amount,
  SUM(amount) OVER (ORDER BY order_id) AS running_total
FROM orders
WHERE status = 'paid';
\`\`\`
`,practice:["d3-sql-medium-2"],verify:S(["order_id","amount","running_total"],[[1,50,50],[2,30,80],[5,100,180],[6,40,220]])}]},tt={id:"describing-data",title:"Describing data",cards:[{kind:"reference",id:"mean-median-mode",title:"Mean, median and mode",when:"Three ways to describe a typical value.",keywords:["average","skew","outlier","typical"],body:e`
| Measure | What it is | Use it when |
|---|---|---|
| Mean | sum ÷ count | values are roughly symmetric |
| Median | the middle value once sorted | data is skewed or has outliers |
| Mode | the most common value | data is categories or counts |

Revenue per user of 2, 3, 3, 4 and 38 has a mean of 10, but a median and mode of 3. One big spender pulls the mean above almost everyone.
`,lessons:["d1-distributions"],practice:["d1-py-hard"],verify:g(h`
import statistics as st
xs = [2, 3, 3, 4, 38]
result = [st.mean(xs), st.median(xs), st.mode(xs)]
`,[10,3,3])},{kind:"reference",id:"variance-sd",title:"Variance and standard deviation",when:"How spread out the values are.",keywords:["spread","std","ddof","n-1","dispersion"],body:e`
$$s^2 = \dfrac{\sum_i (x_i - \bar x)^2}{n - 1} \qquad s = \sqrt{s^2}$$

- Variance is in squared units. The SD is back in the data's own units, so it's easier to read.
- Divide by $n - 1$ for a sample and by $n$ for a whole population.
- \`np.std\` divides by $n$ by default, and pandas \`.std()\` by $n - 1$.

For 2, 4, 4, 4, 5, 5, 7 and 9, the mean is 5 and the squared gaps sum to 32. The sample variance is 32 ÷ 7 = 4.57 and the SD is 2.14. \`np.std\` gives 2.
`,lessons:["d1-expectation-mle"],practice:["d1-py-hard"],verify:g(h`
import numpy as np
import pandas as pd
xs = [2, 4, 4, 4, 5, 5, 7, 9]
mean = np.mean(xs)
squared = sum((x - mean) ** 2 for x in xs)
result = [mean, squared, round(squared / 7, 2), round(pd.Series(xs).std(), 2), np.std(xs)]
`,[5,32,4.57,2.14,2])},{kind:"reference",id:"percentiles",title:"Percentiles and the IQR",when:"Describe a position in the data without being thrown by outliers.",keywords:["quantile","p50","p90","p95","interquartile","quartile","median"],body:e`
- The 90th percentile (P90) is the value that 90% of the data falls below.
- The median is P50.
- The **interquartile range** (IQR) is P75 − P25: the width of the middle half of the data.

For 10, 20, 30, 40 and 50, P25 is 20, P50 is 30 and P75 is 40, so the IQR is 20. Tools interpolate differently, so small samples can give slightly different answers.
`,practice:["d1-py-hard"],verify:g(h`
import numpy as np
xs = [10, 20, 30, 40, 50]
p25, p50, p75 = np.percentile(xs, [25, 50, 75])
result = [p25, p50, p75, p75 - p25]
`,[20,30,40,20])}]},st={id:"probability-basics",title:"Probability",cards:[{kind:"reference",id:"probability-rules",title:"The basic rules",when:"Combine the probabilities of events.",keywords:["and","or","not","complement","independent","conditional","addition","multiplication"],body:e`
| You want | Rule |
|---|---|
| Not $A$ | $1 - P(A)$ |
| $A$ or $B$ | $P(A) + P(B) - P(A \text{ and } B)$ |
| $A$ and $B$ | $P(A)\,P(B \mid A)$, or $P(A)\,P(B)$ if independent |
| $A$ given $B$ | $P(A \text{ and } B) \,/\, P(B)$ |

If 10% of users click and 20% of clickers buy, then 0.1 × 0.2 = 2% click and buy.

If two users each convert independently at 10%, the chance of at least one is easiest from the complement: 1 − 0.9 × 0.9 = 19%.
`,lessons:["d1-bayes"],verify:g(h`
result = [round(0.1 * 0.2, 4), round(1 - 0.9 * 0.9, 4)]
`,[.02,.19])},{kind:"reference",id:"bayes-theorem",title:"Bayes' theorem",when:"Flip a conditional: from how likely the evidence is, to how likely the explanation is.",keywords:["base rate","posterior","prior","false positive","conditional"],body:e`
$$P(A \mid B) = \dfrac{P(B \mid A)\,P(A)}{P(B)}$$

Fraud is 1% of accounts, and a model catches 95% of it while flagging 5% of all accounts. How likely is a flagged account to be fraud?

Out of 10,000 accounts, 100 are fraud and 95 of those get caught, among 500 flagged in total. So 95 ÷ 500 = 19%. When something is rare, even a good test gives mostly false alarms.
`,lessons:["d1-bayes"],verify:g(h`
accounts = 10000
fraud = accounts * 0.01
caught = fraud * 0.95
flagged = accounts * 0.05
result = [round(fraud), round(caught), round(flagged), round(caught / flagged, 2), round(0.95 * 0.01 / 0.05, 2)]
`,[100,95,500,.19,.19])},{kind:"reference",id:"common-distributions",title:"The common distributions",when:"Match the outcome you are measuring to a standard shape.",keywords:["bernoulli","binomial","poisson","normal","lognormal","beta","expected value"],body:e`
| The story | Distribution | Mean and variance |
|---|---|---|
| One user converts or doesn't | Bernoulli($p$) | $p$, $p(1-p)$ |
| Conversions out of $n$ users | Binomial($n, p$) | $np$, $np(1-p)$ |
| Events in a window, such as purchases per hour | Poisson($\lambda$) | $\lambda$, $\lambda$ |
| Averages and measurement noise | Normal($\mu, \sigma^2$) | $\mu$, $\sigma^2$ |
| Positive and right-skewed, such as revenue or ROI | LogNormal($\mu, \sigma$) | mean $e^{\mu + \sigma^2/2}$, median $e^\mu$ |
| A probability, such as a conversion rate | Beta($\alpha, \beta$) | mean $\alpha / (\alpha + \beta)$ |

For 1,000 users converting at 5%, the Binomial gives a mean of 50 conversions, a variance of 47.5 and an SD of about 6.9.
`,lessons:["d1-distributions"],verify:g(h`
import math
n, p = 1000, 0.05
variance = n * p * (1 - p)
result = [round(n * p), round(variance, 1), round(math.sqrt(variance), 1)]
`,[50,47.5,6.9])},{kind:"reference",id:"normal-rule",title:"The 68-95-99.7 rule",when:"Read a spread straight off a Normal curve.",keywords:["normal","bell curve","empirical rule","1.96","z-score","standard deviations"],body:e`
| Within | Share of a Normal distribution |
|---|---|
| 1 SD of the mean | 68% |
| 2 SDs | 95% |
| 3 SDs | 99.7% |

With a mean of 100 and an SD of 10, about 95% of values fall between 80 and 120. The exact multiplier for 95% is 1.96, which is where the 1.96 in a confidence interval comes from.
`,lessons:["d2-clt-ci"],verify:g(h`
from statistics import NormalDist
z = NormalDist()
within = lambda k: z.cdf(k) - z.cdf(-k)
result = [round(within(1), 2), round(within(2), 2), round(within(3), 3), 100 - 2 * 10, 100 + 2 * 10, round(z.inv_cdf(0.975), 2)]
`,[.68,.95,.997,80,120,1.96])}]},at={id:"inference-basics",title:"Inference",cards:[{kind:"reference",id:"clt",title:"Central Limit Theorem",when:"Why so many tests can assume a Normal curve.",keywords:["CLT","sampling distribution","averages","bell curve"],body:e`
- The average of many independent values is approximately Normal, whatever the shape of the values themselves.
- Revenue per user is very skewed, but the average revenue across 10,000 users is bell-shaped.
- The more skewed the data, the bigger the sample it takes.
- This covers averages and rates, which is why z-tests work on them. It doesn't make the raw data Normal.
`,lessons:["d2-clt-ci"]},{kind:"reference",id:"se-vs-sd",title:"Standard error vs standard deviation",when:"Two measures of spread that are easy to mix up.",keywords:["SE","SD","precision","square root of n","sample size"],body:e`
| | Measures the spread of | Bigger sample |
|---|---|---|
| **SD** | individual values | stays about the same |
| **SE** | an estimate, such as a mean, across possible samples | shrinks |

- SE of a mean: $s / \sqrt n$. With an SD of 40 and $n = 400$, that's 40 ÷ 20 = 2.
- SE of a proportion: $\sqrt{p(1-p)/n}$. With $p = 0.1$ and $n = 10{,}000$, that's 0.003.
- Because of the square root, you need 4× the data to halve the SE.
`,lessons:["d2-clt-ci"],verify:g(h`
import math
result = [40 / math.sqrt(400), round(math.sqrt(0.1 * 0.9 / 10000), 6), round((40 / math.sqrt(1600)) / (40 / math.sqrt(400)), 6)]
`,[2,.003,.5])},{kind:"reference",id:"hypothesis-test",title:"Hypothesis test: the steps",when:"Decide whether a difference is more than noise.",keywords:["null","H0","alpha","significance","z-test","two-proportion","reject"],body:e`
1. State $H_0$ (no effect) and $H_1$ (an effect).
2. Choose α, usually 0.05, before you look at the data.
3. Compute a test statistic.
4. Get the p-value.
5. Reject $H_0$ if $p < \alpha$.

Control converts 1,200 of 24,000 users (5.0%), and treatment 1,320 of 24,000 (5.5%). The pooled rate is 5.25%, which gives an SE of 0.2036pp, so $z$ = 0.5 ÷ 0.2036 = 2.46 and $p$ = 0.014. That's below 0.05, so we reject $H_0$.
`,lessons:["d2-hypothesis-testing"],practice:["d2-py-hard"],verify:g(h`
import math
from statistics import NormalDist
k_a, k_b, n = 1200, 1320, 24000
pooled = (k_a + k_b) / (2 * n)
se = math.sqrt(pooled * (1 - pooled) * 2 / n)
z = (k_b / n - k_a / n) / se
p = 2 * (1 - NormalDist().cdf(z))
result = [k_a / n, k_b / n, pooled, round(se * 100, 4), round(z, 2), round(p, 3)]
`,[.05,.055,.0525,.2036,2.46,.014])},{kind:"reference",id:"p-value",title:"What a p-value says",when:"The most misread number in statistics.",keywords:["significant","significance","misinterpretation","null"],body:e`
**It is** the probability of a result at least this extreme, *if $H_0$ is true*.

**It isn't:**

- the probability that $H_0$ is true
- the probability that the result is a fluke
- a measure of how big or useful the effect is

So $p$ = 0.014 means that if there were no real effect, a gap this large or larger would show up 1.4% of the time. A high p-value doesn't prove there's no effect either: the test may just lack power, so check the confidence interval.
`,lessons:["d2-hypothesis-testing"]},{kind:"reference",id:"confidence-interval",title:"Confidence interval",when:"Give a range for an estimate rather than a single number.",keywords:["CI","95%","1.96","margin of error","credible interval"],body:e`
$$\text{estimate} \pm 1.96 \times SE$$

- **What it means:** if you repeated the whole process, 95% of the intervals would contain the true value.
- **What it doesn't mean:** there's a 95% chance that this particular interval contains it. That's the reading of a Bayesian *credible* interval.
- If a 95% interval on a difference excludes 0, the result is significant at the 5% level.

For the difference in the test above, 0.5pp ± 1.96 × 0.2036pp runs from 0.10pp to 0.90pp. It's significant, but the range is wide.
`,lessons:["d2-clt-ci","d2-hypothesis-testing"],practice:["d8-py-medium-1"],verify:g(h`
import math
n = 24000
p_a, p_b = 0.05, 0.055
se = math.sqrt(p_a * (1 - p_a) / n + p_b * (1 - p_b) / n)
result = [round(se * 100, 4), round((p_b - p_a - 1.96 * se) * 100, 2), round((p_b - p_a + 1.96 * se) * 100, 2)]
`,[.2036,.1,.9])},{kind:"reference",id:"errors-power",title:"Type I and II errors, and power",when:"The two ways a test can be wrong, and the chance of catching a real effect.",keywords:["false positive","false negative","alpha","beta","80%"],body:e`
| | $H_0$ true | $H_0$ false |
|---|---|---|
| **Reject $H_0$** | Type I (α): false positive | Correct (power = 1 − β) |
| **Fail to reject** | Correct | Type II (β): false negative |

- Tests usually use α = 0.05 and aim for 80% power.
- Power rises with sample size, effect size and α, and falls with variance.
- An underpowered test misses real effects, so "not significant" doesn't mean "no effect".
`,lessons:["d2-hypothesis-testing"]},{kind:"reference",id:"which-test",title:"z, t or chi-square?",when:"Pick the test from the kind of data you have.",keywords:["z-test","t-test","Welch","chi-squared","paired","Fisher","permutation","SRM"],body:e`
| You're comparing | Test |
|---|---|
| Two proportions, large samples | two-proportion z-test |
| Two means | Welch's t-test (close to z at large $n$) |
| Before and after on the same units | paired t-test |
| Counts across categories | chi-square, $\sum (O - E)^2 / E$ |
| A 2×2 table with small counts | Fisher's exact test |
| Any statistic, with no distribution assumed | permutation test |

If a 50/50 split gives 50,600 and 49,400 users, then chi-square = 14.4 and $p$ = 0.00015. A split that uneven points to a broken experiment.
`,lessons:["d2-hypothesis-testing"],practice:["d8-py-easy-2"],verify:g(h`
import math
observed = [50600, 49400]
expected = sum(observed) / 2
chi2 = sum((o - expected) ** 2 / expected for o in observed)
result = [round(chi2, 1), round(math.erfc(math.sqrt(chi2 / 2)), 5)]
`,[14.4,15e-5])}]},it={id:"relationships",title:"Relationships",cards:[{kind:"reference",id:"correlation-causation",title:"Correlation vs causation",when:"What a strong relationship can and can't tell you.",keywords:["r","pearson","confounder","confounding","spurious"],body:e`
- Correlation ($r$) runs from −1 to 1 and measures how closely two variables follow a straight line. An $r$ near 0 can still hide a curved relationship.
- It doesn't show that one variable causes the other. A **confounder** can drive both.
- Search spend can correlate 0.9 with sales and still have a small effect, because search captures demand that already exists. People who were going to buy anyway search first.
- Randomising is the cleanest way to show a cause. Without it, you need to control for confounders and state your assumptions.
`,lessons:["d3-confounding-mmm"]},{kind:"reference",id:"reading-regression",title:"Reading a regression",when:"Say what the numbers in a regression output mean.",keywords:["coefficient","intercept","R squared","OLS","least squares","holding constant","linear regression"],body:e`
$$\text{sales} = 100 + 2.5 \times \text{spend} + 10 \times \text{promo}$$

- **Intercept (100):** predicted sales when every input is 0.
- **Coefficient (2.5):** one more unit of spend goes with 2.5 more sales on average, *holding promo fixed*.
- **p-value and CI on a coefficient:** whether the data can tell that effect apart from 0.
- **R²:** the share of variance explained. A high value says nothing about causality.

With spend of 20 and a promo running, the prediction is 100 + 50 + 10 = 160.
`,lessons:["d3-linear-regression"],practice:["d5-py-hard"],verify:g(h`
spend, promo = 20, 1
result = [2.5 * spend, 10 * promo, 100 + 2.5 * spend + 10 * promo]
`,[50,10,160])}]},_s=[{id:"sql",title:"SQL",icon:"mdi-database-search-outline",color:"sql",summary:"SELECT, WHERE, GROUP BY, joins and CTEs, each with a tiny example and its result.",parts:[{id:"sql-querying",title:"Querying",sections:[Ke,Xe,Je]},{id:"sql-values",title:"Working with values",sections:[Ze,et]}]},{id:"python",title:"Python",icon:"mdi-language-python",color:"python",summary:"Dicts, loops, comprehensions, functions, numpy and pandas, each with a tiny example and its result.",parts:[{id:"python-core",title:"Core language",sections:[Ge,He,ze,Ye]},{id:"python-data",title:"Working with data",sections:[je,Qe]}]},{id:"stats",title:"Stats",icon:"mdi-sigma",color:"theory",summary:"Averages, probability, p-values, confidence intervals and regression, each with a small worked example.",parts:[{id:"stats-data",title:"Data and probability",sections:[tt,st]},{id:"stats-conclusions",title:"Drawing conclusions",sections:[at,it]}]},{id:"experiments",title:"Experiments",icon:"mdi-flask-outline",color:"secondary",summary:"What an A/B test is, how to design and read one, and what to do when you can't randomise.",parts:[{id:"experiments-ab",title:"A/B tests",sections:[$e,Ie,Oe]},{id:"experiments-beyond",title:"Beyond A/B tests",sections:[Le]}]},{id:"ml",title:"ML",icon:"mdi-robot-outline",color:"accent",summary:"Splits, overfitting, the main models, the metrics to score them, and validating honestly.",parts:[{id:"ml-ideas",title:"Core ideas",sections:[Pe,We]},{id:"ml-models-metrics",title:"Models and metrics",sections:[qe,Fe]}]},{id:"meridian",title:"Meridian & MMM",icon:"mdi-chart-bell-curve-cumulative",color:"meridian",summary:"What an MMM answers, what goes in, adstock and saturation, ROI vs mROI, health checks and budgets.",parts:[{id:"meridian-how",title:"How an MMM works",sections:[Me,De]},{id:"meridian-using",title:"Using the results",sections:[Ue,Be]}]}],nt={id:"ab-checklist",title:"A/B testing checklist",cards:[{kind:"reference",id:"ab-design",title:"Design (before launch)",body:e`
- [ ] **Hypothesis** and the **decision** it informs.
- [ ] **Primary metric** (one), **guardrails**, **diagnostics**: pre-registered.
- [ ] **Unit of randomisation** = unit of analysis. Interference? Then cluster, geo or switchback.
- [ ] **MDE** agreed with the business → **sample size** → **duration** in **whole weeks**.
- [ ] **Variance reduction**: CUPED covariates, stratification.
- [ ] **Assignment**: salted hash, sticky, ramp plan.
- [ ] **Analysis plan**: test, α, sidedness, **no peeking** (or a sequential design), a multiple-testing policy.
- [ ] **Triggering**: analyse users who could see the change.
`},{kind:"reference",id:"ab-during",title:"During the test",body:e`
- [ ] Daily **SRM** monitor (p < 0.001 means stop and investigate).
- [ ] Guardrail alerts (latency, crashes, revenue).
- [ ] Don't change the allocation mid-test (or analyse the periods separately).
`},{kind:"reference",id:"ab-readout",title:"Readout (in this order)",body:e`
1. **SRM / data quality**, an A/A sanity check.
2. **Guardrails** (one-sided, "not worse").
3. **Primary metric**: the effect, a **CI**, and the p-value. Practical significance vs the MDE.
4. **Secondary metrics** with FDR control.
5. **Pre-registered segments** only. Treat the rest as hypotheses.
6. **Novelty**: the effect by day since exposure.
7. **Decision**: ship / iterate / kill, per the pre-agreed criteria. Document it.
`},{kind:"reference",id:"ab-not-right-tool",title:"When an A/B test isn't the right tool",body:e`
- Can't randomise: **DiD, synthetic control, CausalImpact**.
- Portfolio media effects: **MMM (Meridian)** + geo experiments.
- Many variants, short horizon, optimise reward: **bandits**.
`}]},ot={id:"case-framework",title:"Data-intuition cases",cards:[{kind:"reference",id:"six-step-structure",title:"The 6-step structure",body:e`
1. **Clarify**: goal, stakeholders, the decision, the time horizon. *"Before I dive in, can I ask…"*
2. **Assumptions**: state them out loud.
3. **Metrics**: a primary (north star) metric, guardrails, diagnostics.
4. **Approach**: causal design (experiment > quasi-experiment > adjustment) or a model, and why.
5. **Analysis and risks**: biases (selection, confounding, novelty, seasonality, SRM), power, segments.
6. **Recommendation**: the decision rule, next steps, how you'd communicate it, and what you'd build so it scales.
`},{kind:"reference",id:"clarifying-questions",title:"Clarifying-question bank",body:e`
- **Assignment**: random? targeted? opt-in? global?
- **Counterfactual**: is there a holdout? history? comparable units?
- **Unit**: user, session, advertiser, geo? Interference?
- **Data**: what exists, at what granularity, how complete (conversion lag)?
- **Confounders**: what else changed (seasonality, promos, pricing, competitors, tracking)?
- **Success**: which metric, over what horizon, and what threshold?
`},{kind:"reference",id:"metric-drop-triage",title:"Metric-drop triage",body:e`
Data validity → expected variation (seasonality, forecast band) → localisation (segment) → funnel decomposition (traffic × CTR × CVR) → external factors → quantify each factor's share.
`},{kind:"reference",id:"l6-boosters",title:"L6 boosters",body:e`
- **Think at scale**: billions of rows, many advertisers. Make it a repeatable process.
- **Focus on the user**: UX guardrails, advertiser outcomes.
- **Be conversational**: check in with the interviewer at each step.
- **Systems thinking**: standing holdouts, platform alerts, templates.
`}]},rt={id:"glossary",title:"Glossary",cards:[{kind:"reference",id:"meridian-glossary",title:"MMM & Meridian glossary",when:"Every Meridian term, default and health check you may be asked about.",body:e`
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
`}]},dt={id:"mmm-formulas",title:"MMM formulas",cards:[{kind:"reference",id:"mmm-formula-table",title:"Adstock, Hill, ROI and mROI",body:e`
| | |
|---|---|
| Geometric adstock | $\sum_{s=0}^L \alpha^s x_{t-s} / \sum \alpha^s$; half-life $\ln 0.5/\ln\alpha$ |
| Hill | $x^s/(x^s + ec^s)$ |
| ROI / mROI | $R(s)/s$ / $R'(s)$; for $\beta s/(s + ec)$: $\beta ec/(s + ec)^2$ |
| Optimal split | equal mROI across channels (within bounds) |
`}]},lt=[],ct={id:"core-patterns",title:"Core patterns",cards:[{kind:"reference",id:"imports",title:"Imports to know",body:e`
\`\`\`python
import math, random, statistics as st
from collections import defaultdict, Counter
from dataclasses import dataclass
\`\`\`
`},{kind:"reference",id:"grouping",title:"Grouping",body:e`
\`\`\`python
totals = defaultdict(float)
for r in rows:
    totals[r["campaign"]] += r["spend"]
counts = Counter(r["device"] for r in rows)
\`\`\`
`},{kind:"reference",id:"join-dedupe",title:"Join (left) and dedupe",body:e`
\`\`\`python
lookup = {u["user_id"]: u for u in users}
joined = [{**o, "country": lookup.get(o["user_id"], {}).get("country", "unknown")} for o in orders]
unique_users = {e["user_id"] for e in events}
\`\`\`
`},{kind:"reference",id:"sort-top-n",title:"Sort / top-n",body:e`
\`\`\`python
top3 = sorted(totals, key=totals.get, reverse=True)[:3]
rows.sort(key=lambda r: (-r["rate"], r["name"]))
\`\`\`
`},{kind:"reference",id:"lags-rolling",title:"Lags and rolling",body:e`
\`\`\`python
lag1 = [None] + xs[:-1]
roll7 = [None if i < 6 else sum(xs[i - 6:i + 1]) / 7 for i in range(len(xs))]
\`\`\`
`},{kind:"reference",id:"dates",title:"Dates",body:e`
\`\`\`python
import datetime as dt
d = dt.date.fromisoformat("2026-09-14"); d + dt.timedelta(days=7); d.weekday()
\`\`\`
`}]},ut={id:"stats-from-scratch",title:"Stats from scratch",cards:[{kind:"reference",id:"stats-basics",title:"Mean, variance, SE, normal CDF",body:e`
\`\`\`python
m = sum(xs) / len(xs)
var = sum((x - m) ** 2 for x in xs) / (len(xs) - 1)      # sample variance
se = math.sqrt(var / len(xs))
norm_cdf = lambda z: 0.5 * (1 + math.erf(z / math.sqrt(2)))
p_two_sided = math.erfc(abs(z) / math.sqrt(2))
\`\`\`
`},{kind:"reference",id:"two-proportion-z",title:"Two-proportion z-test",body:e`
\`\`\`python
p_pool = (k1 + k2) / (n1 + n2)
z = (k2 / n2 - k1 / n1) / math.sqrt(p_pool * (1 - p_pool) * (1 / n1 + 1 / n2))
\`\`\`
`},{kind:"reference",id:"simulation",title:"Simulation, bootstrap, permutation",body:e`
\`\`\`python
rng = random.Random(42)
boot = [st.mean(rng.choices(xs, k=len(xs))) for _ in range(2000)]
rng.shuffle(pooled)
post_draws = [rng.betavariate(a + k, b + n - k) for _ in range(10000)]
\`\`\`
`},{kind:"reference",id:"hash-assignment",title:"Hashing assignment",body:e`
\`\`\`python
import hashlib
bucket = int(hashlib.sha256(f"{salt}:{uid}".encode()).hexdigest()[:8], 16) % 1000
\`\`\`
`},{kind:"reference",id:"safe-sigmoid",title:"Safe sigmoid, log space",body:e`
\`\`\`python
sig = lambda z: 1 / (1 + math.exp(-z)) if z >= 0 else math.exp(z) / (1 + math.exp(z))
logs = [k * math.log(p) + (n - k) * math.log(1 - p) for p in grid]; mx = max(logs)
w = [math.exp(l - mx) for l in logs]
\`\`\`
`}]},ht={id:"edge-cases",title:"Say it out loud",cards:[{kind:"reference",id:"edge-cases-out-loud",title:"Edge cases",body:e`
**Edge cases to say out loud**: empty input, divide-by-zero, duplicates, missing keys, ties, NaN/None, the unit of analysis.
`}]},mt={id:"strings",title:"Strings",cards:[{kind:"question",id:"first-non-repeating-character",title:"First non-repeating character",keywords:["first unique character","counter","frequency"],prompt:e`Return the first character in a string that appears exactly once, or \`None\` if there isn't one.`,approach:e`Two passes: count every character, then walk the string in order and return the first with a count of 1. That's O(n) time and O(k) space for k distinct characters.`,solution:{lang:"python",code:h`
from collections import Counter

def first_unique(s):
    counts = Counter(s)
    for ch in s:
        if counts[ch] == 1:
            return ch
    return None
`},output:e`\`first_unique("swiss")\` → \`"w"\`, \`first_unique("aabb")\` → \`None\`, \`first_unique("")\` → \`None\``,pitfalls:["Calling `s.count(ch)` inside the loop works, but is O(n²).","Walking the Counter also works, because dicts keep insertion order, but walking the string makes the intent obvious.",'Say what you assume about case and whitespace: is "S" the same as "s"?'],followUps:["What if the characters arrive as a stream?","Return the index instead of the character."],practice:["d1-py-easy-2","d5-py-easy-2"],lessons:["py1-foundations"],verify:{lang:"python",check:{expr:'[first_unique("swiss"), first_unique("aabb"), first_unique("")]',expected:["w",null,null]}}}]},pt={id:"window-functions",title:"Window functions",cards:[{kind:"reference",id:"execution-order",title:"Execution order",when:"Why you can't filter on a window in WHERE.",body:e`
\`FROM/JOIN → WHERE → GROUP BY → HAVING → window functions → QUALIFY → SELECT aliases → DISTINCT → ORDER BY → LIMIT\`

- Windows run **after** GROUP BY, so \`SUM(SUM(x)) OVER ()\` is legal: it's a window over the aggregated rows.
- To filter on a window result, use \`QUALIFY\` (BigQuery, Snowflake, DuckDB) or wrap it in a CTE. BigQuery requires a \`WHERE\`, \`GROUP BY\` or \`HAVING\` alongside \`QUALIFY\`, so write \`WHERE TRUE\` if needed.
- Window functions can't be nested (\`LAG(LAG(x))\`), so use two CTEs.
`},{kind:"reference",id:"window-anatomy",title:"Window anatomy",body:e`
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
`},{kind:"reference",id:"rows-range-groups",title:"ROWS vs RANGE vs GROUPS",body:e`
| | Counts | Ties (same ORDER BY value) | Missing dates |
|---|---|---|---|
| **ROWS** | physical rows | split: each row is its own step | silently stretches over the gap |
| **RANGE** | value distance from the current row | peers are all in or all out | handled: it's a calendar window |
| **GROUPS** | distinct ORDER BY values | peers move together | n/a (not in BigQuery) |

- **Duplicate-date trap:** a running total \`SUM(x) OVER (ORDER BY date)\` uses the default RANGE frame, so every row on the same date shows the **day's** total. Use \`ROWS\` plus a unique tie-break, or aggregate to one row per date first.
- **7-day window:** \`RANGE BETWEEN INTERVAL 6 DAY PRECEDING AND CURRENT ROW\` (6, not 7, because the current day counts). BigQuery needs a numeric ORDER BY for RANGE: \`ORDER BY UNIX_DATE(d) RANGE BETWEEN 6 PRECEDING AND CURRENT ROW\`.
- **Guard partial windows:** \`IF(COUNT(*) OVER w = 7, AVG(x) OVER w, NULL)\`.
`},{kind:"reference",id:"rank-family",title:"The rank family (on 100, 90, 90, 80)",body:e`
| Function | Result | Use it for |
|---|---|---|
| \`ROW_NUMBER()\` | 1, 2, 3, 4 | dedupe, or exactly N rows (**add a tie-break**) |
| \`RANK()\` | 1, 2, 2, 4 | top N, keeping everyone tied at the cut-off |
| \`DENSE_RANK()\` | 1, 2, 2, 3 | top N *values*; gaps and islands with duplicates |
| \`NTILE(4)\` | 1, 2, 3, 4 | quartiles (buckets of nearly equal size, which can split ties) |
| \`PERCENT_RANK()\` | 0, ⅓, ⅓, 1 | (rank − 1)/(n − 1) |
| \`CUME_DIST()\` | ¼, ¾, ¾, 1 | share of rows ≤ this one |
`},{kind:"reference",id:"lag-lead-first-last",title:"LAG / LEAD / FIRST_VALUE / LAST_VALUE",body:e`
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
`}]},ft={id:"query-patterns",title:"Query patterns",cards:[{kind:"reference",id:"patterns-asked-for",title:"Patterns you'll be asked for",body:e`
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
`},{kind:"reference",id:"cte-vs-subquery",title:"CTE vs subquery",body:e`
- **CTEs** (\`WITH a AS (…), b AS (…)\`) read top to bottom, can be referenced more than once, and each step can be tested with \`SELECT * FROM step\`. Interviewers like them.
- A BigQuery CTE referenced twice may be **computed twice** (it isn't materialised). For a heavy step, use a temp table.
- Correlated subqueries (\`WHERE x > (SELECT AVG(x) FROM t WHERE t.g = o.g)\`) are fine for explaining a definition, but are O(n²) in the worst case. Prefer a window.
`},{kind:"reference",id:"conditional-aggregation",title:"CASE inside aggregates (conditional aggregation)",body:e`
\`\`\`sql
SUM(CASE WHEN device = 'mobile' THEN spend ELSE 0 END)   -- pivot / filtered sum
COUNT(CASE WHEN converted THEN 1 END)                     -- no ELSE: NULLs are not counted
COUNTIF(converted)  /  SUM(IF(c, x, 0))                   -- BigQuery shorthands
AVG(CASE WHEN g = 'B' THEN x END)                          -- mean over a subset (ELSE 0 would be wrong)
\`\`\`
- CASE tests branches **in order**, so put \`WHEN x IS NULL\` first. \`NULL < 20\` is NULL, not true.
`}]},yt={id:"nulls",title:"NULLs",cards:[{kind:"reference",id:"null-functions",title:"NULL functions",body:e`
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
`}]},gt={id:"joins",title:"Joins",cards:[{kind:"reference",id:"cross-join-uses",title:"CROSS JOIN uses (beyond the date spine)",body:e`
| | |
|---|---|
| Scaffold | \`segments × funnel_steps\`, \`dates × channels\`, so absences become rows you can zero-fill |
| Unordered pairs | \`channels a CROSS JOIN channels b WHERE a.ch < b.ch\`: k(k−1)/2 pairs, no self-pairs (\`<>\` gives each pair twice) |
| Attach a scalar | \`CROSS JOIN (SELECT SUM(x) AS total FROM t)\` (or just \`SUM(x) OVER ()\`) |
| Parameters | \`CROSS JOIN (SELECT DATE '2026-09-08' AS report_date) p\` |
| Explode arrays | \`FROM t, UNNEST(t.labels) AS label\` (the comma is an implicit CROSS JOIN) |
`},{kind:"reference",id:"range-joins",title:"Range (non-equi) joins",body:e`
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
`}]},te={id:"rosetta",title:"SQL ↔ pandas ↔ pure Python",cards:[{kind:"reference",id:"rosetta-stone",title:"Rosetta stone",when:"The same operation in all three languages, side by side.",body:e`
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
`}]},bt={id:"top-n",title:"Top N",cards:[{kind:"question",id:"top-3-users",title:"Find the top 3 users by spend",keywords:["leaderboard","highest","best customers","qualify"],prompt:e`Given \`orders(user_id, amount)\`, return the top 3 users by total spend.`,approach:e`Aggregate to one row per user, then rank. Ask how to treat ties: \`RANK\` keeps everyone tied at the cut-off, so you can get more than 3 rows. \`ROW_NUMBER\` returns exactly 3 but needs a tie-break.`,solution:{lang:"sql",code:h`
SELECT user_id, SUM(amount) AS total_spend
FROM orders
GROUP BY user_id
QUALIFY RANK() OVER (ORDER BY SUM(amount) DESC) <= 3
ORDER BY total_spend DESC, user_id
`},pitfalls:["`ORDER BY ... LIMIT 3` silently drops anyone tied for third.","Ranking raw orders instead of per-user totals finds the biggest orders, not the biggest spenders.","BigQuery needs a `WHERE`, `GROUP BY` or `HAVING` alongside `QUALIFY`. Without `QUALIFY`, use a CTE."],followUps:["Top 3 users per country?","Top 3 distinct spend values? (`DENSE_RANK`)"],practice:["d2-sql-easy-2","d3-sql-easy-1","d3-sql-medium-3"],verify:{lang:"sql",tables:[{name:"orders",columns:["user_id","amount"],rows:[["u1",300],["u1",200],["u2",300],["u3",150],["u3",50],["u4",200],["u5",100]]}],expectedOutput:{kind:"table",columns:["user_id","total_spend"],rows:[["u1",500],["u2",300],["u3",200],["u4",200]],ordered:!0}}}]},wt={id:"choosing-a-method",title:"Choosing a method",cards:[{kind:"reference",id:"method-chooser",title:'"Which method?" decision tree',when:"Click through a few questions to land on the right method, its key assumption and the alternative.",component:"MethodChooser",body:e`
**How to use it in the interview**: say the branch points out loud: *"Is this causal or predictive? Was it randomised? What's the outcome type?"* That's exactly the structured thinking interviewers look for.
`}]},vt={id:"probability",title:"Probability",cards:[{kind:"reference",id:"probability-formulas",title:"Probability formulas",body:e`
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
`}]},kt={id:"inference",title:"Inference",cards:[{kind:"reference",id:"inference-formulas",title:"Inference formulas",body:e`
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
`}]},Et={id:"regression",title:"Regression & modelling",cards:[{kind:"reference",id:"regression-formulas",title:"Regression & modelling formulas",body:e`
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
`}]},xt={id:"bayesian",title:"Bayesian",cards:[{kind:"reference",id:"bayesian-formulas",title:"Bayesian formulas",body:e`
| | |
|---|---|
| Posterior | $\propto$ likelihood × prior |
| Beta–Binomial | Beta$(\alpha + k, \beta + n - k)$ |
| Normal–Normal | precision-weighted mean; precisions add |
| Shrinkage | $(k + m\bar p)/(n + m)$ |
| R-hat | $\sqrt{\hat V/W}$; Meridian guidance < 1.2 |
`},{kind:"reference",id:"bayes-core",title:"Core",body:e`
$p(\theta \mid y) \propto p(y \mid \theta)\,p(\theta)$. **MAP** = mode, **posterior mean/median** = summaries, a **credible interval** = a probability statement about θ.
`},{kind:"reference",id:"conjugate-pairs",title:"Conjugate pairs",body:e`
| Likelihood | Prior | Posterior |
|---|---|---|
| Binomial | Beta(α, β) | Beta(α + k, β + n − k) |
| Poisson | Gamma(a, b) | Gamma(a + Σy, b + n) |
| Normal (σ known) | Normal(μ₀, τ₀²) | Normal: precision-weighted mean |
`},{kind:"reference",id:"regularisation-priors",title:"Regularisation = priors",body:e`
Ridge = a Normal(0, τ²) prior. Lasso = a Laplace prior. λ = σ²/τ².
`},{kind:"reference",id:"hierarchical-models",title:"Hierarchical models",body:e`
Groups drawn from a shared distribution, so **partial pooling**: shrinkage $\lambda_g = \tau^2/(\tau^2 + \sigma^2/n_g)$. Meridian: $\log\beta_{g,m} \sim N(\beta_m, \eta_m)$.
`},{kind:"reference",id:"mcmc",title:"MCMC",body:e`
- **Metropolis**: accept with min(1, posterior ratio). p(y) cancels.
- **HMC/NUTS**: gradient-guided. Meridian uses NUTS (TensorFlow Probability).
- **Diagnostics**: **R-hat** (Meridian: < 1.2; ideally ≈ 1.01), **ESS**, trace plots, divergences.
- Fixes: longer chains / more adaptation, better priors, reparameterisation, fewer weakly identified parameters.
`},{kind:"reference",id:"bayesian-ab",title:"Bayesian A/B",body:e`
P(B > A) = the share of posterior draws where B wins. **Expected loss** = E[max(p_A − p_B, 0)]. Ship when the expected loss < ε (pre-registered).
`},{kind:"reference",id:"defending-priors",title:"Defending priors (the stakeholder script)",body:e`
1. Every model has assumptions. Priors make them explicit.
2. Weakly informative defaults, plus **evidence-based** custom priors (experiments).
3. The data dominates where it's informative: show **prior vs posterior**.
4. **Sensitivity analysis**: does the decision change under reasonable alternative priors?
5. **Validation**: holdout fit, and agreement with experiments.
`},{kind:"reference",id:"credible-vs-confidence",title:"Credible vs confidence",body:e`
| | Credible | Confidence |
|---|---|---|
| "95%" means | P(θ ∈ CI \| data) | 95% of such intervals cover θ |
| Prior? | yes | no |
`}]},Rt={id:"other-formulas",title:"Other",cards:[{kind:"reference",id:"other-formulas-card",title:"Survival & Monte Carlo formulas",body:e`
| | |
|---|---|
| Kaplan–Meier | $\prod (1 - d_j/n_j)$ |
| Cox hazard ratio | $e^{\beta}$ |
| Monte Carlo SE | $\propto 1/\sqrt S$ |
`}]},Cs=[{id:"sql",title:"SQL",icon:"mdi-database-search-outline",color:"sql",summary:"Window functions, joins and NULLs, plus the classic interview queries.",parts:[{id:"sql-syntax",title:"Formulas & syntax",sections:[pt,ft,yt,gt,te]},{id:"sql-questions",title:"Interview questions",sections:[bt]}]},{id:"python",title:"Python",icon:"mdi-language-python",color:"python",summary:"The patterns to write from memory, plus the classic interview questions.",parts:[{id:"python-patterns",title:"Patterns",sections:[ct,ut,ht,te]},{id:"python-questions",title:"Interview questions",sections:[mt]}]},{id:"stats",title:"Stats",icon:"mdi-sigma",color:"theory",summary:"Probability, inference, regression and Bayesian formulas, and how to choose a method.",parts:[{id:"stats-formulas",title:"Formulas",sections:[wt,vt,kt,Et,xt,Rt]}]},{id:"experiments",title:"Experiments",icon:"mdi-flask-outline",color:"secondary",summary:"The A/B testing checklist, causal alternatives and the data-intuition case framework.",parts:[{id:"experiments-guides",title:"Checklists & frameworks",sections:[nt,ot]}]},{id:"ml",title:"ML",icon:"mdi-robot-outline",color:"accent",summary:"Models, metrics, validation and clustering.",parts:lt},{id:"meridian",title:"Meridian & MMM",icon:"mdi-chart-bell-curve-cumulative",color:"meridian",summary:"Every Meridian term and default, plus the MMM formulas.",parts:[{id:"meridian-reference",title:"Reference",sections:[rt,dt]}]}],At=[["sql",["sql"]],["meridian",["meridian","mmm"]],["experiments",["ab-testing","experimental-design","causal-inference"]],["ml",["predictive-modelling","clustering","decision-trees","survival"]]];function St(t){var i;return((i=At.find(([,o])=>o.some(u=>t.tags.includes(u))))==null?void 0:i[0])??"stats"}const Tt=Object.values(me).flatMap(t=>t.cards),$s=t=>Tt.filter(i=>St(i)===t),Nt=t=>t.parts.flatMap(i=>i.sections.flatMap(o=>o.cards));function _t(t){var u;const i=[t.title,...t.keywords??[]],o=t.kind==="reference"?[t.when??"",t.body]:[t.prompt,t.approach,((u=t.solution)==null?void 0:u.code)??"",t.answer??"",t.output??"",...t.pitfalls??[],...t.followUps??[]];return[...i,...o].join(" ").toLowerCase()}function Ct(t){return[t.scenario,t.answer,t.why].join(" ").toLowerCase()}const se=(t,i)=>i.toLowerCase().split(/\s+/).filter(Boolean).every(o=>t.includes(o));function $t(t,i=72){const o=L(null),u=new Set;let d=null;function m(){d==null||d.disconnect(),u.clear(),d=new IntersectionObserver(n=>{var E;for(const f of n)f.isIntersecting?u.add(f.target.id):u.delete(f.target.id);const a=t.value.find(f=>u.has(f));a?o.value=a:(((E=document.getElementById(t.value[0]))==null?void 0:E.getBoundingClientRect().top)??0)>i&&(o.value=null)},{rootMargin:`-${i}px 0px -70% 0px`});for(const n of t.value){const a=document.getElementById(n);a&&d.observe(a)}}return ie(m),G(t,m,{flush:"post"}),ne(()=>d==null?void 0:d.disconnect()),o}const It={class:"font-weight-bold mb-1"},Ot=q({__name:"QuickFire",props:{cards:{},quiz:{type:Boolean}},setup(t){const i=t,o=pe(new Set);return G(()=>i.quiz,()=>o.clear()),(u,d)=>(s(),A(V,{class:"quick-fire"},{default:R(()=>[(s(!0),r(w,null,C(t.cards,(m,n)=>(s(),r("div",{key:m.id,class:W(["pa-4",{"row-divider":n}])},[b(I,{source:m.scenario,class:"row-prose mb-2"},null,8,["source"]),t.quiz&&!o.has(m.id)?(s(),A(U,{key:0,color:"primary",variant:"tonal",size:"small","prepend-icon":"mdi-eye-outline",onClick:a=>o.add(m.id)},{default:R(()=>[...d[0]||(d[0]=[$("Reveal",-1)])]),_:1},8,["onClick"])):(s(),r(w,{key:1},[l("div",It,[b(I,{source:m.answer,inline:""},null,8,["source"])]),b(I,{source:m.why,class:"row-prose text-body-2 text-muted"},null,8,["source"])],64))],2))),128))]),_:1}))}}),Lt=H(Ot,[["__scopeId","data-v-2d2e9b8d"]]),Mt={class:"d-flex flex-wrap ga-1 mb-4 text-caption text-muted"},Dt={class:"text-h6 font-weight-bold mb-3"},Ut={class:"d-flex flex-column ga-2"},Bt={class:"text-h6 font-weight-bold mb-1"},Pt={class:"d-flex ga-2 mt-4"},qt=q({__name:"MethodChooser",setup(t){const i={start:{q:"What is the question?",options:[{label:"Did X cause a change in Y? (causal)",next:"causal"},{label:"Predict / classify / forecast something",next:"predict"},{label:"Describe uncertainty, or estimate a quantity",next:"estimate"},{label:"Find groups / structure (no labels)",next:"cluster"},{label:"Allocate budget / choose an action",next:"decide"}]},causal:{q:"Can you (or did you) randomise?",options:[{label:"Yes, at the user level, with no interference",next:"rct_metric"},{label:"Yes, but units interact (auctions, marketplaces, budgets)",next:"cluster_rand"},{label:"No: the change hit some units/regions at a known time",next:"did"},{label:"No: one treated unit or series, with good controls",next:"synth"},{label:"No: individual-level, rich covariates",next:"psm"},{label:"Portfolio of media channels over time",next:"mmm"}]},rct_metric:{q:"What is the metric?",options:[{label:"Binary (converted?), large n",next:"ztest"},{label:"Binary, small counts",next:"fisher"},{label:"Continuous / revenue",next:"welch"},{label:"Ratio (clicks per impression, revenue per session)",next:"delta"},{label:"Time-to-event (retention)",next:"survival"},{label:"Many variants, want to maximise reward now",next:"bandit"}]},ztest:{answer:"Two-proportion z-test (pooled SE), plus a CI for the difference",why:"Check SRM first. Pre-register α and the MDE. Use a sequential design if you need to peek. Bayesian alternative: Beta–Binomial P(B > A)."},fisher:{answer:"Fisher's exact test (or a permutation test)",why:"The Normal approximation is unreliable with small counts."},welch:{answer:"Welch's t / z-test on means, with CUPED + winsorising",why:"The CLT applies to the mean at scale. CUPED uses pre-period data to cut the variance by 1 − ρ². Permutation test or bootstrap if n is small or the data is weird."},delta:{answer:"Delta-method SE or a bootstrap at the randomisation unit (user)",why:"Numerator and denominator are both random and correlated within users."},survival:{answer:"Kaplan–Meier curves + log-rank test, or Cox PH with treatment",why:"Handles right-censoring (users still active)."},bandit:{answer:"Multi-armed bandit (Thompson sampling)",why:"Earning > learning. Keep an exploration floor and a holdout. Beware delayed rewards."},cluster_rand:{answer:"Cluster / geo / switchback / budget-split randomisation",why:"Contain the interference within the randomisation unit (SUTVA). Fewer units means less power, so plan by simulation."},did:{answer:"Difference-in-differences (event study) or a geo TBR",why:"Parallel-trends assumption: plot the pre-trends, and use clustered SEs. Beware staggered adoption."},synth:{answer:"Synthetic control or CausalImpact (BSTS)",why:"Build the counterfactual from unaffected controls fitted on the pre-period."},psm:{answer:"Propensity score matching / IPW, or regression adjustment",why:"Only fixes *observed* confounding. Add a sensitivity analysis. Look for an instrument or a discontinuity if possible."},mmm:{answer:"Bayesian MMM (Meridian), calibrated with geo experiments",why:"Adstock + Hill + controls (GQV for search) + a geo hierarchy + ROI priors. Check the health; validate on a holdout."},predict:{q:"What is the target?",options:[{label:"Binary (churn, convert)",next:"clf"},{label:"Continuous",next:"reg"},{label:"Count",next:"count"},{label:"Future values of a time series",next:"forecast"},{label:"Time until an event",next:"survival"}]},clf:{answer:"Logistic regression baseline → gradient boosting",why:'Validate on a time-based split. Metrics: log loss, AUC / PR-AUC, calibration, precision@k. For "who to treat" use uplift models.'},reg:{answer:"Linear / regularised regression (ridge, lasso) → boosting",why:"Check the residuals. Log-transform skewed targets. Cross-validate."},count:{answer:"Poisson / negative binomial GLM",why:"Use the negative binomial if variance ≫ mean. Use an exposure offset."},forecast:{answer:"Seasonal naive baseline → ETS / ARIMA / regression with Fourier terms",why:"Rolling-origin backtests at the horizon you need; report intervals."},estimate:{q:"What are you estimating?",options:[{label:"A mean or proportion",next:"ci"},{label:"A median, ratio, or complex statistic",next:"boot"},{label:"Rates for many small groups",next:"hier"},{label:"A probability with prior knowledge / little data",next:"bayes"},{label:"How many users an experiment needs",next:"power"}]},ci:{answer:"CLT-based CI: estimate ± 1.96·SE (Wilson for proportions with small n)",why:"SE = σ/√n, or √(p(1−p)/n)."},boot:{answer:"Bootstrap (percentile / BCa)",why:"Resample the independent unit. Use a block bootstrap for time series."},hier:{answer:"Hierarchical model / empirical-Bayes shrinkage",why:"Partial pooling stabilises the small groups (as Meridian does for geos)."},bayes:{answer:"Bayesian posterior (e.g. Beta–Binomial)",why:"Gives direct probability statements. Show prior sensitivity."},power:{answer:"Power analysis: n ≈ 7.85·σ²/δ² per arm (α = 0.05, 80% power)",why:"Or simulate for complex designs. Translate into whole weeks."},cluster:{answer:"k-means (standardised features) / GMM / hierarchical clustering",why:"Choose k with the elbow + silhouette + business usefulness. Validate stability."},decide:{q:"What kind of decision?",options:[{label:"Split a budget across channels",next:"alloc"},{label:"Pick a variant to show",next:"bandit"},{label:"Act under uncertainty / compare plans",next:"mc"}]},alloc:{answer:"Optimise the response curves: equalise marginal ROI (Meridian BudgetOptimizer)",why:"A convex problem for concave curves. Use bounds (±30% default) and test big moves."},mc:{answer:"Monte Carlo over posterior draws (common random numbers)",why:"Report the expected uplift, P(better) and the downside quantile."}},o=L(["start"]),u=O(()=>i[o.value[o.value.length-1]]);function d(a){o.value.push(a)}function m(){o.value.length>1&&o.value.pop()}function n(){o.value=["start"]}return(a,E)=>(s(),r("div",null,[l("div",Mt,[(s(!0),r(w,null,C(o.value,(f,x)=>(s(),r("span",{key:x},v(x?"›":"")+" "+v(i[f].q??i[f].answer),1))),128))]),u.value.q?(s(),r(w,{key:0},[l("div",Dt,v(u.value.q),1),l("div",Ut,[(s(!0),r(w,null,C(u.value.options,f=>(s(),A(U,{key:f.label,variant:"outlined",color:"primary",class:"justify-start text-left",style:{height:"auto",padding:"10px 16px","white-space":"normal"},onClick:x=>d(f.next)},{default:R(()=>[$(v(f.label),1)]),_:2},1032,["onClick"]))),128))])],64)):(s(),A(oe,{key:1,color:"success",variant:"tonal",icon:"mdi-check-decagram",class:"mb-2"},{default:R(()=>[l("div",Bt,v(u.value.answer),1),b(I,{source:u.value.why??""},null,8,["source"])]),_:1})),l("div",Pt,[o.value.length>1?(s(),A(U,{key:0,variant:"text","prepend-icon":"mdi-arrow-left",onClick:m},{default:R(()=>[...E[0]||(E[0]=[$("Back",-1)])]),_:1})):T("",!0),o.value.length>1?(s(),A(U,{key:1,variant:"text","prepend-icon":"mdi-restore",onClick:n},{default:R(()=>[...E[1]||(E[1]=[$("Start over",-1)])]),_:1})):T("",!0)])]))}}),Ft={class:"d-flex align-start ga-2 mb-2"},Wt={class:"card-title flex-grow-1"},Vt={class:"card-list mb-3"},Gt={class:"card-list mb-3"},Ht={key:5,class:"d-flex flex-wrap ga-2 mt-3"},zt=q({__name:"RevisionCard",props:{card:{},quiz:{type:Boolean}},setup(t){const i=t,o=L(!1);G(()=>i.quiz,()=>o.value=!1);const u=O(()=>i.quiz&&!o.value),d=O(()=>{var a;const n=(a=i.card.verify)==null?void 0:a.expectedOutput;return(n==null?void 0:n.kind)==="table"?{name:"Output",columns:n.columns,rows:n.rows}:null}),m=O(()=>[...(i.card.practice??[]).map(n=>{var a;return{id:n,title:((a=fe[n])==null?void 0:a.title)??n,to:`/challenge/${n}`,icon:"mdi-code-braces"}}),...(i.card.lessons??[]).map(n=>{var a;return X[n]?{id:n,title:X[n].title,to:`/lesson/${n}`,icon:"mdi-school-outline"}:{id:n,title:((a=ye[n])==null?void 0:a.title)??n,to:`/python/${n}`,icon:"mdi-language-python"}})]);return(n,a)=>{const E=z("router-link");return s(),A(V,{id:t.card.id,class:"pa-5 revision-card"},{default:R(()=>{var f,x;return[l("div",Ft,[l("h4",Wt,v(t.card.title),1),b(E,{to:{hash:`#${t.card.id}`,force:!0},class:"anchor","aria-label":`Link to ${t.card.title}`},{default:R(()=>[...a[1]||(a[1]=[$("#",-1)])]),_:1},8,["to","aria-label"])]),t.card.kind==="question"?(s(),A(I,{key:0,source:t.card.prompt,class:"card-prose mb-3"},null,8,["source"])):t.card.when?(s(),A(I,{key:1,source:t.card.when,class:"card-prose text-body-2 text-muted mb-3"},null,8,["source"])):T("",!0),u.value?(s(),A(U,{key:2,color:"primary",variant:"tonal",size:"small","prepend-icon":"mdi-eye-outline",onClick:a[0]||(a[0]=p=>o.value=!0)},{default:R(()=>[...a[2]||(a[2]=[$("Reveal",-1)])]),_:1})):t.card.kind==="reference"?(s(),r(w,{key:3},[t.card.component==="MethodChooser"?(s(),A(qt,{key:0,class:"mb-4"})):T("",!0),b(I,{source:t.card.body,class:"card-prose"},null,8,["source"]),d.value?(s(),A(J,{key:1,table:d.value,output:"",class:"mt-3"},null,8,["table"])):T("",!0)],64)):(s(),r(w,{key:4},[a[7]||(a[7]=l("div",{class:"section-label mb-1"},"Approach",-1)),b(I,{source:t.card.approach,class:"card-prose mb-3"},null,8,["source"]),t.card.answer?(s(),r(w,{key:0},[a[3]||(a[3]=l("div",{class:"section-label mb-1"},"Answer",-1)),b(I,{source:t.card.answer,class:"card-prose mb-3"},null,8,["source"])],64)):T("",!0),t.card.solution?(s(),A(Ae,{key:1,code:t.card.solution.code,lang:t.card.solution.lang,title:"Solution",class:"mb-3"},null,8,["code","lang"])):T("",!0),d.value?(s(),A(J,{key:2,table:d.value,output:"",class:"mb-4"},null,8,["table"])):t.card.output?(s(),r(w,{key:3},[a[4]||(a[4]=l("div",{class:"section-label mb-1"},"Output",-1)),b(I,{source:t.card.output,class:"card-prose mb-3"},null,8,["source"])],64)):T("",!0),(f=t.card.pitfalls)!=null&&f.length?(s(),r(w,{key:4},[a[5]||(a[5]=l("div",{class:"section-label mb-1"},"Pitfalls",-1)),l("ul",Vt,[(s(!0),r(w,null,C(t.card.pitfalls,p=>(s(),r("li",{key:p},[b(I,{source:p,inline:""},null,8,["source"])]))),128))])],64)):T("",!0),(x=t.card.followUps)!=null&&x.length?(s(),r(w,{key:5},[a[6]||(a[6]=l("div",{class:"section-label mb-1"},"Follow-ups",-1)),l("ul",Gt,[(s(!0),r(w,null,C(t.card.followUps,p=>(s(),r("li",{key:p},[b(I,{source:p,inline:""},null,8,["source"])]))),128))])],64)):T("",!0)],64)),!u.value&&m.value.length?(s(),r("div",Ht,[(s(!0),r(w,null,C(m.value,p=>(s(),A(re,{key:p.id,to:p.to,"prepend-icon":p.icon,size:"small",variant:"tonal",label:"",class:"link-chip"},{default:R(()=>[$(v(p.title),1)]),_:2},1032,["to","prepend-icon"]))),128))])):T("",!0)]}),_:1},8,["id"])}}}),Yt=H(zt,[["__scopeId","data-v-7d4d9538"]]),jt={class:"part"},Qt=q({__name:"RevisionToc",props:{parts:{},active:{},expanded:{type:Boolean}},emits:["navigate"],setup(t,{emit:i}){const o=t,u=i,d=n=>o.active===n.id||n.cards.some(a=>a.id===o.active),m=L();return G(()=>o.active,async()=>{var x,p,B;await ge();const n=(x=m.value)==null?void 0:x.parentElement,a=((p=m.value)==null?void 0:p.querySelector(".card.is-active"))??((B=m.value)==null?void 0:B.querySelector(".section.is-active"));if(!n||!a)return;const E=n.getBoundingClientRect(),f=a.getBoundingClientRect();(f.top<E.top||f.bottom>E.bottom)&&(n.scrollTop+=f.top-E.top-n.clientHeight/3)}),(n,a)=>{const E=z("router-link");return s(),r("nav",{ref_key:"root",ref:m,class:"toc","aria-label":"On this page"},[a[2]||(a[2]=l("div",{class:"section-label mb-2"},"On this page",-1)),(s(!0),r(w,null,C(t.parts,f=>(s(),r("div",{key:f.id,class:"mb-3"},[l("div",jt,v(f.title),1),(s(!0),r(w,null,C(f.sections,x=>(s(),r(w,{key:x.id},[b(E,{to:{hash:`#${x.id}`,force:!0},class:W(["entry section",{"is-active":d(x)}]),onClick:a[0]||(a[0]=p=>u("navigate"))},{default:R(()=>[$(v(x.title),1)]),_:2},1032,["to","class"]),t.expanded||d(x)?(s(!0),r(w,{key:0},C(x.cards,p=>(s(),A(E,{key:p.id,to:{hash:`#${p.id}`,force:!0},class:W(["entry card",{"is-active":t.active===p.id}]),onClick:a[1]||(a[1]=B=>u("navigate"))},{default:R(()=>[$(v(p.title),1)]),_:2},1032,["to","class"]))),128)):T("",!0)],64))),128))]))),128))],512)}}}),ae=H(Qt,[["__scopeId","data-v-f9b2be3a"]]),Kt=we({inset:Boolean,...Ne({transition:"bottom-sheet-transition"})},"VBottomSheet"),Xt=be()({name:"VBottomSheet",props:Kt(),emits:{"update:modelValue":t=>!0},setup(t,i){let{slots:o}=i;const u=ve(t,"modelValue");return ke(()=>{const d=Z.filterProps(t);return b(Z,Ee(d,{contentClass:["v-bottom-sheet__content",t.contentClass],modelValue:u.value,"onUpdate:modelValue":m=>u.value=m,class:["v-bottom-sheet",{"v-bottom-sheet--inset":t.inset},t.class],style:t.style}),o)}),{}}}),Jt={key:0},Zt={class:"d-flex flex-wrap ga-2 mb-5"},es={class:"text-h4 font-weight-bold mb-1"},ts={key:0,class:"text-body-2 text-muted mb-4"},ss={class:"d-flex flex-wrap align-center ga-4 mb-6"},as={class:"doc-layout"},is={class:"doc-content"},ns={class:"section-label part-title mb-4"},os=["id"],rs={class:"d-flex flex-column ga-4"},ds={key:1,class:"mb-8"},ls={key:0,class:"doc-toc"},cs={key:1},us={class:"text-h4 font-weight-bold mb-1"},hs={class:"text-muted mb-5"},ms={class:"font-weight-bold mb-1"},ps={class:"text-body-2 text-muted mb-2"},fs={class:"text-caption text-muted"},ys=q({__name:"RevisionLibrary",props:{id:{},subjects:{},basePath:{},title:{},intro:{},drillsFor:{type:Function},heading:{type:Function},companion:{type:Function}},setup(t){const i=t,{lgAndUp:o,mdAndUp:u}=xe(),d=O(()=>i.subjects.find(k=>k.id===i.id)),m=O(()=>{var k;return d.value?(k=i.companion)==null?void 0:k.call(i,d.value):void 0}),n=L(""),a=L(!1),E=L(!1),f=L(),x=O(()=>{var k;return(((k=d.value)==null?void 0:k.parts)??[]).map(c=>({...c,sections:c.sections.map(_=>({..._,cards:_.cards.filter(M=>se(`${_.title} ${_t(M)}`.toLowerCase(),n.value))})).filter(_=>_.cards.length)})).filter(c=>c.sections.length)}),p=O(()=>d.value&&i.drillsFor?i.drillsFor(d.value.id).filter(k=>se(Ct(k),n.value)):[]),B=O(()=>!x.value.length&&!p.value.length),Y=O(()=>{const k=x.value.map(c=>({id:c.id,title:c.title,sections:c.sections.map(_=>({id:_.id,title:_.title,cards:_.cards.map(M=>({id:M.id,title:M.title}))}))}));return p.value.length&&k.push({id:"quick-fire-part",title:"Quick-fire",sections:[{id:"quick-fire",title:`All cards (${p.value.length})`,cards:[]}]}),k}),ue=O(()=>[...x.value.flatMap(k=>k.sections.flatMap(c=>c.cards.map(_=>_.id))),...p.value.length?["quick-fire"]:[]]),j=$t(ue),he=k=>{var c;return Nt(k).length+(((c=i.drillsFor)==null?void 0:c.call(i,k.id).length)??0)};function Q(k){var _;const c=k.target;k.key!=="/"||!d.value||c.closest("input, textarea, [contenteditable]")||(k.preventDefault(),(_=f.value)==null||_.focus())}return ie(()=>window.addEventListener("keydown",Q)),ne(()=>window.removeEventListener("keydown",Q)),(k,c)=>{var M;const _=z("router-link");return d.value?(s(),r("div",Jt,[l("div",Zt,[(s(!0),r(w,null,C(t.subjects,y=>(s(),A(re,{key:y.id,to:`${t.basePath}/${y.id}`,"prepend-icon":y.icon,color:y.id===d.value.id?"primary":void 0,variant:y.id===d.value.id?"flat":"outlined",label:""},{default:R(()=>[$(v(y.title),1)]),_:2},1032,["to","prepend-icon","color","variant"]))),128))]),l("h1",es,v(((M=t.heading)==null?void 0:M.call(t,d.value))??d.value.title),1),l("p",{class:W(["text-muted",m.value?"mb-1":"mb-4"])},v(d.value.summary),3),m.value?(s(),r("p",ts,[$(v(m.value.prompt)+" ",1),b(_,{to:m.value.to,class:"text-primary"},{default:R(()=>[$(v(m.value.label)+" →",1)]),_:1},8,["to"])])):T("",!0),l("div",ss,[b(Se,{ref_key:"searchBox",ref:f,"model-value":n.value,"prepend-inner-icon":"mdi-magnify",label:P(u)?"Search this page (press /)":"Search this page",density:"compact","hide-details":"",clearable:"",class:"search","onUpdate:modelValue":c[0]||(c[0]=y=>n.value=y??"")},null,8,["model-value","label"]),b(Te,{modelValue:a.value,"onUpdate:modelValue":c[1]||(c[1]=y=>a.value=y),label:"Quiz me",color:"primary",density:"compact","hide-details":"",inset:""},null,8,["modelValue"])]),l("div",as,[l("div",is,[B.value?(s(),A(oe,{key:0,type:"info",variant:"tonal"},{default:R(()=>[$('No cards match "'+v(n.value)+'".',1)]),_:1})):T("",!0),(s(!0),r(w,null,C(x.value,y=>(s(),r("section",{key:y.id,class:"mb-8"},[l("h2",ns,v(y.title),1),(s(!0),r(w,null,C(y.sections,F=>(s(),r("div",{key:F.id,class:"mb-6"},[l("h3",{id:F.id,class:"text-h6 font-weight-bold mb-3"},v(F.title),9,os),l("div",rs,[(s(!0),r(w,null,C(F.cards,K=>(s(),A(Yt,{key:K.id,card:K,quiz:a.value},null,8,["card","quiz"]))),128))])]))),128))]))),128)),p.value.length?(s(),r("section",ds,[c[5]||(c[5]=l("h2",{class:"section-label part-title mb-4"},"Quick-fire",-1)),b(Lt,{id:"quick-fire",cards:p.value,quiz:a.value},null,8,["cards","quiz"])])):T("",!0)]),P(o)?(s(),r("aside",ls,[b(ae,{parts:Y.value,active:P(j),expanded:!!n.value},null,8,["parts","active","expanded"])])):T("",!0)]),P(o)?T("",!0):(s(),r(w,{key:1},[b(U,{class:"toc-fab",color:"primary","prepend-icon":"mdi-format-list-bulleted",elevation:"4",rounded:"pill",onClick:c[2]||(c[2]=y=>E.value=!0)},{default:R(()=>[...c[6]||(c[6]=[$("Contents",-1)])]),_:1}),b(Xt,{modelValue:E.value,"onUpdate:modelValue":c[4]||(c[4]=y=>E.value=y)},{default:R(()=>[b(V,{class:"pa-4 sheet-card"},{default:R(()=>[b(ae,{parts:Y.value,active:P(j),expanded:!!n.value,onNavigate:c[3]||(c[3]=y=>E.value=!1)},null,8,["parts","active","expanded"])]),_:1})]),_:1},8,["modelValue"])],64))])):(s(),r("div",cs,[l("h1",us,v(t.title),1),l("p",hs,v(t.intro),1),b(_e,null,{default:R(()=>[(s(!0),r(w,null,C(t.subjects,y=>(s(),A(Ce,{key:y.id,cols:"12",sm:"6",lg:"4"},{default:R(()=>[b(V,{to:`${t.basePath}/${y.id}`,class:"pa-5 h-100"},{default:R(()=>[b(Re,{icon:y.icon,color:y.color,size:"28",class:"mb-2"},null,8,["icon","color"]),l("div",ms,v(y.title),1),l("div",ps,v(y.summary),1),l("div",fs,v(he(y))+" cards",1)]),_:2},1032,["to"])]),_:2},1024))),128))]),_:1})]))}}}),Is=H(ys,[["__scopeId","data-v-08b81f58"]]);export{Is as R,$s as d,_s as f,Cs as s};
