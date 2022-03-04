export const serverFailRes = (error) => {
  if (
    error.response &&
    error.response.data &&
    error.response.data.errorMessage
  ) {
    return {
      status: false,
      errorMessage: error.response.data.errorMessage,
    };
  }

  return {
    status: false,
    errorMessage: "Internal server error. Please check your server.",
  };
};

export const serverSuccessRes = (res) => {
  return {
    status: true,
    data: res.data,
  };
};
