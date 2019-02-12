import React, {Fragment} from 'react';
import {Layout} from "../Layout";
import {OutingList} from "../Outing";
import {isLogged} from "../../functions/logged";
import {Carousel} from "../Carousel";
import {TextContainer} from "../Layout/TextContainer";
import {ImageFullHeight} from "../Images";

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
    description: `Rien de plus simple, il suffit de s'inscrire pour accéder aux sorties disponibles près de chez vous. Il ne vous reste plus qu'à nous rejoindre et poster ou rejoindre une sortie pour commencer l'aventure.`,
  },
  {
    icon: 'money-bill-alt',
    title: `Investissez et obtenez des royalties`,
    description: `Faites des dons pour soutenir le projet, en échange vous obtenez un pourcentage de parts dans l'entreprise en fonction du total donné par tous les contributeurs. Plus vous donnez, plus vous obtenez de pourcentage de parts.`,
  },
];

export const Welcome = ({fetch_outings_error, is_fetching_outings, outing_created_elements, outings_list,...rest}) => (
  <Layout defaultContainer={isLogged()} {...rest}>
    {
      isLogged() ?
        <div className={'pt-4 pb-4'}>
          <OutingList {...rest}/>
        </div>:
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
