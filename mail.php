<?php

use PHPMailer\PHPMailer\PHPMailer;

try {

    $post = $_POST;
    $message = "Имя: {$post['name']}<br>";
    $message .= "Телефон: {$post['phone']}<br>";
    $message .= "Почта: {$post['email']}<br>";
    $message .= "Текущий грейд: {$post['grade']}";

    require 'phpmailer/PHPMailer.php';
    require 'phpmailer/SMTP.php';
    require 'phpmailer/Exception.php';

    $mail = new PHPMailer;
    $mail->isSMTP();
    $mail->SMTPDebug = 1;
    $mail->SMTPAuth = true;
    $mail->SMTPSecure = 'ssl';
    $mail->Host = 'smtp.mail.ru';
    $mail->Port = '465';
    $mail->CharSet = 'UTF-8';
    $mail->Username = 'event.mxm@mail.ru';
    $mail->Password = 'Personal111';
    $mail->SetFrom('event.mxm@mail.ru', 'testing contesting');
    $mail->addAddress('event.mxm@mail.ru', 'testing contesting');
    $mail->isHTML(true);
    $mail->Subject = 'Регистрация testing contesting';
    $mail->Body = $message;

    if ($mail->Send()) {
        return json_encode(['status' => true, 'data' => 'Ваше сообщение отправлено!']);
    } else {
        return json_encode(['status' => false, 'data' => 'Ошибка! ' . $mail->ErrorInfo]);
    }
} catch (Throwable $e) {
    return json_encode(['status' => false, 'data' => 'Ошибка!']);
}
