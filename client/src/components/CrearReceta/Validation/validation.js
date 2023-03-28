export const validationsForm = (input) => {
  let errors = {};

  let regexString = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;

  if (!input.title.trim()) {
    errors.name = "Title is required";
  } else if (!regexString.test(input.title.trim())) {
    errors.name = "Title must be only letters";
  } else if (input.name.length > 80 || input.name.length < 3) {
    errors.name = "Title must be between 3 and 80 characters";
  }

  if (!input.summary.trim()) {
    errors.summary = "Summary is required";
  } else if (!regexString.test(input.summary.trim())) {
    errors.title = "Summary must be only letters";
  } else if (input.summary.length > 255 || input.summary.length < 3) {
    errors.summary = "Summary must be between 3 and 255 characters";
  }

  if (!input.healthScore) {
    errors.healthScore = "HealthScore is required";
  } else if (!Number.isInteger(Number(input.healthScore))) {
    errors.healthScore = "HealthScore must be an integer";
  } else if (input.healthScore < 1 || input.healthScore > 100) {
    errors.healthScore = "HealthScore must be between 1 and 100";
  }

  if (!input.steps.trim()) {
    errors.steps = "Steps is required";
  } else if (input.steps.length < 3 || input.steps.length > 1000) {
    errors.steps = "Steps must be between 3 and 1000 characters";
  }

  if (input.diets.length === 0) {
    errors.diets = "Diets is required";
  }
  return errors;
};
