<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class ResetPassword
{
    public function __invoke(string $token, Request $request, EntityManagerInterface $manager, \Swift_Mailer $mailer, \Twig_Environment $environment, UserPasswordEncoderInterface $encoder)
    {
        $content = json_decode($request->getContent());

        try {
            $password = $content->password;
            $user = $manager->getRepository(User::class)->findOneBy([
                'token' => $token,
            ]);

            $user
                ->setToken('')
                ->setPassword($encoder->encodePassword($user, $password));
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
