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

const invoices = [
  {
    id: "011",
    date: "June 25, 2026",
    status: "Paid",
    amount: "USD $25.00",
    plan: "Basic"
  },
  {
    id: "010",
    date: "June 25, 2026",
    status: "Paid",
    amount: "USD $35.00",
    plan: "Pro"
  },
  {
    id: "009",
    date: "June 25, 2026",
    status: "Failed",
    amount: "USD $40.00",
    plan: "Premium"
  },
  {
    id: "008",
    date: "June 25, 2026",
    status: "Paid",
    amount: "USD $15.00",
    plan: "Elite"
  }
]

export default function BillingHistory() {
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
              Export
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
            {invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-gray-500" />
                    #{invoice.id}
                  </div>
                </TableCell>
                <TableCell>{invoice.date}</TableCell>
                <TableCell>
                  <Badge 
                    variant={invoice.status === "Paid" ? "default" : "destructive"}
                    className={
                      invoice.status === "Paid" 
                        ? "bg-green-100 text-green-800 hover:bg-green-100" 
                        : "bg-red-100 text-red-800 hover:bg-red-100"
                    }
                  >
                    {invoice.status}
                  </Badge>
                </TableCell>
                <TableCell>{invoice.amount}</TableCell>
                <TableCell>{invoice.plan}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

