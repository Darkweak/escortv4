<?php
namespace App\Subscriber;
use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\GetResponseForControllerResultEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

final class RegisterSubscriber implements EventSubscriberInterface
{
    private $encoder;
    private $mailer;
    private $manager;

    public function __construct(\Swift_Mailer $mailer, EntityManagerInterface $manager, UserPasswordEncoderInterface $encoder)
    {
        $this->encoder = $encoder;
        $this->mailer = $mailer;
        $this->manager = $manager;
    }
    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['sendMail', EventPriorities::POST_WRITE],
        ];
    }
    public function sendMail(GetResponseForControllerResultEvent $event)
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
            ->setBody('
                <style>
                    .head{
                      background-color: black;
                      font-size: 3em;
                      color: #eaeaea;
                      font-family: \'Comic Sans MS\', cursive;
                      text-align: center;
                      padding-top: 1em;
                      padding-bottom: 1em;
                    }
                    
                    h1{
                      margin: auto;
                    }
                    
                    #body-content{
                      padding-top: 2em;
                      text-align: center;
                    }
                    
                    #body-content > div{
                      padding-bottom: 4em;
                      padding-top: 2em;
                    }
                    
                    #body-content > div > p{
                      font-size: 2em;
                    }
                    
                    footer{
                      background-color: #cecece;
                      padding-top: 0.5em;
                      padding-bottom: 0.5em;
                      text-align: left;
                    }
                </style>
                <div id="main">
                  <div class="head">
                    <h1>escort-me.online</h1>
                  </div>
                  <div id="body-content">
                    <div>
                      <h1>Félicitations '.$user->getUsername().', votre inscription a été validée, il ne vous reste plus qu\'à activer votre compte</h1>
                      <p>Pour se faire, il vous suffit de cliquer sur <a href="http://escort-me.online/'.$token.'">ce lien</a></p>
                    </div>
                    <footer>
                      <p>Si vous ne vous êtes pas inscrit sur ce site, veuillez ignorer ce message ! Tant que vous ne validerez pas l\'email le compte sera inactif</p>
                    </footer>
                  </div>
                </div>
            ')->setContentType("text/html");
        $this->mailer->send($message);
    }
}
