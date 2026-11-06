<?php
// Simple email endpoint using PHPMailer.
// Instructions:
// 1. Run `composer require phpmailer/phpmailer` inside the project (creates vendor/).
// 2. Update SMTP username/password below (do NOT commit credentials).
// 3. Start PHP server: `php -S localhost:8000 -t server` or use the npm script added to package.json.

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Custom simple .env loader to load variables into PHP environment
function loadEnv($paths) {
    foreach ($paths as $path) {
        if (file_exists($path)) {
            $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
            foreach ($lines as $line) {
                if (strpos(trim($line), '#') === 0) {
                    continue;
                }
                $parts = explode('=', $line, 2);
                if (count($parts) === 2) {
                    $key = trim($parts[0]);
                    $value = trim($parts[1]);
                    // Strip quotes if any
                    $value = preg_replace('/^["\'](.*)["\']$/', '$1', $value);
                    putenv("$key=$value");
                    $_ENV[$key] = $value;
                    $_SERVER[$key] = $value;
                }
            }
            break; // Stop after loading the first found environment file
        }
    }
}

// Load env files
loadEnv([
    __DIR__ . '/../src/pages/.env',
    __DIR__ . '/../.env',
    __DIR__ . '/.env'
]);

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!$data) {
    echo json_encode(['success' => false, 'message' => 'Invalid JSON']);
    exit;
}

$name = $data['name'] ?? 'Website User';
$email = $data['email'] ?? '';
$phone = $data['phone'] ?? '';
$message = $data['message'] ?? '';
$service = $data['service'] ?? '';
$location = $data['location'] ?? '';

// Use PHPMailer for SMTP. Make sure vendor/autoload.php exists after running composer.
require __DIR__ . '/vendor/autoload.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$mail = new PHPMailer(true);
try {
    // Retrieve SMTP credentials from environment
    $smtpEmail = getenv('SMTP_USER') ?: getenv('GMAIL_USER') ?: 'spysense.info@gmail.com';
    $rawPassword = getenv('email') ?: getenv('GMAIL_APP_PASSWORD') ?: getenv('SMTP_PASSWORD') ?: '';
    // Gmail app passwords: strip spaces (e.g. "xxxx xxxx xxxx xxxx" -> "xxxxxxxxxxxxxxxx")
    $smtpPassword = str_replace(' ', '', $rawPassword);

    // SMTP configuration - update these values
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = $smtpEmail;
    $mail->Password = $smtpPassword;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;

    $mail->setFrom($smtpEmail, 'Spy Sense Website');
    $mail->addAddress($smtpEmail);
    if ($email) {
        $mail->addReplyTo($email, $name);
    }

    $mail->CharSet = 'UTF-8';
    $mail->isHTML(true);
    $mail->Subject = 'New Enquiry from ' . $name . ' — ' . ($service ?: 'General');

    $locationLine = $location ? "<tr><td style='padding:6px 0;color:#666;'>Location</td><td style='padding:6px 0;'><strong>$location</strong></td></tr>" : '';
    $replyToNote  = $email ? "<p style='margin:0;color:#888;font-size:12px;'>Reply directly to this email to contact $name.</p>" : '';

    $mail->Body = "
<html><body style='font-family:Arial,sans-serif;color:#333;max-width:600px;margin:0 auto;'>
  <div style='background:#1a1a1a;padding:20px 30px;border-radius:8px 8px 0 0;'>
    <h2 style='color:#d4af37;margin:0;'>Spy Sense — New Enquiry</h2>
  </div>
  <div style='background:#f9f9f9;padding:24px 30px;border:1px solid #e0e0e0;border-top:none;border-radius:0 0 8px 8px;'>
    <table cellpadding='0' cellspacing='0' style='width:100%;border-collapse:collapse;'>
      <tr><td style='padding:6px 0;color:#666;width:120px;'>Name</td><td style='padding:6px 0;'><strong>$name</strong></td></tr>
      <tr><td style='padding:6px 0;color:#666;'>Email</td><td style='padding:6px 0;'><strong>$email</strong></td></tr>
      <tr><td style='padding:6px 0;color:#666;'>Phone</td><td style='padding:6px 0;'><strong>$phone</strong></td></tr>
      <tr><td style='padding:6px 0;color:#666;'>Service</td><td style='padding:6px 0;'><strong>$service</strong></td></tr>
      $locationLine
    </table>
    <hr style='border:none;border-top:1px solid #e0e0e0;margin:16px 0;'>
    <p style='color:#666;margin:0 0 8px;'>Message:</p>
    <p style='background:#fff;padding:12px;border-left:3px solid #d4af37;border-radius:4px;margin:0;'>$message</p>
    <hr style='border:none;border-top:1px solid #e0e0e0;margin:16px 0;'>
    $replyToNote
  </div>
</body></html>";

    $mail->AltBody = "Name: $name\nEmail: $email\nPhone: $phone\nService: $service\nLocation: $location\n\nMessage:\n$message";

    $mail->send();
    echo json_encode(['success' => true]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $mail->ErrorInfo]);
}
