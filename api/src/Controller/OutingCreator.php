<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;

class OutingCreator
{
    private $checker;
    private $entityManager;
    private $token;

    public function __construct(TokenStorageInterface $token, EntityManagerInterface $entityManager, AuthorizationCheckerInterface $checker)
    {
        $this->checker = $checker;
        $this->entityManager = $entityManager;
        $this->token = $token;
    }

    public function __invoke(Request $request)
    {
        $owner = $this->token->getToken()->getUser();
        if ($owner instanceof User && $this->checker->isGranted('ROLE_USER')) {
            $content = json_decode($request->getContent());

            try {
                $name = $content->name;
                $numberStreet = $content->numberStreet;
                $street = $content->street;
                $postcode = $content->postcode;
                $date = \DateTime::createFromFormat('d/m/Y G:i', "{$content->date} {$content->heure}");
            } catch (\Exception $e) {
                throw new BadRequestHttpException();
            }

            try {
                $complementaryStreet = $content->complementaryStreet;
            } catch (\Exception $e) {
                $complementaryStreet = '';
            }

            $outing = new \App\Entity\Outing();

            $outing
                ->setName($name)
                ->setStreet($street)
                ->setNumberStreet($numberStreet)
                ->setCountry('FRANCE')
                ->setComplementaryStreet($complementaryStreet)
                ->setPostcode($postcode)
                ->setDate($date)
                ->setOwner($owner);

            $this->entityManager->persist($outing);
            $this->entityManager->flush();
        } else {
            throw new AccessDeniedException();
        }

        return $outing;
    }
}
