<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class Activate
{
    public function __invoke(Request $request, TokenStorageInterface $token, EntityManagerInterface $manager)
    {
        if (!($token->getToken()->getUser() instanceof User)) {
            try {
                $content = json_decode($request->getContent());
                $user = $manager->getRepository(User::class)->findOneBy([
                    'token' => $content->token,
                ]);
                if ($user && $user instanceof User) {
                    $user->setToken('');
                    $manager->persist($user);
                    $manager->flush();
                }
            } catch (\Exception $e){
            }
        }

        return new JsonResponse([]);
    }
}
