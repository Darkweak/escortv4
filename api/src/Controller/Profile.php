<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class Profile
{
    public function __invoke(TokenStorageInterface $token)
    {
        if ($token->getToken()->getUser() instanceof User) {
            return $token->getToken()->getUser();
        } else {
            throw new UnauthorizedHttpException('');
        }
    }
}
