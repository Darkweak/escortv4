<?php
namespace App\Subscriber;
use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\User;
use App\EscortAbstract\Mailer;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\GetResponseForControllerResultEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

final class RegisterSubscriber extends Mailer implements EventSubscriberInterface
{
    private $encoder;
    private $manager;

    public function __construct(\Swift_Mailer $mailer, EntityManagerInterface $manager, UserPasswordEncoderInterface $encoder, \Twig_Environment $environment)
    {
        parent::__construct($mailer, $environment);
        $this->encoder = $encoder;
        $this->manager = $manager;
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['sendRegisterMail', EventPriorities::POST_WRITE],
        ];
    }

    public function sendRegisterMail(GetResponseForControllerResultEvent $event)
    {
        $user = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();
        if (!($user instanceof User) || Request::METHOD_POST !== $method){
            return;
        }
        $token = hash('sha512',$user->getUsername().$user->getEmail().(new \DateTime())->format('Y-m-d H:i:s'));
        $user->setPassword($this->encoder->encodePassword($user, $user->getPassword()));
        $user->setRoles(['ROLE_USER']);
        $user->setToken($token);
        $this->manager->persist($user);
        $this->manager->flush();
        $this->sendEmail(
            $user,
            '/register/fr/register.fr.html.twig',
            'Bienvenue sur escort-me',
            [
                'username' => $user->getUsername(),
                'redirect_url' => getenv('APP_URL').'/activate/'.$token,
            ]
        );
    }
}
