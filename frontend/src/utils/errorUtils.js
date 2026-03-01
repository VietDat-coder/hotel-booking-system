export const getErrorMessage = (error) => {
  if (!error) return 'Unknown error';
  if (typeof error === 'string') return error;
  if (error.response && error.response.data) {
    const data = error.response.data;
    if (data.message) return data.message;
    if (Array.isArray(data.validationErrors) && data.validationErrors.length > 0) {
      return data.validationErrors[0];
    }
  }
  if (error.message) return error.message;
  return 'Unexpected error';
};

