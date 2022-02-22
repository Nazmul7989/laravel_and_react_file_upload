<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StudentController;



Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});



Route::get('/student',[StudentController::class,'index']);
Route::post('/student/store',[StudentController::class,'store']);
Route::post('/student/update/{id}',[StudentController::class,'update']);
Route::delete('/student/delete/{id}',[StudentController::class,'destroy']);
