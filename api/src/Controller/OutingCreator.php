<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use GuzzleHttp\Client;
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
                $street = $content->street;
                $postcode = $content->postcode;
                $city = $content->city;
                $date = \DateTime::createFromFormat('d/m/Y G:i', "{$content->date} {$content->heure}");
            } catch (\Exception $e) {
                throw new BadRequestHttpException();
            }

            try {
                $fetch_positions = (new Client())->request(
                    Request::METHOD_GET,
                    "https://nominatim.openstreetmap.org/search?format=json&street={$street}&city={$city}&country=FRANCE&postalcode={$postcode}"
                );
                $result = json_decode($fetch_positions->getBody())[0];
                $position = [$result->lat, $result->lon];
            }catch (\Exception $e) {
                $position = [];
            }

            try {
                $description = $content->description;
            }catch (\Exception $e) {
                $description = '';
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
                ->setCountry('FRANCE')
                ->setComplementaryStreet($complementaryStreet)
                ->setCity($city)
                ->setPostcode($postcode)
                ->setDate($date)
                ->setCreated(new \DateTime())
                ->setUpdated(new \DateTime())
                ->setOwner($owner)
                ->setDescription($description)
                ->setPosition($position);

            $this->entityManager->persist($outing);
            $this->entityManager->flush();
        } else {
            throw new AccessDeniedException();
        }

        return $outing;
    }
}
