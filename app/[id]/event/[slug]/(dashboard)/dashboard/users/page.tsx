// "use client"

// import { useState } from "react"
// import { Card } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table"
// import { Badge } from "@/components/ui/badge"
// import { MoreHorizontal, Mail, UserPlus } from "lucide-react"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"

// const users = [
//   {
//     id: "jerrold_schmidt97",
//     name: "Jerrold Schmidt",
//     email: "jerrold44@gmail.com",
//     phone: "+19065909087",
//     status: "Invited",
//     role: "Cashier"
//   },
//   {
//     id: "isabell.pfannerstill",
//     name: "Isabell Pfannerstill",
//     email: "isabell14@yahoo.com",
//     phone: "+17959113874",
//     status: "Suspended",
//     role: "Cashier"
//   },
//   {
//     id: "lottie_gottlieb-crooks",
//     name: "Lottie Gottlieb-Crooks",
//     email: "lottie.armstrong@gmail.com",
//     phone: "+13145348727",
//     status: "Invited",
//     role: "Admin"
//   },
//   {
//     id: "keon.stanton3",
//     name: "Keon Stanton",
//     email: "keon.medhurst@hotmail.com",
//     phone: "+19573946009",
//     status: "Inactive",
//     role: "Manager"
//   }
// ]

// export default function UsersPage() {
//   const [searchQuery, setSearchQuery] = useState("")

//   const filteredUsers = users.filter(user => 
//     user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     user.phone.includes(searchQuery) ||
//     user.role.toLowerCase().includes(searchQuery.toLowerCase())
//   )

//   const getStatusColor = (status: string) => {
//     switch (status.toLowerCase()) {
//       case 'active':
//         return 'bg-green-100 text-green-800'
//       case 'invited':
//         return 'bg-blue-100 text-blue-800'
//       case 'suspended':
//         return 'bg-red-100 text-red-800'
//       case 'inactive':
//         return 'bg-gray-100 text-gray-800'
//       default:
//         return 'bg-gray-100 text-gray-800'
//     }
//   }

//   return (
//     <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h2 className="text-3xl font-bold tracking-tight">User List</h2>
//           <p className="text-muted-foreground">
//             Manage your users and their roles here.
//           </p>
//         </div>
//         <div className="flex items-center space-x-2">
//           <Button variant="outline">
//             <Mail className="mr-2 h-4 w-4" />
//             Invite User
//           </Button>
//           <Button>
//             <UserPlus className="mr-2 h-4 w-4" />
//             Add User
//           </Button>
//         </div>
//       </div>

//       <div className="flex items-center space-x-2">
//         <Input
//           placeholder="Filter tasks..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="max-w-sm"
//         />
//       </div>

//       <Card>
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead className="w-[30px]"></TableHead>
//               <TableHead>Username</TableHead>
//               <TableHead>Name</TableHead>
//               <TableHead>Email</TableHead>
//               <TableHead>Phone Number</TableHead>
//               <TableHead>Status</TableHead>
//               <TableHead>Role</TableHead>
//               <TableHead className="w-[50px]"></TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {filteredUsers.map((user) => (
//               <TableRow key={user.id}>
//                 <TableCell>
//                   <input type="checkbox" className="rounded border-gray-300" />
//                 </TableCell>
//                 <TableCell>{user.id}</TableCell>
//                 <TableCell className="font-medium">{user.name}</TableCell>
//                 <TableCell>{user.email}</TableCell>
//                 <TableCell>{user.phone}</TableCell>
//                 <TableCell>
//                   <Badge variant="secondary" className={getStatusColor(user.status)}>
//                     {user.status}
//                   </Badge>
//                 </TableCell>
//                 <TableCell>{user.role}</TableCell>
//                 <TableCell>
//                   <DropdownMenu>
//                     <DropdownMenuTrigger asChild>
//                       <Button variant="ghost" className="h-8 w-8 p-0">
//                         <MoreHorizontal className="h-4 w-4" />
//                       </Button>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent align="end">
//                       <DropdownMenuItem>Edit</DropdownMenuItem>
//                       <DropdownMenuItem>Suspend</DropdownMenuItem>
//                       <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
//                     </DropdownMenuContent>
//                   </DropdownMenu>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </Card>
//     </div>
//   )
// }







