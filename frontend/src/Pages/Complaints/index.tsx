import TopMenu from "../../components/TopMenu";
import { useEffect, useState } from "react";
import { getComplaints } from "../../services/complaintService";
import type { Complaint } from "../../types/Complaint";
import ComplaintCard from "./ComplaintCard";

export default function Complaints() {
    const [complaints, setComplaints] = useState<Complaint[]>([]);

    useEffect(() => {
        const fetchComplaints = async () => {
            const response = await getComplaints();
            setComplaints(response);
        }
        fetchComplaints();
    }, []);

    return (
        <div>
            <TopMenu />
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {complaints.map((complaint) => (
                        <ComplaintCard key={complaint.id} complaint={complaint} />
                    ))}
                </div>
            </div>
        </div>
    );
}