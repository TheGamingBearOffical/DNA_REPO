// This file acts as our sophisticated algorithm, mapping genetic markers to actionable advice.
const interpretationMap = {
  FTO: {
    'high-sensitivity': {
      trait: 'Fat Sensitivity',
      category: 'Macronutrients',
      summary: 'You have a high genetic sensitivity to saturated fats. Your body may struggle to process them, leading to a higher risk of weight gain and elevated LDL ("bad") cholesterol.',
      plan: [
        'Strictly limit saturated fats found in red meat, processed meats, butter, and full-fat dairy.',
        'Prioritize monounsaturated fats (avocado, olive oil, almonds) and polyunsaturated fats (walnuts, flaxseed, fatty fish).',
        'Avoid fried foods and opt for baking, grilling, or steaming.',
      ],
    },
    normal: {
      trait: 'Fat Sensitivity',
      category: 'Macronutrients',
      summary: 'Your genetic profile indicates a standard response to dietary fats. You can follow general healthy eating guidelines for fat intake.',
      plan: ['Maintain a balanced intake of healthy fats from sources like olive oil, nuts, and fish.', 'Monitor your intake of saturated and trans fats as part of a generally healthy diet.'],
    },
  },
  AMY1: {
    'low-copy': {
      trait: 'Carbohydrate Sensitivity',
      category: 'Macronutrients',
      summary: 'You have a low copy number of the AMY1 gene, making you less efficient at digesting starches. High-carb meals may lead to blood sugar spikes and weight gain.',
      plan: [
        'Limit refined carbohydrates like white bread, white pasta, and sugary snacks.',
        'Focus carbohydrate intake on high-fiber vegetables, legumes, and small portions of whole grains like quinoa or oats.',
        'Pair any carbohydrate with protein and healthy fat to slow down glucose absorption.',
      ],
    },
    'high-copy': {
      trait: 'Carbohydrate Sensitivity',
      category: 'Macronutrients',
      summary: 'Your genetics suggest you are efficient at digesting carbohydrates. Your body can likely handle a higher proportion of healthy, complex carbohydrates in your diet.',
      plan: ['Your diet can comfortably include whole grains like brown rice, whole-wheat bread, and oats.', 'Continue to prioritize complex, high-fiber carbohydrates over simple sugars for sustained energy.'],
    },
  },
  LCT: {
    variant: {
      trait: 'Lactose Intolerance',
      category: 'Sensitivities',
      summary: 'Your genetic result indicates a high likelihood of lactose intolerance. Your body likely produces little to no lactase, the enzyme needed to digest milk sugar.',
      plan: [
        'Avoid or strictly limit dairy products like milk, cheese, and yogurt.',
        'Switch to lactose-free alternatives such as almond milk, soy milk, oat milk, or lactose-free dairy products.',
        'Be mindful of hidden dairy in sauces, dressings, and baked goods.',
      ],
    },
    normal: {
      trait: 'Lactose Tolerance',
      category: 'Sensitivities',
      summary: 'You are likely lactose tolerant and can digest dairy products without issue.',
      plan: ['You can include dairy products in your diet. Choose low-fat or fat-free options for better heart health.'],
    },
  },
  MTHFR: {
    variant: {
      trait: 'Folate (Vitamin B9) Needs',
      category: 'Micronutrients',
      summary: 'You have a common MTHFR variation that reduces your ability to convert folate into its active form. This can impact energy levels and cardiovascular health.',
      plan: [
        'Emphasize folate-rich foods: leafy greens (spinach, kale), lentils, beans, and asparagus.',
        'If considering a supplement, look for the methylated form (L-methylfolate or 5-MTHF) as it is already in the active state.',
        'Ensure adequate intake of other B vitamins (B6, B12) which work with folate.',
      ],
    },
    normal: {
      trait: 'Folate (Vitamin B9) Needs',
      category: 'Micronutrients',
      summary: 'Your body is efficient at processing folate. A standard, balanced diet should meet your needs.',
      plan: ['Continue to consume a variety of foods, including leafy greens and legumes, to meet your folate requirements.'],
    },
  },
  CYP1A2: {
    slow: {
      trait: 'Caffeine Metabolism',
      category: 'Lifestyle',
      summary: 'You are a "slow" caffeine metabolizer. Caffeine stays in your system longer, which can lead to jitteriness, anxiety, and sleep disruption.',
      plan: ['Limit caffeine intake to a maximum of 200mg per day (approx. 1-2 small cups of coffee).', 'Avoid consuming caffeine after 12 PM to prevent interference with sleep.', 'Be aware of hidden caffeine in tea, chocolate, and some medications.'],
    },
    fast: {
      trait: 'Caffeine Metabolism',
      category: 'Lifestyle',
      summary: 'You are a "fast" caffeine metabolizer. Your body processes caffeine efficiently.',
      plan: ['You can likely tolerate a moderate intake of caffeine (up to 400mg per day) without adverse effects.', 'Pay attention to your own body\'s response, as other factors can still influence your sensitivity.'],
    },
  },
  APOE: {
    'e3/e4': {
      trait: 'Cholesterol & Heart Health Risk',
      category: 'Metabolic Health',
      summary: 'You carry one copy of the APOE4 allele, which is associated with a higher risk for elevated LDL cholesterol and cardiovascular issues.',
      plan: [
        'Adopt a heart-healthy diet low in saturated fats and cholesterol.',
        'Increase intake of soluble fiber (oats, apples, beans) and omega-3 fatty acids (salmon, walnuts).',
        'Regular cardiovascular exercise is strongly recommended to manage cholesterol levels.',
        'Consult with a healthcare provider for regular cholesterol screenings.',
      ],
    },
    'e2/e3': {
      trait: 'Cholesterol & Heart Health Risk',
      category: 'Metabolic Health',
      summary: 'Your APOE genotype is generally associated with average or lower-than-average cholesterol levels. However, a healthy lifestyle is still crucial.',
      plan: ['Follow standard guidelines for a heart-healthy diet, focusing on whole foods, lean proteins, and healthy fats.'],
    },
    'e3/e3': {
      trait: 'Cholesterol & Heart Health Risk',
      category: 'Metabolic Health',
      summary: 'You have the most common APOE genotype, which is considered "neutral" regarding genetic risk for cholesterol issues.',
      plan: ['A balanced diet and regular exercise are effective for maintaining your cardiovascular health.'],
    },
  },
};

/**
 * Processes a user's genetic markers (SNPs) and generates their full report.
 * @param {object} snps - An object where keys are gene names and values are the variant.
 * @returns {Array} An array of interpreted trait objects.
 */
function generateReport(snps) {
  const interpretedTraits = [];
  for (const [gene, variant] of Object.entries(snps)) {
    if (interpretationMap[gene] && interpretationMap[gene][variant]) {
      interpretedTraits.push(interpretationMap[gene][variant]);
    }
  }
  return interpretedTraits;
}

module.exports = { generateReport };