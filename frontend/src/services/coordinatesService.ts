import axios from "axios"

export const getCoordinates = async (address: string): Promise<{ lat: number, lon: number } | null> => {
    const API_KEY = "6841a9190344d597744546tmib2caac";
    const coordinatesResponse = await axios.get("https://geocode.maps.co/search?q=" + address + "&api_key=" + API_KEY)
    if (coordinatesResponse.status === 200) {
        return { lat: coordinatesResponse.data[0].lat, lon: coordinatesResponse.data[0].lon };
    }
    return null;
}