<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class ApplyResetPassword
{
    public function __invoke(Request $request, EntityManagerInterface $manager, \Swift_Mailer $mailer, \Twig_Environment $environment)
    {
        $content = json_decode($request->getContent());

        try {
            $email = $content->email;
            $user = $manager->getRepository(User::class)->findOneBy([
                'email' => $email,
            ]);

            $token = hash('sha512',$user->getUsername().$user->getEmail().(new \DateTime())->format('Y-m-d H:i:s'));
            $user->setToken($token);
            $manager->persist($user);
            $manager->flush();

            $message = (new \Swift_Message('Réinitialisation de votre mote de passe'))
                ->setFrom('no-reply@escort-me.online')
                ->setTo($user->getEmail())
                ->setBody(
                    $environment->render(
                        '/reset/fr/reset.fr.html.twig',
                        [
                            'username' => $user->getUsername(),
                            'redirect_url' => getenv('APP_URL').'/reset-password/'.$token,
                        ])
                )->setContentType("text/html");
            $mailer->send($message);

        } catch (\Exception $e) {}

        return new JsonResponse([]);
    }
}
