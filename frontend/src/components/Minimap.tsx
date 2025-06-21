export default function Minimap({ address }: { address: string }) {
    const encodedAddress = encodeURIComponent(address);
    const src = `https://maps.google.com/maps?width=100%&height=100%&hl=pt-BR&q=${encodedAddress}&t=&z=14&ie=UTF8&iwloc=B&output=embed`;

    return (
        <div style={{ width: "100%", height: "100%" }}>
            <iframe
                width="100%"
                height="100%"
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