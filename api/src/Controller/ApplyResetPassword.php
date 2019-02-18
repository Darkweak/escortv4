<?php

namespace App\Controller;

use App\Entity\User;
use App\EscortAbstract\Mailer;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class ApplyResetPassword extends Mailer
{
    public function __invoke(Request $request, EntityManagerInterface $manager)
    {
        $content = json_decode($request->getContent());

        try {
            $email = $content->email;
            $user = $manager->getRepository(User::class)->findOneBy([
                'email' => $email,
            ]);

            if ($user instanceof User) {
                $token = hash('sha512',$user->getUsername().$user->getEmail().(new \DateTime())->format('Y-m-d H:i:s'));
                $user->setToken($token);
                $manager->persist($user);
                $manager->flush();

                $this->sendEmail(
                    $user,
                    '/reset/fr/reset.fr.html.twig',
                    'Réinitialisation de votre mote de passe',
                    [
                        'username' => $user->getUsername(),
                        'redirect_url' => getenv('APP_URL').'/reset-password/'.$token,
                    ]
                );
            }
        } catch (\Exception $e) {}

        return new JsonResponse([]);
    }
}
