function logForm() {
  const form = document.querySelector('form');

  if (!form) {
    console.error('[logForm] No form element found!');
    return;
  }

  const formData = new FormData(form);
  const output = [];

  for (let [key, val] of formData) {
    output.push({ key, val });
  }

  console.table(output);
}
