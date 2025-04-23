<?php
header('Content-Type: application/json');

// Sanitize input
function sanitize($input) {
    return htmlspecialchars(strip_tags(trim($input)));
}

// Get form data
$name = sanitize($_POST['name'] ?? '');
$email = sanitize($_POST['email'] ?? '');
$number = sanitize($_POST['number'] ?? '');
$subject = sanitize($_POST['subject'] ?? '');
$message = sanitize($_POST['message'] ?? '');
$service = sanitize($_POST['service'] ?? '');

// Validate required fields
if (empty($name) || empty($email) || empty($number) || empty($message)) {
    echo json_encode(['status' => 'error', 'message' => 'All fields are required']);
    exit;
}

// Format message for WhatsApp
$whatsapp_message = "નવી પૂછપરછ\n\n";
$whatsapp_message .= "નામ: $name\n";
$whatsapp_message .= "ઈમેલ: $email\n";
$whatsapp_message .= "ફોન: $number\n";
$whatsapp_message .= "સેવા: $service\n";
$whatsapp_message .= "વિષય: $subject\n\n";
$whatsapp_message .= "સંદેશ:\n$message";

// WhatsApp business number (update this)
$whatsapp_number = "918200561987"; // Add country code without + symbol

// Create WhatsApp API link
$whatsapp_url = "https://wa.me/$whatsapp_number?text=" . urlencode($whatsapp_message);

echo json_encode([
    'status' => 'success',
    'redirect_url' => $whatsapp_url
]);
?>
