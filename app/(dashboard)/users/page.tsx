"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Mail, UserPlus } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const users = [
  {
    id: "jerrold_schmidt97",
    name: "Jerrold Schmidt",
    email: "jerrold44@gmail.com",
    phone: "+19065909087",
    status: "Invited",
    role: "Cashier"
  },
  {
    id: "isabell.pfannerstill",
    name: "Isabell Pfannerstill",
    email: "isabell14@yahoo.com",
    phone: "+17959113874",
    status: "Suspended",
    role: "Cashier"
  },
  {
    id: "lottie_gottlieb-crooks",
    name: "Lottie Gottlieb-Crooks",
    email: "lottie.armstrong@gmail.com",
    phone: "+13145348727",
    status: "Invited",
    role: "Admin"
  },
  {
    id: "keon.stanton3",
    name: "Keon Stanton",
    email: "keon.medhurst@hotmail.com",
    phone: "+19573946009",
    status: "Inactive",
    role: "Manager"
  }
]

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.phone.includes(searchQuery) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'invited':
        return 'bg-blue-100 text-blue-800'
      case 'suspended':
        return 'bg-red-100 text-red-800'
      case 'inactive':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">User List</h2>
          <p className="text-muted-foreground">
            Manage your users and their roles here.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Mail className="mr-2 h-4 w-4" />
            Invite User
          </Button>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Input
          placeholder="Filter tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[30px]"></TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <input type="checkbox" className="rounded border-gray-300" />
                </TableCell>
                <TableCell>{user.id}</TableCell>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className={getStatusColor(user.status)}>
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Suspend</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}