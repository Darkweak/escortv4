<?php

namespace App\EscortAbstract;

use App\Entity\User;

abstract class Mailer
{
    private $mailer;
    private $environment;

    public function __construct(\Swift_Mailer $mailer, \Twig_Environment $environment)
    {
        $this->mailer = $mailer;
        $this->environment = $environment;
    }

    protected function sendEmail(User $user, string $template, string $title, array $options = [])
    {
        $message = (new \Swift_Message($title))
            ->setFrom('no-reply@escort-me.online')
            ->setTo($user->getEmail())
            ->setBody(
                $this->environment->render(
                    $template,
                    $options
                )
            )->setContentType("text/html");
        $this->mailer->send($message);
    }
}
