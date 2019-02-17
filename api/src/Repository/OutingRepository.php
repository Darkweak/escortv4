<?php

namespace App\Repository;

use App\Entity\Outing;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

class OutingRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Outing::class);
    }

    public function findByPositionAround($city, $lat, $lon, $radius): array
    {
        return $this->createQueryBuilder('o')
            ->andWhere('o.lat BETWEEN :lat_min AND :lat_max AND o.long BETWEEN :lon_min AND :lon_max')
            ->orWhere('o.city LIKE :city')
            ->setParameters([
                'lat_min' => $lat - ($radius/111),
                'lat_max' => $lat + ($radius/111),
                'lon_min' => $lon - ($radius/80),
                'lon_max' => $lon + ($radius/80),
                'city' => "%{$city}%",
            ])
            ->orderBy('o.created', 'DESC')
            ->getQuery()
            ->getResult();
    }
}
