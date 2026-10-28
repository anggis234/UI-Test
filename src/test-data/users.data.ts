export const VALID_USER = {
  username: process.env.STANDARD_USERNAME || "standard_user",
  password: process.env.STANDARD_PASSWORD || "secret_sauce",
};

export const LOCKED_USER = {
  username: "locked_out_user",
  password: "secret_sauce",
};

export const INVALID_USER = {
  username: "invalid_user",
  password: "invalid_password",
};
