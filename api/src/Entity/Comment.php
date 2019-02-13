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
 *         "normalization_context"={"groups"={"comment_output_default"}},
 *         "denormalization_context"={"groups"={"comment_input_default"}}
 *     },
 *     collectionOperations={
 *         "post_message_create"={
 *             "method"="POST",
 *             "path"="/messages",
 *             "controller"=App\Controller\MessageCreator::class,
 *             "normalization_context"={"groups"={"comment_output_default"}},
 *         }
 *     },
 *     itemOperations={
 *         "delete"={"access_control"="(is_granted('ROLE_USER') and object.getOwner() == user)"}
 *     }
 * )
 * @ORM\Entity
 */
class Comment
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="UUID")
     * @ORM\Column(type="guid")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="User", inversedBy="comments")
     * @Groups({"comment_output_default", "comment_input_default"})
     */
    private $owner;

    /**
     * @ORM\ManyToOne(targetEntity="Outing", inversedBy="comments")
     * @Groups({"comment_output_default", "comment_input_default"})
     */
    private $outing;

    /**
     * @ORM\Column(type="text")
     * @Groups({"comment_output_default", "comment_input_default"})
     */
    private $content;

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

    public function getId(): string
    {
        return $this->id;
    }

    public function getOuting(): Outing
    {
        return $this->outing;
    }

    public function setOuting(Outing $outing): self
    {
        $this->outing = $outing;
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

    public function getContent(): string
    {
        return $this->content;
    }

    public function setContent(string $content): self
    {
        $this->content = $content;
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
}
