import { SecurityAction, InvestmentScenario, BudgetCurvePoint } from '../types/investment';

/**
 * Solves the Security Investment Budget Problem (Bounded Knapsack / Greedy High-ROI Optimization).
 * Maximizes risk reduction points subject to totalBudgetINR.
 */
export function optimizeSecurityInvestment(
  actions: SecurityAction[],
  budgetINR: number,
  currentRiskScore: number
): InvestmentScenario {
  // Sort actions by ROI Efficiency (Risk points reduced per ₹100,000) descending
  const sortedActions = [...actions].sort((a, b) => {
    // Priority Tier bonus
    const tierWeightA = a.priorityTier === 'TIER_1_MUST_HAVE' ? 2.0 : a.priorityTier === 'TIER_2_HIGH_ROI' ? 1.4 : 1.0;
    const tierWeightB = b.priorityTier === 'TIER_1_MUST_HAVE' ? 2.0 : b.priorityTier === 'TIER_2_HIGH_ROI' ? 1.4 : 1.0;
    return (b.roiEfficiency * tierWeightB) - (a.roiEfficiency * tierWeightA);
  });

  let remainingBudget = budgetINR;
  const selectedActionIds: string[] = [];
  let totalModeledReduction = 0;
  let allocatedBudget = 0;

  for (const action of sortedActions) {
    if (action.costInINR <= remainingBudget) {
      selectedActionIds.push(action.id);
      allocatedBudget += action.costInINR;
      remainingBudget -= action.costInINR;
      totalModeledReduction += action.estimatedRiskReduction;
    }
  }

  // Diminishing returns dampening if reduction exceeds 75% of current risk
  const maxPossibleReduction = Math.max(0, currentRiskScore - 12); // Floor risk at 12 (residual baseline)
  const clampedReduction = Math.min(totalModeledReduction, maxPossibleReduction);
  const projectedRiskScore = Math.max(12, Math.round(currentRiskScore - clampedReduction));

  let projectedRiskBand: InvestmentScenario['projectedRiskBand'] = 'LOW';
  if (projectedRiskScore >= 75) projectedRiskBand = 'CRITICAL';
  else if (projectedRiskScore >= 55) projectedRiskBand = 'HIGH';
  else if (projectedRiskScore >= 35) projectedRiskBand = 'MEDIUM';
  else projectedRiskBand = 'LOW';

  const overallRoiScore = allocatedBudget > 0
    ? Math.round((clampedReduction / (allocatedBudget / 100000)) * 10) / 10
    : 0;

  return {
    scenarioName: `AI-Optimized Portfolio (₹${(budgetINR / 100000).toFixed(1)}L)`,
    totalBudgetINR: budgetINR,
    allocatedBudgetINR: allocatedBudget,
    unallocatedBudgetINR: remainingBudget,
    selectedActionIds,
    currentRiskScore,
    projectedRiskScore,
    totalModeledReduction: Math.round(clampedReduction * 10) / 10,
    overallRoiScore,
    projectedRiskBand
  };
}

/**
 * Calculates outcome for manual / custom user selected actions.
 */
export function calculateCustomScenario(
  actions: SecurityAction[],
  selectedActionIds: string[],
  budgetINR: number,
  currentRiskScore: number
): InvestmentScenario {
  const selectedActions = actions.filter(a => selectedActionIds.includes(a.id));
  const allocatedBudget = selectedActions.reduce((sum, a) => sum + a.costInINR, 0);
  const rawReduction = selectedActions.reduce((sum, a) => sum + a.estimatedRiskReduction, 0);

  const maxPossibleReduction = Math.max(0, currentRiskScore - 12);
  const clampedReduction = Math.min(rawReduction, maxPossibleReduction);
  const projectedRiskScore = Math.max(12, Math.round(currentRiskScore - clampedReduction));

  let projectedRiskBand: InvestmentScenario['projectedRiskBand'] = 'LOW';
  if (projectedRiskScore >= 75) projectedRiskBand = 'CRITICAL';
  else if (projectedRiskScore >= 55) projectedRiskBand = 'HIGH';
  else if (projectedRiskScore >= 35) projectedRiskBand = 'MEDIUM';
  else projectedRiskBand = 'LOW';

  const overallRoiScore = allocatedBudget > 0
    ? Math.round((clampedReduction / (allocatedBudget / 100000)) * 10) / 10
    : 0;

  return {
    scenarioName: 'Custom Allocation Sandbox',
    totalBudgetINR: budgetINR,
    allocatedBudgetINR: allocatedBudget,
    unallocatedBudgetINR: Math.max(0, budgetINR - allocatedBudget),
    selectedActionIds,
    currentRiskScore,
    projectedRiskScore,
    totalModeledReduction: Math.round(clampedReduction * 10) / 10,
    overallRoiScore,
    projectedRiskBand
  };
}

/**
 * Generates the Pareto Frontier / Diminishing Returns Curve across varying budgets (₹50k to ₹10L).
 */
export function generateBudgetOptimizationCurve(
  actions: SecurityAction[],
  currentRiskScore: number
): BudgetCurvePoint[] {
  const testBudgets = [
    50000, 100000, 150000, 200000, 300000, 400000, 500000, 600000, 750000, 900000, 1000000
  ];

  return testBudgets.map(budget => {
    const scenario = optimizeSecurityInvestment(actions, budget, currentRiskScore);
    return {
      budgetINR: budget,
      budgetFormatted: `₹${(budget / 100000).toFixed(1)}L`,
      projectedRiskScore: scenario.projectedRiskScore,
      actionsCount: scenario.selectedActionIds.length
    };
  });
}
