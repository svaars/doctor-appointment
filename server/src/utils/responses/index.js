const NewError = (code, message) => {
  return { code, message };
};

const CommonErrors = {
  BAD_REQUEST: NewError(400, "Bad request"),
  UNAUTHORIZED: NewError(401, "Unauthorized"),
  FORBIDDEN: NewError(403, "Forbidden"),
  NOT_FOUND: NewError(404, "Not found"),
  TIMEOUT: NewError(408, "Request timeout"),
  INTERNAL_ERROR: NewError(500, "Internal Error!"),
};

const RespondError = (res, error={code:500, message:"Internal Error"}, more) => {
  const response = {};
  res.statusCode = error?(error.code || 500):500;
  response.message = error.message || "Some error occured!";
  more && (response.more = more);

  res.send(response);
};

const CustomError = { NewError, CommonErrors, RespondError };

module.exports = { ...CustomError };
