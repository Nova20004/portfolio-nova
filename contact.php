<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = "josephscarlino@gmail.com"; // change avec ton adresse
    $name = htmlspecialchars($_POST["name"]);
    $email = htmlspecialchars($_POST["email"]);
    $subjectType = htmlspecialchars($_POST["subject"]);
    $messageContent = htmlspecialchars($_POST["message"]);

    $subject = "Nouveau message depuis le portfolio: $subjectType";
    $message = "Nom: $name\n";
    $message .= "Email: $email\n";
    $message .= "Type d'opportunité: $subjectType\n\n";
    $message .= "Message:\n$messageContent";

    $headers = "From: $email";

    if (mail($to, $subject, $message, $headers)) {
        echo "<p style='color: cyan; text-align: center;'>Message envoyé avec succès.</p>";
    } else {
        echo "<p style='color: red; text-align: center;'>Erreur lors de l'envoi. Veuillez réessayer.</p>";
    }
}
?>
