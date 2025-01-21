// import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// export function RecentSales() {
//   return (
//     <div className="space-y-8">
//       <div className="flex items-center">
//         <Avatar className="h-9 w-9">
//           <AvatarFallback>OM</AvatarFallback>
//         </Avatar>
//         <div className="ml-4 space-y-1">
//           <p className="text-sm font-medium leading-none">Olivia Martin</p>
//           <p className="text-sm text-muted-foreground">
//             olivia.martin@email.com
//           </p>
//         </div>
//         <div className="ml-auto font-medium">+$1,999.00</div>
//       </div>
//       <div className="flex items-center">
//         <Avatar className="h-9 w-9">
//           <AvatarFallback>JL</AvatarFallback>
//         </Avatar>
//         <div className="ml-4 space-y-1">
//           <p className="text-sm font-medium leading-none">Jackson Lee</p>
//           <p className="text-sm text-muted-foreground">jackson.lee@email.com</p>
//         </div>
//         <div className="ml-auto font-medium">+$39.00</div>
//       </div>
//       <div className="flex items-center">
//         <Avatar className="h-9 w-9">
//           <AvatarFallback>IN</AvatarFallback>
//         </Avatar>
//         <div className="ml-4 space-y-1">
//           <p className="text-sm font-medium leading-none">Isabella Nguyen</p>
//           <p className="text-sm text-muted-foreground">
//             isabella.nguyen@email.com
//           </p>
//         </div>
//         <div className="ml-auto font-medium">+$299.00</div>
//       </div>
//       <div className="flex items-center">
//         <Avatar className="h-9 w-9">
//           <AvatarFallback>WK</AvatarFallback>
//         </Avatar>
//         <div className="ml-4 space-y-1">
//           <p className="text-sm font-medium leading-none">William Kim</p>
//           <p className="text-sm text-muted-foreground">will@email.com</p>
//         </div>
//         <div className="ml-auto font-medium">+$99.00</div>
//       </div>
//       <div className="flex items-center">
//         <Avatar className="h-9 w-9">
//           <AvatarFallback>SD</AvatarFallback>
//         </Avatar>
//         <div className="ml-4 space-y-1">
//           <p className="text-sm font-medium leading-none">Sofia Davis</p>
//           <p className="text-sm text-muted-foreground">sofia.davis@email.com</p>
//         </div>
//         <div className="ml-auto font-medium">+$39.00</div>
//       </div>
//     </div>
//   )
// }



// import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// type Participant = {
//   name: string;
//   email: string;
//   paymentData?: {
//     data?: {
//       state: string;
//       transactionId?: string;
//     };
//   };
// };

// type RecentParticipantsProps = {
//   eventParticipants: Participant[];
// };

// export function RecentParticipants({ eventParticipants }: RecentParticipantsProps) {
//   return (
//     <div className="space-y-8">
//       {eventParticipants.slice(0, 3).map((participant, index) => (
//         <div key={index} className="flex items-center">
//           <Avatar className="h-9 w-9">
//             <AvatarFallback>
//               {participant.name
//                 .split(" ")
//                 .map((n) => n[0])
//                 .join("")
//                 .toUpperCase()}
//             </AvatarFallback>
//           </Avatar>
//           <div className="ml-4 space-y-1">
//             <p className="text-sm font-medium leading-none">{participant.name}</p>
//             <p className="text-sm text-muted-foreground">{participant.email}</p>
//             <p className="text-xs text-muted-foreground">
//               {participant.paymentData?.data?.state === "PENDING"
//                 ? "PENDING"
//                 : participant.paymentData?.data?.state === "COMPLETED"
//                 ? "PAID"
//                 : participant.paymentData?.data?.state === "FAILED"
//                 ? "FAILED"
//                 : "UNKNOWN"}
//             </p>
//           </div>
//           <div className="ml-auto font-medium">
//             {participant.paymentData?.data?.transactionId
//               ? `Transaction: ${participant.paymentData.data.transactionId}`
//               : "No Transaction"}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }




"use client"

import * as React from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Skeleton } from "./ui/skeleton"

type Participant = {
  name: string
  email: string
  paymentData?: {
    data?: {
      state: string
      transactionId?: string
    }
  }
}

const columns: ColumnDef<Participant>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const name = row.getValue("name") as string
      return (
        <div className="flex items-center">
          <Avatar className="h-9 w-9 mr-2">
            <AvatarFallback>
              {name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span>{name}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "email",
    
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "paymentStatus",
    header: "Payment Status",
    cell: ({ row }) => {
      const status = row.original.paymentData?.data?.state || "UNKNOWN"
      return (
        <div
          className={`font-medium ${
            status === "COMPLETED"
              ? "text-green-600"
              : status === "PENDING"
                ? "text-yellow-600"
                : status === "FAILED"
                  ? "text-red-600"
                  : "text-gray-600"
          }`}
        >
          {status === "COMPLETED" ? "PAID" : status}
        </div>
      )
    },
  },
  {
    accessorKey: "transactionId",
    header: "Transaction ID",
    cell: ({ row }) => {
      const transactionId = row.original.paymentData?.data?.transactionId
      return transactionId ? transactionId : "No Transaction"
    },
  },
]



export function ParticipantsTable({ participants }: { participants: Participant[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  // Slice to get only the most recent 5 participants
  const recentParticipants = participants.slice(0, 10);

  const table = useReactTable({
    data: recentParticipants, // Use only recent 5 participants
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                <div className="w-full">
      <div className="flex items-center py-4">
        <Skeleton className="h-8 w-[250px]" />
        <Skeleton className="ml-auto h-8 w-[100px]" />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Skeleton className="h-6 w-[100px]" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-6 w-[150px]" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-6 w-[120px]" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-6 w-[150px]" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                            <div className="flex items-center">
                              <Skeleton className="h-9 w-9 rounded-full" />
                              <Skeleton className="h-4 w-[100px] ml-2" />
                            </div>
                          </TableCell>
                          <TableCell>
                            <Skeleton className="h-4 w-[150px]" />
                          </TableCell>
                          <TableCell>
                            <Skeleton className="h-4 w-[80px]" />
                          </TableCell>
                          <TableCell>
                            <Skeleton className="h-4 w-[120px]" />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div className="flex items-center justify-end space-x-2 py-4">
                  <Skeleton className="h-4 w-[200px]" />
                  <Skeleton className="h-8 w-[80px]" />
                  <Skeleton className="h-8 w-[80px]" />
                </div>
              </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
    </div>
  );
}
