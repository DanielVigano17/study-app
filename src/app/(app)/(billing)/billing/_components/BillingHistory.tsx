import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download } from 'lucide-react'

const billingHistory = [
  { date: "01/04/2024", amount: "R$ 49,90", status: "Pago", invoice: "INV-001" },
  { date: "01/03/2024", amount: "R$ 49,90", status: "Pago", invoice: "INV-002" },
  { date: "01/02/2024", amount: "R$ 49,90", status: "Pago", invoice: "INV-003" },
]

export default function BillingHistory() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Histórico de Faturamento</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Fatura</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {billingHistory.map((bill, index) => (
              <TableRow key={index}>
                <TableCell>{bill.date}</TableCell>
                <TableCell>{bill.amount}</TableCell>
                <TableCell>{bill.status}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    {bill.invoice}
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

