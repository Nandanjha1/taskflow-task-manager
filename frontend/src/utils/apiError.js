export const getApiErrorMessage = (error) => {
  // No response means network/server connection issue
  if (!error.response) {
    return "Unable to connect to the server.";
  }

  const status = error.response.status;
  const data = error.response.data;

  // FastAPI validation error
  if (status === 422) {
    if (Array.isArray(data?.detail)) {
      return data.detail
        .map((item) => item.msg)
        .join(", ");
    }

    return "Please check the entered data.";
  }

  if (status === 404) {
    return data?.detail || "Requested resource was not found.";
  }

  if (status === 400) {
    return data?.detail || "Invalid request.";
  }

  if (status >= 500) {
    return "Server error. Please try again later.";
  }

  return (
    data?.detail ||
    data?.message ||
    "Something went wrong."
  );
};