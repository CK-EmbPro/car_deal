"use client";

import { getProfile, logoutUser } from "@/api/auth/authApis";
import {
  addCartItemApi,
  deleteAllCartItemsApi,
  deleteCartItemApi,
  getCartItemsApi,
  updateWholeCartApi,
} from "@/api/cart/cartApis";
import { USER_STORAGE_KEY } from "@/constants/common";
import { ICartItem, ISavedCartItem, RawCartItemList } from "@/types/cart";
import { ISavedUser } from "@/types/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

interface AppContextType {
  user: ISavedUser | null;
  cartItems: ISavedCartItem[] | undefined;
  isCartLoading: boolean;
  login: (userData: ISavedUser) => void;
  logout: () => void;
  addToCart: (cartItem: ICartItem) => void;
  removeCartItem: (cartId: string) => void;
  clearWholeCart: () => void;
  updateWholeCart: (cart: ICartItem[]) => void;
  isLoading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<ISavedUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const queryClient = useQueryClient();
  const router = useRouter();

  // Cart Query
  const {// queryClient.setQueryData<RawCartItemList>(["cartItems"], (old) => ({
    //   ...old!,
    //   entity: data.entity,
    // }));
    data: cartItems,
    isLoading: isCartLoading,
  } = useQuery<RawCartItemList, Error, ISavedCartItem[]>({
    queryKey: ["cartItems"],
    queryFn: getCartItemsApi,
    select: (data) => data.entity,
    enabled: !!user, // Only fetch if user is logged in
  });

  // Update whole cart mutation
  const { mutate: updateCart } = useMutation({
    mutationFn: updateWholeCartApi,
    onSuccess: (data) => {
      console.log('updated data ', data);
      alert(data.message);
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  // Add to cart mutation
  const { mutate: addToCartMutate } = useMutation({
    mutationFn: addCartItemApi,
    onSuccess: (data) => {
      queryClient.setQueryData<RawCartItemList>(["cartItems"], (old) => ({
        ...old!,
        entity: [...(old?.entity || []), data.entity],
      }));
      alert(data.message);
      router.push("/cart");
    },
    onError: (error) => {
      alert("error " + error.message);
      console.error(error.message);
    },
  });

  // Delete cart item mutation
  const { mutate: deleteCartItem } = useMutation({
    mutationFn: deleteCartItemApi,
    onSuccess: (data, id) => {
      queryClient.setQueryData<RawCartItemList>(["cartItems"], (old) => ({
        ...old!,
        entity: old?.entity.filter((item) => item._id !== id) || [],
      }));
      alert(data.message);
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  // Clear cart mutation
  const { mutate: clearCart } = useMutation({
    mutationFn: deleteAllCartItemsApi,
    onSuccess: (data) => {
      queryClient.setQueryData<RawCartItemList>(["cartItems"], (old) => ({
        ...old!,
        entity: [],
      }));
      alert(data.message);
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUser = sessionStorage.getItem(USER_STORAGE_KEY);
        if (storedUser) setUser(JSON.parse(storedUser));

        const result = await getProfile();
        if (typeof result !== "string") {
          setUser(result);
          sessionStorage.setItem(USER_STORAGE_KEY, JSON.stringify(result));
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = (userData: ISavedUser) => {
    setUser(userData);
    sessionStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
    // Refetch cart items when user logs in
    queryClient.invalidateQueries({ queryKey: ["cartItems"] });
  };

  const logout = async () => {
    try {
      const result = await logoutUser();
      if (result.startsWith("error")) {
        alert(result.substring(6));
        return;
      }
      alert(result);
      setUser(null);
      sessionStorage.removeItem(USER_STORAGE_KEY);
      // Clear cart data from cache on logout
      queryClient.setQueryData(["cartItems"], null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        cartItems,
        isCartLoading,
        login,
        logout,
        addToCart: addToCartMutate,
        removeCartItem: deleteCartItem,
        clearWholeCart: clearCart,
        updateWholeCart: updateCart,
        isLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}