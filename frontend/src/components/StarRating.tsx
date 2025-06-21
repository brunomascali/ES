import { Star } from "lucide-react";
import type { IUser } from "../types/User";
import { useState } from "react";
import { Button } from "./ui/button";
import { createRating } from "../services/ratingService";
import { useAuth } from "../hooks/useAuth";
import type { IRatingData } from "src/types/RatingData";
import { Input } from "./ui/input";

export default function StarRating({ cpf_from, cpf_to, is_driver_rating }: { cpf_from: string, cpf_to: string, is_driver_rating: boolean }) {
    const { user } = useAuth();
    const [rating, setRating] = useState<IRatingData>({
        user_from: cpf_from,
        user_to: cpf_to,
        rating: 5,
        description: '',
        driver_rating: is_driver_rating,
    });

    return (
        <div className="flex flex-col items-center mt-4 gap-4 mb-0">
            <div className="flex items-center justify-center gap-2 w-full">
                <Star className={`cursor-pointer ${rating.rating >= 1 ? 'text-yellow-500' : 'text-gray-300'}`} onClick={() => setRating({ ...rating, rating: 1 })} />
                <Star className={`cursor-pointer ${rating.rating >= 2 ? 'text-yellow-500' : 'text-gray-300'}`} onClick={() => setRating({ ...rating, rating: 2 })} />
                <Star className={`cursor-pointer ${rating.rating >= 3 ? 'text-yellow-500' : 'text-gray-300'}`} onClick={() => setRating({ ...rating, rating: 3 })} />
                <Star className={`cursor-pointer ${rating.rating >= 4 ? 'text-yellow-500' : 'text-gray-300'}`} onClick={() => setRating({ ...rating, rating: 4 })} />
                <Star className={`cursor-pointer ${rating.rating >= 5 ? 'text-yellow-500' : 'text-gray-300'}`} onClick={() => setRating({ ...rating, rating: 5 })} />
            </div>
            <Input type="text" value={rating.description} onChange={(e) => setRating({ ...rating, description: e.target.value })} className="w-full" />
            <Button
                type="button"
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                onClick={() => {
                    createRating(rating);
                }}
            >
                Avaliar
            </Button>
        </div>
    );
}