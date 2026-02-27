export function updateForm(form) {
  return new Promise(resolve => {
    setTimeout(() => {
      const errors = [];
      if (form.title === '') { errors.push('書名は必須です。'); }
      if (form.price < 0) { errors.push('価格は0以上でなければなりません。'); }
      if (form.published === '') { errors.push('刊行日は必須です。'); }
      if (errors.length > 0) {
        resolve({ errors });
      } else {
        resolve({ result: form, errors: null });
      }
    }, 1000);
  });
}