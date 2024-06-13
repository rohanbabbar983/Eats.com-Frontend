import { useGetRestaurant } from "@/api/RestaurantApi";
import MenuItem from "@/components/MenuItem";
import OrderSummary from "@/components/OrderSummary";
import RestaurantInfo from "@/components/RestaurantInfo";
import { Card, CardFooter } from "@/components/ui/card";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MenuItem as MenuItemType } from "@/types";
import CheckoutButton from "@/components/CheckoutButton";
import { UserFormData } from "@/forms/user-profile-form/UserProfileForm";
import { useCreateCheckoutSession } from "@/api/OrderApi";
export type CartItem = {
    _id: string;
    name: string;
    price: number;
    quantity: number;
}


const DetailPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when component mounts
  }, []);
  const {restaurantId} = useParams();
  const {restaurant,isLoading} = useGetRestaurant(restaurantId);
  const{createCheckoutSession, isLoading:isChekoutLoading}= useCreateCheckoutSession();

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCartItems = sessionStorage.getItem(`cartItems-${restaurantId}`);
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });
  
  if(isLoading || !restaurant){
    return "Loading...";

  }
  const addToCart =  (menuItem:MenuItemType)=>{
    setCartItems((prevState)=>{
        const existingCartItem = prevState.find((cartItem)=>cartItem._id === menuItem._id);

        let updatedCartItems;

        if(existingCartItem){
            updatedCartItems= prevState.map((cartItem)=> cartItem._id === menuItem._id ? {...cartItem, quantity: cartItem.quantity +1 }: cartItem);
        }
        else{
            updatedCartItems= [
                ...prevState, {
                    _id:menuItem._id,
                    name: menuItem.name,
                    price : menuItem.price,
                    quantity: 1,
                }
            ]
        }
        sessionStorage.setItem(`cartItems-${restaurantId}`, JSON.stringify(updatedCartItems));
        return updatedCartItems;

    })

  };
  const removeFromCart = (cartItem : CartItem)=>{
    setCartItems((prevState)=>{
        const updatedCartItems = prevState.filter((item)=>cartItem._id !== item._id);

        sessionStorage.setItem(`cartItems-${restaurantId}`, JSON.stringify(updatedCartItems));

        return updatedCartItems;
    })
  };

  const onCheckout= async (userFormData: UserFormData)=>{
    if(!restaurant){
      return;
    }
    const checkoutData= {
      cartItems: cartItems.map((cartItem)=>({
        menuItemId: cartItem._id,
        name:cartItem.name,
        quantity:cartItem.quantity.toString(),
      })),
      restaurantId: restaurant._id,
      deliveryDetails: {
        name: userFormData.name,
        addressLine1:userFormData.addressLine1,
        city: userFormData.city,
        country:userFormData.country,
        email: userFormData.email as string,
      }
    };

    const data= await createCheckoutSession(checkoutData);
    window.location.href=data.url;
  }



  return(
    <div className="flex flex-col gap-10">
      <AspectRatio ratio={16 / 5}>
        <img
          src={restaurant.imageUrl}
          className="rounded-md object-cover h-full w-full"
        />
      </AspectRatio>
      <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-16">
        <div className="flex flex-col  gap-4">
          <RestaurantInfo restaurant={restaurant} />
          <span className=" flex items-center   justify-between">
            <span className="text-2xl font-bold tracking-tight">Menu</span>
            <span className="text-sm text-gray-400">(*click to add item in cart)</span>
          </span>
          <div >
          {restaurant.menuItems.map((menuItem) => (
            <MenuItem
              menuItem={menuItem}
              addToCart = {()=>addToCart(menuItem)}
             
            />
          ))}
          </div>
         </div>
        <div >
            <Card>
                <OrderSummary restaurant={restaurant} cartItems={cartItems} removeFromCart = {removeFromCart}  />
                <CardFooter>
                    <CheckoutButton isLoading={isChekoutLoading} disabled={cartItems.length===0} onCheckout={onCheckout}  />
                </CardFooter>
            </Card>
           

        </div>
      </div>
    </div>
  )
};

export default DetailPage;