<?php

declare(strict_types=1);

namespace App\EventListener;

use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;

class JWTCreatedListener
{
    /**
     * @param JWTCreatedEvent $event
     */
    public function onJWTCreated(JWTCreatedEvent $event)
    {
        $user = $event->getUser();

        if ('' !== $user->getToken()) {
            $payload = null;
        } else {
            $payload = $event->getData();
            $payload['id'] = $user->getId();
        }

        $event->setData($payload);
    }
}