// "use client"

// import { useState, useEffect } from "react"
// import axios from "axios"
// import { Card } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Badge } from "@/components/ui/badge"
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
// import {
//   useReactTable,
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   flexRender,
//   createColumnHelper,
// } from "@tanstack/react-table"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// interface User {
//   _id: { $oid: string }
//   name: string
//   email: string
//   college: string
//   rollNumber: string
//   phoneNumber: string
//   eventName: string
//   eventPrice: string
//   userEntryStatus: string
//   merchantTransactionId: string
//   userRegistrationDate: { $date: string }
//   paymentData: {
//     success: boolean
//     code: string
//     message: string
//     data: {
//       state: string
//       responseCode: string
//     }
//   }
// }

// const columnHelper = createColumnHelper<User>()

// const columns = [
//   columnHelper.accessor("name", {
//     header: "Name",
//     cell: (info) => <span className="font-medium">{info.getValue()}</span>,
//   }),
//   columnHelper.accessor("email", {
//     header: "Email",
//     cell: (info) => info.getValue(),
//   }),
//   columnHelper.accessor("rollNumber", {
//     header: "Roll Number",
//     cell: (info) => info.getValue(),
//   }),
//   columnHelper.accessor("merchantTransactionId", {
//     header: "Transaction ID",
//     cell: (info) => info.getValue(),
//   }),
//   columnHelper.accessor("paymentData.data.state", {
//     header: "Payment Status",
//     cell: (info) => (
//       <Badge variant={info.getValue().toLowerCase() === "completed" ? "success" : "secondary"}>{info.getValue()}</Badge>
//     ),
//   }),
//   columnHelper.display({
//     id: "showMore",
//     cell: ({ row }) => (
//       <Dialog>
//         <DialogTrigger asChild>
//           <Button variant="outline" size="sm">
//             Show More
//           </Button>
//         </DialogTrigger>
//         <DialogContent className="sm:max-w-[425px]">
//           <DialogHeader>
//             <DialogTitle>Participant Details</DialogTitle>
//           </DialogHeader>
//           <div className="grid gap-4 py-4">
//             <div className="grid grid-cols-4 items-center gap-4">
//               <span className="font-bold">Name:</span>
//               <span className="col-span-3">{row.original.name}</span>
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <span className="font-bold">Email:</span>
//               <span className="col-span-3">{row.original.email}</span>
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <span className="font-bold">College:</span>
//               <span className="col-span-3">{row.original.college}</span>
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <span className="font-bold">Phone:</span>
//               <span className="col-span-3">{row.original.phoneNumber}</span>
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <span className="font-bold">Event:</span>
//               <span className="col-span-3">{row.original.eventName}</span>
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <span className="font-bold">Price:</span>
//               <span className="col-span-3">₹{row.original.eventPrice}</span>
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <span className="font-bold">Entry Status:</span>
//               <span className="col-span-3">{row.original.userEntryStatus === "true" ? "Entered" : "Not Entered"}</span>
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <span className="font-bold">Registration:</span>
//               <span className="col-span-3">{new Date(row.original.userRegistrationDate.$date).toLocaleString()}</span>
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <span className="font-bold">Payment Status:</span>
//               <span className="col-span-3">{row.original.paymentData.data.state}</span>
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <span className="font-bold">Response Code:</span>
//               <span className="col-span-3">{row.original.paymentData.data.responseCode}</span>
//             </div>
//           </div>
//         </DialogContent>
//       </Dialog>
//     ),
//   }),
// ]

