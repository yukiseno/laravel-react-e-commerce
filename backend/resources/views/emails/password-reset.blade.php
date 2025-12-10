<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f4f4f4;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .header {
            background-color: #1a1a1a;
            color: #fff;
            padding: 20px;
            text-align: center;
            border-radius: 5px 5px 0 0;
            margin: -20px -20px 20px -20px;
        }

        .header h1 {
            margin: 0;
            font-size: 24px;
        }

        .content {
            padding: 20px 0;
        }

        .button {
            display: inline-block;
            background-color: #1a1a1a;
            color: #fff;
            padding: 12px 30px;
            text-decoration: none;
            border-radius: 5px;
            margin: 20px 0;
        }

        .button:hover {
            background-color: #333;
        }

        .footer {
            text-align: center;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            font-size: 12px;
            color: #666;
        }

        .warning {
            background-color: #fff3cd;
            border: 1px solid #ffc107;
            padding: 10px;
            border-radius: 5px;
            margin: 20px 0;
            color: #856404;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <h1>Password Reset Request</h1>
        </div>

        <div class="content">
            <p>Hello,</p>

            <p>We received a request to reset your password. Click the button below to set a new password:</p>

            <a href="{{ $resetUrl }}" class="button">Reset Password</a>

            <p>Or copy and paste this link in your browser:</p>
            <p style="word-break: break-all; background-color: #f4f4f4; padding: 10px; border-radius: 5px;">
                {{ $resetUrl }}
            </p>

            <div class="warning">
                <strong>Important:</strong> This link will expire in 2 hours. If you didn't request a password reset,
                please ignore this email.
            </div>

            <p>If you're having trouble clicking the button, copy and paste the URL above into your web browser.</p>

            <p>Best regards,<br>The Support Team</p>
        </div>

        <div class="footer">
            <p>&copy; {{ date('Y') }} E-Commerce Store. All rights reserved.</p>
        </div>
    </div>
</body>

</html>
