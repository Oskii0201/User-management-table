import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { fetchUsers } from '../store/usersSlice';
import {LoadingSpinner} from "./LoadingSpinner";
import {ErrorAlert} from "./ErrorAlert";
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import {Button} from "./Button";

export const UserTable: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { users, status, error } = useSelector((state: RootState) => state.users);
    const [filters, setFilters] = useState({
        name: '',
        username: '',
        email: '',
        phone: '',
    });
    const [sortColumn, setSortColumn] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const sortedUsers = [...users].sort((a, b) => {
        if (sortColumn) {
            const valueA = a[sortColumn as keyof typeof a].toString().toLowerCase();
            const valueB = b[sortColumn as keyof typeof b].toString().toLowerCase();

            if (valueA < valueB) return sortOrder === 'asc' ? -1 : 1;
            if (valueA > valueB) return sortOrder === 'asc' ? 1 : -1;
        }
        return 0;
    });

    const filteredUsers = sortedUsers.filter(user =>
        user.name.toLowerCase().includes(filters.name.toLowerCase()) &&
        user.username.toLowerCase().includes(filters.username.toLowerCase()) &&
        user.email.toLowerCase().includes(filters.email.toLowerCase()) &&
        user.phone.toLowerCase().includes(filters.phone.toLowerCase())
    );

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
    };

    const handleSort = (column: string) => {
        if (sortColumn === column) {
            setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
        } else {
            setSortColumn(column);
            setSortOrder('asc');
        }
    };

    const clearFilters = () => {
        setFilters({
            name: '',
            username: '',
            email: '',
            phone: '',
        });
    };

    const exportToCsv = () => {
        const csvRows = [
            ['Name', 'Username', 'Email', 'Phone'],
            ...filteredUsers.map(user => [user.name, user.username, user.email, user.phone]),
        ];

        const csvContent = csvRows.map(row => row.join(',')).join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, 'users.csv');
    };

    const exportToPdf = () => {
        const doc = new jsPDF();
        doc.text('User Management Table', 20, 10);

        const tableRows = filteredUsers.map(user => [user.name, user.username, user.email, user.phone]);
        (doc as any).autoTable({
            head: [['Name', 'Username', 'Email', 'Phone']],
            body: tableRows,
        });

        doc.save('users.pdf');
    };

    if (status === 'loading') {
        return (
            <LoadingSpinner/>
        );
    }

    if (status === 'failed') {
        return (
            <ErrorAlert errorMessage={error || 'Unknown error'} />
        );
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4 text-center">User Management Table</h1>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
                <input
                    name="name"
                    placeholder="Filter by Name"
                    value={filters.name}
                    onChange={handleFilterChange}
                    className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    name="username"
                    placeholder="Filter by Username"
                    value={filters.username}
                    onChange={handleFilterChange}
                    className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    name="email"
                    placeholder="Filter by Email"
                    value={filters.email}
                    onChange={handleFilterChange}
                    className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    name="phone"
                    placeholder="Filter by Phone"
                    value={filters.phone}
                    onChange={handleFilterChange}
                    className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="flex justify-end mb-4 gap-4">
                <Button onClick={clearFilters} color={"blue"}>Clear Filters</Button>
                <Button onClick={exportToCsv} color={"green"}>Export CSV</Button>
                <Button onClick={exportToPdf} color={"red"}>Export PDF</Button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                    <thead>
                    <tr className="bg-gray-200">
                        <th className="px-4 py-2 text-left cursor-pointer" onClick={() => handleSort('name')}>
                            Name {sortColumn === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
                        </th>
                        <th className="px-4 py-2 text-left cursor-pointer" onClick={() => handleSort('username')}>
                            Username {sortColumn === 'username' && (sortOrder === 'asc' ? '↑' : '↓')}
                        </th>
                        <th className="px-4 py-2 text-left cursor-pointer" onClick={() => handleSort('email')}>
                            Email {sortColumn === 'email' && (sortOrder === 'asc' ? '↑' : '↓')}
                        </th>
                        <th className="px-4 py-2 text-left cursor-pointer" onClick={() => handleSort('phone')}>
                            Phone {sortColumn === 'phone' && (sortOrder === 'asc' ? '↑' : '↓')}
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredUsers.map(user => (
                        <tr key={user.id} className="hover:bg-gray-100 odd:bg-white even:bg-slate-50">
                            <td className="border px-4 py-2">{user.name}</td>
                            <td className="border px-4 py-2">{user.username}</td>
                            <td className="border px-4 py-2">{user.email}</td>
                            <td className="border px-4 py-2">{user.phone}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};