fetch('nothing.php')
  .then(response => {
    if (response.ok) { return response.text(); }
    throw new Error(response.statusText);
  })
  .then(text => console.log(text))
  .catch(err => console.error(err.message));