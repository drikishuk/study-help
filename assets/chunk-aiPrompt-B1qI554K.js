const a="You are a senior Google interviewer assessing a candidate for an L6 Business Data Scientist (Tech Lead / Manager) role on a Marketing Mix Modelling team. Be direct, specific and encouraging, and hold the bar of an L6 hire.",s=`Finish with:
- **Score: X/5** (5 = strong L6 hire signal, 3 = borderline, 1 = no hire)
- **The single most important fix** (one sentence)
- **A model answer or corrected version**, kept concise`;function r(e,t){const i=e.lang==="python"?"Python":"SQL (BigQuery / GoogleSQL)",n=(e.tables??[]).map(o=>`Table \`${o.name}\`(${o.columns.join(", ")})${o.description?` — ${o.description}`:""}`).join(`
`);return`${a}

This is a **${i} coding question** (${e.difficulty}). In the real interview the candidate writes code in a shared Google Doc: the code is not run, and libraries may not be available. Judge it as an interviewer reading it would.

## Question
${e.prompt}
${n?`
## Tables
${n}
`:""}${e.setup?`
## Input data
\`\`\`python
${e.setup}
\`\`\`
`:""}
## Candidate's answer
\`\`\`${e.lang}
${t.trim()||"(no answer written)"}
\`\`\`

## Please assess
1. **Correctness**: does it produce the right result? Trace through it on the sample data. List any bugs, including syntax errors that would matter.
2. **Edge cases**: nulls, duplicates, empty groups, divide-by-zero, ties.
3. **Efficiency at Google scale**: would this work on billions of rows? Name any better approach.
4. **Readability and idiom**: naming, structure, and idiomatic ${e.lang==="python"?"Python/pandas":"SQL"}.
5. **How to talk it through**: what should the candidate say out loud while writing this?
6. **Coaching for a beginner**: explain any concept they seem shaky on in plain English, with a tiny example.

${s}`}function d(e,t,i){var n;return`${a}

This is a **statistics / data science theory question**${i?` on *${i.title}*`:""}. The candidate answered it in writing, as if speaking to the interviewer.

## Question
${e.prompt}

## Candidate's answer
${t.trim()||"(no answer written)"}

## Please assess
1. **Technical accuracy**: anything wrong, imprecise or missing?
2. **Method choice and rationale**: did they justify *why*, and name the assumptions?
3. **Clarity**: would a non-technical stakeholder follow it? Would an expert respect it?
4. **L6 signal**: did they scope the problem, name trade-offs, and connect it to business impact and scale?
${(n=e.keyPoints)!=null&&n.length?`
A strong answer usually covers: ${e.keyPoints.join("; ")}.
`:""}
${s}`}function l(e,t){return`${a}

The candidate just studied **${e.title}** and is explaining it back in their own words (the Feynman technique).

## Their explanation
${t.trim()||"(nothing written)"}

## Please assess
1. What did they get **right**?
2. What is **wrong or fuzzy**? Correct it gently, with a plain-English explanation and a tiny example.
3. What **important piece is missing** for an interview at L6 level?
4. Ask **two follow-up questions** an interviewer would ask next, and wait for their answers before giving model answers.

${s}`}function h(e,t){return`${a}

This is a **data intuition / business case** question. The real interview is conversational: the candidate should clarify, state assumptions, translate the business question into an analysis, and land on a recommendation.

## Case
${e.prompt}

## Candidate's written answer
${t.trim()||"(no answer written)"}

## Please assess
1. **Clarifying questions**: did they ask the right ones before diving in? Which did they miss?
2. **Structure**: is the path from goal → metrics → method → analysis → recommendation clear?
3. **Statistical rigour**: is the method right (experiment vs observational, test choice, bias, power)?
4. **Think at scale and focus on the user**: did they consider Google-scale data and the user experience?
5. **Recommendation**: is it actionable, with risks and next steps?
6. **L6 signal**: prioritisation, trade-offs, stakeholder framing.

Then **role-play the interviewer**: ask one sharp follow-up question and wait for the answer.

${s}`}function c(e,t,i){return`${a}

This is a **leadership / people management** question for an L6 Tech Lead Manager. The candidate drafted a STAR story (Situation, Task, Action, Result).

## Theme
${e}${i?`

Interview questions: ${i.questions.map(n=>`"${n}"`).join(", ")}`:""}

## Candidate's story
${t.trim()||"(no story written)"}

## Please assess
1. **STAR structure**: is each part clear? Is the *Action* about what *they* did (not "we")?
2. **Scope and L6 signal**: does it show leading through others, influence across teams, setting direction, and handling ambiguity, at the right scope for L6?
3. **Impact**: is the result quantified? Is the business impact clear?
4. **Reflection**: do they say what they learned or would do differently?
5. **Delivery**: tighten it to a 2-minute spoken version.
6. **Follow-ups**: list three probing follow-ups an interviewer would ask.

${s}`}async function u(e){try{return await navigator.clipboard.writeText(e),!0}catch{const t=document.createElement("textarea");t.value=e,document.body.appendChild(t),t.select();const i=document.execCommand("copy");return document.body.removeChild(t),i}}export{u as a,h as b,r as c,l as e,c as s,d as t};
