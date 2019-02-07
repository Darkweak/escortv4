import React, {Fragment} from 'react';
import {Layout} from "../Layout";
import {OutingList} from "../Outing";
import {isLogged} from "../../functions/logged";
import {Carousel} from "../Carousel";
import {TextContainer} from "../Layout/TextContainer";
import {ImageFullHeight} from "../Images";

const items = [
  {
    id: 1,
    title: 'Mon premier',
    city: 'Reims',
    country: 'France',
    date: Date.now(),
    place: '7 rue de la procession',
    postcode: '51000',
    owner: {
      username: 'Darkweak',
    }
  },
  {
    id: 2,
    title: 'Mon deuxième',
    city: 'Reims',
    country: 'France',
    date: Date.now(),
    place: '7 rue de la procession',
    postcode: '51000',
    owner: {
      username: 'Darkweak',
    }
  },
  {
    id: 3,
    title: 'Mon troisième',
    city: 'Reims',
    country: 'France',
    date: Date.now(),
    place: '7 rue de la procession',
    postcode: '51000',
    owner: {
      username: 'Darkweak',
    }
  },
];

const welcomeItems = [
  {
    icon: 'question-circle',
    title: `Qu'est ce que eScort ?`,
    description: `eScort est un service qui facilite la mise en relation de plusieurs personnes ou groupes de personnes. Grâce à cette application vous pourrez découvrir les sorties organisées autour de chez vous, et découvrir de nouvelles personnes.`,
  },
  {
    icon: 'user-shield',
    title: `Votre anonymat avant tout`,
    description: `Nous ne stockons aucune donnée, si ce n'est juste votre email, votre nom d'utilisateur et votre mot de passe afin de pouvoir vous authentifier. Aucune donnée n'est revendue ni exploitée par notre service ou par un tiers, nous mettons votre anonymat sur un piédestal afin de réduire au maximum les apprioris sur les gens.`,
  },
  {
    icon: 'users',
    title: `Envie de rencontrer du monde ?`,
    description: `Il ne vous reste plus qu'à nous rejoindre et poster ou rejoindre une sortie pour commencer l'aventure.`,
  },
];

export const Welcome = ({...rest}) => (
  <Layout defaultContainer={isLogged()} {...rest}>
    {
      isLogged() ?
        <OutingList list={items} {...rest}/> :
        <WelcomeDefault/>
    }
  </Layout>
);

const WelcomeDefault = () => (
  <Fragment>
    <Carousel/>
    {
      welcomeItems.map((welcomeItem, index) => (
        <TextContainer key={index} reverse={index%2 === 1} content={welcomeItem}/>
      ))
    }
    <ImageFullHeight image={'https://pbs.twimg.com/media/DksiEc8U8AAUvMd.jpg'}/>
  </Fragment>
);
