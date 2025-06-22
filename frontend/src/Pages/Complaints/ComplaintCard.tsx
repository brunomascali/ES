import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { cn } from "../../lib/utils";
import { AlertCircle, User, CheckCircle2, XCircle } from "lucide-react";
import type { Complaint } from "../../types/Complaint";
import { banUser, clearComplaint } from "../../services/complaintService";
import type { IUser } from "../../types/User";
import { getUserByCpf } from "../../services/UserService";

export default function ComplaintCard({ complaint }: { complaint: Complaint }) {
    const [userFrom, setUserFrom] = useState<IUser | null>(null);
    const [userTo, setUserTo] = useState<IUser | null>(null);
    const [complaintStatus, setComplaintStatus] = useState(complaint.status);

    useEffect(() => {
        const fetchUserFrom = async () => {
            const user = await getUserByCpf(complaint.user_from);
            setUserFrom(user);
        }
        const fetchUserTo = async () => {
            const user = await getUserByCpf(complaint.user_to);
            setUserTo(user);
        }
        fetchUserFrom();
        fetchUserTo();
        setComplaintStatus(complaint.status);
    }, []);

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
                                    Denunciante: {userFrom?.name}
                                </span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <XCircle className="h-4 w-4 text-gray-500" />
                                <span className="text-sm font-medium text-gray-900">
                                    Denunciado: {userTo?.name}
                                </span>
                            </div>
                        </div>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">
                        Motivo: {complaint.description}
                    </p>
                    {complaintStatus === "open" ? (
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
                                onClick={() => {
                                    clearComplaint(complaint.id)
                                }}
                            >
                                <CheckCircle2 className="h-5 w-5 mr-1" />
                                Não Banir
                            </Button>
                        </div>
                    ) : complaintStatus === "banned" ? (
                        <p className="text-sm text-gray-700 leading-relaxed">
                            Usuário banido
                        </p>
                    ) : (
                        <p className="text-sm text-gray-700 leading-relaxed">
                            Denúncia fechada
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}