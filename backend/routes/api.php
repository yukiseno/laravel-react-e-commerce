<?php

use App\Http\Controllers\Api\CouponController;
use App\Http\Controllers\Api\OrderController;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\ReviewController;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('user', function (Request $request) {
        return [
            'user' => UserResource::make($request->user()->load('orders.items')),
            'access_token' => $request->bearerToken()
        ];
    });
    Route::post('user/logout', [UserController::class, 'logout']);
    Route::put('user/profile/update', [UserController::class, 'UpdateUserProfile']);
    //coupon routes
    Route::post('apply/coupon', [CouponController::class, 'applyCoupon']);
    //order routes
    Route::post('store/order', [OrderController::class, 'store']);
    Route::post('pay/order', [OrderController::class, 'payOrderByStripe']);
    Route::post('pay/update', [OrderController::class, 'updatePaymentIntent']);
    //reviews routes
    Route::post('review/store', [ReviewController::class, 'store']);
    Route::put('review/update', [ReviewController::class, 'update']);
    Route::post('review/delete', [ReviewController::class, 'delete']);
});
//products routes
Route::get('products', [ProductController::class, 'index']);
Route::get('products/{color}/color', [ProductController::class, 'filterProductsByColor']);
Route::get('products/{size}/size', [ProductController::class, 'filterProductsBySize']);
Route::get('products/{searchTerm}/find', [ProductController::class, 'findProductsByTerm']);
Route::get('product/{product}/show', [ProductController::class, 'show']);
//user routes
Route::post('user/register', [UserController::class, 'store']);
Route::post('user/login', [UserController::class, 'auth']);
Route::post('user/forgot-password', [UserController::class, 'forgotPassword']);
Route::post('user/reset-password', [UserController::class, 'resetPassword']);
