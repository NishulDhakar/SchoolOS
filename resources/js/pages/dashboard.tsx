import { Card, CardContent } from "@/components/ui/card";
import { PlaceholderPattern } from "@/components/ui/placeholder-pattern";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { Head, usePage } from "@inertiajs/react";
import { Users, BookOpen, GraduationCap, FolderKanban, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
  },
];

export default function Dashboard() {
  const props = usePage().props as any;

  const schoolName = props.schoolName;
  const totalStudents = props.totalStudents;
  const totalCourses = props.totalCourses;
  const totalTeachers = props.totalTeachers;
  const totalSubjects = props.totalSubjects;
  const totalEnrollments = props.totalEnrollments;

  const stats = [
    {
      label: "Students",
      value: totalStudents,
      icon: Users,
      description: "Total number of students enrolled",
      color: "text-blue-500",
    },
    {
      label: "Courses",
      value: totalCourses,
      icon: BookOpen,
      description: "Total available courses",
      color: "text-green-600",
    },
    {
      label: "Teachers",
      value: totalTeachers,
      icon: GraduationCap,
      description: "Total number of teachers",
      color: "text-purple-600",
    },
    {
      label: "Subjects",
      value: totalSubjects,
      icon: FolderKanban,
      description: "Unique subjects taught",
      color: "text-orange-500",
    },
    {
      label: "Enrollments",
      value: totalEnrollments,
      icon: BarChart3,
      description: "Total course enrollments",
      color: "text-red-500",
    },
  ];

  return (
    <AppLayout title="Dashboard" breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />

      <div className="space-y-10 p-6">
        {/* School Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold">{schoolName}</h1>
          <p className="text-neutral-600 dark:text-neutral-300">Overview & insights</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="rounded-xl shadow-md hover:shadow-lg transition cursor-pointer">
                <CardContent className="p-5 flex flex-col gap-3">
                  <stat.icon className={`w-10 h-10 ${stat.color}`} />
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">{stat.label}</p>
                  <h2 className="text-3xl font-semibold">{stat.value}</h2>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">{stat.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Placeholder Area */}
        <div className="rounded-xl overflow-hidden border border-neutral-300 dark:border-neutral-700">
          <PlaceholderPattern className="h-96 w-full" />
        </div>
      </div>
    </AppLayout>
  );
}