// export default function UsersPage({params}) {
//   const [users, setUsers] = useState<User[]>([])
//   const [globalFilter, setGlobalFilter] = useState("")
//   const [paymentFilter, setPaymentFilter] = useState("all")
//   const [responseCodeFilter, setResponseCodeFilter] = useState("all")
//   const [clerkId, setClerkId] = useState<string | null>(null)
//   const [eventId, setEventId] = useState<string | null>(null)

//   useEffect(() => {
//     // Simulating the setting of clerkId and eventId
//     const {id,slug}= params
//     setClerkId(id)
//     setEventId(slug)
//   }, [params])

//   useEffect(() => {
//     if (clerkId && eventId) {
//       const fetchEvent = async () => {
//         try {
//           const response = await axios.get(`http://localhost:8080/event/clerk/${clerkId}/${eventId}`)
//           // Handle event data if needed
//           console.log(response.data.data)
//         } catch (error) {
//           console.log("Error fetching event data:", error)
//         }
//       }

//       const fetchParticipants = async () => {
//         try {
//           const response = await axios.get(`http://localhost:8080/participant/event/clerk/${eventId}`)
//           setUsers(response.data)
//         } catch (error) {
//           console.log("Error fetching participants:", error)
//         }
//       }

//       fetchEvent()
//       fetchParticipants()
//     }
//   }, [clerkId, eventId])

//   const table = useReactTable({
//     data: users,
//     columns,
//     state: {
//       globalFilter,
//     },
//     onGlobalFilterChange: setGlobalFilter,
//     getCoreRowModel: getCoreRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     filterFns: {
//       paymentStatus: (row, columnId, filterValue) => {
//         if (filterValue === "all") return true
//         return row.original.paymentData.data.state.toLowerCase() === filterValue.toLowerCase()
//       },
//       responseCode: (row, columnId, filterValue) => {
//         if (filterValue === "all") return true
//         return row.original.paymentData.data.responseCode === filterValue
//       },
//     },
//   })

//   useEffect(() => {
//     table.getColumn("paymentData.data.state")?.setFilterValue(paymentFilter)
//   }, [paymentFilter, table])

//   useEffect(() => {
//     table.getColumn("paymentData.data.responseCode")?.setFilterValue(responseCodeFilter)
//   }, [responseCodeFilter, table])

//   return (
//     <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h2 className="text-3xl font-bold tracking-tight">Participant List</h2>
//           <p className="text-muted-foreground">Manage event participants here.</p>
//         </div>
//       </div>

//       <div className="flex items-center space-x-2">
//         <Input
//           placeholder="Filter participants..."
//           value={globalFilter ?? ""}
//           onChange={(e) => setGlobalFilter(String(e.target.value))}
//           className="max-w-sm"
//         />
//         <Select value={paymentFilter} onValueChange={setPaymentFilter}>
//           <SelectTrigger className="w-[180px]">
//             <SelectValue placeholder="Filter by payment" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="all">All</SelectItem>
//             <SelectItem value="completed">Paid</SelectItem>
//             <SelectItem value="failed">Failed</SelectItem>
//             <SelectItem value="pending">Pending</SelectItem>
//           </SelectContent>
//         </Select>
//         <Select value={responseCodeFilter} onValueChange={setResponseCodeFilter}>
//           <SelectTrigger className="w-[180px]">
//             <SelectValue placeholder="Filter by response" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="all">All</SelectItem>
//             <SelectItem value="SUCCESS">Success</SelectItem>
//             <SelectItem value="FAILURE">Failure</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>

//       <Card>
//         <Table>
//           <TableHeader>
//             {table.getHeaderGroups().map((headerGroup) => (
//               <TableRow key={headerGroup.id}>
//                 {headerGroup.headers.map((header) => (
//                   <TableHead key={header.id}>
//                     {flexRender(header.column.columnDef.header, header.getContext())}
//                   </TableHead>
//                 ))}
//               </TableRow>
//             ))}
//           </TableHeader>
//           <TableBody>
//             {table.getRowModel().rows.map((row) => (
//               <TableRow key={row.id}>
//                 {row.getVisibleCells().map((cell) => (
//                   <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
//                 ))}
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </Card>

