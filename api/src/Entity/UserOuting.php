<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(
 *     collectionOperations={
 *         "post"={"access_control"="(is_granted('ROLE_USER') and object.owner == user)", "denormalization_context"={"groups"={"user_outing_input_creation"}}}
 *     },
 *     itemOperations={
 *         "delete"={"access_control"="(is_granted('ROLE_USER') and object.getParticipateBy() == user)"}
 *     }
 * )
 * @ORM\Entity
 */
class UserOuting
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="User", inversedBy="outingsParticipate")
     * @Groups({"outing_output_one"})
     */
    private $participateBy;

    /**
     * @ORM\ManyToOne(targetEntity="Outing", inversedBy="participants")
     * @Groups({"user_output_profile"})
     */
    private $participateTo;

    public function getId(): int
    {
        return $this->id;
    }

    public function getParticipateBy(): User
    {
        return $this->participateBy;
    }

    public function setParticipateBy(User $participateBy): self
    {
        $this->participateBy = $participateBy;
        return $this;
    }

    public function getParticipateTo(): Outing
    {
        return $this->participateTo;
    }

    public function setParticipateTo(Outing $participateTo): self
    {
        $this->participateTo = $participateTo;
        return $this;
    }
}
