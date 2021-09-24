function logForm() {
  const $form = $('form') || [];
  const form = $form[0];

  if (!form) {
    console.log('[logForm] No form element found!');
    return;
  }

  const formData = new FormData(form);
  const output = [];
  let numFields = 0;
  let line;

  for (let [key, val] of formData) {
    output.push(`${key.padEnd(40)}:  "${val}"`);
    //console.log('%o: %o', key, val);
  }

  console.log('\n%s\n', output.join('\n'));
}
