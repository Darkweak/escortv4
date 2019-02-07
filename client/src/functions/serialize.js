export const serializeForm = (elements) => {
  let form = {};
  for (let i = 0; i < elements.length; i++) {
    if (elements[i].value)
      form[elements[i].name] = elements[i].value;
  }
  return form;
};

export const resetForm = (form) => {
  document.getElementById(form).reset();
}
