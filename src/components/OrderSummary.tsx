import { CartItem } from "@/pages/DetailPage";
import { Restaurant } from "@/types";
import { CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Trash } from "lucide-react";

type Props = {
  restaurant: Restaurant;
  cartItems : CartItem[];
  removeFromCart : (CartItem: CartItem)=>void;
  
}

const OrderSummary = ({restaurant,cartItems, removeFromCart}: Props) => {
    const getTotalCost = () => {
        const totalAmount = cartItems.reduce(
          (total, cartItem) => total + cartItem.price * cartItem.quantity,
          0
        );

        const totalWithDelivery = totalAmount+ restaurant.deliveryPrice;

        return(totalWithDelivery.toFixed(2))
    }
    return(
        <>
            <CardHeader>
                <CardTitle className="text-2xl flex justify-between font-bold tracking-tight">
                    <span>Your Order</span>
                    <span>${getTotalCost()}</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
                {cartItems.map((item)=>(
                    <div className="flex justify-between">
                        <span>
                            <Badge variant="outline" className="mr-2">
                                {item.quantity}
                            </Badge>
                            {item.name}
                        </span>
                        <span className="flex items-center gap-2">
                            ${(item.price * item.quantity).toFixed(2)}
                            <Trash className="cursor-pointer " color="red" size={18} onClick={()=>removeFromCart(item)}/>
                        </span>
                    </div>
                ))}
             <Separator/>
             <div className="flex justify-between">
                <span>Delivery</span>
                <span>${(restaurant.deliveryPrice).toFixed(2)}</span>
             </div>
             <Separator/>
            </CardContent>

        </>
    )
  
}

export default OrderSummary;