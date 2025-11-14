<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Enrollment;
use Illuminate\Support\Facades\Redirect;


class EnrollmentController extends Controller
{
    public function index()
    {
        $tenantId = Auth::user()->tenant_id;
        $enrollments = Enrollment::where('tenant_id', $tenantId)->get();
        $students = \App\Models\Student::where('tenant_id', $tenantId)->get();
        $teachers = \App\Models\Teacher::where('tenant_id', $tenantId)->get();
        $courses = \App\Models\Course::where('tenant_id', $tenantId)->get();

        return Inertia::render('enrollments/index', [
            'tenant_id' => $tenantId,
            'enrollments'  => $enrollments,
            'students' => $students,
            'teachers' => $teachers,
            'courses' => $courses,
        ]);
    }


    public function store(Request $request)
    {
        $validated = $request->validate([
            'student_id' => 'required|integer|exists:students,student_id',
            'course_id' => 'integer|exists:courses,course_id',
            'enrollment_date' => 'required|date',
        ]);

        $validated['tenant_id'] = Auth::user()->tenant_id;

        Enrollment::create($validated);

        return Redirect::route('enrollments.index');
    }


    public function update(Request $request, $id){
        $validated = $request->validate([
            'student_id' => 'required|integer|exists:students,student_id',
            'course_id' => 'integer|exists:courses,course_id',
            'enrollment_date' => 'required|date',
        ]);

        $enrollment = Enrollment::where('tenant_id', Auth::user()->tenant_id)->findOrFail($id);
        $enrollment->update($validated);

        return Redirect::route('enrollments.index');
    }
    public function destroy($id)
    {
        $enrollment = Enrollment::where('tenant_id', Auth::user()->tenant_id)->findOrFail($id);
        $enrollment->delete();

        return Redirect::route('enrollments.index');
    }   
}
