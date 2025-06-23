import { Star } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { createRating } from "../services/ratingService";
import type { IRatingData } from "../types/RatingData";
import { Input } from "./ui/input";
import { createComplaint } from "../services/complaintService";

export default function StarRating({ cpf_from, cpf_to, is_driver_rating }: { cpf_from: string, cpf_to: string, is_driver_rating: boolean }) {
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
            <Input type="text" placeholder="Descreva a avaliação/denúncia" value={rating.description} onChange={(e) => setRating({ ...rating, description: e.target.value })} className="w-full" />
            <div className="flex items-center justify-center gap-2 w-full">
                <Button
                    type="button"
                    className="cursor-pointer  bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                    onClick={() => {
                        createRating(rating);
                        alert("Avaliação enviada com sucesso");
                    }}
                >
                    Avaliar
                </Button>
                <Button 
                type="button" 
                className="cursor-pointer bg-red-500 hover:bg-red-600 text-white font-medium py-2 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                onClick={() => {
                    createComplaint({
                        user_from: cpf_from,
                        user_to: cpf_to,
                        description: rating.description,
                    });
                    alert("Denúncia enviada com sucesso");
                }}
                >
                    Denunciar usuário
                </Button>
            </div>
        </div>
    );
}