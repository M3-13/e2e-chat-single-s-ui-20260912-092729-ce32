import { calculateTip } from './calc.js';

const fields = {
  amount: document.getElementById('amount'),
  percent: document.getElementById('percent'),
  people: document.getElementById('people'),
};

const outputs = {
  tip: document.getElementById('tip-value'),
  total: document.getElementById('total-value'),
  perPerson: document.getElementById('per-person-value'),
};

const PLACEHOLDER = '–';

function formatEuro(value) {
  return value.toFixed(2).replace('.', ',') + ' €';
}

function render() {
  const amount = parseFloat(fields.amount.value);
  const percent = parseFloat(fields.percent.value);
  const people = parseFloat(fields.people.value);

  const result = calculateTip(amount, percent, people);

  if (result === null) {
    outputs.tip.textContent = PLACEHOLDER;
    outputs.total.textContent = PLACEHOLDER;
    outputs.perPerson.textContent = PLACEHOLDER;
    outputs.tip.classList.add('is-placeholder');
    outputs.total.classList.add('is-placeholder');
    outputs.perPerson.classList.add('is-placeholder');
    return;
  }

  outputs.tip.textContent = formatEuro(result.tip);
  outputs.total.textContent = formatEuro(result.total);
  outputs.perPerson.textContent = formatEuro(result.perPerson);
  outputs.tip.classList.remove('is-placeholder');
  outputs.total.classList.remove('is-placeholder');
  outputs.perPerson.classList.remove('is-placeholder');
}

for (const input of Object.values(fields)) {
  input.addEventListener('input', render);
}

render();
