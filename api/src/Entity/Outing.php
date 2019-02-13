<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Gedmo\Mapping\Annotation as Gedmo;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ApiResource(
 *     attributes={
 *         "order"={"created": "DESC"},
 *         "normalization_context"={"groups"={"outing_output_default"}},
 *         "denormalization_context"={"groups"={"outing_input_default"}}
 *     },
 *     collectionOperations={
 *         "get"={"access_control"="is_granted('ROLE_USER')"},
 *         "fetch_around_me"={
 *             "method"="POST",
 *             "path"="/around_me",
 *             "controller"=App\Controller\SearchAround::class,
 *             "normalization_context"={"groups"={"outing_output_default"}},
 *         },
 *         "post_outing_create"={
 *             "method"="POST",
 *             "path"="/outings",
 *             "controller"=App\Controller\OutingCreator::class,
 *             "normalization_context"={"groups"={"outing_output_default"}},
 *         }
 *     },
 *     itemOperations={
 *         "get"={"access_control"="is_granted('ROLE_USER')", "normalization_context"={"groups"={"outing_output_one"}}},
 *         "delete"={"access_control"="(is_granted('ROLE_USER') and object.getOwner() == user)"}
 *     }
 * )
 * @ORM\Entity(repositoryClass="App\Repository\OutingRepository")
 */
class Outing
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="UUID")
     * @ORM\Column(type="guid")
     */
    private $id;

    /**
     * @ORM\Column
     * @Assert\NotBlank
     * @Groups({"outing_output_default", "outing_input_creation", "outing_output_one", "user_output_profile"})
     */
    private $name;

    /**
     * @ORM\Column(type="text")
     * @Groups({"outing_output_one"})
     */
    private $description;

    /**
     * @ORM\Column
     * @Assert\NotBlank
     * @Groups({"outing_output_default", "outing_input_creation", "outing_output_one"})
     */
    private $street;

    /**
     * @ORM\Column(nullable=true, length=1024)
     * @Groups({"outing_output_default", "outing_input_creation", "outing_output_one"})
     */
    private $complementaryStreet;

    /**
     * @ORM\Column
     * @Assert\NotBlank
     * @Groups({"outing_output_default", "outing_input_creation", "outing_output_one"})
     */
    private $city;

    /**
     * @ORM\Column(length=5)
     * @Assert\NotBlank
     * @Assert\Regex(pattern="/^[0-9]{5}$/", message="Code postal invalide")
     * @Groups({"outing_output_default", "outing_input_creation", "outing_output_one"})
     */
    private $postcode;

    /**
     * @ORM\Column
     * @Assert\NotBlank
     * @Groups({"outing_output_default", "outing_input_creation", "outing_output_one"})
     */
    private $country;

    /**
     * @ORM\Column(type="datetime")
     * @Assert\NotBlank
     * @Groups({"outing_output_default", "outing_input_creation", "outing_output_one"})
     */
    private $date;

    /**
     * @ORM\Column(type="float", nullable=true)
     * @Groups({"outing_output_default", "outing_output_one"})
     */
    private $lat;

    /**
     * @ORM\Column(type="float", nullable=true)
     * @Groups({"outing_output_default", "outing_output_one"})
     */
    private $long;

    /**
     * @ORM\ManyToOne(targetEntity="User", inversedBy="outingsOwner")
     * @Groups({"outing_output_default", "outing_output_one"})
     */
    private $owner;

    /**
     * @ORM\OneToMany(targetEntity="UserOuting", mappedBy="participateTo")
     * @Groups({"outing_output_one"})
     */
    private $participants;

    /**
     * @ORM\OneToMany(targetEntity="Comment", mappedBy="outing")
     * @Groups({"outing_output_one"})
     */
    private $comments;

    /**
     * @Gedmo\Timestampable(on="create")
     * @ORM\Column(type="datetime")
     * @Groups({"outing_output_one"})
     */
    private $created;

    /**
     * @Gedmo\Timestampable(on="update")
     * @ORM\Column(type="datetime")
     * @Groups({"outing_output_one"})
     */
    private $updated;

    public function __construct()
    {
        $this->participants = new ArrayCollection();
        $this->comments = new ArrayCollection();
    }

    public function getId(): string
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

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;
        return $this;
    }

    public function getStreet(): string
    {
        return $this->street;
    }

    public function setStreet(string $street): self
    {
        $this->street = $street;
        return $this;
    }

    public function getComplementaryStreet(): ?string
    {
        return $this->complementaryStreet;
    }

    public function setComplementaryStreet(?string $complementaryStreet): self
    {
        $this->complementaryStreet = $complementaryStreet;
        return $this;
    }

    public function getCity(): string
    {
        return $this->city;
    }

    public function setCity(string $city): self
    {
        $this->city = $city;
        return $this;
    }

    public function getPostcode(): string
    {
        return $this->postcode;
    }

    public function setPostcode(string $postcode): self
    {
        $this->postcode = $postcode;
        return $this;
    }

    public function getCountry(): string
    {
        return $this->country;
    }

    public function setCountry(string $country): self
    {
        $this->country = $country;
        return $this;
    }

    public function getDate(): \DateTime
    {
        return $this->date;
    }

    public function setDate(\DateTime $date): self
    {
        $this->date = $date;
        return $this;
    }

    public function getLat(): ?float
    {
        return $this->lat;
    }

    public function setLat(?float $lat): self
    {
        $this->lat = $lat;
        return $this;
    }

    public function getLong(): ?float
    {
        return $this->long;
    }

    public function setLong(?float $long): self
    {
        $this->long = $long;
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

    public function getComments(): Collection
    {
        return $this->comments;
    }

    public function setComments(Collection $comments): self
    {
        $this->comments = $comments;
        return $this;
    }

    public function addComment(Comment $comments): self
    {
        if (!$this->comments->contains($comments)) {
            $this->comments->add($comments);
        }
        return $this;
    }

    public function removeComment(Comment $comments): self
    {
        $this->comments->remove($comments);
        return $this;
    }

    public function getCreated(): \DateTime
    {
        return $this->created;
    }

    public function setCreated(\DateTime $created): self
    {
        $this->created = $created;
        return $this;
    }

    public function getUpdated(): \DateTime
    {
        return $this->updated;
    }

    public function setUpdated(\DateTime $updated): self
    {
        $this->updated = $updated;
        return $this;
    }

    /**
     * @Groups({"outing_output_default", "outing_output_one"})
     */
    public function getNbParticipants(): int
    {
        return $this->participants->count();
    }
}
