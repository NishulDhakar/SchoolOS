import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { Edit2, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface Enrollment {
    id: number;
    tenant_id: number;
    student_id: number;
    course_id: number;
    enrollment_date: string;
}

interface Student {
    student_id: number;
    first_name: string;
    last_name: string;
}

interface Course {
    course_id: number;
    course_name: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Enrollments',
        href: '/enrollments',
    },
];

const emptyForm = {
    student_id: '',
    course_id: '',
    enrollment_date: '',
};

type FormState = typeof emptyForm & { id?: number };

export default function EnrollmentsIndex() {
    const { enrollments, students, courses } = usePage<{
        enrollments: Enrollment[];
        students: Student[];
        courses: Course[];
    }>().props;

    const enrollmentList = enrollments ?? [];

    const [open, setOpen] = useState(false);
    const [form, setForm] = useState<FormState>(emptyForm);
    const [isEdit, setIsEdit] = useState(false);

    const handleOpenAdd = () => {
        setOpen(true);
        setForm(emptyForm);
        setIsEdit(false);
    };

    const handleOpenEdit = (en: Enrollment) => {
        setForm({
            id: en.id,
            student_id: String(en.student_id),
            course_id: String(en.course_id),
            enrollment_date: en.enrollment_date,
        });

        setIsEdit(true);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setForm(emptyForm);
        setIsEdit(false);
    };

    const handleChange = (event: any) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            student_id: Number(form.student_id),
            course_id: Number(form.course_id),
            enrollment_date: form.enrollment_date,
        };

        if (isEdit && form.id) {
            router.put(`/enrollments/${form.id}`, payload, {
                onSuccess: handleClose,
            });
        } else {
            router.post('/enrollments', payload, {
                onSuccess: handleClose,
            });
        }
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this enrollment?')) {
            router.delete(`/enrollments/${id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Enrollments" />

            <div className="mb-4 flex items-center justify-between p-12">
                <h1 className="text-2xl font-bold">Enrollments</h1>
                <Button onClick={handleOpenAdd}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Enrollment
                </Button>
            </div>

            <Card className="border-none p-4">
                {enrollmentList.length === 0 ? (
                    <PlaceholderPattern className='text-amber-50' text="No enrollments found. Add one to get started!" />
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-700">
                            <thead>
                                <tr className="bg-gray-700 text-left">
                                    <th className="border-b px-4 py-2">ID</th>
                                    <th className="border-b px-4 py-2">
                                        Student
                                    </th>
                                    <th className="border-b px-4 py-2">
                                        Course
                                    </th>
                                    <th className="border-b px-4 py-2">
                                        Enrollment Date
                                    </th>
                                    <th className="border-b px-4 py-2 text-right">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {enrollmentList.map((en) => (
                                    <tr
                                        key={en.id}
                                        className="hover:bg-gray-900"
                                    >
                                        <td className="border-b px-4 py-2">
                                            {en.id}
                                        </td>

                                        <td className="border-b px-4 py-2">
                                            {
                                                students.find(
                                                    (s) =>
                                                        s.student_id ===
                                                        en.student_id,
                                                )?.first_name
                                            }{' '}
                                            {
                                                students.find(
                                                    (s) =>
                                                        s.student_id ===
                                                        en.student_id,
                                                )?.last_name
                                            }
                                        </td>

                                        <td className="border-b px-4 py-2">
                                            {
                                                courses.find(
                                                    (c) =>
                                                        c.course_id ===
                                                        en.course_id,
                                                )?.course_name
                                            }
                                        </td>

                                        <td className="border-b px-4 py-2">
                                            {en.enrollment_date}
                                        </td>

                                        <td className="space-x-2 border-b px-4 py-2 text-right">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() =>
                                                    handleOpenEdit(en)
                                                }
                                            >
                                                <Edit2 className="h-4 w-4" />
                                            </Button>

                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() =>
                                                    handleDelete(en.id)
                                                }
                                            >
                                                <Trash2 className="h-4 w-4" />
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
                <DialogContent
                    aria-describedby="your-describedby-id"
                    className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>
                            {isEdit ? 'Edit Enrollment' : 'Add Enrollment'}
                        </DialogTitle>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="mt-2 space-y-4">
                        <div>
                            <Label htmlFor="student_id">Student</Label>
                            <select
                                id="student_id"
                                name="student_id"
                                value={form.student_id}
                                onChange={handleChange}
                                required
                                className="w-full rounded border bg-black p-2"
                            >
                                <option value="">Select Student</option>
                                {students.map((s) => (
                                    <option
                                        key={s.student_id}
                                        value={s.student_id}
                                    >
                                        {s.first_name} {s.last_name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <Label htmlFor="course_id">Course</Label>
                            <select
                                id="course_id"
                                name="course_id"
                                value={form.course_id}
                                onChange={handleChange}
                                required
                                className="w-full rounded border bg-black p-2"
                            >
                                <option value="">Select Course</option>
                                {courses && courses.map((c) => (
                                        <option
                                            key={c.course_id}
                                            value={c.course_id}
                                        >
                                            {c.course_name}
                                        </option>
                                    ))}
                            </select>
                        </div>

                        <div>
                            <Label htmlFor="enrollment_date">
                                Enrollment Date
                            </Label>
                            <Input
                                id="enrollment_date"
                                type="date"
                                name="enrollment_date"
                                value={form.enrollment_date}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="flex justify-end space-x-2 pt-2">
                            <Button
                                variant="outline"
                                type="button"
                                onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button type="submit">
                                {isEdit ? 'Update' : 'Create'}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
