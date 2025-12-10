<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use App\Http\Requests\AuthUserRequest;
use App\Http\Requests\StoreUserRequest;
use App\Models\PasswordResetToken;
use App\Mail\PasswordResetMail;

class UserController extends Controller
{
    /**
     * Store the new user
     */
    public function store(StoreUserRequest $request)
    {
        if ($request->validated()) {
            User::create($request->validated());
            return response()->json([
                'message' => 'Account created successfully'
            ]);
        }
    }

    /**
     * Log in user
     */
    public function auth(AuthUserRequest $request)
    {
        if ($request->validated()) {
            $user = User::whereEmail($request->email)->first();
            if (!$user || !Hash::check($request->password, $user->password)) {
                return response()->json([
                    'error' => 'These credentials do not match our records'
                ]);
            } else {
                return response()->json([
                    'user' => UserResource::make($user),
                    'access_token' => $user->createToken('new_user')->plainTextToken
                ]);
            }
        }
    }
    /**
     * Logout user
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json([
            'message' => 'Logged out successfully'
        ]);
    }

    /**
     * Update the user information
     */
    public function UpdateUserProfile(Request $request)
    {
        $request->validate([
            'profile_image' => 'image|mimes:png,jpg,jpeg|max:2048'
        ]);

        if ($request->has('profile_image')) {
            //check if the old image exists and remove it
            if (File::exists(public_path($request->user()->profile_image))) {
                File::delete(public_path($request->user()->profile_image));
            }
            //get and store the new image file
            $file = $request->file('profile_image');
            $profile_image_name = time() . '_' . $file->getClientOriginalName();
            $file->storeAs('images/users/', $profile_image_name, 'public');
            //update the user image
            $request->user()->update([
                'profile_image' =>  'storage/images/users/' . $profile_image_name
            ]);
            //return the response
            return response()->json([
                'message' => 'Profile image updated successfully',
                'user' => UserResource::make($request->user())
            ]);
        } else {
            //update the user info
            $request->user()->update([
                'country' => $request->country,
                'city' => $request->city,
                'address' => $request->address,
                'zip_code' => $request->zip_code,
                'phone_number' => $request->phone_number,
                'profile_completed' => 1,
            ]);
            //return the response
            return response()->json([
                'message' => 'Profile updated successfully',
                'user' => UserResource::make($request->user())
            ]);
        }
    }

    /**
     * Send password reset link to email
     */
    public function forgotPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email'
        ]);

        try {
            // Delete any existing tokens for this email
            PasswordResetToken::where('email', $request->email)->delete();

            // Create a new reset token
            $token = Str::random(60);
            PasswordResetToken::create([
                'email' => $request->email,
                'token' => Hash::make($token),
                'created_at' => now()
            ]);

            // Send email with reset link
            Mail::to($request->email)->send(new PasswordResetMail($request->email, $token));

            return response()->json([
                'message' => 'Password reset link sent to your email'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to send reset link: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Reset password with token
     */
    public function resetPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
            'token' => 'required|string',
            'password' => 'required|min:6|confirmed'
        ]);

        try {
            // Find the reset token
            $resetToken = PasswordResetToken::where('email', $request->email)->first();

            if (!$resetToken || !Hash::check($request->token, $resetToken->token)) {
                return response()->json([
                    'error' => 'Invalid or expired reset token'
                ], 422);
            }

            // Check if token is not expired (2 hours)
            if ($resetToken->created_at->addHours(2) < now()) {
                $resetToken->delete();
                return response()->json([
                    'error' => 'Reset token has expired'
                ], 422);
            }

            // Update user password
            $user = User::where('email', $request->email)->first();
            $user->update([
                'password' => Hash::make($request->password)
            ]);

            // Delete the reset token
            $resetToken->delete();

            return response()->json([
                'message' => 'Password reset successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to reset password'
            ], 500);
        }
    }
}