//       <div className="flex items-center justify-end space-x-2 py-4">
//         <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
//           Previous
//         </Button>
//         <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
//           Next
//         </Button>
//       </div>
//     </div>
//   )
// }












// "use client";
// import { useState, useEffect, useMemo, useCallback } from "react";
// import axios from "axios";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Badge } from "@/components/ui/badge";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import {
//   useReactTable,
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   flexRender,
//   createColumnHelper,
// } from "@tanstack/react-table";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// interface User {
//   _id: { $oid: string };
//   name: string;
//   email: string;
//   college: string;
//   rollNumber: string;
//   phoneNumber: string;
//   eventName: string;
//   eventPrice: string;
//   userEntryStatus: string;
//   merchantTransactionId: string;
//   userRegistrationDate: { $date: string };
//   paymentData?: {
//     success: boolean;
//     code: string;
//     message: string;
//     data?: {
//       state: string;
//       responseCode: string;
//     };
//   };
// }

// const columnHelper = createColumnHelper<User>();

// const columns = [
//   columnHelper.accessor("name", {
//     header: "Name",
//     cell: (info) => <span className="font-medium">{info.getValue()}</span>,
//   }),
//   columnHelper.accessor("email", {
//     header: "Email",
//     cell: (info) => info.getValue(),
//   }),
//   columnHelper.accessor("rollNumber", {
//     header: "Roll Number",
//     cell: (info) => info.getValue(),
//   }),
//   columnHelper.accessor("merchantTransactionId", {
//     header: "Transaction ID",
//     cell: (info) => info.getValue(),
//   }),
//   columnHelper.accessor((row) => row.paymentData?.data?.state, {
//     id: "paymentStatus",
//     header: "Payment Status",
//     cell: (info) => {
//       const paymentState = info.getValue();
//       return (
//         <Badge
//           variant={
//             paymentState === "COMPLETED"
//               ? "success"
//               : paymentState === "FAILED"
//               ? "destructive"
//               : "secondary"
//           }
//         >
//           {paymentState || "N/A"}
//         </Badge>
//       );
//     },
//   }),
//   columnHelper.display({
//     id: "showMore",
//     cell: ({ row }) => (
//       <Dialog>
//         <DialogTrigger asChild>
//           <Button variant="outline" size="sm">
//             Show More
//           </Button>
//         </DialogTrigger>
//         <DialogContent className="sm:max-w-[455px] bg-white">
//           <DialogHeader>
//             <DialogTitle>Participant Details</DialogTitle>
//           </DialogHeader>
//           <div className="grid gap-4 py-4">
//             <DetailRow label="Name" value={row.original.name} />
//             <DetailRow label="Email" value={row.original.email} />
//             <DetailRow label="College" value={row.original.college} />
//             <DetailRow label="Phone" value={row.original.phoneNumber} />
//             <DetailRow label="Event" value={row.original.eventName} />
//             <DetailRow label="Price" value={`₹${row.original.eventPrice}`} />
//             <DetailRow label="Entry Status" value={row.original.userEntryStatus === "true" ? "Entered" : "Not Entered"} />
//             <DetailRow
//               label="Registration"
//               value={new Date(row.original.userRegistrationDate.$date).toLocaleString("en-IN", {
//                 dateStyle: "full",
//               })}
//             />
//             <DetailRow label="Payment Status" value={row.original.paymentData?.data?.state || "N/A"} />
//             <DetailRow label="Response Code" value={row.original.paymentData?.data?.responseCode || "N/A"} />
//           </div>
//         </DialogContent>
//       </Dialog>
//     ),
//   }),
// ];

// const DetailRow = ({ label, value }: { label: string; value: string }) => (
//   <div className="grid grid-cols-4 items-center gap-4">
//     <span className="font-bold">{label}:</span>
//     <span className="col-span-3">{value}</span>
//   </div>
// );

