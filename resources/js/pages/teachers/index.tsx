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

interface Teacher {
    teacher_id: number;
    tenant_id: number;
    first_name: string;
    last_name: string;
    subject: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Teachers',
        href: '/teachers',
    },
];

const emptyForm = {
    first_name: '',
    last_name: '',
    subject: '',
};

type FormState = typeof emptyForm & { id?: number };

export default function TeachersIndex() {
    const { teachers } = usePage<{ teachers: Teacher[] }>().props;
    const teacherList = teachers ?? [];

    const [open, setOpen] = useState(false);
    const [form, setForm] = useState<FormState>(emptyForm);
    const [isEdit, setIsEdit] = useState(false);

    const handleOpenAdd = () => {
        setOpen(true);
        setForm(emptyForm);
        setIsEdit(false);
    };

    const handleOpenEdit = (teacher: Teacher) => {
        setForm({
            id: teacher.teacher_id,
            first_name: teacher.first_name,
            last_name: teacher.last_name,
            subject: teacher.subject,
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
        if (isEdit && form.id) {
            router.put(`/teachers/${form.id}`, form, {
                onSuccess: handleClose,
            });
        } else {
            router.post('/teachers', form, {
                onSuccess: handleClose,
            });
        }
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this teacher?')) {
            router.delete(`/teachers/${id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Teachers" />
            <div className="flex items-center p-12 justify-between mb-4">
                <h1 className="text-2xl font-bold">Teachers</h1>
                <Button onClick={handleOpenAdd}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Teacher
                </Button>
            </div>

            <Card className="p-4 border-none">
                {teacherList.length === 0 ? (
                    <PlaceholderPattern text="No teachers found. Add one to get started!" />
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-700">
                            <thead>
                                <tr className="bg-gray-700 text-left">
                                    <th className="py-2 px-4 border-b">ID</th>
                                    <th className="py-2 px-4 border-b">First Name</th>
                                    <th className="py-2 px-4 border-b">Last Name</th>
                                    <th className="py-2 px-4 border-b">Subject</th>
                                    <th className="py-2 px-4 border-b text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {teacherList.map((teacher) => (
                                    <tr key={teacher.teacher_id} className="hover:bg-gray-900">
                                        <td className="py-2 px-4 border-b">{teacher.teacher_id}</td>
                                        <td className="py-2 px-4 border-b">{teacher.first_name}</td>
                                        <td className="py-2 px-4 border-b">{teacher.last_name}</td>
                                        <td className="py-2 px-4 border-b">{teacher.subject}</td>
                                        <td className="py-2 px-4 border-b text-right space-x-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleOpenEdit(teacher)}
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => handleDelete(teacher.teacher_id)}
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
                        <DialogTitle>
                            {isEdit ? 'Edit Teacher' : 'Add Teacher'}
                        </DialogTitle>
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
                            <Label htmlFor="subject">Subject</Label>
                            <Input
                                id="subject"
                                name="subject"
                                value={form.subject}
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
