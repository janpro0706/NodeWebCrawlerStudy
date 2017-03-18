import fs from 'fs';

const RANGE = 7;
const ALPHA = 2 / (RANGE + 1);
const sumPredicts = (rows, from, to) => {
  let sum = 0;
  for (let i = from; i < to; i++) {
    sum += rows[i][1];
  }
  return sum / (to - from);
};

const data = fs.readFileSync('TEMP.csv', 'utf-8');
const lines = data.split('\n');

const res = lines.map((l, i) => {
  const cell = l.split(',');
  if (cell[0] && cell[1]) {
    const date = cell[0].split('-').splice(1, 2).join('-');
    const temp = parseFloat(cell[1]);

    return [ date, temp ];
  } else {
    return null;
  }
})
.filter(l => l != null)
.reduce((newRows, row, i, rows) => {
  // calc MA
  const tempMA = (i < RANGE ? rows[i][1] : sumPredicts(newRows, i - RANGE, i));
  // calc EMA
  const tempEMA = (i == 0 ? rows[i][1] : newRows[i - 1][3] + ALPHA * (rows[i - 1][1] - newRows[i - 1][3]));

  return [ ...newRows, [ ...row, Number(tempMA.toFixed(2)), Number(tempEMA.toFixed(2)) ]];
}, []);

fs.writeFileSync('TEMP.js', `var tempData = ${JSON.stringify(res)};`, 'utf-8');
