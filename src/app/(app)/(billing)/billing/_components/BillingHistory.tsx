"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ArrowUpDown, Download, FileText } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"
import { modules } from "@/domain"

interface Invoice {
    id: string;
    date: Date;
    status: 'paid' | 'open' | 'uncollectible' | 'void';
    amount: number;
    plan: string;
    pdfUrl?: string;
}

const statusConfig = {
    paid: {
        label: 'Pago',
        className: 'bg-green-100 text-green-800 hover:bg-green-100'
    },
    open: {
        label: 'Aberto',
        className: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100'
    },
    uncollectible: {
        label: 'Não Cobrado',
        className: 'bg-red-100 text-red-800 hover:bg-red-100'
    },
    void: {
        label: 'Cancelado',
        className: 'bg-gray-100 text-gray-800 hover:bg-gray-100'
    }
} as const;

export default function BillingHistory() {
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadInvoices() {
            try {
                const response = await fetch('/api/billing/invoices');
                if (!response.ok) throw new Error('Erro ao carregar faturas');
                const data = await response.json();
                const formattedData = data.map((invoice: any) => ({
                    ...invoice,
                    date: new Date(invoice.date)
                }));
                setInvoices(formattedData);
            } catch (error) {
                console.error("Erro ao carregar faturas:", error);
            } finally {
                setLoading(false);
            }
        }

        loadInvoices();
    }, []);

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }).format(date);
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(amount);
    };

    const handleDownload = (pdfUrl?: string) => {
        if (pdfUrl) {
            window.open(pdfUrl, '_blank');
        }
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <CardTitle className="text-lg font-bold">Histórico de Faturas</CardTitle>
                        <p className="text-sm text-gray-500">Aqui você pode ver o histórico de suas cobranças.</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                            <FileText className="h-4 w-4 mr-2" />
                            Exportar
                        </Button>
                        <Button variant="default" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">
                                <Button variant="ghost" size="sm" className="-ml-4">
                                    Fatura
                                    <ArrowUpDown className="ml-2 h-4 w-4" />
                                </Button>
                            </TableHead>
                            <TableHead>
                                <Button variant="ghost" size="sm" className="-ml-4">
                                    Data
                                    <ArrowUpDown className="ml-2 h-4 w-4" />
                                </Button>
                            </TableHead>
                            <TableHead>
                                <Button variant="ghost" size="sm" className="-ml-4">
                                    Status
                                    <ArrowUpDown className="ml-2 h-4 w-4" />
                                </Button>
                            </TableHead>
                            <TableHead>
                                <Button variant="ghost" size="sm" className="-ml-4">
                                    Valor
                                    <ArrowUpDown className="ml-2 h-4 w-4" />
                                </Button>
                            </TableHead>
                            <TableHead>
                                <Button variant="ghost" size="sm" className="-ml-4">
                                    Plano
                                    <ArrowUpDown className="ml-2 h-4 w-4" />
                                </Button>
                            </TableHead>
                            <TableHead className="w-[100px]"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center">
                                    Carregando faturas...
                                </TableCell>
                            </TableRow>
                        ) : invoices.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center">
                                    Nenhuma fatura encontrada
                                </TableCell>
                            </TableRow>
                        ) : (
                            invoices.map((invoice) => (
                                <TableRow key={invoice.id}>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-2">
                                            <FileText className="h-4 w-4 text-gray-500" />
                                            #{invoice.id}
                                        </div>
                                    </TableCell>
                                    <TableCell>{formatDate(invoice.date)}</TableCell>
                                    <TableCell>
                                        <Badge 
                                            variant="outline"
                                            className={statusConfig[invoice.status]?.className || 'bg-gray-100 text-gray-800'}
                                        >
                                            {statusConfig[invoice.status]?.label || invoice.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{formatCurrency(invoice.amount)}</TableCell>
                                    <TableCell>{invoice.plan}</TableCell>
                                    <TableCell>
                                        <Button 
                                            variant="ghost" 
                                            size="icon"
                                            onClick={() => handleDownload(invoice.pdfUrl)}
                                            disabled={!invoice.pdfUrl}
                                        >
                                            <Download className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

