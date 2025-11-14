<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Course;
use App\Models\Enrollment;
use App\Models\Teacher;
use App\Models\User;
use App\Models\Tenant;
use App\Models\Student;
use Illuminate\Support\Facades\Redirect;

class DashboardController extends Controller
{

public function index()
{
    $tenantId = Auth::user()->tenant_id;

    $tenant = Tenant::where("tenant_id", $tenantId)->first();
    $schoolName = $tenant ? $tenant->school_name : 'School';

    $totalStudents = Student::where('tenant_id', $tenantId)->count();
    $totalCourses = Course::where('tenant_id', $tenantId)->count();
    $totalTeachers = Teacher::where('tenant_id', $tenantId)->count();
    $totalSubjects = Teacher::where('tenant_id', $tenantId)
                        ->distinct('subject')
                        ->count('subject');
    $totalEnrollments = Enrollment::where('tenant_id', $tenantId)->count();

    return Inertia::render('dashboard', [
        'schoolName' => $schoolName,
        'totalStudents' => $totalStudents,
        'totalCourses' => $totalCourses,
        'totalTeachers' => $totalTeachers,
        'totalSubjects' => $totalSubjects,
        'totalEnrollments' => $totalEnrollments,
    ]);
}

}
