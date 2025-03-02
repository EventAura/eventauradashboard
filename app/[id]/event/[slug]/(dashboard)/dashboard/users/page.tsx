



"use client";
import { useState, useEffect, useMemo, useCallback, use } from "react";
import axios from "axios";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input"; // Import the Input component
import { useParams } from "next/navigation"; // Import the useParams hook

interface User {
  _id: { $oid: string };
  name: string;
  email: string;
  college: string;
  rollNumber: string;
  phoneNumber: string;
  eventName: string;
  eventPrice: string;
  userEntryStatus: string;
  merchantTransactionId: string;
  userRegistrationDate: { $date: string };
  paymentData?: {
    success: boolean;
    code: string;
    message: string;
    data?: {
      state: string;
      responseCode: string;
    };
  };
}

const columnHelper = createColumnHelper<User>();

const columns = [
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => <span className="font-medium">{info.getValue()}</span>,
  }),
  columnHelper.accessor("email", {
    header: "Email",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("rollNumber", {
    header: "Roll Number",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("merchantTransactionId", {
    header: "Transaction ID",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor((row) => row.paymentData?.data?.state, {
    id: "paymentStatus",
    header: "Payment Status",
    cell: (info) => {
      const paymentState = info.getValue();
      return (
        <Badge
          variant={
            paymentState === "COMPLETED"
              ? "default"
              : paymentState === "FAILED"
              ? "destructive"
              : "secondary"
          }
        >
          {paymentState || "N/A"}
        </Badge>
      );
    },
  }),
  columnHelper.display({
    id: "showMore",
    cell: ({ row }) => (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            Show More
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[455px] bg-white">
          <DialogHeader>
            <DialogTitle>Participant Details</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <DetailRow label="Name" value={row.original.name} />
            <DetailRow label="Email" value={row.original.email} />
            <DetailRow label="College" value={row.original.college} />
            <DetailRow label="Phone" value={row.original.phoneNumber} />
            <DetailRow label="Event" value={row.original.eventName} />
            <DetailRow label="Price" value={`₹${row.original.eventPrice}`} />
            <DetailRow label="Entry Status" value={row.original.userEntryStatus === "true" ? "Entered" : "Not Entered"} />
            <DetailRow
              label="Registration"
              value={new Date(row.original.userRegistrationDate.$date).toLocaleString("en-IN", {
                dateStyle: "full",
              })}
            />
            <DetailRow label="Payment Status" value={row.original.paymentData?.data?.state || "N/A"} />
            <DetailRow label="Response Code" value={row.original.paymentData?.data?.responseCode || "N/A"} />
          </div>
        </DialogContent>
      </Dialog>
    ),
  }),
];

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <div className="grid grid-cols-4 items-center gap-4">
    <span className="font-bold">{label}:</span>
    <span className="col-span-3">{value}</span>
  </div>
);

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [paymentFilter, setPaymentFilter] = useState<string>("all");
  const [clerkId, setClerkId] = useState<string | null>(null);
  const [eventId, setEventId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>(""); // State for search query
  const params = useParams(); // Get the params from the router

  useEffect(() => {
    const fetchParams = async () => {
      const { id, slug } = await params;
      if (id) setClerkId(Array.isArray(id) ? id[0] : id);
      if (slug) setEventId(Array.isArray(slug) ? slug[0] : slug);
    };

    fetchParams();
  }, [params]);

  useEffect(() => {
    if (clerkId && eventId) {
      const fetchParticipants = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/participant/event/clerk/${eventId}`);
          setUsers(response.data);
         
        } catch (error) {
          console.error("Error fetching participants:", error);
        }
      };

      fetchParticipants();
    }
  }, [clerkId, eventId]);

  // Combine search and payment filter logic
  const filteredData = useMemo(() => {
    return users.filter((user) => {
      // Apply payment filter
      const paymentMatch =
        paymentFilter === "all" || user.paymentData?.data?.state === paymentFilter;

      // Apply search filter
      const searchMatch =
        !searchQuery ||
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.rollNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.merchantTransactionId.toLowerCase().includes(searchQuery.toLowerCase());

      return paymentMatch && searchMatch;
    });
  }, [users, paymentFilter, searchQuery]);

  const table = useReactTable({
    data: filteredData, // Use filtered data
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const handleNextPage = useCallback(() => table.nextPage(), [table]);
  const handlePreviousPage = useCallback(() => table.previousPage(), [table]);

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Participant List</h2>
          <p className="text-muted-foreground">Manage event participants here.</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Input
          placeholder="Search by name or email"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-[300px]"
        />
        <Select value={paymentFilter} onValueChange={setPaymentFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by payment status" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="all">All Payments</SelectItem>
            <SelectItem value="COMPLETED">Completed</SelectItem>
            <SelectItem value="PENDING">Pending</SelectItem>
            <SelectItem value="FAILED">Failed</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Card>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePreviousPage}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleNextPage}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}