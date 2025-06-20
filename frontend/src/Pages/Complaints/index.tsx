import TopMenu from "../../components/TopMenu";
import { useEffect, useState } from "react";
import axios from "axios";
import { AlertCircle, User, UserX, CheckCircle2, XCircle } from "lucide-react";
import {
    Alert,
    AlertTitle,
    AlertDescription,
} from "../../components/ui/alert";
import { cn } from "../../lib/utils";
import { Button } from "../../components/ui/button";

interface Complaint {
    id: number;
    user_id_from: string;
    user_id_to: string;
    user_id_to_id: number;
    description: string;
    status: string;
}

function ComplaintCard({ complaint }: { complaint: Complaint }) {
    const [userBanned, setUserBanned] = useState(false);

    useEffect(() => {
        const fetchUserBanned = async () => {
            const response = await axios.get(`http://127.0.0.1:8080/api/users/id/${complaint.user_id_to_id}`);
            if (response.status === 200) {
                setUserBanned(response.data.banned);
            }
        }
        fetchUserBanned();
    }, []);

    const banUser = async (complaint_id: number) => {
        console.log(complaint_id);
        const banResponse = await axios.post(`http://127.0.0.1:8080/api/users/ban/${complaint.user_id_to_id}`, {});
        if (banResponse.status === 200) {
            setUserBanned(true);
        }
    }

    return (
        <div className={cn(
            "rounded-lg border p-4 transition-all",
            "bg-yellow-50",
            "border-yellow-200"
        )}>
            <div className="flex items-start space-x-4">
                <div className={cn(
                    "p-2 rounded-full",
                    "bg-yellow-50"
                )}>
                    <AlertCircle className="h-5 w-5 text-yellow-500" />
                </div>
                <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                                <User className="h-4 w-4 text-gray-500" />
                                <span className="text-sm font-medium text-gray-900">
                                    {complaint.user_id_from}
                                </span>
                                <XCircle className="h-4 w-4 text-gray-500" />
                                <span className="text-sm font-medium text-gray-900">
                                    {complaint.user_id_to}
                                </span>
                            </div>
                        </div>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">
                        {complaint.description}
                    </p>
                    {!userBanned ? (
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            className="bg-red-500 hover:bg-red-600 cursor-pointer text-white font-semibold px-5 py-2 rounded-lg shadow transition-all duration-200 flex items-center gap-2 border-0"
                            onClick={() => banUser(complaint.id)}
                        >
                            <XCircle className="h-5 w-5 mr-1" />
                            Banir Usuário
                        </Button>
                        <Button
                            variant="outline"
                            className="bg-green-500 hover:bg-green-600 cursor-pointer text-white font-semibold px-5 py-2 rounded-lg shadow transition-all duration-200 flex items-center gap-2 border-0"
                        >
                            <CheckCircle2 className="h-5 w-5 mr-1" />
                                Não Banir
                            </Button>
                        </div>
                    ) : (
                        <p className="text-sm text-gray-700 leading-relaxed">
                            Usuário banido
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function Complaints() {
    const [complaints, setComplaints] = useState<Complaint[]>([]);

    useEffect(() => {
        const fetchComplaints = async () => {
            const response = await axios.get("http://localhost:8080/api/complaints");
            if (response.status === 200) {
                const comp_list: Complaint[] = [];
                for (const complaint of response.data) {
                    const user_from = await axios.get(`http://localhost:8080/api/users/id/${complaint.user_id_from}`);
                    const user_to = await axios.get(`http://localhost:8080/api/users/id/${complaint.user_id_to}`);

                    if (user_from.status === 200 && user_to.status === 200) {
                        comp_list.push({
                            id: complaint.id,
                            user_id_from: user_from.data.name,
                            user_id_to: user_to.data.name,
                            description: complaint.description,
                            status: complaint.status,
                            user_id_to_id: complaint.user_id_to
                        });
                    }
                }
                setComplaints(comp_list);
                console.log(comp_list);
            }
            else {
                console.log("Erro ao buscar denuncias");
            }
        }
        fetchComplaints();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
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