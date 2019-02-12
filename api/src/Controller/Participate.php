<?php

namespace App\Controller;

use App\Entity\Outing;
use App\Entity\User;
use App\Entity\UserOuting;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class Participate
{
    public function __invoke(TokenStorageInterface $token, EntityManagerInterface $em, Request $request)
    {
        try {
            $content = json_decode($request->getContent());
            $outing_id = $content->outing;
            $value = $content->value;
            $user = $token->getToken()->getUser();
        } catch (\Exception $e) {
            throw new BadRequestHttpException();
        }

        if (!($user instanceof User)) {
            throw new BadRequestHttpException();
        } else {
            $user = $token->getToken()->getUser();
        }

        $outing = $em->getRepository(Outing::class)->find($outing_id);

        if (!$outing) {
            throw new BadRequestHttpException();
        }

        $outing_participate = $em->getRepository(UserOuting::class)->findBy([
            'participateBy' => $user,
            'participateTo' => $outing,
        ]);

        if ($outing_participate && !$value) {
            $em->remove($outing_participate);
        } elseif (!$outing_participate && $value) {
            $outing_participate = new UserOuting();
            $outing_participate
                ->setParticipateBy($user)
                ->setParticipateTo($outing);
            $em->persist($outing_participate);
        } else {
            throw new BadRequestHttpException();
        }

        $em->flush();
        return new JsonResponse([], 201);
    }
}
