export const enum AccountViewType {
  Account = 0,
  Login = 1,
  Signup = 2,
}

export const enum TestStatus {
  Idle = 0,
  Running = 1,
  Complete = 2,
}

export const charRegex = (key: string) => {
  return /^[a-zA-Z0-9 ,./?;:'"-_]$/i.test(key);
};
