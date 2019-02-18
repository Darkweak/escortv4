<?php

namespace App\Controller;

use App\Entity\User;
use App\EscortAbstract\Mailer;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class ResetPassword
{
    public function __invoke(string $token, Request $request, EntityManagerInterface $manager, UserPasswordEncoderInterface $encoder)
    {
        $content = json_decode($request->getContent());

        try {
            $password = $content->password;
            $user = $manager->getRepository(User::class)->findOneBy([
                'token' => $token,
            ]);

            if ($user instanceof User) {
                $user
                    ->setToken('')
                    ->setPassword($encoder->encodePassword($user, $password));
                $manager->persist($user);
                $manager->flush();
            }

        } catch (\Exception $e) {}

        return new JsonResponse([]);
    }
}
