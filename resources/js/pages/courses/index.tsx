import { Card } from "@/components/ui/card";
import { PlaceholderPattern } from "@/components/ui/placeholder-pattern";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { Head, router, usePage } from "@inertiajs/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Edit2, Trash2 } from "lucide-react";
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from "@/components/ui/select";

interface Course {
    course_id: number;
    course_name: string;
    teacher_id: number;
    tenant_id: number;
}

interface Teacher {
    teacher_id: number;
    first_name: string;
    last_name: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Courses",
        href: "/courses",
    },
];

const emptyForm = {
    course_name: "",
    teacher_id: "",
};

type FormState = typeof emptyForm & { id?: number };

export default function CoursesIndex() {
    const { courses, teachers } = usePage<{ courses: Course[]; teachers: Teacher[] }>().props;
    const courseList = courses ?? [];
    const teacherList = teachers ?? [];

    const [open, setOpen] = useState(false);
    const [form, setForm] = useState<FormState>(emptyForm);
    const [isEdit, setIsEdit] = useState(false);

    // Open Add Modal
    const handleOpenAdd = () => {
        setForm(emptyForm);
        setIsEdit(false);
        setOpen(true);
    };

    // Open Edit Modal
    const handleOpenEdit = (course: Course) => {
        setForm({
            id: course.course_id,
            course_name: course.course_name,
            teacher_id: course.teacher_id.toString(),
        });
        setIsEdit(true);
        setOpen(true);
    };

    // Close Modal
    const handleClose = () => {
        setOpen(false);
        setForm(emptyForm);
        setIsEdit(false);
    };

    // Input Change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Submit Form
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            course_name: form.course_name,
            teacher_id: Number(form.teacher_id),
        };

        if (isEdit && form.id) {
            router.put(`/courses/${form.id}`, payload, { onSuccess: handleClose });
        } else {
            router.post(`/courses`, payload, { onSuccess: handleClose });
        }
    };

    // Delete Course
    const handleDelete = (id: number) => {
        if (confirm("Are you sure you want to delete this course?")) {
            router.delete(`/courses/${id}`);
        }
    };

    // Get Teacher Name
    const getTeacherName = (id: number) => {
        const t = teacherList.find((t) => t.teacher_id === id);
        return t ? `${t.first_name} ${t.last_name}` : "Unknown";
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Courses" />

            <div className="flex items-center p-12 justify-between mb-4">
                <h1 className="text-2xl font-bold">Courses</h1>
                <Button onClick={handleOpenAdd}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Course
                </Button>
            </div>

            <Card className="p-4 border-none">
                {courseList.length === 0 ? (
                    <PlaceholderPattern text="No courses found. Add one to get started!" />
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-700">
                            <thead>
                                <tr className="bg-gray-700 text-left">
                                    <th className="py-2 px-4 border-b">ID</th>
                                    <th className="py-2 px-4 border-b">Course Name</th>
                                    <th className="py-2 px-4 border-b">Teacher</th>
                                    <th className="py-2 px-4 border-b text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {courseList.map((course) => (
                                    <tr key={course.course_id} className="hover:bg-gray-900">
                                        <td className="py-2 px-4 border-b">{course.course_id}</td>
                                        <td className="py-2 px-4 border-b">{course.course_name}</td>
                                        <td className="py-2 px-4 border-b">
                                            {getTeacherName(course.teacher_id)}
                                        </td>
                                        <td className="py-2 px-4 border-b text-right space-x-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleOpenEdit(course)}
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </Button>

                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => handleDelete(course.course_id)}
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

            {/* Modal */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>{isEdit ? "Edit Course" : "Add Course"}</DialogTitle>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-4 mt-2">
                        {/* Course Name */}
                        <div>
                            <Label htmlFor="course_name">Course Name</Label>
                            <Input
                                id="course_name"
                                name="course_name"
                                value={form.course_name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Teacher Select */}
                        <div>
                            <Label htmlFor="teacher_id">Teacher</Label>
                            <Select
                                value={form.teacher_id}
                                onValueChange={(value) =>
                                    setForm({ ...form, teacher_id: value })
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a teacher" />
                                </SelectTrigger>
                                <SelectContent>
                                    {teacherList.map((teacher) => (
                                        <SelectItem
                                            key={teacher.teacher_id}
                                            value={teacher.teacher_id.toString()}
                                        >
                                            {teacher.first_name} {teacher.last_name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end space-x-2 pt-2">
                            <Button variant="outline" type="button" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button type="submit">{isEdit ? "Update" : "Create"}</Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
