export function calculateTip(amount, percent, people) {
  if (
    !Number.isFinite(amount) ||
    !Number.isFinite(percent) ||
    !Number.isFinite(people)
  ) {
    return null;
  }

  if (amount < 0 || percent < 0) {
    return null;
  }

  if (!Number.isInteger(people) || people < 1) {
    return null;
  }

  const tip = Math.round((amount * percent) / 100 * 100) / 100;
  const total = Math.round((amount + tip) * 100) / 100;
  const perPerson = Math.round((total / people) * 100) / 100;

  return { tip, total, perPerson };
}
