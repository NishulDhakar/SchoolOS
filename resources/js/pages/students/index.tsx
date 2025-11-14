import { Card } from '@/components/ui/card';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Edit2, Trash2 } from 'lucide-react';

interface Student {
    student_id: number;
    tenant_id: number;
    first_name: string;
    last_name: string;
    grade: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Students',
        href: '/students',
    },
];

const emptyForm = {
    first_name: '',
    last_name: '',
    grade: '',
};

type FormState = typeof emptyForm & { id?: number };

export default function StudentsIndex() {
    const { students } = usePage<{ students: Student[] }>().props;
    const studentList = students ?? [];

    const [open, setOpen] = useState(false);
    const [form, setForm] = useState<FormState>(emptyForm);
    const [isEdit, setIsEdit] = useState(false);

    const handleOpenAdd = () => {
        setOpen(true);
        setForm(emptyForm);
        setIsEdit(false);
    };

    const handleOpenEdit = (student: Student) => {
        setForm({
            id: student.student_id,
            first_name: student.first_name,
            last_name: student.last_name,
            grade: student.grade,
        });
        setIsEdit(true);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setForm(emptyForm);
        setIsEdit(false);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        });
    };
    
    const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const payload = { 
        first_name: form.first_name,
        last_name: form.last_name,
        grade: form.grade, 
    };

    if (isEdit && form.id) {
        router.put(`/students/${form.id}`, payload, { onSuccess: handleClose });
    } else {
        router.post('/students', payload, { onSuccess: handleClose });
    }
};

    const handleDelete = (id: number) => {
        if (window.confirm('Are you sure you want to delete this student?')) {
            router.delete(`/students/${id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Students" />
            <div className="flex items-center p-12 justify-between mb-4">
                <h1 className="text-2xl font-bold">Students</h1>
                <Button onClick={handleOpenAdd}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Student
                </Button>
            </div>

            <Card className="p-4 border-none">
                {studentList.length === 0 ? (
                    <PlaceholderPattern text="No students found. Add one to get started!" />
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-700">
                            <thead>
                                <tr className="bg-gray-700 text-left">
                                    <th className="py-2 px-4 border-b">ID</th>
                                    <th className="py-2 px-4 border-b">First Name</th>
                                    <th className="py-2 px-4 border-b">Last Name</th>
                                    <th className="py-2 px-4 border-b">Grade</th>
                                    <th className="py-2 px-4 border-b text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {studentList.map((student) => (
                                    <tr key={student.student_id} className="hover:bg-gray-900">
                                        <td className="py-2 px-4 border-b">{student.student_id}</td>
                                        <td className="py-2 px-4 border-b">{student.first_name}</td>
                                        <td className="py-2 px-4 border-b">{student.last_name}</td>
                                        <td className="py-2 px-4 border-b">{student.grade}</td>
                                        <td className="py-2 px-4 border-b text-right space-x-2">
                                            <Button variant="outline" size="sm" onClick={() => handleOpenEdit(student)}>
                                                <Edit2 className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => handleDelete(student.student_id)}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </Card>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>{isEdit ? 'Edit Student' : 'Add Student'}</DialogTitle>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-4 mt-2">
                        <div>
                            <Label htmlFor="first_name">First Name</Label>
                            <Input
                                id="first_name"
                                name="first_name"
                                value={form.first_name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="last_name">Last Name</Label>
                            <Input
                                id="last_name"
                                name="last_name"
                                value={form.last_name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="grade">Grade</Label>
                            <Input
                                id="grade"
                                name="grade"
                                value={form.grade}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="flex justify-end space-x-2 pt-2">
                            <Button variant="outline" type="button" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button type="submit">{isEdit ? 'Update' : 'Create'}</Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
