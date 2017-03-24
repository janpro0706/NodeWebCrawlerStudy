import { execSync } from 'child_process';
import fs from 'fs';

export default function() {
  this.parse = (text, cb) => {
    text += '\n';

    fs.writeFileSync('TMP_INPUT_FILE', text, 'UTF-8');

    const cmd = [
      'mecab',
      'TMP_INPUT_FILE',
      '--output=TMP_OUTPUT_FILE'
    ].join(' ');

    const opt = { encoding: 'UTF-8' };
    let res = [];

    try {
      execSync(cmd, opt);
      res = fs.readFileSync('TMP_OUTPUT_FILE', 'UTF-8');
    } catch (e) {
      console.log(e);
    }

    res = res.replace(/\r/g, '');
    res = res.replace(/\s+$/, '');
    const lines = res.split('\n');

    res = lines.map((l) => l.replace('\t', ',').split(','));

    // console.log(res);

    if (cb) {
      cb(res);
    } else {
      return res;
    }
  };
};
