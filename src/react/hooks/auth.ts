import { USER } from "../../apollo/queries";
import {
  UserDetailsQuery,
  UserDetailsQueryVariables,
} from "../../apollo/types";
import { hookFactory } from "../helpers/hookFactory";
import { hookStateFactory } from "../helpers/hookStateFactory";

/**
 * React hook to get authorization methods
 *
 * @returns Saleor's authorization methods
 */
export const useAuth = hookFactory("auth");

/**
 * React hook to get user's authentication data.
 *
 * @returns Object with user's data
 */
export const useAuthState = (): UserDetailsQuery => {
  const res = hookStateFactory<UserDetailsQuery, UserDetailsQueryVariables>(
    USER
  );
  const { data, error, networkStatus, previousData, loading } = res;
  console.log("useAuthState", {
    res,
    error,
    networkStatus,
    previousData,
    loading,
  });

  if (!data) {
    throw new Error(
      "Cache query result is undefined. Invalid cache configuration."
    );
  }

  return data;
};
