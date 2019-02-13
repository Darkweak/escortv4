<?php

namespace App\Controller;

use App\Entity\Outing;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use GuzzleHttp\Client;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;

class SearchAround
{
    public function __invoke(Request $request, TokenStorageInterface $token, EntityManagerInterface $manager)
    {
        if (!$token->getToken()->getUser() instanceof User) {
            throw new AccessDeniedException();
        }

        try {
            $content = json_decode($request->getContent());
            $position = $content->position;

            $fetch_positions = (new Client())->request(
                Request::METHOD_GET,
                "https://nominatim.openstreetmap.org/search?format=json&city={$position}&country=FRANCE"
            );
            $result_position = json_decode($fetch_positions->getBody())[0];

            return $manager->getRepository(Outing::class)->findByPositionAround($result_position->lat, $result_position->lon, 40);
        }catch (\Exception $e) {
            throw new BadRequestHttpException($e);
        }
    }
}
