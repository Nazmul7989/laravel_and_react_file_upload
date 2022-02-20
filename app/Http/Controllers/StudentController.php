<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use function PHPUnit\Framework\fileExists;

class StudentController extends Controller
{

    public function index()
    {
        $students = Student::all();

        return response()->json([
            'status'   => 200,
            'students' => $students
        ]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'name' => 'required',
            'age' => 'required',
            'class' => 'required',
//            'image' => 'required|image',
        ]);

        if ($validator->fails()) {

            return response()->json([
                'validation_error' => $validator->errors()
            ]);

        }else{

            $student = new Student();

            if ($request->hasFile('image')) {

                $file = $request->file('image');
                $extension = $file->getClientOriginalExtension();
                $image = "Student_".time().".".$extension;
                $file->move(public_path('/uploads/'),$image);
                $student->image = "/uploads/".$image;
            }

            $student->name  = $request->name;
            $student->age   = $request->age;
            $student->class = $request->class;
            $student->save();

            if ($student->save()) {
                return response()->json([
                    'status' => 200,
                    'message' => 'Student saved successfully'
                ]);
            }else{
                return response()->json([
                    'status' => 404,
                    'message' => 'Student save failed'
                ]);
            }
        }

    }



    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'name' => 'required',
            'age' => 'required',
            'class' => 'required',
            'image' => 'sometimes|nullable',
        ]);

        if ($validator->fails()) {

            return response()->json([
                'validation_error' => $validator->errors()
            ]);

        }else{

            $student = Student::findOrFail($id);

            if ($request->hasFile('image')) {

                $imagePath = public_path($student->image);

                if (fileExists($imagePath)) {
                    @unlink($imagePath);
                }

                $file = $request->file('image');
                $extension = $file->getClientOriginalExtension();
                $image = "Student_".time().".".$extension;
                $file->move(public_path('/uploads/'),$image);
                $student->image = "/uploads/".$image;
            }

            $student->name  = $request->name;
            $student->age   = $request->age;
            $student->class = $request->class;
            $student->save();

            if ($student->save()) {
                return response()->json([
                    'status' => 200,
                    'message' => 'Student updated successfully'
                ]);
            }else{
                return response()->json([
                    'status' => 404,
                    'message' => 'Student update failed'
                ]);
            }
        }

    }


    public function destroy(Student $student,$id)
    {

        $student = Student::findOrFail($id);

        $imagePath = public_path($student->image);

        if (fileExists($imagePath)) {
            @unlink($imagePath);
        }

        $student->delete();


        return response()->json([
            'status' => 200,
            'message' => 'Student deleted successfully'
        ]);

    }
}
