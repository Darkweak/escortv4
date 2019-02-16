<?php
namespace App\Subscriber;
use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use EscortAbstact\Mailer;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\GetResponseForControllerResultEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

final class RegisterSubscriber implements EventSubscriberInterface
{
    private $encoder;
    private $environment;
    private $mailer;
    private $manager;

    public function __construct(\Swift_Mailer $mailer, EntityManagerInterface $manager, UserPasswordEncoderInterface $encoder, \Twig_Environment $environment)
    {
        $this->encoder = $encoder;
        $this->environment = $environment;
        $this->mailer = $mailer;
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
        $message = (new \Swift_Message('Bienvenue sur escort-me'))
            ->setFrom('sylvain@escort-me.online')
            ->setTo($user->getEmail())
            ->setBody(
                $this->environment->render(
                    '/register/fr/register.fr.html.twig',
                    [
                        'username' => $user->getUsername(),
                        'redirect_url' => getenv('APP_URL').'/activate/'.$token,
                    ])
            )->setContentType("text/html");
        $this->mailer->send($message);
    }
}
