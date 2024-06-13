import { SearchState } from "@/pages/SearchPage";
import { Restaurant, RestaurantSearchResponse } from "@/types";
import { useQuery } from "react-query";

const API_BASE_URL= import.meta.env.VITE_API_BASE_URL;

export const useGetRestaurant = (restaurantId?:string)=>{
    const getRestaurantByIdRequest= async(): Promise<Restaurant> =>{
        const response= await fetch(`${API_BASE_URL}/api/restaurant/${restaurantId}`);

        if(!response.ok){
            throw new Error("failed to get restaurant");
        }

        return response.json();
    }

    const {data:restaurant , isLoading} = useQuery("fetchRestaurant",getRestaurantByIdRequest,{
        enabled: !!restaurantId,
    });

    return{ restaurant,isLoading};
};


export const useSearchRestaurants = ( searchstate:SearchState,city?:string) =>{
    const createSearchRequest = async ():Promise<RestaurantSearchResponse>=>{
        const params = new URLSearchParams();
        params.set("searchQuery", searchstate.searchQuery);
        params.set("page",searchstate.page.toString());
        params.set("selectedCuisines",searchstate.selectedCuisines.join(","));
        params.set("sortOption",searchstate.sortOption)
        const response= await fetch(
            `${API_BASE_URL}/api/restaurant/search/${city}?${params.toString()}`,{
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              }    
        );
        if(!response.ok){
            throw new Error("failed to get restaurant")
        }
        return response.json();
    };

    const { data: results , isLoading} = useQuery( ["searchRestaurants", searchstate], createSearchRequest,
        {enabled: !!city}
    );

    return {
        results , isLoading
    }

};