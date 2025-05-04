<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $plan_name = $_POST['plan_name'];
    $name = $_POST['name'];
    $partner_name = $_POST['partner_name'] ?? ''; // Use null coalescing operator for optional field
    $target_amount = $_POST['target_amount'];

    // Store data in session
    session_start();
    $_SESSION['form_data'] = [
        'plan_name' => $plan_name,
        'name' => $name,
        'partner_name' => $partner_name,
        'target_amount' => $target_amount
    ];

    // Redirect to plan.php
    header("Location: plan.php");
    exit();
} 
?> 

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Investment Plan</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="form-container">
        <div class="frame">
            <form action="" method="POST">
                <div class="form-group">
                    <label for="plan_name">Plan Name:</label>
                    <input type="text" id="plan_name" name="plan_name"  placeholder="Enter plan name">
                </div>

                <div class="form-group">
                    <label for="name">Name:</label>
                    <input type="text" id="name" name="name"  placeholder="Enter your name">
                </div>

                <div class="form-group">
                    <label for="partner_name">Partner Name (if available):</label>
                    <input type="text" id="partner_name" name="partner_name" placeholder="Enter partner's name">
                </div>

                <div class="form-group">
                    <label for="target_amount">Target Investment Amount:</label>
                    <input type="number" id="target_amount" name="target_amount" required min="0" step="0.01" placeholder="Enter target amount">
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    </div>
</body>
</html>
