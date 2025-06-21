import type { IRide } from "../types/Ride";
import { Button } from "./ui/button"

export default function DayPicker({ offerRideData, setOfferRideData } : { offerRideData: IRide, setOfferRideData?: (offerRideData: IRide) => void }) {
    const days = ["S", "T", "Q", "Q", "S"]

    return (
        <div className="flex gap-2 justify-center">
            {days.map((day, index) => (
                <Button 
                key={index}
                type="button" 
                className={`cursor-pointer rounded-full w-10 h-10 flex items-center justify-center text-center text-lg ${offerRideData.days & (1 << index) ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-500"}`}
                onClick={() => {
                    if (setOfferRideData) {
                    if (offerRideData.days & (1 << index)) {
                        setOfferRideData({ ...offerRideData, days: offerRideData.days & ~(1 << index) })
                        } else {
                            setOfferRideData({ ...offerRideData, days: offerRideData.days | (1 << index) })
                        }
                    }
                }}
                >{day}</Button>
            ))}
        </div>
    );
}