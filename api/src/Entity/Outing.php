<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ApiResource(
 *     attributes={
 *         "normalization_context"={"groups"={"outing_output_default"}},
 *         "denormalization_context"={"groups"={"outing_input_default"}},
 *     },
 *     collectionOperations={
 *         "get"={"access_control"="is_granted('ROLE_USER')"}
 *     },
 *     itemOperations={
 *         "get"={"access_control"="(is_granted('ROLE_USER') and object.getOwner() == user)", "normalization_context"={"groups"={"outing_output_one"}}},
 *         "delete"={"access_control"="(is_granted('ROLE_USER') and object.getOwner() == user)"}
 *     }
 * )
 * @ORM\Entity
 */
class Outing
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column
     * @Assert\NotBlank
     * @Groups({"outing_output_default", "outing_input_creation", "outing_output_one", "user_output_profile"})
     */
    private $name;

    /**
     * @ORM\ManyToOne(targetEntity="User", inversedBy="outingsOwner")
     * @Groups({"outing_output_default", "outing_input_creation", "outing_output_one", "user_output_profile"})
     */
    private $owner;

    /**
     * @ORM\OneToMany(targetEntity="UserOuting", mappedBy="participanteTo")
     * @Groups({"outing_output_one"})
     */
    private $participants;

    public function __construct()
    {
        $this->participants = new ArrayCollection();
    }

    public function getId(): int
    {
        return $this->id;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;
        return $this;
    }

    public function getOwner(): User
    {
        return $this->owner;
    }

    public function setOwner(User $owner): self
    {
        $this->owner = $owner;
        return $this;
    }

    public function getParticipants(): Collection
    {
        return $this->participants;
    }

    public function setParticipants(Collection $participants): self
    {
        $this->participants = $participants;
        return $this;
    }

    public function addParticipant(UserOuting $participants): self
    {
        if (!$this->participants->contains($participants)) {
            $this->participants->add($participants);
        }
        return $this;
    }

    public function removeParticipant(UserOuting $participants): self
    {
        $this->participants->remove($participants);
        return $this;
    }

    /**
     * @Groups({"outing_output_default", "outing_output_one", "user_output_profile"})
     */
    public function getNbParticipants(): int
    {
        return $this->participants->count();
    }
}
