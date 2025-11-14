<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    protected $table = 'students';

    protected $primaryKey = 'student_id';
    public $incrementing = true;
    protected $keyType = 'int';

    public $timestamps = false; 

    protected $fillable = [
        'first_name',
        'last_name',
        'grade',
        'tenant_id',
    ];
}
