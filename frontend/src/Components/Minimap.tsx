export default function Minimap({ width, height, address }: { width?: number, height: number, address: string }) {
    const encodedAddress = encodeURIComponent(address);
    const src = `https://maps.google.com/maps?width=${width}&height=${height}&hl=pt-BR&q=${encodedAddress}&t=&z=14&ie=UTF8&iwloc=B&output=embed`;

    console.log(encodedAddress);

    return (
        <div style={{ width: "100%" }}>
            <iframe
                width={"100%"}
                height={height}
                src={src}
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                title="Minimap"
            >
            </iframe>
        </div>
    );
}