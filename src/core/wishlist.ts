// import {
//   WishlistAddProductMutation,
//   AddWishlistProductMutationVariables,
// } from "./../apollo/types";
import { storage } from "./storage";
import { SaleorClientMethodsProps, WishlistAddProductResult } from ".";
import { GET_WISHLIST, WISHLIST_ADD_PRODUCT } from "../apollo";
import { setLocalWishlistInCache } from "../apollo/helpers";
export interface WishlistSDK {
  loaded?: boolean;

  items?: any;

  getWishlist?: () => {};
  addItemInWishlist?: (productId: string) => WishlistAddProductResult;
  removeItemInWishlist?: () => {};
}

export const wishlist = ({
  apolloClient: client,
}: SaleorClientMethodsProps): WishlistSDK => {
  const addItemInWishlist: WishlistSDK["addItemInWishlist"] = async (
    productId: string
  ) => {
    const res = await client.mutate<
      // WishlistAddProductMutation,
      // AddWishlistProductMutationVariables
      any,
      any
    >({
      mutation: WISHLIST_ADD_PRODUCT,
      variables: {
        productId: productId,
      },
      update: (_, { data }) => {
        console.log("wishlistSDK Update", data);
        if (data) {
          console.log("wishlistSDK inside if", data);
          setLocalWishlistInCache(
            client,
            data?.wishlistAddProduct?.wishlist[0]?.wishlist
          );
          storage.setWishlist(data?.wishlistAddProduct?.wishlist[0]?.wishlist);
        }
      },
    });
    return res?.data?.wishlistAddProduct?.wishlist[0]?.wishlist;
  };

  const getWishlist: WishlistSDK["getWishlist"] = async () => {
    const res = await client.query<any, any>({
      query: GET_WISHLIST,
      variables: {
        first: 20,
      },
      fetchPolicy: "network-only",
    });

    console.log("getWishlist res", res);

    return res;
  };
  return {
    addItemInWishlist,
    getWishlist,
  };
};
