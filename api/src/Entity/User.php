<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\Annotation\MaxDepth;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ApiResource(
 *     attributes={
 *         "normalization_context"={"groups"={"user_output_default"}, "enable_max_depth"="true"},
 *         "denormalization_context"={"groups"={"user_input_default"}}
 *     },
 *     collectionOperations={
 *         "get"={"access_control"="is_granted('ROLE_USER')"},
 *         "post"={"denormalization_context"={"groups"={"user_input_creation"}}},
 *         "get_profile"={
 *             "method"="GET",
 *             "path"="/profile",
 *             "controller"=App\Controller\Profile::class,
 *             "normalization_context"={"groups"={"user_output_profile"}},
 *         }
 *     },
 *     itemOperations={
 *         "get"={"access_control"="(is_granted('ROLE_USER') and object == user)", "normalization_context"={"groups"={"user_output_profile"}}},
 *         "put"={"access_control"="(is_granted('ROLE_USER') and object == user)", "denormalization_context"={"groups"={"user_update"}}}
 *     }
 * )
 * @ORM\Entity
 * @ORM\Table(name="users")
 * @UniqueEntity(fields={"username"}, message="Le nom d'utilisateur est déjà pris")
 * @UniqueEntity(fields={"email"}, message="Cet email est déjà pris")
 */
class User implements UserInterface
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(unique=true)
     * @Assert\NotBlank
     * @Groups({"user_output_default", "user_input_creation", "user_output_profile", "outing_output_default", "outing_output_one"})
     */
    private $username;

    /**
     * @ORM\Column(unique=true)
     * @Assert\Email
     * @Groups({"user_output_default", "user_input_creation", "user_output_profile", "user_update"})
     */
    private $email;

    /**
     * @ORM\Column
     * @Assert\NotBlank
     * @Groups({"user_input_creation", "user_update"})
     */
    private $password;

    /**
     * @ORM\Column(nullable=true)
     * @Groups({"user_input_creation"})
     */
    private $token;

    /**
     * @ORM\Column(type="json", nullable=true)
     */
    private $roles = [];

    /**
     * @ORM\OneToMany(targetEntity="Outing", mappedBy="owner")
     * @Groups({"user_output_profile"})
     * @MaxDepth(1)
     */
    private $outingsOwner;

    /**
     * @ORM\OneToMany(targetEntity="UserOuting", mappedBy="participateBy")
     * @Groups({"user_output_profile"})
     * @MaxDepth(1)
     */
    private $outingsParticipate;

    /**
     * @ORM\OneToMany(targetEntity="Comment", mappedBy="owner")
     */
    private $comments;

    public function __construct()
    {
        $this->outingsOwner = new ArrayCollection();
        $this->outingsParticipate = new ArrayCollection();
        $this->comments = new ArrayCollection();
    }

    public function getId(): int
    {
        return $this->id;
    }

    public function getUsername(): string
    {
        return $this->username;
    }

    public function setUsername(string $username): self
    {
        $this->username = $username;
        return $this;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;
        return $this;
    }

    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;
        return $this;
    }

    public function getToken(): ?string
    {
        return $this->token;
    }

    public function setToken(?string $token): self
    {
        $this->token = $token;
        return $this;
    }

    public function getRoles(): array
    {
        return $this->roles;
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;
        return $this;
    }

    public function resetRoles(): self
    {
        $this->roles = [];
        return $this;
    }

    public function getOutingsOwner(): Collection
    {
        return $this->outingsOwner;
    }

    public function setOutingsOwner(Collection $outingsOwner): self
    {
        $this->outingsOwner = $outingsOwner;
        return $this;
    }

    public function addOutingsOwner(Outing $outingsOwner) {
        if (!$this->outingsOwner->contains($outingsOwner)) {
            $this->outingsOwner->add($outingsOwner);
        }
        return $this;
    }

    public function removeOutingsOwner(Outing $outingsOwner) {
        $this->outingsOwner->remove($outingsOwner);
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

    public function getOutingsParticipate(): Collection
    {
        return $this->outingsParticipate;
    }

    public function setOutingsParticipate(Collection $outingsParticipate): self
    {
        $this->outingsParticipate = $outingsParticipate;
        return $this;
    }

    public function getSalt(): ?string
    {
        return null;
    }

    public function eraseCredentials(): void
    {
    }
}