// export default function UsersPage({ params }) {
//   const [users, setUsers] = useState<User[]>([]);
//   const [paymentFilter, setPaymentFilter] = useState<string>("all");
//   const [clerkId, setClerkId] = useState<string | null>(null);
//   const [eventId, setEventId] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchParams = async () => {
//       const { id, slug } = await params;
//       setClerkId(id);
//       setEventId(slug);
//     };

//     fetchParams();
//   }, [params]);

//   useEffect(() => {
//     if (clerkId && eventId) {
//       const fetchParticipants = async () => {
//         try {
//           const response = await axios.get(`http://localhost:8080/participant/event/clerk/${eventId}`);
//           setUsers(response.data);
//         } catch (error) {
//           console.error("Error fetching participants:", error);
//         }
//       };

//       fetchParticipants();
//     }
//   }, [clerkId, eventId]);

//   const globalFilterFn = useCallback(
//     (row, columnId, filterValue) => {
//       if (filterValue === "all") return true;
//       return row.original.paymentData?.data?.state === filterValue;
//     },
//     []
//   );

//   const table = useReactTable({
//     data: users,
//     columns,
//     state: {
//       globalFilter: paymentFilter,
//     },
//     onGlobalFilterChange: setPaymentFilter,
//     getCoreRowModel: getCoreRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     globalFilterFn,
//   });

//   const handleNextPage = useCallback(() => table.nextPage(), [table]);
//   const handlePreviousPage = useCallback(() => table.previousPage(), [table]);

//   return (
//     <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h2 className="text-3xl font-bold tracking-tight">Participant List</h2>
//           <p className="text-muted-foreground">Manage event participants here.</p>
//         </div>
//       </div>
//       <div className="flex items-center space-x-2">
//         <Select value={paymentFilter} onValueChange={setPaymentFilter}>
//           <SelectTrigger className="w-[180px]">
//             <SelectValue placeholder="Filter by payment status" />
//           </SelectTrigger>
//           <SelectContent className="bg-white">
//             <SelectItem value="all">All Payments</SelectItem>
//             <SelectItem value="COMPLETED">Completed</SelectItem>
//             <SelectItem value="PENDING">Pending</SelectItem>
//             <SelectItem value="FAILED">Failed</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>
//       <Card>
//         <Table>
//           <TableHeader>
//             {table.getHeaderGroups().map((headerGroup) => (
//               <TableRow key={headerGroup.id}>
//                 {headerGroup.headers.map((header) => (
//                   <TableHead key={header.id}>
//                     {flexRender(header.column.columnDef.header, header.getContext())}
//                   </TableHead>
//                 ))}
//               </TableRow>
//             ))}
//           </TableHeader>
//           <TableBody>
//             {table.getRowModel().rows.map((row) => (
//               <TableRow key={row.id}>
//                 {row.getVisibleCells().map((cell) => (
//                   <TableCell key={cell.id}>
//                     {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </Card>
//       <div className="flex items-center justify-end space-x-2 py-4">
//         <Button
//           variant="outline"
//           size="sm"
//           onClick={handlePreviousPage}
//           disabled={!table.getCanPreviousPage()}
//         >
//           Previous
//         </Button>
//         <Button
//           variant="outline"
//           size="sm"
//           onClick={handleNextPage}
//           disabled={!table.getCanNextPage()}
//         >
//           Next
//         </Button>
//       </div>
//     </div>
//   );
// }



"use client";
import { useState, useEffect, useMemo, useCallback } from "react";
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
              ? "success"
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

export default function UsersPage({ params }) {
  const [users, setUsers] = useState<User[]>([]);
  const [paymentFilter, setPaymentFilter] = useState<string>("all");
  const [clerkId, setClerkId] = useState<string | null>(null);
  const [eventId, setEventId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>(""); // State for search query

  useEffect(() => {
    const fetchParams = async () => {
      const { id, slug } = await params;
      setClerkId(id);
      setEventId(slug);
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